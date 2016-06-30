suite('CSSRotation', function() {

  test('CSSRotation is a CSSRotation and CSSTransformComponent', function() {
    var rotation = new CSSRotation(45);
    assert.instanceOf(rotation, CSSRotation,
        'A new CSSRotation should be an instance of CSSRotation');
    assert.instanceOf(rotation, CSSTransformComponent,
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
    assert.strictEqual(rotation.cssString, 'rotate(60deg)');
    assert.strictEqual(rotation.angle, 60);
    assert.isNull(rotation.x);
    assert.isNull(rotation.y);
    assert.isNull(rotation.z);
    assert.isTrue(rotation.is2DComponent());

    var sinCos = Math.sqrt(3) / 4;
    var expectedMatrix = new DOMMatrixReadonly([0.5, 2 * sinCos, -2 * sinCos, 0.5, 0, 0]);
    matricesApproxEqual(rotation.asMatrix().matrix, expectedMatrix);
  });

  test('CSSRotation constructor works correctly for 4 arguments', function() {
    var rotation;
    assert.doesNotThrow(function() {rotation = new CSSRotation(30, 1, 0.5, -2)});
    assert.strictEqual(rotation.cssString, 'rotate3d(1, 0.5, -2, 30deg)');
    assert.strictEqual(rotation.angle, 30);
    assert.strictEqual(rotation.x, 1);
    assert.strictEqual(rotation.y, 0.5);
    assert.strictEqual(rotation.z, -2);
    assert.isFalse(rotation.is2DComponent());

    var expectedMatrix = new DOMMatrixReadonly([0.89154437, -0.42367629, -0.16014688, 0,
        0.44919526, 0.872405146, 0.19269891, 0, 0.05807100, -0.243736860,
        0.96810128, 0, 0, 0, 0, 1]);
    matricesApproxEqual(rotation.asMatrix().matrix, expectedMatrix);
  });

  test('CSSRotation matrix with angle 0 is the identity', function() {
    var rotation2D = new CSSRotation(0);
    var expected2D = new DOMMatrixReadonly([1, 0, 0, 1, 0, 0]);
    matricesApproxEqual(rotation2D.asMatrix().matrix, expected2D);

    var rotation3D = new CSSRotation(0, 20, -5, 10);
    var expected3D = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    matricesApproxEqual(rotation3D.asMatrix().matrix, expected3D);
  });

  test('CSSRotation matrix with x, y, and z all 0 is the identity', function() {
    var rotation = new CSSRotation(45, 0, 0, 0);
    var expectedMatrix = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        1]);
    matricesApproxEqual(rotation.asMatrix().matrix, expectedMatrix);
  });

  test('CSSRotation(angle) equivalent to CSSRotation(angle, 0, 0, 1)', function() {
    var rotation2D = new CSSRotation(30);
    var rotation3D = new CSSRotation(30, 0, 0, 1);
    assert.isTrue(rotation2D.is2DComponent());
    assert.isFalse(rotation3D.is2DComponent());
    matricesApproxEqual(rotation3D.asMatrix().matrix, rotation2D.asMatrix().matrix);
  });

  test('CSSRotation 3D is normalizing (x, y, z)', function() {
    var rotation = new CSSRotation(30, 1, -2, 4);
    var rotationScaled = new CSSRotation(30, 10, -20, 40);
    matricesApproxEqual(rotationScaled.asMatrix().matrix, rotation.asMatrix().matrix);
  });
});
