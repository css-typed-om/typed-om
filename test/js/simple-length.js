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
});
