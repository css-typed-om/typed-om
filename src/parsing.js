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
    string = string.trim().toLowerCase();

    // CSS allows lengths to be '0', so if px is a supported unit, return 0px.
    if (string == '0' && 'px'.search(unitRegExp) >= 0)
      return {px: 0};

    // If we have parenthesis, we're a calc and need to start with 'calc'.
    if (!/^[^(]*$|^calc/.test(string)) {
      return;
    }
    string = string.replace(/^calc\(/, '(');

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

  // The consumeX functions all return pairs of
  // [consumed, remainingString] (or undefined, if nothing was consumed).

  function ignore(consumerFn) {
    return function(input) {
      var result = consumerFn(input);
      if (result)
        result[0] = undefined;
      return result;
    }
  }

  // Regex should be anchored with /^
  function consumeToken(regex, string) {
    var match = regex.exec(string);
    if (match) {
      match[0] = regex.ignoreCase ? match[0].toLowerCase() : match[0];
      return [match[0], string.substr(match[0].length)];
    }
  }

  function consumeNumber(string) {
    var result = consumeToken(/^[0-9]?\.?[0-9]+/, string);
    if (result) {
      result[0] = parseFloat(result[0]);
    }
    return result;
  }

  function consumeTrimmed(consumer, string) {
    string = string.replace(/^\s*/, '');
    var result = consumer(string);
    if (result) {
      // Remove whitespace from the start of the remainder string too.
      result[1] = result[1].replace(/^\s*/, '');
      return result;
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

  internal.parsing.isNumberValueString = isNumberValueString;
  internal.parsing.isCalc = isCalc;
  internal.parsing.parseDimension = parseDimension;
  internal.parsing.ignore = ignore;
  internal.parsing.consumeToken = consumeToken;
  internal.parsing.consumeNumber = consumeNumber;
  internal.parsing.consumeTrimmed = consumeTrimmed;
  internal.parsing.consumeRepeated = consumeRepeated;
  internal.parsing.consumeList = consumeList;
})(typedOM.internal);
