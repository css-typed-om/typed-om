suite('Translation', function() {
  test('Translation is a Translation and TransformComponent', function() {
    var validLength = new SimpleLength(1, 'px');
    var translation = new Translation(validLength, validLength);
    assert.instanceOf(translation, Translation,
        'A new Translation should be an instance of Translation');
    assert.instanceOf(translation, TransformComponent,
        'A new Translation should be an instance of TransformComponent');
  });

  test('Translation constructor throws exception for invalid types',
      function() {
    assert.throws(function() {new Translation()});
    assert.throws(function() {new Translation({})});
    assert.throws(function() {new Translation('1px', '2px')});
    assert.throws(function() {new Translation(null, null)});
  });

  test('Translation constructor throws exception for unsupported LengthValues',
      function() {
    var validLength = new SimpleLength(3, 'px');
    var emSimpleLength = new SimpleLength(3, 'em');
    var pxCalcLength = new CalcLength({px: 3});
    assert.throws(function() {new Translation(validLength, emSimpleLength)});
    assert.throws(function() {new Translation(emSimpleLength, emSimpleLength)});
    assert.throws(function() {new Translation(validLength, pxCalcLength)});
    assert.throws(function() {new Translation(pxCalcLength, pxCalcLength)});
    // Check that it can only take 2 or 3 arguments, not 1.
    assert.throws(function() {new Translation(validLength)});
    // Check that it doesn't simply make a 2D translation with z as null.
    assert.throws(function() {new Translation(validLength, validLength, null)});
  });

  test('Translation constructor works correctly for 2 arguments', function() {
    var translation;
    var x = new SimpleLength(3, 'px');
    var y = new SimpleLength(-1, 'px');
    assert.doesNotThrow(function() {translation = new Translation(x, y)});

    assert.strictEqual(translation.x.value, 3);
    assert.strictEqual(translation.y.value, -1);
    assert.isNull(translation.z);
    assert.deepEqual(translation.x, x);
    assert.deepEqual(translation.y, y);

    assert.isTrue(translation.is2DComponent());
    assert.strictEqual(translation.cssString,
        'translate(' + x.cssString + ', ' + y.cssString + ')');

    var expectedMatrix = new Matrix(1, 0, 0, 1, 3, -1);
    assert.strictEqual(translation.asMatrix().cssString,
        expectedMatrix.cssString);
    assert.deepEqual(translation.asMatrix(), expectedMatrix);
  });

  test('Translation constructor works correctly for 3 arguments', function() {
    var translation;
    var x = new SimpleLength(3, 'px');
    var y = new SimpleLength(0.5, 'px');
    var z = new SimpleLength(-4, 'px');
    assert.doesNotThrow(function() {translation = new Translation(x, y, z)});

    assert.strictEqual(translation.x.value, 3);
    assert.strictEqual(translation.y.value, 0.5);
    assert.strictEqual(translation.z.value, -4);
    assert.deepEqual(translation.x, x);
    assert.deepEqual(translation.y, y);
    assert.deepEqual(translation.z, z);

    assert.isFalse(translation.is2DComponent());

    var expectedCssString = 'translate3d(' + x.cssString + ', ' + y.cssString +
        ', ' + z.cssString + ')';
    assert.strictEqual(translation.cssString, expectedCssString);

    var expectedMatrix = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 0.5,
        -4, 1);
    assert.strictEqual(translation.asMatrix().cssString,
        expectedMatrix.cssString);
    assert.deepEqual(translation.asMatrix(), expectedMatrix);
  });
});
