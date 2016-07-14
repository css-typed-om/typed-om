suite('CSSRotation', function() {
  function assertMatrixCloseTo(actualMatrix, expectedMatrix) {
    var delta = 0.000001;
    assert.strictEqual(actualMatrix.is2D, expectedMatrix.is2D);
    for (var i = 0; i < expectedMatrix._matrix.length; i++) {
      assert.closeTo(actualMatrix._matrix[i], expectedMatrix._matrix[i], delta);
    }
  }

  test('CSSRotation is a CSSRotation and CSSTransformComponent', function() {
    var rotation = new CSSRotation(45);
    assert.instanceOf(rotation, CSSRotation,
        'A new CSSRotation should be an instance of CSSRotation');
    assert.instanceOf(rotation, typedOM.internal.CSSTransformComponent,
        'A new CSSRotation should be an instance of CSSTransformComponent');
  });

  test('CSSRotation constructor throws exception for invalid types', function() {
    assert.throws(function() {new CSSRotation()});
    assert.throws(function() {new CSSRotation({})});
    assert.throws(function() {new CSSRotation(1, 2)});
    assert.throws(function() {new CSSRotation(1, 2, 3)});
    assert.throws(function() {new CSSRotation(1, 2, 3, 4, 5)});
    assert.throws(function() {new CSSRotation('1')});
    assert.throws(function() {new CSSRotation(null)});
  });

  test('CSSRotation constructor works correctly for 1 argument', function() {
    var rotation;
    assert.doesNotThrow(function() {rotation = new CSSRotation(60)});
    assert.strictEqual(rotation.cssText, 'rotate(60deg)');
    assert.strictEqual(rotation.angle, 60);
    assert.isNull(rotation.x);
    assert.isNull(rotation.y);
    assert.isNull(rotation.z);
    assert.isTrue(rotation.is2D);

    var sinCos = Math.sqrt(3) / 4;
    var expectedMatrix = new DOMMatrixReadonly([0.5, 2 * sinCos, -2 * sinCos, 0.5, 0, 0]);
    typedOM.internal.testing.matricesApproxEqual(rotation.asMatrix().matrix, expectedMatrix);
  });

  test('CSSRotation constructor works correctly for 4 arguments', function() {
    var rotation;
    assert.doesNotThrow(function() {rotation = new CSSRotation(1, 0.5, -2, 30)});
    assert.strictEqual(rotation.cssText, 'rotate3d(1, 0.5, -2, 30deg)');
    assert.strictEqual(rotation.angle, 30);
    assert.strictEqual(rotation.x, 1);
    assert.strictEqual(rotation.y, 0.5);
    assert.strictEqual(rotation.z, -2);
    assert.isFalse(rotation.is2D);

    var expectedMatrix = new DOMMatrixReadonly([0.89154437, -0.42367629, -0.16014688, 0,
        0.44919526, 0.872405146, 0.19269891, 0, 0.05807100, -0.243736860,
        0.96810128, 0, 0, 0, 0, 1]);
    typedOM.internal.testing.matricesApproxEqual(rotation.asMatrix().matrix, expectedMatrix);
  });

  test('CSSRotation matrix with angle 0 is the identity', function() {
    var rotation2D = new CSSRotation(0);
    var expected2D = new DOMMatrixReadonly([1, 0, 0, 1, 0, 0]);
    typedOM.internal.testing.matricesApproxEqual(rotation2D.asMatrix().matrix, expected2D);

    var rotation3D = new CSSRotation(20, -5, 10, 0);
    var expected3D = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    typedOM.internal.testing.matricesApproxEqual(rotation3D.asMatrix().matrix, expected3D);
  });

  test('CSSRotation matrix with x, y, and z all 0 is the identity', function() {
    var rotation = new CSSRotation(0, 0, 0, 45);
    var expectedMatrix = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        1]);
    typedOM.internal.testing.matricesApproxEqual(rotation.asMatrix().matrix, expectedMatrix);
  });

  test('CSSRotation(angle) equivalent to CSSRotation(angle, 0, 0, 1)', function() {
    var rotation2D = new CSSRotation(30);
    var rotation3D = new CSSRotation(0, 0, 1, 30);
    assert.isTrue(rotation2D.is2D);
    assert.isFalse(rotation3D.is2D);
    typedOM.internal.testing.matricesApproxEqual(rotation3D.asMatrix().matrix, rotation2D.asMatrix().matrix);
  });

  test('CSSRotation 3D is normalizing (x, y, z)', function() {
    var rotation = new CSSRotation(1, -2, 4, 30);
    var rotationScaled = new CSSRotation(10, -20, 40, 30);
    typedOM.internal.testing.matricesApproxEqual(rotationScaled.asMatrix().matrix, rotation.asMatrix().matrix);
  });
});
