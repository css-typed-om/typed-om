suite('CSSTranslation', function() {
  test('CSSTranslation is a CSSTransformComponent', function() {
    var validLength = new CSSSimpleLength(1, 'px');
    var translation = new CSSTranslation(validLength, validLength);
    assert.instanceOf(translation, CSSTransformComponent,
        'A new CSSTranslation should be an instance of CSSTransformComponent');
  });

  test('CSSTranslation constructor throws exception for non CSSLengthValue types',
      function() {
    assert.throws(function() {new CSSTranslation()});
    assert.throws(function() {new CSSTranslation({})});
    assert.throws(function() {new CSSTranslation(null)});
    assert.throws(function() {new CSSTranslation('1px', '2px')});
    assert.throws(function() {new CSSTranslation(1, 2)});
    assert.throws(function() {new CSSTranslation(null, null)});
    assert.throws(function() {new CSSTranslation({}, {})});
    assert.throws(function() {new CSSTranslation(null, null, null)});
  });

  test('CSSTranslation constructor throws exception for unsupported CSSLengthValues',
      function() {
    var validLength = new CSSSimpleLength(3, 'px');
    var emSimpleLength = new CSSSimpleLength(3, 'em');
    var pxCalcLength = new CSSCalcLength({px: 3});
    assert.throws(function() {new CSSTranslation(validLength, emSimpleLength)});
    assert.throws(function() {new CSSTranslation(emSimpleLength, emSimpleLength)});
    assert.throws(function() {new CSSTranslation(validLength, pxCalcLength)});
    assert.throws(function() {new CSSTranslation(pxCalcLength, pxCalcLength)});
    // Check that it can only take 2 or 3 arguments, not 1, nor 4.
    assert.throws(function() {new CSSTranslation(validLength)});
    assert.throws(function() {new CSSTranslation(validLength, validLength,
        validLength, validLength)});
    // Check that it doesn't make a 2D translation if z is invalid.
    assert.throws(function() {new CSSTranslation(validLength, validLength, null)});
    assert.throws(function() {new CSSTranslation(validLength, validLength,
        undefined)});
    assert.throws(function() {new CSSTranslation(validLength, validLength, {})});
    assert.throws(function() {new CSSTranslation(validLength, validLength,
        emSimpleLength)});
  });

  test('CSSTranslation constructor works correctly for 2 arguments', function() {
    var translation;
    var x = new CSSSimpleLength(3, 'px');
    var y = new CSSSimpleLength(-1, 'px');
    assert.doesNotThrow(function() {translation = new CSSTranslation(x, y)});

    assert.strictEqual(translation.x.value, 3);
    assert.strictEqual(translation.y.value, -1);
    assert.isNull(translation.z);
    assert.deepEqual(translation.x, x);
    assert.deepEqual(translation.y, y);

    assert.isTrue(translation.is2DComponent());
    assert.strictEqual(translation.cssString,
        'translate(' + x.cssString + ', ' + y.cssString + ')');

    var expectedMatrix = new CSSMatrix(1, 0, 0, 1, 3, -1);
    assert.strictEqual(translation.asMatrix().cssString,
        expectedMatrix.cssString);
    assert.deepEqual(translation.asMatrix(), expectedMatrix);
  });

  test('CSSTranslation constructor works correctly for 3 arguments', function() {
    var translation;
    var x = new CSSSimpleLength(3, 'px');
    var y = new CSSSimpleLength(0.5, 'px');
    var z = new CSSSimpleLength(-4, 'px');
    assert.doesNotThrow(function() {translation = new CSSTranslation(x, y, z)});

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

    var expectedMatrix = new CSSMatrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 0.5,
        -4, 1);
    assert.strictEqual(translation.asMatrix().cssString,
        expectedMatrix.cssString);
    assert.deepEqual(translation.asMatrix(), expectedMatrix);
  });
});
