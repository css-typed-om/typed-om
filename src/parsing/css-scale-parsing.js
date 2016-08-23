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
  var parsing = internal.parsing;

  function scale3d(numbers, remaining) {
    if (numbers.length != 3) {
      return null;
    }
    var result = [new CSSScale(numbers[0], numbers[1], numbers[2]), remaining];
    result[0].inputType = '3';
    return result;
  }

  function scaleXYorZ(xyOrZ, numbers, remaining) {
    if (numbers.length != 1) {
      return null;
    }
    switch (xyOrZ) {
      case 'x':
        var result = [new CSSScale(numbers[0], 1), remaining];
        result[0]._inputType = 'x';
        return result;
      case 'y':
        var result = [new CSSScale(1, numbers[0]), remaining];
        result[0]._inputType = 'y';
        return result;
      case 'z':
        var result = [new CSSScale(1, 1, numbers[0]), remaining];
        result[0]._inputType = 'z';
        return result;
    }
    return null;
  }

  function consumeScale(string) {
    var params = parsing.consumeList([
        parsing.ignore(parsing.consumeToken.bind(null, /^scale/i)),
        parsing.optional(parsing.consumeToken.bind(null, /^(3d|x|y|z)/i)),
        parsing.ignore(parsing.consumeToken.bind(null, /^\(/)),
        parsing.consumeRepeated.bind(null, parsing.consumeNumber, /^,/),
        parsing.ignore(parsing.consumeToken.bind(null, /^\)/)),
    ], string);
    if (!params) {
      return null;
    }

    var remaining = params[1];
    var type = params[0][0];
    var numbers = params[0][1];

    switch (type) {
      case '3d':
        return scale3d(numbers, remaining);
      case 'x':
      case 'y':
      case 'z':
        return scaleXYorZ(type, numbers, remaining);
    }

    // Only scale(s) and scale(x, y) remain.
    if (numbers.length == 1) {
      var result = [new CSSScale(numbers[0], numbers[0]), remaining];
      result[0]._inputType = '1';
      return result;
    }
    if (numbers.length == 2) {
      var result = [new CSSScale(numbers[0], numbers[1]), remaining];
      result[0]._inputType = '2';
      return result;
    }
    return null;
  }

  internal.parsing.consumeScale = consumeScale;
})(typedOM.internal);
