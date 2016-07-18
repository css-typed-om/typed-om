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

  function consumeMatrix(string) {
    var params = parsing.consumeList([
        parsing.ignore(parsing.consumeToken.bind(null, /^matrix/i)),
        parsing.optional(parsing.consumeToken.bind(null, /^3d/i)),
        parsing.ignore(parsing.consumeToken.bind(null, /^\(/)),
        parsing.consumeRepeated.bind(null, parsing.consumeNumber, /^,/),
        parsing.ignore(parsing.consumeToken.bind(null, /^\)/)),
    ], string);
    if (!params) {
      return null;
    }
    var leftover = params[1];
    params = params[0];
    var is3d = !!params[0];
    var numberSequence = params[1];
    if (is3d && numberSequence.length != 16) {
      return null;
    }
    if (!is3d && numberSequence.length != 6) {
      return null;
    }
    return [new CSSMatrix(new DOMMatrixReadonly(numberSequence)), leftover];
  }

  internal.parsing.consumeMatrix = consumeMatrix;
})(typedOM.internal);
