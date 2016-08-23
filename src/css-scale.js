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
      matrix = new DOMMatrixReadonly([cssScale.x, 0, 0, cssScale.y, 0, 0]);
    } else {
      matrix = new DOMMatrixReadonly([
          cssScale.x, 0, 0, 0,
          0, cssScale.y, 0, 0,
          0, 0, cssScale.z, 0,
          0, 0, 0, 1]);
    }
    return matrix;
  };

  function generateCssString(cssScale) {
    switch (cssScale._inputType) {
      case '1':
        return 'scale(' + cssScale.x + ')';
      case '2':
        return 'scale(' + cssScale.x + ', ' + cssScale.y + ')';
      case '3':
        return 'scale3d('
          + cssScale.x + ', '
          + cssScale.y + ', '
          + cssScale.z + ')';
      case 'x':
        return 'scalex(' + cssScale.x + ')';
      case 'y':
        return 'scaley(' + cssScale.y + ')';
      case 'z':
        return 'scalez(' + cssScale.z + ')';
    }
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
    if (typeof z == 'number') {
      this.z = z;
      this._inputType = '3';
    } else {
      this.z = null;
      this._inputType = '2';
    }

    this.matrix = computeMatrix(this);
    this.is2D = this.matrix.is2D;
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
  internal.inherit(CSSScale, internal.CSSTransformComponent);

  scope.CSSScale = CSSScale;

})(typedOM.internal, window);
