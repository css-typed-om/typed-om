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

  function translationFromTranslate(coords, string, remaining) {
    if (coords.length == 1) {
      var result = [new CSSTranslation(coords[0], new CSSSimpleLength(0, 'px')), remaining];
      result[0]._cssText = string;
      return result;
    }
    if (coords.length == 2) {
      var result = [new CSSTranslation(coords[0], coords[1]), remaining];
      result[0]._cssText = string;
      return result;
    }
    return null;
  }

  function translationFromTranslate3d(coords, string, remaining) {
    if (coords.length != 3) {
      return null;
    }
    var result = [new CSSTranslation(coords[0], coords[1], coords[2]), remaining];
    result[0]._cssText = string;
    return result;
  }

  function translationFromTranslateX(coords, string, remaining) {
    if (coords.length != 1) {
      return null;
    }
    var result = [new CSSTranslation(coords[0], new CSSSimpleLength(0, 'px')), remaining];
    result[0]._cssText = string;
    return result;
  }

  function translationFromTranslateY(coords, string, remaining) {
    if (coords.length != 1) {
      return null;
    }
    var result = [new CSSTranslation(new CSSSimpleLength(0, 'px'), coords[0]), remaining];
    result[0]._cssText = string;
    return result;
  }

  function translationFromTranslateZ(coords, string, remaining) {
    if (coords.length != 1) {
      return null;
    }
    var zeroLength = new CSSSimpleLength(0, 'px');
    var result = [new CSSTranslation(zeroLength, zeroLength, coords[0]), remaining];
    result[0]._cssText = string;
    return result;
  }

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
        return translationFromTranslate3d(coords, string, remaining);
      case 'x':
        return translationFromTranslateX(coords, string, remaining);
      case 'y':
        return translationFromTranslateY(coords, string, remaining);
      case 'z':
        return translationFromTranslateZ(coords, string, remaining);
    }

    return translationFromTranslate(coords, string, remaining);
  }

  internal.parsing.consumeTranslation = consumeTranslation;

})(typedOM.internal);
