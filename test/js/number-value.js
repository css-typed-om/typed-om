suite('CSSNumberValue', function() {
  test('CSSNumberValue is a CSSNumberValue and a CSSStyleValue', function() {
    var numberVal = new CSSNumberValue(3);
    assert.instanceOf(numberVal, CSSNumberValue,
      'A new CSSNumberValue should be an instance of CSSNumberValue');
    assert.instanceOf(numberVal, CSSStyleValue,
      'A new CSSNumberValue should be an instance of CSSStyleValue');
  });

  test('CSSNumberValue constructor throws exception for invalid values',
      function() {
    assert.throws(function() {new CSSNumberValue('4')});
    assert.throws(function() {new CSSNumberValue({})});
  });

  test('CSSNumberValue constructor works correctly for numbers and numeric ' +
      'strings', function() {
    var value;
    assert.doesNotThrow(function() {value = new CSSNumberValue(10)});
    assert.strictEqual(value.cssString, '10');
    assert.strictEqual(value.value, 10);
  });

  test('parse method should return a CSSNumberValue object if string can be successfully parsed to a number', function() {
    assert.strictEqual(CSSNumberValue.parse('12').cssString, '12');
    assert.strictEqual(CSSNumberValue.parse('4.01').cssString, '4.01');
    assert.strictEqual(CSSNumberValue.parse('-456.8').cssString, '-456.8');
    assert.strictEqual(CSSNumberValue.parse('0.0').cssString, '0');
    assert.strictEqual(CSSNumberValue.parse('+0.0').cssString, '0');
    assert.strictEqual(CSSNumberValue.parse('-0.0').cssString, '0');
    assert.strictEqual(CSSNumberValue.parse('.60').cssString, '0.6');
    assert.strictEqual(CSSNumberValue.parse('10e3').cssString, '10000');
    assert.strictEqual(CSSNumberValue.parse('-3.4e-2').cssString, '-0.034');
  });

  test('parse method should return null if string cannot be successfully parsed to a number', function() {
    assert.strictEqual(CSSNumberValue.parse('hello, world'), null);
    assert.strictEqual(CSSNumberValue.parse('calc(10px+3.2em) 3px'), null);
    assert.strictEqual(CSSNumberValue.parse('3px calc(10px+3.2em)'), null);
    assert.strictEqual(CSSNumberValue.parse('3px'), null);
    assert.strictEqual(CSSNumberValue.parse('scale(3, -1)'), null);
    assert.strictEqual(CSSNumberValue.parse('1e-.0'), null);
    assert.strictEqual(CSSNumberValue.parse('9 manyRandomLemons'), null);
    assert.strictEqual(CSSNumberValue.parse('1e4.0'), null);
  });
});
