suite('Rotation', function() {
  function assertMatrixCloseTo(actualMatrix, expectedMatrix) {
    var delta = 0.000001;
    assert.strictEqual(actualMatrix.is2DComponent(),
        expectedMatrix.is2DComponent());
    for (var i = 0; i < expectedMatrix._matrix.length; i++) {
      assert.closeTo(actualMatrix._matrix[i], expectedMatrix._matrix[i], delta);
    }
  }

  test('Rotation is a Rotation and TransformComponent', function() {
    var rotation = new Rotation(45);
    assert.instanceOf(rotation, Rotation,
        'A new Rotation should be an instance of Rotation');
    assert.instanceOf(rotation, TransformComponent,
        'A new Rotation should be an instance of TransformComponent');
  });

  test('Rotation constructor throws exception for invalid types', function() {
    assert.throws(function() {new Rotation()});
    assert.throws(function() {new Rotation({})});
    assert.throws(function() {new Rotation(1, 2)});
    assert.throws(function() {new Rotation(1, 2, 3)});
    assert.throws(function() {new Rotation(1, 2, 3, 4, 5)});
    assert.throws(function() {new Rotation('1')});
    assert.throws(function() {new Rotation(null)});
  });

  test('Rotation constructor works correctly for 1 argument', function() {
    var rotation;
    assert.doesNotThrow(function() {rotation = new Rotation(60)});
    assert.strictEqual(rotation.cssString, 'rotate(60deg)');
    assert.strictEqual(rotation.angle, 60);
    assert.isNull(rotation.x);
    assert.isNull(rotation.y);
    assert.isNull(rotation.z);
    assert.isTrue(rotation.is2DComponent());

    var sinCos = Math.sqrt(3) / 4;
    var expectedMatrix = new Matrix(0.5, 2 * sinCos, -2 * sinCos, 0.5, 0, 0);
    assertMatrixCloseTo(rotation.asMatrix(), expectedMatrix);
  });

  test('Rotation constructor works correctly for 4 arguments', function() {
    var rotation;
    assert.doesNotThrow(function() {rotation = new Rotation(30, 1, 0.5, -2)});
    assert.strictEqual(rotation.cssString, 'rotate3d(1, 0.5, -2, 30deg)');
    assert.strictEqual(rotation.angle, 30);
    assert.strictEqual(rotation.x, 1);
    assert.strictEqual(rotation.y, 0.5);
    assert.strictEqual(rotation.z, -2);
    assert.isFalse(rotation.is2DComponent());

    var expectedMatrix = new Matrix(0.89154437, -0.42367629, -0.16014688, 0,
        0.44919526, 0.872405146, 0.19269891, 0, 0.05807100, -0.243736860,
        0.96810128, 0, 0, 0, 0, 1);
    assertMatrixCloseTo(rotation.asMatrix(), expectedMatrix);
  });

  test('Rotation matrix with angle 0 is the identity', function() {
    var rotation2D = new Rotation(0);
    var expected2D = new Matrix(1, 0, 0, 1, 0, 0);
    assertMatrixCloseTo(rotation2D.asMatrix(), expected2D);

    var rotation3D = new Rotation(0, 20, -5, 10);
    var expected3D = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    assertMatrixCloseTo(rotation3D.asMatrix(), expected3D);
  });

  test('Rotation matrix with x, y, and z all 0 is the identity', function() {
    var rotation = new Rotation(45, 0, 0, 0);
    var expectedMatrix = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        1);
    assertMatrixCloseTo(rotation.asMatrix(), expectedMatrix);
  });

  test('Rotation(angle) equivalent to Rotation(angle, 0, 0, 1)', function() {
    var rotation2D = new Rotation(30);
    var rotation3D = new Rotation(30, 0, 0, 1);
    assert.isTrue(rotation2D.is2DComponent());
    assert.isFalse(rotation3D.is2DComponent());
    assertMatrixCloseTo(rotation3D.asMatrix(),
        rotation2D.asMatrix().to3DComponent());
  });

  test('Rotation 3D is normalizing (x, y, z)', function() {
    var rotation = new Rotation(30, 1, -2, 4);
    var rotationScaled = new Rotation(30, 10, -20, 40);
    assertMatrixCloseTo(rotationScaled.asMatrix(), rotation.asMatrix());
  });
});
