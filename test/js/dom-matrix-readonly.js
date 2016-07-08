suite('DOMMatrixReadonly', function() {

  test('DOMMatrixReadonly constructor throws exception for invalid values', function() {
    assert.throws(function() {new DOMMatrixReadonly('0', '1', '2', '3', '4', '5')});
    assert.throws(function() {new DOMMatrixReadonly({})});
    assert.throws(function() {new DOMMatrixReadonly(0, 1, 2, 3, 4, 5, 6)});
  });

  test('DOMMatrixReadonly constructor works correctly for 2D matrices', function() {
    var value;
    var randomValues = [10, 20, -0.5, 0.5, 4, 2];
    assert.doesNotThrow(function() {
      value = new DOMMatrixReadonly([10, 20, -0.5, 0.5, 4, 2]);
    });
    assert.isTrue(value.is2D);
    assert.strictEqual(value._matrix.length, 6);
    for (var i = 0; i < value._matrix.length; i++) {
      assert.strictEqual(value._matrix[i], randomValues[i]);
    }
  });

  test('DOMMatrixReadonly constructor works correctly for 3D matrices', function() {
    var value;
    var randomValues = [10, 20, 0, 0, -0.5, 0.5, 0, 0, 0, 0, 1, 0, 4, 2, 0, 1];
    assert.doesNotThrow(function() {
      value = new DOMMatrixReadonly([10, 20, 0, 0, -0.5, 0.5, 0, 0, 0, 0, 1, 0, 4, 2, 0, 1]);
    });
    assert.isFalse(value.is2D);
    assert.strictEqual(value._matrix.length, 16);
    for (var i = 0; i < value._matrix.length; i++) {
      assert.strictEqual(value._matrix[i], randomValues[i]);
    }
  });

  test('DOMMatrixReadonly multiply works with 2D identity matrices', function() {
    var identity2D = new DOMMatrixReadonly([1, 0, 0, 1, 0, 0]);

    var result = identity2D.multiply(identity2D);
    assert.instanceOf(result, DOMMatrixReadonly,
      'DOMMatrixReadonly multiply returns an instance of DOMMatrixReadonly');
    assert.isTrue(result.is2D);
    assert.deepEqual(result, identity2D);
  });

  test('DOMMatrixReadonly multiply works with 3D identity matrices', function() {
    var identity3D = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    var result = identity3D.multiply(identity3D);
    assert.instanceOf(result, DOMMatrixReadonly,
      'DOMMatrixReadonly multiply returns an instance of DOMMatrixReadonly');
    assert.isFalse(result.is2D);
    assert.deepEqual(result, identity3D);
  });

  test('DOMMatrixReadonly multiply works between 2D and 3D identity matrices', function() {
    var identity2D = new DOMMatrixReadonly([1, 0, 0, 1, 0, 0]);
    var identity3D = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    var multiply2DAnd3D = identity2D.multiply(identity3D);
    assert.isFalse(multiply2DAnd3D.is2D);
    assert.deepEqual(multiply2DAnd3D, identity3D);

    var multiply3DAnd2D = identity3D.multiply(identity2D);
    assert.isFalse(multiply3DAnd2D.is2D);
    assert.deepEqual(multiply3DAnd2D, identity3D);
  });

  test('DOMMatrixReadonly multiply works between 2D random matrices', function() {
    var random1 = new DOMMatrixReadonly([10, 20, -0.5, 0.5, 4, 2]);
    var random2 = new DOMMatrixReadonly([-2, 0, 49, 3, 7, 0.8]);
    var expectedResult = new DOMMatrixReadonly([-20, -40, 488.5, 981.5, 73.6, 142.4]);

    var result = random1.multiply(random2);
    assert.isTrue(result.is2D);
    assert.deepEqual(result, expectedResult);
  });

  test('DOMMatrixReadonly multiply works between 2D and 3D random matrices', function() {
    var random2D = new DOMMatrixReadonly([10, 20, -0.5, 0.5, 4, 2]);
    var random3D =
        new DOMMatrixReadonly([-2, 5, 0, 1, 15, 3, 1, 7, -4, 3, 1, 0.8, 10, 1, 3, 5]);
    var expectedMultiply2DAnd3D =
        new DOMMatrixReadonly([-18.5, -35.5, 0, 1, 176.5, 315.5, 1, 7, -38.3, -76.9, 1, 0.8,
            119.5, 210.5, 3, 5]);
    var expectedMultiply3DAnd2D =
        new DOMMatrixReadonly([280, 110, 20, 150, 8.5, -1, 0.5, 3, -4, 3, 1, 0.8, 32, 27, 5,
            23]);

    var multiply2DAnd3D = random2D.multiply(random3D);
    assert.isFalse(multiply2DAnd3D.is2D);
    assert.deepEqual(multiply2DAnd3D, expectedMultiply2DAnd3D);

    var multiply3DAnd2D = random3D.multiply(random2D);
    assert.isFalse(multiply3DAnd2D.is2D);
    assert.deepEqual(multiply3DAnd2D, expectedMultiply3DAnd2D);
  });

  test('DOMMatrixReadonly multiply works between 3D random matrices', function() {
    var random1 =
        new DOMMatrixReadonly([10, 20, 0, 0, -0.5, 0.5, 0, 0, 0, 0, 1, 0, 4, 2, 0, 1]);
    var random2 =
        new DOMMatrixReadonly([-2, 5, 0, 1, 15, 3, 1, 7, -4, 3, 1, 0.8, 10, 1, 3, 5]);
    var expectedResult =
        new DOMMatrixReadonly([-18.5, -35.5, 0, 1, 176.5, 315.5, 1, 7, -38.3, -76.9, 1, 0.8,
            119.5, 210.5, 3, 5]);

    var result = random1.multiply(random2);
    assert.isFalse(result.is2D);
    assert.deepEqual(result, expectedResult);
  });
});
