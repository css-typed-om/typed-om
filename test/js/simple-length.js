suite('SimpleLength', function() {
  test('SimpleLength is a SimpleLength, LengthValue and StyleValue', function() {
    var simpleLength = new SimpleLength(3, 'px');
    assert.instanceOf(simpleLength, SimpleLength, 'A new SimpleLength should be an instance of SimpleLength');
    assert.instanceOf(simpleLength, LengthValue, 'A new SimpleLength should be an instance of LengthValue');
    assert.instanceOf(simpleLength, StyleValue, 'A new SimpleLength should be an instance of StyleValue');
  });

  test('SimpleLength constructor throws exception for invalid types', function() {
    assert.throws(function() {new SimpleLength(3, 'pxp')});
    assert.throws(function() {new SimpleLength({})});
    assert.throws(function() {new SimpleLength({}, 'px')});
  });

  // Possible constructors: SimpleLength(SimpleLength),
  // SimpleLength(number, type), SimpleLength(numeric string, type)
  test('SimpleLength constructor works correctly for numbers and numeric strings', function() {
    var valueFromString;
    assert.doesNotThrow(function() {valueFromString = new SimpleLength('9.2', 'px')});
    assert.strictEqual(valueFromString.type, 'px');
    assert.strictEqual(valueFromString.value, 9.2);

    var valueFromNumber;
    assert.doesNotThrow(function() {valueFromNumber = new SimpleLength(10, 'px')});
    assert.strictEqual(valueFromNumber.type, 'px');
    assert.strictEqual(valueFromNumber.value, 10);
  });

  test('SimpleLength cssString is correctly defined for different values and types', function() {
    var valueFromString;
    assert.doesNotThrow(function() {valueFromString = new SimpleLength('9.2', 'px')});
    assert.strictEqual(valueFromString.cssString, '9.2px');

    var valueFromNumber;
    assert.doesNotThrow(function() {valueFromNumber = new SimpleLength(10, 'px')});
    assert.strictEqual(valueFromNumber.cssString, '10px');

    var percentValue;
    assert.doesNotThrow(function() {percentValue = new SimpleLength(10, 'percent')});
    assert.strictEqual(percentValue.cssString, '10%');

    var negativeValue;
    assert.doesNotThrow(function() {negativeValue = new SimpleLength(-3.2, 'px')});
    assert.strictEqual(negativeValue.cssString, '-3.2px');
  });

  test('Multiplication of a SimpleLength produces a new SimpleLength object', function() {
    var simpleLength = new SimpleLength(3, 'px');
    var calcOutput = simpleLength.multiply(3);
    assert.strictEqual(calcOutput.type, 'px');
    assert.strictEqual(calcOutput.value, 9);
  });

  test('Multiplication of a SimpleLength that contains decimals produces correct output value', function() {
    var simpleLength = new SimpleLength(5.3, 'px');
    var calcOutput = simpleLength.multiply(3);
    assert.strictEqual(calcOutput.type, 'px');
    assert.strictEqual(calcOutput.value, (5.3 * 3));
  });

  test('Division of a SimpleLength produces a new SimpleLength object', function() {
    var simpleLength = new SimpleLength(27, 'px');
    var calcOutput = simpleLength.divide(3);
    assert.strictEqual(calcOutput.type, 'px');
    assert.strictEqual(calcOutput.value, 9);
  });

  test('Division of a SimpleLength that contains decimals produces correct output value', function() {
    var simpleLength = new SimpleLength(33.2, 'px');
    var calcOutput = simpleLength.divide(5);
    assert.strictEqual(calcOutput.type, 'px');
    assert.strictEqual(calcOutput.value, (33.2 / 5));
  });

  test('Adding two SimpleLength of the same kind returns a new SimpleLength of the same kind', function() {
    var length1 = new SimpleLength(10, 'em');
    var length2 = new SimpleLength(5, 'em');
    var lengthAddition = length1.add(length2);
    assert.instanceOf(lengthAddition, SimpleLength, 'two added SimpleLength of same type should be an instance of SimpleLength');
    assert.strictEqual(lengthAddition.type, 'em');
    assert.strictEqual(lengthAddition.value, 15);
  });

  test('subtracting two SimpleLength of the same kind returns a new SimpleLength of the same kind', function() {
    var length1 = new SimpleLength(10, 'em');
    var length2 = new SimpleLength(5, 'em');
    var lengthAddition = length1.subtract(length2);
    assert.instanceOf(lengthAddition, SimpleLength, 'two subtracted SimpleLength of same type should be an instance of SimpleLength');
    assert.strictEqual(lengthAddition.type, 'em');
    assert.strictEqual(lengthAddition.value, 5);
  });

  test('convertToCalcLength method returns a CalcLength object with a single legnth value type when called from a SimpleLength object', function() {
    var sLength = new SimpleLength(10, 'em');
    var convertedCalcLength = sLength._convertToCalcLength();
    var testCalcLength = new CalcLength({em: 10})
    assert.isTrue(convertedCalcLength.equals(testCalcLength));
  });

  test('Test equals method of Simple length such that it will return true if two simple lengths are the same', function() {
  var sLength_1 = new SimpleLength(10, 'em');
  var sLength_2 = new SimpleLength(10, 'em');
  
  assert.isTrue(sLength_1.equals(sLength_2));
  });

  test('Equals method should return false if a CalcLength is compared to a simple length even if they have the same value', function() {
  var sLength_1 = new SimpleLength(10, 'em');
  var sLength_2 = new CalcLength({em: 10});
  
  assert.isFalse(sLength_1.equals(sLength_2));
  });
});
