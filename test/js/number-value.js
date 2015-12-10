suite('NumberValue', function() {
  test('NumberValue is a NumberValue and a StyleValue', function() {
    var numberVal = new NumberValue(3);
    assert.instanceOf(numberVal, NumberValue,
      'A new NumberValue should be an instance of NumberValue');
    assert.instanceOf(numberVal, StyleValue,
      'A new NumberValue should be an instance of StyleValue');
  });

  test('NumberValue constructor throws exception for invalid values',
      function() {
    assert.throws(function() {new NumberValue('4')});
    assert.throws(function() {new NumberValue({})});
  });

  test('NumberValue constructor works correctly for numbers and numeric ' +
      'strings', function() {
    var value;
    assert.doesNotThrow(function() {value = new NumberValue(10)});
    assert.strictEqual(value.cssString, '10');
    assert.strictEqual(value.value, 10);
  });
});
