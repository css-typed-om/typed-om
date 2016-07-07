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
});
