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
    if(cssScale.is2D) {
      return 'scale('
        + cssScale.x + ', '
        + cssScale.y + ')';
    } else {
      return 'scale3d('
        + cssScale.x + ', '
        + cssScale.y + ', '
        + cssScale.z + ')';
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
    this.z = (typeof z == 'number') ? z : null;

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

  // These functions (cssScaleFromScale*) are for making CSSScales from parsed CSS
  // Strings. These are needed for setting the cssText.
  function cssScaleFromScale(numbers, string, remaining) {
    if (numbers.length == 1) {
      var result = [new CSSScale(numbers[0], numbers[0]), remaining];
      result[0]._cssText = string;
      return result;
    }
    if (numbers.length == 2) {
      var result = [new CSSScale(numbers[0], numbers[1]), remaining];
      result[0]._cssText = string;
      return result;
    }
    return null;
  }

  function cssScaleFromScale3d(numbers, string, remaining) {
    if (numbers.length != 3) {
      return null;
    }
    var result = [new CSSScale(numbers[0], numbers[1], numbers[2]), remaining];
    result[0]._cssText = string;;
    return result;
  }

  function cssScaleFromScaleX(numbers, string, remaining) {
    if (numbers.length != 1) {
      return null;
    }
    var result = [new CSSScale(numbers[0], 1), remaining];
    result[0]._cssText = string;
    return result;
  }

  function cssScaleFromScaleY(numbers, string, remaining) {
    if (numbers.length != 1) {
      return null;
    }
      var result = [new CSSScale(1, numbers[0]), remaining];
      result[0]._cssText = string;
      return result;
  }

  function cssScaleFromScaleZ(numbers, string, remaining) {
    if (numbers.length != 1) {
      return null;
    }
      var result = [new CSSScale(1, 1, numbers[0]), remaining];
      result[0]._cssText = string;
      return result;
  }

  internal.cssScaleFromScale = cssScaleFromScale;
  internal.cssScaleFromScale3d = cssScaleFromScale3d;
  internal.cssScaleFromScaleX = cssScaleFromScaleX;
  internal.cssScaleFromScaleY = cssScaleFromScaleY;
  internal.cssScaleFromScaleZ = cssScaleFromScaleZ;

  scope.CSSScale = CSSScale;

})(typedOM.internal, window);
