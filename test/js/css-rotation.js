suite('CSSRotation', function() {
  function assertMatrixCloseTo(actualMatrix, expectedMatrix) {
    var delta = 0.000001;
    assert.strictEqual(actualMatrix.is2D, expectedMatrix.is2D);
    for (var i = 0; i < expectedMatrix._matrix.length; i++) {
      assert.closeTo(actualMatrix._matrix[i], expectedMatrix._matrix[i], delta);
    }
  }

  test('CSSRotation is a CSSRotation and CSSTransformComponent', function() {
    var rotation = new CSSRotation(new CSSAngleValue(3, 'deg'));
    assert.instanceOf(rotation, CSSRotation);
    assert.instanceOf(rotation, typedOM.internal.CSSTransformComponent);
  });

  test('CSSRotation constructor throws exception for invalid types', function() {
    var argCountErr = /^CSSRotation must have 1 or 4 arguments\./;
    assert.throws(function() {new CSSRotation()}, TypeError, argCountErr);
    assert.throws(function() {new CSSRotation(1, 2)}, TypeError, argCountErr);
    assert.throws(function() {new CSSRotation(1, 2, 3)}, TypeError, argCountErr);
    assert.throws(function() {new CSSRotation(1, 2, 3, 4, 5)}, TypeError, argCountErr);
    var argTypeErr = /^CSSRotation angle argument must be a CSSAngleValue\./;
    assert.throws(function() {new CSSRotation({})}, TypeError, argTypeErr);
    assert.throws(function() {new CSSRotation(1)}, TypeError, argTypeErr);
    assert.throws(function() {new CSSRotation('1')}, TypeError, argTypeErr);
    assert.throws(function() {new CSSRotation(null)}, TypeError, argTypeErr);
    assert.throws(function() {new CSSRotation(1, 2, 3, 4)}, TypeError, argTypeErr);
  });

  test('CSSRotation constructor works correctly for 1 argument', function() {
    var rotation;
    assert.doesNotThrow(function() {rotation = new CSSRotation(new CSSAngleValue(60, 'deg'))});
    assert.strictEqual(rotation.cssText, 'rotate(60deg)');
    assert.strictEqual(rotation.angle._value, 60);
    assert.strictEqual(rotation.angle._unit, 'deg');
    assert.isNull(rotation.x);
    assert.isNull(rotation.y);
    assert.isNull(rotation.z);
    assert.isTrue(rotation.is2D);

    var sinCos = Math.sqrt(3) / 4;
    var expectedMatrix = new DOMMatrixReadonly([0.5, 2 * sinCos, -2 * sinCos, 0.5, 0, 0]);
    typedOM.internal.testing.matricesApproxEqual(rotation.matrix, expectedMatrix);
  });

  test('CSSRotation using CSSAngleValue specified in units other than degrees', function() {
    var rotation = new CSSRotation(new CSSAngleValue(5, 'rad'));
    assert.closeTo(rotation.angle.degrees, 286.478897, 1e-6);
    assert.strictEqual(rotation.angle._value, 5);
    assert.strictEqual(rotation.angle._unit, 'rad');
  });

  test('CSSRotation constructor works correctly for 4 arguments', function() {
    var rotation;
    assert.doesNotThrow(function() {rotation = new CSSRotation(1, 0.5, -2, new CSSAngleValue(0.0833333, 'turn'))});
    assert.strictEqual(rotation.cssText, 'rotate3d(1, 0.5, -2, 0.0833333turn)');
    assert.strictEqual(rotation.angle._value, 0.0833333);
    assert.strictEqual(rotation.angle._unit, 'turn');
    assert.strictEqual(rotation.x, 1);
    assert.strictEqual(rotation.y, 0.5);
    assert.strictEqual(rotation.z, -2);
    assert.isFalse(rotation.is2D);

    var expectedMatrix = new DOMMatrixReadonly([0.89154437, -0.42367629, -0.16014688, 0,
        0.44919526, 0.872405146, 0.19269891, 0, 0.05807100, -0.243736860,
        0.96810128, 0, 0, 0, 0, 1]);
    typedOM.internal.testing.matricesApproxEqual(rotation.matrix, expectedMatrix);
  });

  test('CSSRotation matrix with angle 0 is the identity', function() {
    var rotation2D = new CSSRotation(new CSSAngleValue(0, 'deg'));
    var expected2D = new DOMMatrixReadonly([1, 0, 0, 1, 0, 0]);
    typedOM.internal.testing.matricesApproxEqual(rotation2D.matrix, expected2D);

    var rotation3D = new CSSRotation(20, -5, 10, new CSSAngleValue(0, 'deg'));
    var expected3D = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    typedOM.internal.testing.matricesApproxEqual(rotation3D.matrix, expected3D);
  });

  test('CSSRotation matrix with x, y, and z all 0 is the identity', function() {
    var rotation = new CSSRotation(0, 0, 0, new CSSAngleValue(45, 'deg'));
    var expectedMatrix = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        1]);
    typedOM.internal.testing.matricesApproxEqual(rotation.matrix, expectedMatrix);
  });

  test('CSSRotation(angle) equivalent to CSSRotation(0, 0, 1, angle)', function() {
    var rotation2D = new CSSRotation(new CSSAngleValue(30, 'deg'));
    var rotation3D = new CSSRotation(0, 0, 1, new CSSAngleValue(30, 'deg'));
    assert.isTrue(rotation2D.is2D);
    assert.isFalse(rotation3D.is2D);
    typedOM.internal.testing.matricesApproxEqual(rotation3D.matrix, rotation2D.matrix);
  });

  test('CSSRotation 3D is normalizing (x, y, z)', function() {
    var rotation = new CSSRotation(1, -2, 4, new CSSAngleValue(30, 'deg'));
    var rotationScaled = new CSSRotation(10, -20, 40, new CSSAngleValue(30, 'deg'));
    typedOM.internal.testing.matricesApproxEqual(rotationScaled.matrix, rotation.matrix);
  });

  test('Parsing valid basic strings results in CSSRotation with correct values', function() {
    var values = [
      {str: 'rotate(45deg)', angleValue: 45, angleUnit: 'deg', cssText: 'rotate(45deg)', remaining: ''},
      {str: 'rotate(5rad)', angleValue: 5, angleUnit: 'rad', cssText: 'rotate(5rad)', remaining: ''},
      {str: 'rotate(215grad)', angleValue: 215, angleUnit: 'grad', cssText: 'rotate(215grad)', remaining: ''},
      {str: 'rotate(0.6turn)', angleValue: 0.6, angleUnit: 'turn', cssText: 'rotate(0.6turn)', remaining: ''},
      {str: 'RoTaTe(5dEg)', angleValue: 5, angleUnit: 'deg', cssText: 'rotate(5deg)', remaining: ''},
      {str: 'rOtAtE(4DeG)', angleValue: 4, angleUnit: 'deg', cssText: 'rotate(4deg)', remaining: ''},
      {str: 'rotate(45deg) 123', angleValue: 45, angleUnit: 'deg', cssText: 'rotate(45deg)', remaining: '123'},
      {str: 'rotate(45deg))))', angleValue: 45, angleUnit: 'deg', cssText: 'rotate(45deg)', remaining: ')))'},
    ];
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumeRotation(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse a CSSRotation');
      assert.strictEqual(parsed[1], values[i].remaining, values[i].str + ' expected ' + values[i].remaining + ' as trailing characters');
      assert.instanceOf(parsed[0], CSSRotation);
      assert.isTrue(parsed[0].is2D);
      assert.strictEqual(parsed[0].angle._value, values[i].angleValue);
      assert.strictEqual(parsed[0].angle._unit, values[i].angleUnit);
      assert.strictEqual(parsed[0].cssText, values[i].cssText);
    }
  });

  test('Parsing 3d rotation strings result in CSSRotation with correct values', function() {
    var values = [
      {str: 'rotate3d(1,2,3,60deg)', x: 1, y: 2, z: 3, angleValue: 60, angleUnit: 'deg', cssText: 'rotate3d(1, 2, 3, 60deg)', remaining: ''},
      {str: 'rotate3d(1, 2, 3, 60rad)', x: 1, y: 2, z: 3, angleValue: 60, angleUnit: 'rad', cssText: 'rotate3d(1, 2, 3, 60rad)', remaining: ''},
      {str: 'Rotate3D(1,2,3,60DEG)', x: 1, y: 2, z: 3, angleValue: 60, angleUnit: 'deg', cssText: 'rotate3d(1, 2, 3, 60deg)', remaining: ''},
      {str: 'rotate3d(1,2,3,60deg)123', x: 1, y: 2, z: 3, angleValue: 60, angleUnit: 'deg', cssText: 'rotate3d(1, 2, 3, 60deg)', remaining: '123'},
      {str: 'rotatex(10TURN)', x: 1, y: 0, z: 0, angleValue: 10, angleUnit: 'turn', cssText: 'rotatex(10turn)', remaining: ''},
      {str: 'rotateX(10dEg)', x: 1, y: 0, z: 0, angleValue: 10, angleUnit: 'deg', cssText: 'rotatex(10deg)', remaining: ''},
      {str: 'rotatex(10deg) abc', x: 1, y: 0, z: 0, angleValue: 10, angleUnit: 'deg', cssText: 'rotatex(10deg)', remaining: 'abc'},
      {str: 'rotatey(20Deg)', x: 0, y: 1, z: 0, angleValue: 20, angleUnit: 'deg', cssText: 'rotatey(20deg)', remaining: ''},
      {str: 'rotateY(20deG)', x: 0, y: 1, z: 0, angleValue: 20, angleUnit: 'deg', cssText: 'rotatey(20deg)', remaining: ''},
      {str: 'rotatey(20Grad))))', x: 0, y: 1, z: 0, angleValue: 20, angleUnit: 'grad', cssText: 'rotatey(20grad)', remaining: ')))'},
      {str: 'rotatez(30dEG)', x: 0, y: 0, z: 1, angleValue: 30, angleUnit: 'deg', cssText: 'rotatez(30deg)', remaining: ''},
      {str: 'rotateZ(30RAD)', x: 0, y: 0, z: 1, angleValue: 30, angleUnit: 'rad', cssText: 'rotatez(30rad)', remaining: ''},
      {str: 'rotateZ(30deg)abc', x: 0, y: 0, z: 1, angleValue: 30, angleUnit: 'deg', cssText: 'rotatez(30deg)', remaining: 'abc'},
    ]
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumeRotation(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse a CSSRotation');
      assert.strictEqual(parsed[1], values[i].remaining, values[i].str + ' expected ' + values[i].remaining + ' as trailing characters');      assert.instanceOf(parsed[0], CSSRotation);
      assert.isFalse(parsed[0].is2D);
      assert.strictEqual(parsed[0].x, values[i].x);
      assert.strictEqual(parsed[0].y, values[i].y);
      assert.strictEqual(parsed[0].z, values[i].z);
      assert.strictEqual(parsed[0].angle._value, values[i].angleValue);
      assert.strictEqual(parsed[0].angle._unit, values[i].angleUnit);
      assert.strictEqual(parsed[0].cssText, values[i].cssText);
    }
  });

  test('Parsing rotation with invalid string returns null', function() {
    var consumeRotation = typedOM.internal.parsing.consumeRotation;
    assert.isNull(consumeRotation(''));
    assert.isNull(consumeRotation('bananas'));
    assert.isNull(consumeRotation('rotate(45)')); // No units
    assert.isNull(consumeRotation('rotatex(45)'));
    assert.isNull(consumeRotation('rotatey(45)'));
    assert.isNull(consumeRotation('rotatez(45)'));
    assert.isNull(consumeRotation('rotate(45px)')); // Invalid unit
    assert.isNull(consumeRotation('rotate(deg)')); // No angle
    assert.isNull(consumeRotation('rotate3d(1,2,45deg)')); // Missing z
    assert.isNull(consumeRotation('rotatea(1,2,3,50deg)')); // Invalid keyword
    assert.isNull(consumeRotation('rotate(45deg')); // Missing bracket
  });
});
