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
  var parsing = internal.parsing;

  function rotate3d(numbers, unit, remaining) {
    if (numbers.length != 4) {
      return null;
    }
    var result = [new CSSRotation(numbers[0], numbers[1], numbers[2], new CSSAngleValue(numbers[3], unit)), remaining];
    result[0]._inputType = '3d';
    return result;
  }

  function rotateXYorZ(type, numbers, unit, remaining) {
    switch (type) {
      case 'x':
        var result = [new CSSRotation(1, 0, 0, new CSSAngleValue(numbers[0], unit)), remaining];
        result[0]._inputType = 'x';
        return result;
      case 'y':
        var result = [new CSSRotation(0, 1, 0, new CSSAngleValue(numbers[0], unit)), remaining];
        result[0]._inputType = 'y';
        return result;
      case 'z':
        var result = [new CSSRotation(0, 0, 1, new CSSAngleValue(numbers[0], unit)), remaining];
        result[0]._inputType = 'z';
        return result;
    }
    return null;
  }

  function consumeRotation(string) {
    var params = parsing.consumeList([
        parsing.ignore(parsing.consumeToken.bind(null, /^rotate/i)),
        parsing.optional(parsing.consumeToken.bind(null, /^(3d|x|y|z)/i)),
        parsing.ignore(parsing.consumeToken.bind(null, /^\(/)),
        parsing.consumeRepeated.bind(null, parsing.consumeNumber, /^,/),
        parsing.consumeAngleUnit,
        parsing.ignore(parsing.consumeToken.bind(null, /^\)/))
    ], string);
    if (!params) {
      return null;
    }

    var remaining = params[1];
    var type = params[0][0];
    var numbers = params[0][1];
    var unit = params[0][2];

    if (type == '3d') {
      return rotate3d(numbers, unit, remaining);
    }

    if (numbers.length != 1) {
      return null;
    }

    if (type == 'x' || type == 'y' || type == 'z') {
      return rotateXYorZ(type, numbers, unit, remaining);
    }

    var result = [new CSSRotation(new CSSAngleValue(numbers[0], unit)), remaining];
    result._inputType = '2d';
    return result;
  }

  internal.parsing.consumeRotation = consumeRotation;

})(typedOM.internal);
