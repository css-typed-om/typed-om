suite('Scale', function() {
  test('Scale is a Scale and TransformComponent', function() {
    var scale = new Scale(1, 2);
    assert.instanceOf(scale, Scale,
        'A new Scale should be an instance of Scale');
    assert.instanceOf(scale, TransformComponent,
        'A new Scale should be an instance of TransformComponent');
  });

  test('Scale constructor throws exception for invalid types', function() {
    assert.throws(function() {new Scale()});
    assert.throws(function() {new Scale({})});
    assert.throws(function() {new Scale(1)});
    assert.throws(function() {new Scale('1', '2')});
    assert.throws(function() {new Scale(3, 4, null)});
    assert.throws(function() {new Scale({x:1, y:2, z:4})});
  });

  test('Scale constructor works correctly for 2 arguments', function() {
    var scale;
    assert.doesNotThrow(function() {scale = new Scale(3, -1)});
    assert.strictEqual(scale.cssString, 'scale(3, -1)');
    assert.strictEqual(scale.x, 3);
    assert.strictEqual(scale.y, -1);
    assert.isNull(scale.z);
    assert.isTrue(scale.is2DComponent());

    var expectedMatrix = new Matrix(3, 0, 0, -1, 0, 0);
    assert.strictEqual(scale.asMatrix().cssString, expectedMatrix.cssString);
    assert.deepEqual(scale.asMatrix(), expectedMatrix);
  });

  test('Scale constructor works correctly for 3 arguments', function() {
    var scale;
    assert.doesNotThrow(function() {scale = new Scale(3, 0.5, -4)});
    assert.strictEqual(scale.cssString, 'scale3d(3, 0.5, -4)');
    assert.strictEqual(scale.x, 3);
    assert.strictEqual(scale.y, 0.5);
    assert.strictEqual(scale.z, -4);
    assert.isFalse(scale.is2DComponent());

    var expectedMatrix = new Matrix(3, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, -4, 0, 0, 0,
        0, 1);
    assert.strictEqual(scale.asMatrix().cssString, expectedMatrix.cssString);
    assert.deepEqual(scale.asMatrix(), expectedMatrix);
  });
});
