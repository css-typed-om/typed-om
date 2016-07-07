// Copyright 2015 Google Inc. All rights reserved.
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

  // Extra backslashes because otherwise JS interprets them incorrectly.
  var numberValueRegexStr = '[-+]?(\\d*\\.)?\\d+(e[-+]?\\d+)?';

  function isNumberValueString(cssText) {
    // Anchor the regex to the start and end of the string..
    var numberValueRegex = new RegExp('^\\s*' + numberValueRegexStr + '\\s*$');
    return numberValueRegex.test(cssText);
  }

  function isCalc(string) {
    return /^calc/.test(string); 
  }

  // Effectively returns a calc dictionary.
  function parseDimension(unitRegExp, string) {
    // We tag units by prefixing them with 'U' (note that we are already
    // lowercase) to prevent problems with types which are substrings of
    // each other (although prefixes may be problematic!)
    var matchedUnits = {};
    string = string.replace(unitRegExp, function(match) {
      matchedUnits[match] = null;
      return 'U' + match;
    });
    var taggedUnitRegExp = 'U(' + unitRegExp.source + ')';

    // Validating input is simply applying as many reductions as we can.
    // Replace numbers with N, numbers with units with D, operations with O,
    // then remove all whitespace.
    var typeCheck = string.replace(new RegExp(numberValueRegexStr, 'g'), 'N')
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
      return;
    }

    for (var unit in matchedUnits) {
      // TODO: Don't use eval here as it will throw up security flags.
      var result = eval(string.replace(new RegExp('U' + unit, 'g'), '').replace(
            new RegExp(taggedUnitRegExp, 'g'), '*0'));
      if (!isFinite(result)) {
        return;
      }
      matchedUnits[unit] = result;
    }
    return matchedUnits;
  }

  function ignore(value) {
    return function(input) {
      var result = value(input);
      if (result)
        result[0] = undefined;
      return result;
    }
  }

  // Regex should be anchored with /^
  function consumeToken(regex, string) {
    var result = regex.exec(string);
    if (result) {
      result = regex.ignoreCase ? result[0].toLowerCase() : result[0];
      return [result, string.substr(result.length)];
    }
  }

  function consumeNumber(string) {
    var result = consumeToken(/^[0-9]?\.?[0-9]+/, string);
    if (result && result[0]) {
      result[0] = parseFloat(result[0]);
    }
    return result;
  }

  function consumeTrimmed(consumer, string) {
    string = string.replace(/^\s*/, '');
    var result = consumer(string);
    if (result) {
      return [result[0], result[1].replace(/^\s*/, '')];
    }
  }

  function consumeRepeated(consumer, separator, string) {
    consumer = consumeTrimmed.bind(null, consumer);
    var list = [];
    while (true) {
      var result = consumer(string);
      if (!result) {
        return [list, string];
      }
      list.push(result[0]);
      string = result[1];
      result = consumeToken(separator, string);
      if (!result || result[1] == '') {
        return [list, string];
      }
      string = result[1];
    }
  }

  function consumeList(list, input) {
    var output = [];
    for (var i = 0; i < list.length; i++) {
      var result = consumeTrimmed(list[i], input);
      if (!result || result[0] == '')
        return;
      if (result[0] !== undefined)
        output.push(result[0]);
      input = result[1];
    }
    if (input == '') {
      return output;
    }
  }

  // Consumes a token or expression with balanced parentheses
  function consumeParenthesised(parser, string) {
    var nesting = 0;
    for (var n = 0; n < string.length; n++) {
      if (/\s|,/.test(string[n]) && nesting == 0) {
        break;
      } else if (string[n] == '(') {
        nesting++;
      } else if (string[n] == ')') {
        nesting--;
        if (nesting == 0)
          n++;
        if (nesting <= 0)
          break;
      }
    }
    console.log(string.substr(0, n));
    var parsed = parser(string.substr(0, n));
    return parsed == undefined ? undefined : [parsed, string.substr(n)];
  }

  if (!internal.parsing) {
    internal.parsing = {};
  }
  internal.parsing.isNumberValueString = isNumberValueString;
  internal.parsing.isCalc = isCalc;
  internal.parsing.parseDimension = parseDimension;
  internal.parsing.ignore = ignore;
  internal.parsing.consumeToken = consumeToken;
  internal.parsing.consumeNumber = consumeNumber;
  internal.parsing.consumeTrimmed = consumeTrimmed;
  internal.parsing.consumeRepeated = consumeRepeated;
  internal.parsing.consumeList = consumeList;
  internal.parsing.consumeParenthesised = consumeParenthesised;
})(typedOM.internal);
