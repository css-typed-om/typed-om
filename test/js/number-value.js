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

  test('parse method should return a NumberValue object if string can be successfully parsed to a number', function() {
    assert.strictEqual(NumberValue.parse('12').cssString, '12');
    assert.strictEqual(NumberValue.parse('4.01').cssString, '4.01');
    assert.strictEqual(NumberValue.parse('-456.8').cssString, '-456.8');
    assert.strictEqual(NumberValue.parse('0.0').cssString, '0');
    assert.strictEqual(NumberValue.parse('+0.0').cssString, '0');
    assert.strictEqual(NumberValue.parse('-0.0').cssString, '0');
    assert.strictEqual(NumberValue.parse('.60').cssString, '0.6');
    assert.strictEqual(NumberValue.parse('10e3').cssString, '10000');
    assert.strictEqual(NumberValue.parse('-3.4e-2').cssString, '-0.034');
    assert.strictEqual(NumberValue.parse('1e-.0').cssString, '1');
  });

  test('parse method should return null if string cannot be successfully parsed to a number', function() {
    assert.strictEqual(NumberValue.parse('hello, world'), null);
    assert.strictEqual(NumberValue.parse('calc(10px+3.2em) 3px'), null);
    assert.strictEqual(NumberValue.parse('3px calc(10px+3.2em)'), null);
    assert.strictEqual(NumberValue.parse('3px'), null);
    assert.strictEqual(NumberValue.parse('scale(3, -1)'), null);
  });
});
