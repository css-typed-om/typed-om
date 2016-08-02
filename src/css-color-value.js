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

  function generateCssString(colorValue) {
    var cssText = colorValue.a == 1 ? 'rgb(' : 'rgba(';
    cssText = cssText + colorValue.r + ',' + colorValue.g + ',' + colorValue.b;

    if (colorValue.a != 1) {
      cssText  = cssText + ',' + colorValue.a;
    }
    cssText = cssText + ')'
    return cssText;
  }

  function CSSColorValue(r, g, b, a) {
    if (a === undefined) {
      a = 1;
    }

    if (!(Number.isInteger(r) &&
          Number.isInteger(g) &&
          Number.isInteger(b))) {
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
    this.cssText = generateCssString(this);
  }
  internal.inherit(CSSColorValue, CSSStyleValue);

  scope.CSSColorValue = CSSColorValue;

})(typedOM.internal, window);
