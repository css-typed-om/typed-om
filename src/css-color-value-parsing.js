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

  function rgba(values, remaining) {
    if (values.length != 4 || values[3] < 0 || values[3] > 1) {
      return null;
    }
    return [new CSSColorValue(values[0], values[1], values[2], values[3]), remaining];
  }

  function consumeColorValue(string) {
    var parsing = internal.parsing;

    var params = parsing.consumeList([
        parsing.ignore(parsing.consumeToken.bind(null, /^rgb/i)),
        parsing.optional(parsing.consumeToken.bind(null, /^a/i)),
        parsing.ignore(parsing.consumeToken.bind(null, /^\(/)),
        parsing.consumeRepeated.bind(null, parsing.consumeNumber, /^,/),
        parsing.ignore(parsing.consumeToken.bind(null, /^\)/)),
    ], string);

    if (!params) {
      return null;
    }

    var remaining = params[1];
    var isRGBA = params[0][0];
    var values = params[0][1];

    for (var i = 0; i < 3; i++) {
      if (!Number.isInteger(values[i]) || values[i] < 0 || values[i] > 255) {
        return null;
      }
    }

    if (isRGBA) {
      return rgba(values, remaining);
    }

    if (values.length != 3) {
      return null;
    }
    return [new CSSColorValue(values[0], values[1], values[2]), remaining];
  }

  internal.parsing.consumeColorValue = consumeColorValue;
})(typedOM.internal);
