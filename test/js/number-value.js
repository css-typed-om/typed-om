suite('NumberValue', function() {
  test('NumberValue is a NumberValue and a StyleValue', function() {
    var numberVal = new NumberValue(3);
    assert.instanceOf(numberVal, NumberValue, 'A new NumberValue should be an instance of NumberValue');
    assert.instanceOf(numberVal, StyleValue, 'A new NumberValue should be an instance of StyleValue');
  });

  test('NumberValue constructor throws exception for invalid values', function() {
    assert.throws(function() {new NumberValue('a4')});
    assert.throws(function() {new NumberValue({})});
  });

  test('NumberValue constructor works correctly for number and numeric string', function() {
    var numberValFromString;
    assert.doesNotThrow(function() {numberValFromString = new NumberValue('9.2')});
    assert.strictEqual(numberValFromString.cssString, '9.2');
    assert.strictEqual(numberValFromString.value, 9.2);
    var numberValFromNumber;
    assert.doesNotThrow(function() {numberValFromNumber = new NumberValue(10)});
    assert.strictEqual(numberValFromNumber.cssString, '10');
    assert.strictEqual(numberValFromNumber.value, 10);
  });
});
