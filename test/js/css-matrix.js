suite('CSSMatrix', function() {
  test('CSSMatrix is a CSSMatrix and a CSSTransformComponent', function() {
    var matrix2D = new CSSMatrix(0, 0, 0, 0, 0, 0);
    assert.instanceOf(matrix2D, CSSMatrix,
      'A new CSSMatrix should be an instance of CSSMatrix');
    assert.instanceOf(matrix2D, CSSTransformComponent,
      'A new CSSMatrix should be an instance of CSSTransformComponent');
  });

  test('CSSMatrix constructor throws exception for invalid values', function() {
    assert.throws(function() {new CSSMatrix('0', '1', '2', '3', '4', '5')});
    assert.throws(function() {new CSSMatrix({})});
    assert.throws(function() {new CSSMatrix(0, 1, 2, 3, 4, 5, 6)});
  });

  test('CSSMatrix constructor works correctly for 2D matrices', function() {
    var value;
    var randomValues = [10, 20, -0.5, 0.5, 4, 2];
    assert.doesNotThrow(function() {
      value = new CSSMatrix(10, 20, -0.5, 0.5, 4, 2);
    });
    assert.isTrue(value.is2D());
    assert.strictEqual(value.cssText, 'matrix(10, 20, -0.5, 0.5, 4, 2)');
    assert.strictEqual(value._matrix.length, 6);
    for (var i = 0; i < value._matrix.length; i++) {
      assert.strictEqual(value._matrix[i], randomValues[i]);
    }
  });

  test('CSSMatrix constructor works correctly for 3D matrices', function() {
    var value;
    var randomValues = [10, 20, 0, 0, -0.5, 0.5, 0, 0, 0, 0, 1, 0, 4, 2, 0, 1];
    assert.doesNotThrow(function() {
      value = new CSSMatrix(10, 20, 0, 0, -0.5, 0.5, 0, 0, 0, 0, 1, 0, 4, 2, 0, 1);
    });
    assert.isFalse(value.is2D());
    assert.strictEqual(value._matrix.length, 16);
    assert.strictEqual(value.cssText,
      'matrix3d(10, 20, 0, 0, -0.5, 0.5, 0, 0, 0, 0, 1, 0, 4, 2, 0, 1)');
    for (var i = 0; i < value._matrix.length; i++) {
      assert.strictEqual(value._matrix[i], randomValues[i]);
    }
  });

  test('CSSMatrix to3DComponent works for 2D and 3D matrices', function() {
    var identity2D = new CSSMatrix(1, 0, 0, 1, 0, 0);
    var identity3D = new CSSMatrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    assert.isTrue(identity2D.is2D());

    assert.isFalse(identity3D.is2D());

    var identity2DTo3D = identity2D.to3DComponent();
    assert.isFalse(identity2DTo3D.is2D());
    assert.strictEqual(identity2DTo3D.cssText, identity3D.cssText);
    assert.deepEqual(identity2DTo3D, identity3D);

    var identity3DTo3D = identity3D.to3DComponent();
    assert.isFalse(identity3DTo3D.is2D());
    assert.strictEqual(identity3DTo3D.cssText, identity3D.cssText);
    assert.deepEqual(identity3DTo3D, identity3D);
    assert.deepEqual(identity3DTo3D, identity2DTo3D);
  });

  test('CSSMatrix to3DComponent works for random 2D and 3D matrices', function() {
    var random2D = new CSSMatrix(10, 20, -0.5, 0.5, 4, 2);
    var random3D =
      new CSSMatrix(10, 20, 0, 0, -0.5, 0.5, 0, 0, 0, 0, 1, 0, 4, 2, 0, 1);

    assert.isTrue(random2D.is2D());
    assert.isFalse(random3D.is2D());

    var random2DTo3D = random2D.to3DComponent();
    assert.isFalse(random2DTo3D.is2D());
    assert.strictEqual(random2DTo3D.cssText, random3D.cssText);
    assert.deepEqual(random2DTo3D, random3D);

    var random3DTo3D = random3D.to3DComponent();
    assert.isFalse(random3DTo3D.is2D());
    assert.strictEqual(random3DTo3D.cssText, random3D.cssText);
    assert.deepEqual(random3DTo3D, random3D);
  });

  test('CSSMatrix multiply works with 2D identity matrices', function() {
    var identity2D = new CSSMatrix(1, 0, 0, 1, 0, 0);

    var result = identity2D.multiply(identity2D);
    assert.instanceOf(result, CSSMatrix,
      'CSSMatrix multiply returns an instance of CSSMatrix');
    assert.isTrue(result.is2D());
    assert.deepEqual(result, identity2D);
  });

  test('CSSMatrix multiply works with 3D identity matrices', function() {
    var identity3D = new CSSMatrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    var result = identity3D.multiply(identity3D);
    assert.instanceOf(result, CSSMatrix,
      'CSSMatrix multiply returns an instance of CSSMatrix');
    assert.isFalse(result.is2D());
    assert.deepEqual(result, identity3D);
  });

  test('CSSMatrix multiply works between 2D and 3D identity matrices', function() {
    var identity2D = new CSSMatrix(1, 0, 0, 1, 0, 0);
    var identity3D = new CSSMatrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    var multiply2DAnd3D = identity2D.multiply(identity3D);
    assert.isFalse(multiply2DAnd3D.is2D());
    assert.strictEqual(multiply2DAnd3D.cssText, identity3D.cssText);
    assert.deepEqual(multiply2DAnd3D, identity3D);

    var multiply3DAnd2D = identity3D.multiply(identity2D);
    assert.isFalse(multiply3DAnd2D.is2D());
    assert.strictEqual(multiply2DAnd3D.cssText, identity3D.cssText);
    assert.deepEqual(multiply3DAnd2D, identity3D);
  });

  test('CSSMatrix multiply works between 2D random matrices', function() {
    var random1 = new CSSMatrix(10, 20, -0.5, 0.5, 4, 2);
    var random2 = new CSSMatrix(-2, 0, 49, 3, 7, 0.8);
    var expectedResult = new CSSMatrix(-20, -40, 488.5, 981.5, 73.6, 142.4);

    var result = random1.multiply(random2);
    assert.isTrue(result.is2D());
    assert.strictEqual(result.cssText, expectedResult.cssText);
    assert.deepEqual(result, expectedResult);
  });

  test('CSSMatrix multiply works between 2D and 3D random matrices', function() {
    var random2D = new CSSMatrix(10, 20, -0.5, 0.5, 4, 2);
    var random3D =
        new CSSMatrix(-2, 5, 0, 1, 15, 3, 1, 7, -4, 3, 1, 0.8, 10, 1, 3, 5);
    var expectedMultiply2DAnd3D =
        new CSSMatrix(-18.5, -35.5, 0, 1, 176.5, 315.5, 1, 7, -38.3, -76.9, 1, 0.8,
            119.5, 210.5, 3, 5);
    var expectedMultiply3DAnd2D =
        new CSSMatrix(280, 110, 20, 150, 8.5, -1, 0.5, 3, -4, 3, 1, 0.8, 32, 27, 5,
            23);

    var multiply2DAnd3D = random2D.multiply(random3D);
    assert.isFalse(multiply2DAnd3D.is2D());
    assert.strictEqual(multiply2DAnd3D.cssText,
        expectedMultiply2DAnd3D.cssText);
    assert.deepEqual(multiply2DAnd3D, expectedMultiply2DAnd3D);

    var multiply3DAnd2D = random3D.multiply(random2D);
    assert.isFalse(multiply3DAnd2D.is2D());
    assert.strictEqual(multiply3DAnd2D.cssText,
        expectedMultiply3DAnd2D.cssText);
    assert.deepEqual(multiply3DAnd2D, expectedMultiply3DAnd2D);
  });

  test('CSSMatrix multiply works between 3D random matrices', function() {
    var random1 =
        new CSSMatrix(10, 20, 0, 0, -0.5, 0.5, 0, 0, 0, 0, 1, 0, 4, 2, 0, 1);
    var random2 =
        new CSSMatrix(-2, 5, 0, 1, 15, 3, 1, 7, -4, 3, 1, 0.8, 10, 1, 3, 5);
    var expectedResult =
        new CSSMatrix(-18.5, -35.5, 0, 1, 176.5, 315.5, 1, 7, -38.3, -76.9, 1, 0.8,
            119.5, 210.5, 3, 5);

    var result = random1.multiply(random2);
    assert.isFalse(result.is2D());
    assert.strictEqual(result.cssText, expectedResult.cssText);
    assert.deepEqual(result, expectedResult);
  });
});
