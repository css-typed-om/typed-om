suite('SimpleLength', function() {
  test('SimpleLength is a SimpleLength, LengthValue and StyleValue', function() {
    var simpleLen = new SimpleLength(3, 'px');
    assert.instanceOf(simpleLen, SimpleLength, 'A new SimpleLength should be an instance of SimpleLength');
    assert.instanceOf(simpleLen, LengthValue, 'A new SimpleLength should be an instance of LengthValue');
    assert.instanceOf(simpleLen, StyleValue, 'A new SimpleLength should be an instance of StyleValue');
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

  test('Multiplication of a simple length produses a new simple length object', function() {
    var simpleLen = new SimpleLength(3, 'px');
    var calcOutput = simpleLen.multiply(3);
    assert.strictEqual(calcOutput.type, 'px');
    assert.strictEqual(calcOutput.value, 9);
  });

  test('Multiplication of a simple length that contains decimals produses correct output value', function() {
    var simpleLen = new SimpleLength(5.3, 'px');
    var calcOutput = simpleLen.multiply(3);
    assert.strictEqual(calcOutput.type, 'px');
    assert.strictEqual(calcOutput.value, (5.3 * 3));
  });
 
  test('Division of a simple length produses a new simple length object', function() {
    var simpleLen = new SimpleLength(27, 'px');
    var calcOutput = simpleLen.divide(3);
    assert.strictEqual(calcOutput.type, 'px');
    assert.strictEqual(calcOutput.value, 9);
  });

  test('Division of a simple length that contains decimals produses correct output value', function() {
    var simpleLen = new SimpleLength(33.2, 'px');
    var calcOutput = simpleLen.divide(5);
    assert.strictEqual(calcOutput.type, 'px');
    assert.strictEqual(calcOutput.value, (33.2 / 5));
  });

  test('Adding two simple lengths of the same kind returns a new simple length of the same kind', function() {
    var length_1 = new SimpleLength(10, 'em');
    var length_2 = new SimpleLength(5, 'em');
    var lengthAddition = length_1.add(length_2);
    assert.instanceOf(lengthAddition, SimpleLength, 'two added simple legths of same type should be an instance of SimpleLength');
    assert.strictEqual(lengthAddition.type, 'em');
    assert.strictEqual(lengthAddition.value, 15);
  });

  test('subtracting two simple lengths of the same kind returns a new simple length of the same kind', function() {
    var length_1 = new SimpleLength(10, 'em');
    var length_2 = new SimpleLength(5, 'em');
    var lengthAddition = length_1.subtract(length_2);
    assert.instanceOf(lengthAddition, SimpleLength, 'two subtracted simple legths of same type should be an instance of SimpleLength');
    assert.strictEqual(lengthAddition.type, 'em');
    assert.strictEqual(lengthAddition.value, 5);
  });

});
