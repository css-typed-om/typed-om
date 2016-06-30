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

(function(internal, testing) {
  // This file provides a stub for DOMMatrixReadonly, which doesn't exist generally yet. It does
  // not provide full functionality as per the spec:
  // https://drafts.fxtf.org/geometry-1/#dommatrixreadonly
  //
  // Note: The matrix is stored and referenced in column-major order.
  function DOMMatrixReadonly(sequence) {
    if (sequence.length != 6 && sequence.length != 16) {
      throw new TypeError('Expecting 6 or 16 entries.');
    }
    for (var index = 0; index < sequence.length; index++) {
      if (typeof sequence[index] != 'number') {
        throw new TypeError('Argument at index ' + index +
            ' is not of type \'number\'.');
      }
    }
    if (sequence.length == 6) {
      this.m11 = sequence[0];
      this.m12 = sequence[1];
      this.m13 = 0;
      this.m14 = 0;
      this.m21 = sequence[2];
      this.m22 = sequence[3];
      this.m23 = 0;
      this.m24 = 0;
      this.m31 = 0;
      this.m32 = 0;
      this.m33 = 1;
      this.m34 = 0;
      this.m41 = sequence[4];
      this.m42 = sequence[5];
      this.m43 = 0;
      this.m44 = 1;
    } else {
      this.m11 = sequence[0];
      this.m12 = sequence[1];
      this.m13 = sequence[2];
      this.m14 = sequence[3];
      this.m21 = sequence[4];
      this.m22 = sequence[5];
      this.m23 = sequence[6];
      this.m24 = sequence[7];
      this.m31 = sequence[8];
      this.m32 = sequence[9];
      this.m33 = sequence[10];
      this.m34 = sequence[11];
      this.m41 = sequence[12];
      this.m42 = sequence[13];
      this.m43 = sequence[14];
      this.m44 = sequence[15];
    }
    this.a = this.m11;
    this.b = this.m12;
    this.c = this.m21;
    this.d = this.m22;
    this.e = this.m41;
    this.f = this.m42;

    this._matrix = sequence;
    this.is2D = sequence.length == 6;
  }

  DOMMatrixReadonly.prototype.multiply = function(rightMatrix) {
    if (!(rightMatrix instanceof DOMMatrixReadonly)) {
      throw new TypeError('Expected a single argument of type DOMMatrixReadonly');
    }

    if (this.is2D && rightMatrix.is2D) {
      return multiply2DMatrices(this, rightMatrix);
    }

    var leftMatrix = to3D(this);
    var rightMatrix = to3D(rightMatrix);
    return multiply3DMatrices(leftMatrix, rightMatrix);
  };

  function multiply2DMatrices(left, right) {
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

    return new DOMMatrixReadonly([result[0], result[1], result[2], result[3], result[4],
        result[5]]);
  };

  function multiply3DMatrices(left, right) {
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

    return new DOMMatrixReadonly([result[0], result[1], result[2], result[3], result[4],
        result[5], result[6], result[7], result[8], result[9], result[10],
        result[11], result[12], result[13], result[14], result[15]]);
  };

  function to3D(matrix) {
    if (!matrix.is2D) {
      return matrix;
    }

    var a = matrix._matrix[0];
    var b = matrix._matrix[1];
    var c = matrix._matrix[2];
    var d = matrix._matrix[3];
    var e = matrix._matrix[4];
    var f = matrix._matrix[5];
    // See documentation http://www.w3.org/TR/css3-transforms/#MatrixDefined.
    return new DOMMatrixReadonly([a, b, 0, 0,
                      c, d, 0, 0,
                      0, 0, 1, 0,
                      e, f, 0, 1]);
  };

  function matricesApproxEqual(matrix1, matrix2) {
    var EPSILON = 1e-6;
    assert.closeTo(matrix1.m11, matrix2.m11, EPSILON);
    assert.closeTo(matrix1.m12, matrix2.m12, EPSILON);
    assert.closeTo(matrix1.m13, matrix2.m13, EPSILON);
    assert.closeTo(matrix1.m14, matrix2.m14, EPSILON);
    assert.closeTo(matrix1.m21, matrix2.m21, EPSILON);
    assert.closeTo(matrix1.m22, matrix2.m22, EPSILON);
    assert.closeTo(matrix1.m23, matrix2.m23, EPSILON);
    assert.closeTo(matrix1.m24, matrix2.m24, EPSILON);
    assert.closeTo(matrix1.m31, matrix2.m31, EPSILON);
    assert.closeTo(matrix1.m32, matrix2.m32, EPSILON);
    assert.closeTo(matrix1.m33, matrix2.m33, EPSILON);
    assert.closeTo(matrix1.m34, matrix2.m34, EPSILON);
    assert.closeTo(matrix1.m41, matrix2.m41, EPSILON);
    assert.closeTo(matrix1.m42, matrix2.m42, EPSILON);
    assert.closeTo(matrix1.m43, matrix2.m43, EPSILON);
    assert.closeTo(matrix1.m44, matrix2.m44, EPSILON);
  }

  internal.DOMMatrixReadonly = DOMMatrixReadonly;
  if (TYPED_OM_TESTING) {
    testing.DOMMatrixReadonly = DOMMatrixReadonly;
    testing.matricesApproxEqual = matricesApproxEqual;
  }

})(typedOM.internal, typedOMTesting);
