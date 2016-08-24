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

  function optional(consumerFn) {
    return function(input) {
      var result = consumerFn(input);
      return result ? result : ['', input];
    }
  }

  // Regex should be anchored with /^
  function consumeToken(regex, string) {
    var match = regex.exec(string);
    if (match) {
      match[0] = regex.ignoreCase ? match[0].toLowerCase() : match[0];
      return [match[0], string.substr(match[0].length)];
    }
    return null;
  }

  function consumeNumber(string) {
    var result = consumeToken(new RegExp('^\\s*' + numberValueRegexStr), string);
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
    }
    return result;
  }

  function consumeRepeated(consumer, separator, string, opt_max) {
    consumer = consumeTrimmed.bind(null, consumer);
    var list = [];
    opt_max = opt_max || Number.MAX_VALUE;
    while (true) {
      var result = consumer(string);
      if (!result) {
        return [list, string];
      }
      list.push(result[0]);
      string = result[1];
      if (separator) {
        result = consumeToken(separator, string);
        if (result) {
          string = result[1];
        }
        if (!result || result[1] == '') {
          return [list, string];
        }
      }
      if (list.length >= opt_max) {
        return [list, string];
      }
    }
  }

  // Consumes using a list of consumers.
  function consumeList(list, input) {
    var output = [];
    for (var i = 0; i < list.length; i++) {
      var result = consumeTrimmed(list[i], input);
      if (!result)
        return null;
      if (result[0] !== undefined)
        output.push(result[0]);
      input = result[1];
    }
    if (output.length) {
      return [output, input];
    }
    return null;
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
    var parsed = parser(string.substr(0, n));
    if (parsed) {
      return [parsed, string.substr(n)];
    }
    return null;
  }

  internal.parsing.NUMBER_REGEX_STR = numberValueRegexStr;
  internal.parsing.isNumberValueString = isNumberValueString;
  internal.parsing.ignore = ignore;
  internal.parsing.optional = optional;
  internal.parsing.consumeToken = consumeToken;
  internal.parsing.consumeNumber = consumeNumber;
  internal.parsing.consumeTrimmed = consumeTrimmed;
  internal.parsing.consumeRepeated = consumeRepeated;
  internal.parsing.consumeList = consumeList;
  internal.parsing.consumeParenthesised = consumeParenthesised;
})(typedOM.internal);
