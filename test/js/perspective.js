suite('Perspective', function() {
  test('Perspective is a Perspective and TransformComponent', function() {
    var perspective = new Perspective(new SimpleLength(10, 'px'));
    assert.instanceOf(perspective, Perspective,
        'A new Perspective should be an instance of Perspective');
    assert.instanceOf(perspective, TransformComponent,
        'A new Perspective should be an instance of TransformComponent');
  });

  test('Perspective constructor throws exception for invalid types',
        function() {
    assert.throws(function() {new Perspective()});
    assert.throws(function() {new Perspective({})});
    assert.throws(function() {new Perspective(null)});
    assert.throws(function() {new Perspective(1)});
    assert.throws(function() {new Perspective('1px')});
  });

  test('Perspective constructor throws exception for invalid LengthValues',
        function() {
    // Perspective length must be a SimpleLength with type 'px'.
    assert.throws(function() {new Perspective(new SimpleLength(-10, 'em'))});
    assert.throws(function() {new Perspective(new CalcLength({px: 10}))});

    // Perspective length must be strictly positive.
    assert.throws(function() {new Perspective(new SimpleLength(0, 'px'))});
    assert.throws(function() {new Perspective(new SimpleLength(-10, 'px'))});
  });

  test('Perspective constructor works correctly for valid length', function() {
    var perspective;
    var length = new SimpleLength(10, 'px');
    assert.doesNotThrow(function() {perspective = new Perspective(length)});
    assert.strictEqual(perspective.cssString,
        'perspective(' + length.cssString + ')');
    assert.strictEqual(perspective.length.value, 10);
    assert.deepEqual(perspective.length, length);
    assert.isFalse(perspective.is2DComponent());

    var expectedMatrix = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.1, 0, 0,
        0, 1);
    assert.strictEqual(perspective.asMatrix().cssString,
        expectedMatrix.cssString);
    assert.deepEqual(perspective.asMatrix(), expectedMatrix);
  });
});
