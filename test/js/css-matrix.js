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
suite('CSSMatrix', function() {
  test('cssText is correct', function() {
    var matrix2d = new CSSMatrix(new DOMMatrixReadonly([1, 2, 3, 4, 5, 6]));
    var matrix3d = new CSSMatrix(new DOMMatrixReadonly([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]));

    assert.strictEqual(matrix2d.cssText, 'matrix(1, 2, 3, 4, 5, 6)');
    assert.strictEqual(matrix3d.cssText, 'matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)');
  });

  test('Parsing matrices', function() {
    var values = [
    {
      str: 'matrix(1,2,3,4,5,.6)',
      matrix: new DOMMatrixReadonly([1, 2, 3, 4, 5, 0.6]),
      remaining: ''
    },
    {
      str: 'matrix3d(1, 2, 3, 4, 5, 6, 7, 8.6, 9, 10, 11, 12, 13, 14, 15, 16)',
      matrix: new DOMMatrixReadonly([1, 2, 3, 4, 5, 6, 7, 8.6, 9, 10, 11, 12, 13, 14, 15, 16]),
      remaining: ''
    },
    // Parsing should be case insensitive. Trailing characters should be returned.
    {
      str: 'MatRiX(1,2,3,4,5,6)abc',
      matrix: new DOMMatrixReadonly([1,2,3,4,5,6]),
      remaining: 'abc'
    },
    {
      str: 'matrIx3D(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16) 124',
      matrix: new DOMMatrixReadonly([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
      remaining: '124'
    }];
    for (var i = 0; i < values.length; i++) {
      var result = typedOM.internal.parsing.consumeMatrix(values[i].str);
      assert.isNotNull(result, values[i].str + ' should parse into a CSSMatrix');
      assert.instanceOf(result[0], CSSMatrix);
      assert.strictEqual(result[1], values[i].remaining);
      typedOM.internal.testing.matricesApproxEqual(result[0].matrix, values[i].matrix);
    }
  });

  test('Parsing matrices fails with invalid strings', function() {
    assert.isNull(typedOM.internal.parsing.consumeMatrix(''));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('bananas'));
    // Missing characters
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix(1,2,3,4,5,6'));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matri(1,2,3,4,5,6)'));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix3(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16)'));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix3d(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16'));
    // Incorrect number of numbers
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix()'));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix(1,2,3,4,5,6,7)'));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix(1,2,3,4,5)'));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix3d()'));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix3d(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17)'));
    assert.isNull(typedOM.internal.parsing.consumeMatrix('matrix3d(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)'));
  });
});
