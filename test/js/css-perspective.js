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

suite('CSSPerspective', function() {
  test('CSSPerspective is a CSSPerspective and CSSTransformComponent', function() {
    var perspective = new CSSPerspective(new CSSSimpleLength(10, 'px'));
    assert.instanceOf(perspective, CSSPerspective);
    assert.instanceOf(perspective, typedOM.internal.CSSTransformComponent);
  });

  test('CSSPerspective constructor throws exception for invalid types',
        function() {
    assert.throws(function() {new CSSPerspective()});
    assert.throws(function() {new CSSPerspective({})});
    assert.throws(function() {new CSSPerspective(null)});
    assert.throws(function() {new CSSPerspective(1)});
    assert.throws(function() {new CSSPerspective('1px')});
  });

  test('CSSPerspective constructor throws exception for invalid CSSLengthValues',
        function() {
    // CSSPerspective length must be a CSSSimpleLength with type 'px'.
    assert.throws(function() {new CSSPerspective(new CSSSimpleLength(-10, 'em'))});
    assert.throws(function() {new CSSPerspective(new CSSCalcLength({px: 10}))});

    // CSSPerspective length must be strictly positive.
    assert.throws(function() {new CSSPerspective(new CSSSimpleLength(0, 'px'))});
    assert.throws(function() {new CSSPerspective(new CSSSimpleLength(-10, 'px'))});
  });

  test('CSSPerspective constructor works correctly for valid length', function() {
    var perspective;
    var length = new CSSSimpleLength(10, 'px');
    assert.doesNotThrow(function() {perspective = new CSSPerspective(length)});
    assert.strictEqual(perspective.cssText,
        'perspective(' + length.cssText + ')');
    assert.strictEqual(perspective.length.value, 10);
    assert.deepEqual(perspective.length, length);
    assert.isFalse(perspective.is2D);

    var expectedMatrix = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.1, 0, 0, 0, 1]);
    typedOM.internal.testing.matricesApproxEqual(perspective.matrix, expectedMatrix);
  });

  test('Parsing valid strings results in correct values', function() {
    var values = [
      {str: 'perspective(2.6px)', l: new CSSSimpleLength(2.6, 'px'), remaining: ''}, 
      {str: 'PERSPECTIVE(2.6PX) bananas', l: new CSSSimpleLength(2.6, 'px'), remaining: 'bananas'}, 
    ]
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumePerspective(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse a CSSPerspective');
      assert.strictEqual(parsed[1], values[i].remaining);
      assert.instanceOf(parsed[0], CSSPerspective);
      assert.strictEqual(parsed[0].length.value, values[i].l.value);
      assert.strictEqual(parsed[0].length.type, values[i].l.type);
    }
  });

  test('Parsing invalid strings results in null', function() {
    var consumePerspective = typedOM.internal.parsing.consumePerspective;
    assert.isNull(consumePerspective(''));
    assert.isNull(consumePerspective('bananas'));
    assert.isNull(consumePerspective('perspective()'));
    assert.isNull(consumePerspective('perspective(5)')); // Missing unit.
    assert.isNull(consumePerspective('perspective(5ab)')); // Invalid unit.
    // Valid length unit that is invalid for perspective.
    assert.isNull(consumePerspective('perspective(5%)'));
    assert.isNull(consumePerspective('perspective(5px, 6px)')); // Too many args.
    assert.isNull(consumePerspective('perspective(5px')); // Missing bracket.
    assert.isNull(consumePerspective('perspectiveY(5px)')); // Invalid keyword.
  });
});
