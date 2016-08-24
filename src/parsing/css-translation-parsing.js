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

  function consumeTranslation(string) {
    var params = parsing.consumeList([
        parsing.ignore(parsing.consumeToken.bind(null, /^translate/i)),
        parsing.optional(parsing.consumeToken.bind(null, /^(3d|x|y|z)/i)),
        parsing.ignore(parsing.consumeToken.bind(null, /^\(/)),
        parsing.consumeRepeated.bind(null, parsing.consumeLengthValue, /^,/),
        parsing.ignore(parsing.consumeToken.bind(null, /^\)/))
    ], string);
    if (!params) {
      return null;
    }

    var remaining = params[1];
    var type = params[0][0];
    var coords = params[0][1];

    for (var i = 0; i < coords.length; i++) {
      if (coords[i].type != 'px') {
        return null;
      }
    }

    switch (type) {
      case '3d' :
        return internal.cssTranslationFromTranslate3d(coords, string, remaining);
      case 'x':
        return internal.cssTranslationFromTranslateX(coords, string, remaining);
      case 'y':
        return internal.cssTranslationFromTranslateY(coords, string, remaining);
      case 'z':
        return internal.cssTranslationFromTranslateZ(coords, string, remaining);
    }

    // Only translate(s) and translate(x, y) remain.
    return internal.cssTranslationFromTranslate(coords, string, remaining);
  }

  internal.parsing.consumeTranslation = consumeTranslation;

})(typedOM.internal);
