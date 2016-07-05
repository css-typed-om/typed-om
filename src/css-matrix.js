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

  // Note: A CSSMatrix is stored and referenced in column-major order.
  // TODO: Update the names of parameters (a, b, ... , p) once they are changed
  // in the specifications and add getters for these parameters.
  function CSSMatrix(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    if (arguments.length != 6 && arguments.length != 16) {
      throw new TypeError('Expecting 6 or 16 arguments.');
    }

    this._matrix = [];
    for (var index = 0; index < arguments.length; index++) {
      if (typeof arguments[index] != 'number') {
        throw new TypeError('Argument at index ' + index +
            ' is not of type \'number\'.');
      }
      this._matrix[index] = arguments[index];
    }

    this.cssText = this._generateCssString();
  }
  internal.inherit(CSSMatrix, internal.CSSTransformComponent);

  CSSMatrix._multiply2DMatrices = function(left, right) {
    var result = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 2; j++) {
        var value = left._matrix[j]*right._matrix[2*i] +
            left._matrix[j + 2]*right._matrix[2*i + 1];
        if (i == 2) {
          value += left._matrix[2*i + j];
        }
        result[j + 2*i] = value;
      }
    }

    return new CSSMatrix(result[0], result[1], result[2], result[3], result[4],
        result[5]);
  };

  CSSMatrix._multiply3DMatrices = function(left, right) {
    var result = [];
    var length = 4;

    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length; j++) {
        var value = 0;
        for (var k = 0; k < length; k++) {
          value += left._matrix[j + k*length]*right._matrix[i*length + k];
        }
        result[i*length + j] = value;
      }
    }

    return new CSSMatrix(result[0], result[1], result[2], result[3], result[4],
        result[5], result[6], result[7], result[8], result[9], result[10],
        result[11], result[12], result[13], result[14], result[15]);
  };

  CSSMatrix.prototype.asMatrix = function() {
    return this;
  };

  CSSMatrix.prototype.is2D = function() {
    return this._matrix.length == 6;
  };

  CSSMatrix.prototype.multiply = function(rightMatrix) {
    if (!(rightMatrix instanceof CSSMatrix)) {
      throw new TypeError('Expected a single argument of type CSSMatrix');
    }

    if (this.is2D() && rightMatrix.is2D()) {
      return CSSMatrix._multiply2DMatrices(this, rightMatrix);
    }

    var leftMatrix = this.to3DComponent();
    var rightMatrix = rightMatrix.to3DComponent();
    return CSSMatrix._multiply3DMatrices(leftMatrix, rightMatrix);
  };

  CSSMatrix.prototype.to3DComponent = function() {
    if (!this.is2D()) {
      return this;
    }

    var a = this._matrix[0];
    var b = this._matrix[1];
    var c = this._matrix[2];
    var d = this._matrix[3];
    var e = this._matrix[4];
    var f = this._matrix[5];
    // See documentation http://www.w3.org/TR/css3-transforms/#MatrixDefined.
    return new CSSMatrix(a, b, 0, 0,
                      c, d, 0, 0,
                      0, 0, 1, 0,
                      e, f, 0, 1);
  };

  CSSMatrix.prototype._generateCssString = function() {
    var cssText = this.is2D() ? 'matrix' : 'matrix3d';
    cssText += '('+ this._matrix.join(', ') + ')';
    return cssText;
  };

  scope.CSSMatrix = CSSMatrix;

})(typedOM.internal, window);
