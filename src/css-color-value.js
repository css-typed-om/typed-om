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

(function(internal, scope) {

  function isInt(value) {
    return typeof value == 'number' && value % 1 === 0;
  }

  function CSSColorValue(r, g, b, a) {
    if (a === undefined) {
      a = 1;
    }

    if (!(isInt(r) && isInt(g) && isInt(b))) {
      throw new TypeError('r, g and b must be integers.');
    }

    if (typeof a != 'number') {
      throw new TypeError('a must be a number.');
    }

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      throw new TypeError('r, g and b must be integers between 0 and 255.');
    }

    if (a < 0 || a > 1) {
      throw new TypeError('a must be a number between 0 and 1.');
    }
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.cssText = this._generateCssString();
  }
  internal.inherit(CSSColorValue, CSSStyleValue);

  CSSColorValue.from = function(value) {
    var parsing = internal.parsing;

    var params = parsing.consumeList([
        parsing.consumeToken.bind(null, /^rgba?/i),
        parsing.ignore(parsing.consumeToken.bind(null, /^\(/)),
        parsing.consumeRepeated.bind(null, parsing.consumeNumber, /^,/),
        parsing.ignore(parsing.consumeToken.bind(null, /^\)/)),
    ], value);

    if (!params || params[1].length) {
      // Failure to parse, or trailing characters.
      return null;
    }
    params = params[0];

    var isRGBA = params[0].endsWith('a');
    values = params[1];
    for (var i = 0; i < 3; i++) {
      if (!isInt(values[i]) || values[i] < 0 || values[i] > 255) {
        return null;
      }
    }
    if (isRGBA  && values.length == 4) {
      if (values[3] < 0 || values[3] > 1) {
        return null;
      }
      var result = new CSSColorValue(values[0], values[1], values[2], values[3]);
      return result;
    } else if (!isRGBA && values.length == 3) {
      var result = new CSSColorValue(values[0], values[1], values[2]);
      return result;
    }
    return null;
  };

  CSSColorValue.prototype._generateCssString = function() {
    var cssText = this.a == 1 ? 'rgb(' : 'rgba(';
    cssText = cssText + this.r + ',' + this.g + ',' + this.b;

    if (this.a != 1) {
      cssText  = cssText + ',' + this.a;
    }
    cssText = cssText + ')'
    return cssText;
  };

  scope.CSSColorValue = CSSColorValue;

})(typedOM.internal, window);
