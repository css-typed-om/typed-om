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
        return internal.cssScaleFromScale3D(numbers, string, remaining);
      case 'x':
        return internal.cssScaleFromScaleX(numbers, string, remaining);
      case 'y':
        return internal.cssScaleFromScaleY(numbers, string, remaining);
      case 'z':
        return internal.cssScaleFromScaleZ(numbers, string, remaining);
    }

    // Only scale(s) and scale(x, y) remain.
    return internal.cssScaleFromScale(numbers, string, remaining);
  }

  internal.parsing.consumeScale = consumeScale;
})(typedOM.internal);
