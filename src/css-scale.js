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

  function computeMatrix(cssScale) {
    var matrix;
    if (cssScale.z == null) {
      matrix = new CSSMatrix(new DOMMatrixReadonly([cssScale.x, 0, 0, cssScale.y, 0, 0]));
    } else {
      matrix = new CSSMatrix(new DOMMatrixReadonly([cssScale.x, 0, 0, 0, 0, cssScale.y, 0, 0, 0, 0, cssScale.z, 0, 0,
          0, 0, 1]));
    }
    return matrix;
  };

  function generateCssString(cssScale) {
    var cssText;
    if (cssScale.is2D) {
      cssText = 'scale(' + cssScale.x + ', ' + cssScale.y + ')';
    } else {
      cssText = 'scale3d(' + cssScale.x + ', ' + cssScale.y + ', ' + cssScale.z + ')';
    }
    return cssText;
  };

  function CSSScale(x, y, z) {
    if (arguments.length != 2 && arguments.length != 3) {
      throw new TypeError('CSSScale must have 2 or 3 arguments.');
    }

    for (var index = 0; index < arguments.length; index++) {
      if (typeof arguments[index] != 'number') {
        throw new TypeError('CSSScale arguments must be of type \'number\'.');
      }
    }

    this.x = x;
    this.y = y;
    this.z = (typeof z == 'number') ? z : null;

    this._matrix = computeMatrix(this);
    this.is2D = this._matrix.is2D;
    this.cssText = generateCssString(this);
  }
  internal.inherit(CSSScale, internal.CSSTransformComponent);

  CSSScale.prototype.asMatrix = function() {
    return this._matrix;
  };

  scope.CSSScale = CSSScale;

})(typedOM.internal, window);
