// Copyright 2016 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(internal) {

  var unitRegExpStr = 'px|%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc';

  function isCalc(string) {
    return /^calc/i.test(string);
  }

  // Returns a calc dictionary.
  function parseDimension(string) {
    // We tag units by prefixing them with 'U' (note that we are already
    // lowercase) to prevent problems with types which are substrings of
    // each other (although prefixes may be problematic!)
    var matchedUnits = {};
    string = string.replace(new RegExp(unitRegExpStr, 'gi'), function(match) {
      matchedUnits[match] = null;
      return 'U' + match;
    });
    var taggedUnitRegExp = 'U(' + unitRegExpStr + ')';

    // Validating input is simply applying as many reductions as we can.
    // Replace numbers with N, numbers with units with D, operations with O,
    // then remove all whitespace.
    var typeCheck = string.replace(new RegExp(internal.parsing.NUMBER_REGEX_STR, 'g'), 'N')
                          .replace(new RegExp('N' + taggedUnitRegExp, 'g'), 'D')
                          .replace(/\s[+-]\s/g, 'O')
                          .replace(/\s/g, '');

    var reductions = [
      // Matches on a number tag followed by the * operator followed by a
      // number tag, capturing the number tag (D).
      /N\*(D)/g,
      // Matches on a number tag (N) or number with unit (D) followed by an
      // * or / operator, followed by a number (N), capturing the first N or D.
      /(N|D)[*/]N/g,
      // Matches on a number tag (N) or number with unit (D) followed by a
      // + or - operator (O), followed by another number or number with unit
      // tag, capturing the first N or D.
      /(N|D)O\1/g,
      // Matches on number (N) or number with unit (D) tags surrounded by
      // brackets, capturing the N or D.
      /\((N|D)\)/g
    ];
    var i = 0;
    while (i < reductions.length) {
      if (reductions[i].test(typeCheck)) {
        // Replace each reduction with the captured part, so that
        // (DOD) becomes (D) then D.
        typeCheck = typeCheck.replace(reductions[i], '$1');
        i = 0;
      } else {
        i++;
      }
    }
    // If we don't end up only with a number tag after reducing, the
    // expression is invalid.
    if (typeCheck != 'D') {
      return null;
    }

    for (var unit in matchedUnits) {
      // TODO: Don't use eval here as it will throw up security flags.
      var result = eval(string.replace(new RegExp('U' + unit, 'g'), '').replace(
            new RegExp(taggedUnitRegExp, 'g'), '*0'));
      if (!isFinite(result)) {
        return null;
      }
      matchedUnits[unit] = result;
    }

    if (matchedUnits['%'] != undefined) {
      // Percent is a special case - We require 'percent' instead
      // of '%' as the unit.
      matchedUnits['percent'] = matchedUnits['%'];
      delete matchedUnits['%'];
    }

    return matchedUnits;
  }

  function consumeSimpleLength(str) {
    var consumedNumber = internal.parsing.consumeNumber(str);
    if (!consumedNumber) {
      return null;
    }
    var unitRegExp = new RegExp('^' + unitRegExpStr, 'gi');
    var consumedUnit = internal.parsing.consumeToken(unitRegExp, consumedNumber[1]);
    if (!consumedUnit) {
      if (consumedNumber[0] == 0) {
        return [new CSSSimpleLength(0, 'px'), consumedNumber[1]];
      }
      return null;
    }
    if (consumedUnit[0] == '%') {
      // Percent is a special case - We require 'percent' instead
      // of '%' as the unit.
      consumedUnit[0] = 'percent';
    }
    return [new CSSSimpleLength(consumedNumber[0], consumedUnit[0]), consumedUnit[1]];
  }

  function consumeCalcLength(str) {
    var consumedCalcToken = internal.parsing.consumeToken(/^calc/i, str);
    if (!consumedCalcToken) {
      return null;
    }

    // Consume until balanced closing parens
    var result = internal.parsing.consumeParenthesised(
        parseDimension, consumedCalcToken[1]);
    if (!result) {
      return null;
    }

    return [new CSSCalcLength(result[0]), result[1]];
  }

  function consumeLengthValue(str) {
    var consumedCalcLength = consumeCalcLength(str);
    if (consumedCalcLength) {
      return consumedCalcLength;
    }
    return consumeSimpleLength(str);
  }

  internal.parsing.consumeSimpleLength = consumeSimpleLength;
  internal.parsing.consumeLengthValue = consumeLengthValue;
})(typedOM.internal);
