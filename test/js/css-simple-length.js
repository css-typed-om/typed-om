suite('CSSSimpleLength', function() {
  test('CSSSimpleLength is a CSSSimpleLength, CSSLengthValue and CSSStyleValue', function() {
    var simpleLength = new CSSSimpleLength(3, 'px');
    assert.instanceOf(simpleLength, CSSSimpleLength, 'A new CSSSimpleLength should be an instance of CSSSimpleLength');
    assert.instanceOf(simpleLength, CSSLengthValue, 'A new CSSSimpleLength should be an instance of CSSLengthValue');
    assert.instanceOf(simpleLength, CSSStyleValue, 'A new CSSSimpleLength should be an instance of CSSStyleValue');
  });

  test('CSSSimpleLength constructor throws exception for invalid types', function() {
    assert.throws(function() {new CSSSimpleLength(3, 'pxp')});
    assert.throws(function() {new CSSSimpleLength({})});
    assert.throws(function() {new CSSSimpleLength({}, 'px')});
  });

  test('CSSSimpleLength constructor works correctly for (number, type)',
      function() {
    var result;
    assert.doesNotThrow(function() {result = new CSSSimpleLength(10, 'px')});
    assert.strictEqual(result.type, 'px');
    assert.strictEqual(result.value, 10);
  });

  test('CSSSimpleLength constructor works correctly for (CSSSimpleLength)',
      function() {
    var original;
    var copy;
    assert.doesNotThrow(function() {original = new CSSSimpleLength(10, 'px')});
    assert.doesNotThrow(function() {copy = new CSSSimpleLength(original)});
    assert.strictEqual(copy.type, original.type);
    assert.strictEqual(copy.value, original.value);
    assert.strictEqual(copy.cssString, original.cssString);
    assert.deepEqual(copy, original);

    // Ensure that the copied object is not tied to the original.
    assert.doesNotChange(function() {original.value = 15}, copy, 'value');
    assert.doesNotChange(function() {original.type = 'em'}, copy, 'type');
  });

  test('CSSSimpleLength cssString is correctly defined for different values and types', function() {
    var pixValue;
    assert.doesNotThrow(function() {pixValue = new CSSSimpleLength(10, 'px')});
    assert.strictEqual(pixValue.cssString, '10px');

    var percentValue;
    assert.doesNotThrow(function() {percentValue = new CSSSimpleLength(10, 'percent')});
    assert.strictEqual(percentValue.cssString, '10%');

    var negativeValue;
    assert.doesNotThrow(function() {negativeValue = new CSSSimpleLength(-3.2, 'px')});
    assert.strictEqual(negativeValue.cssString, '-3.2px');
  });

  test('Multiplication of a CSSSimpleLength produces a new CSSSimpleLength object', function() {
    var simpleLength = new CSSSimpleLength(3, 'px');
    var result = simpleLength.multiply(3);
    assert.strictEqual(result.type, 'px');
    assert.strictEqual(result.value, 9);
  });

  test('Multiplication of a CSSSimpleLength that contains decimals produces correct output value', function() {
    var simpleLength = new CSSSimpleLength(5.3, 'px');
    var result = simpleLength.multiply(3);
    assert.strictEqual(result.type, 'px');
    assert.strictEqual(result.value, (5.3 * 3));
  });

  test('Division of a CSSSimpleLength produces a new CSSSimpleLength object', function() {
    var simpleLength = new CSSSimpleLength(27, 'px');
    var result = simpleLength.divide(3);
    assert.strictEqual(result.type, 'px');
    assert.strictEqual(result.value, 9);
  });

  test('Division of a CSSSimpleLength that contains decimals produces correct output value', function() {
    var simpleLength = new CSSSimpleLength(33.2, 'px');
    var result = simpleLength.divide(5);
    assert.strictEqual(result.type, 'px');
    assert.strictEqual(result.value, (33.2 / 5));
  });

  test('Adding two CSSSimpleLengths of the same type returns a new CSSSimpleLength of the same kind', function() {
    var simpleLength1 = new CSSSimpleLength(10, 'em');
    var simpleLength2 = new CSSSimpleLength(5, 'em');
    var result = simpleLength1.add(simpleLength2);
    assert.instanceOf(result, CSSSimpleLength, 'Two added CSSSimpleLengths of same type should return an instance of CSSSimpleLength');
    assert.strictEqual(result.type, 'em');
    assert.strictEqual(result.value, 15);
  });

  test('Adding two CSSSimpleLengths of different types returns a new CSSCalcLength', function() {
    var simpleLength1 = new CSSSimpleLength(10, 'em');
    var simpleLength2 = new CSSSimpleLength(5, 'px');
    var result = simpleLength1.add(simpleLength2);
    var expectedResult = new CSSCalcLength({em: 10, px: 5});
    assert.instanceOf(result, CSSCalcLength, 'Two added CSSSimpleLengths of different types should return an instance of CSSCalcLength');
    assert.isTrue(expectedResult.equals(result));
  });

  test('Subtracting two CSSSimpleLengths of the same type returns a new CSSSimpleLength of the same kind', function() {
    var simpleLength1 = new CSSSimpleLength(10, 'em');
    var simpleLength2 = new CSSSimpleLength(5, 'em');
    var result = simpleLength1.subtract(simpleLength2);
    assert.instanceOf(result, CSSSimpleLength, 'Two subtracted CSSSimpleLengths of same type should return an instance of CSSSimpleLength');
    assert.strictEqual(result.type, 'em');
    assert.strictEqual(result.value, 5);
  });

  test('Subtracting two CSSSimpleLengths of different types returns a new CSSCalcLength', function() {
    var simpleLength1 = new CSSSimpleLength(10, 'em');
    var simpleLength2 = new CSSSimpleLength(5, 'px');
    var result = simpleLength1.subtract(simpleLength2);
    var expectedResult = new CSSCalcLength({em: 10, px: -5});
    assert.instanceOf(result, CSSCalcLength, 'Two subtracted CSSSimpleLengths of different types should return an instance of CSSCalcLength');
    assert.isTrue(expectedResult.equals(result));
  });

  test('_asCalcLength method returns a CSSCalcLength with single value', function() {
    var simpleLength = new CSSSimpleLength(10, 'em');
    var result = simpleLength._asCalcLength();
    var expectedResult = new CSSCalcLength({em: 10});
    assert.isTrue(result.equals(expectedResult));
  });

  test('equals method should return true for equal CSSSimpleLengths', function() {
    var simpleLength1 = new CSSSimpleLength(10, 'em');
    var simpleLength2 = new CSSSimpleLength(10, 'em');
    assert.isTrue(simpleLength1.equals(simpleLength2));
  });

  test('equals method should return false if a CSSCalcLength is compared to a simple length even if they have the same value', function() {
    var simpleLength1 = new CSSSimpleLength(10, 'em');
    var simpleLength2 = new CSSCalcLength({em: 10});
    assert.isFalse(simpleLength1.equals(simpleLength2));
  });
});
