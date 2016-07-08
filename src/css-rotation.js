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

(function(internal, scope) {

  function computeMatrix(cssRotation) {
    // See documentation https://drafts.csswg.org/css-transforms-1/.
    var halfRadians = cssRotation.angle * Math.PI / 360;
    var sc = Math.sin(halfRadians) * Math.cos(halfRadians);
    var sq = Math.sin(halfRadians) * Math.sin(halfRadians);

    var matrix;
    if (cssRotation.x == null) {
      matrix = new CSSMatrix(new DOMMatrixReadonly([
          1 - 2 * sq, 2 * sc, -2 * sc, 1 - 2 * sq, 0, 0]));
    } else {
      // Normalize the [x, y, z] vector
      var lengthSqrd = cssRotation.x * cssRotation.x +
          cssRotation.y * cssRotation.y +
          cssRotation.z * cssRotation.z;
      var scale = (lengthSqrd == 0) ? 0 : 1 / Math.sqrt(lengthSqrd);
      var x = cssRotation.x * scale;
      var y = cssRotation.y * scale;
      var z = cssRotation.z * scale;

      matrix = new CSSMatrix(new DOMMatrixReadonly([
          1 - 2 * (y * y + z * z) * sq,
          2 * (x * y * sq + z * sc),
          2 * (x * z * sq - y * sc),
          0,
          2 * (x * y * sq - z * sc),
          1 - 2 * (x * x + z * z) * sq,
          2 * (y * z * sq + x * sc),
          0,
          2 * (x * z * sq + y * sc),
          2 * (y * z * sq - x * sc),
          1 - 2 * (x * x + y * y) * sq,
          0, 0, 0, 0, 1]));
    }
    return matrix;
  };

  function generateCssString(cssRotation) {
    var cssText;
    if (cssRotation.is2D) {
      cssText = 'rotate(' + cssRotation.angle + 'deg)';
    } else {
      cssText = 'rotate3d(' + cssRotation.x +
          ', ' + cssRotation.y +
          ', ' + cssRotation.z +
          ', ' + cssRotation.angle + 'deg)';
    }
    return cssText;
  };


  function CSSRotation(x, y, z, angle) {
    if (arguments.length != 1 && arguments.length != 4) {
      throw new TypeError('CSSRotation must have 1 or 4 arguments.');
    }

    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] != 'number') {
        throw new TypeError('CSSRotation arguments must be of type \'number\'.');
      }
    }

    this.is2D = (arguments.length == 1);
    this.angle = this.is2D == 1 ? x : angle;
    this.x = this.is2D ? null : x;
    this.y = this.is2D ? null : y;
    this.z = this.is2D ? null : z;

    this._matrix = computeMatrix(this);
    this.cssText = generateCssString(this);
  }
  internal.inherit(CSSRotation, internal.CSSTransformComponent);

  CSSRotation.prototype.asMatrix = function() {
    return this._matrix;
  };

  scope.CSSRotation = CSSRotation;

})(typedOM.internal, window);
