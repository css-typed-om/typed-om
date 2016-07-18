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
});
