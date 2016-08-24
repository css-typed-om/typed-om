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
    var halfRadians = cssRotation.angle.degrees * Math.PI / 360;
    var sc = Math.sin(halfRadians) * Math.cos(halfRadians);
    var sq = Math.sin(halfRadians) * Math.sin(halfRadians);

    var matrix;
    if (cssRotation.x == null) {
      matrix = new DOMMatrixReadonly([
          1 - 2 * sq, 2 * sc, -2 * sc, 1 - 2 * sq, 0, 0]);
    } else {
      // Normalize the [x, y, z] vector
      var lengthSqrd = cssRotation.x * cssRotation.x +
          cssRotation.y * cssRotation.y +
          cssRotation.z * cssRotation.z;
      var scale = (lengthSqrd == 0) ? 0 : 1 / Math.sqrt(lengthSqrd);
      var x = cssRotation.x * scale;
      var y = cssRotation.y * scale;
      var z = cssRotation.z * scale;

      matrix = new DOMMatrixReadonly([
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
          0, 0, 0, 0, 1]);
    }
    return matrix;
  };

  function generateCssString(cssRotation) {
    switch (cssRotation._inputType) {
      case '2d':
        return 'rotate(' + cssRotation.angle.cssText + ')';
      case '3d':
        return 'rotate3d(' + cssRotation.x +
          ', ' + cssRotation.y +
          ', ' + cssRotation.z +
          ', ' + cssRotation.angle.cssText + ')';
      case 'x':
        return 'rotatex(' + cssRotation.angle.cssText + ')';
      case 'y':
        return 'rotatey(' + cssRotation.angle.cssText + ')';
      case 'z':
        return 'rotatez(' + cssRotation.angle.cssText + ')';
    }
  };


  function CSSRotation(x, y, z, angle) {
    if (arguments.length != 1 && arguments.length != 4) {
      throw new TypeError('CSSRotation must have 1 or 4 arguments.');
    }
    if (arguments.length == 1 && !(x instanceof CSSAngleValue)) {
      throw new TypeError('CSSRotation angle argument must be a CSSAngleValue.');
    }
    if (arguments.length == 4) {
      if (typeof x != 'number' || typeof y != 'number' || typeof z != 'number') {
        throw new TypeError('x, y and z values must be numbers.');
      }
      if (!(angle instanceof CSSAngleValue)) {
        throw new TypeError('CSSRotation angle argument must be a CSSAngleValue.');
      }
    }

    this.is2D = (arguments.length == 1);
    this.x = this.is2D ? null : x;
    this.y = this.is2D ? null : y;
    this.z = this.is2D ? null : z;
    this._inputType = this.is2D ? '2d' : '3d';
    this.angle = this.is2D ? x : angle;

    this.matrix = computeMatrix(this);
    Object.defineProperty(this, 'cssText', {
      get: function() {
        if (!this._cssText) {
          this._cssText = generateCssString(this);
        }
        return this._cssText;
      },
      set: function(newCssText) {}
    });
  }
  internal.inherit(CSSRotation, internal.CSSTransformComponent);

  scope.CSSRotation = CSSRotation;

})(typedOM.internal, window);
