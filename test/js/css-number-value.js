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

  test('from method should return a CSSNumberValue object if string can be successfully parsed to a number', function() {
    assert.strictEqual(CSSNumberValue.from('12').cssString, '12');
    assert.strictEqual(CSSNumberValue.from('4.01').cssString, '4.01');
    assert.strictEqual(CSSNumberValue.from('-456.8').cssString, '-456.8');
    assert.strictEqual(CSSNumberValue.from('0.0').cssString, '0');
    assert.strictEqual(CSSNumberValue.from('+0.0').cssString, '0');
    assert.strictEqual(CSSNumberValue.from('-0.0').cssString, '0');
    assert.strictEqual(CSSNumberValue.from('.60').cssString, '0.6');
    assert.strictEqual(CSSNumberValue.from('10e3').cssString, '10000');
    assert.strictEqual(CSSNumberValue.from('-3.4e-2').cssString, '-0.034');
  });

  test('from method should return null if string cannot be successfully parsed to a number', function() {
    assert.strictEqual(CSSNumberValue.from('hello, world'), null);
    assert.strictEqual(CSSNumberValue.from('calc(10px+3.2em) 3px'), null);
    assert.strictEqual(CSSNumberValue.from('3px calc(10px+3.2em)'), null);
    assert.strictEqual(CSSNumberValue.from('3px'), null);
    assert.strictEqual(CSSNumberValue.from('scale(3, -1)'), null);
    assert.strictEqual(CSSNumberValue.from('1e-.0'), null);
    assert.strictEqual(CSSNumberValue.from('9 manyRandomLemons'), null);
    assert.strictEqual(CSSNumberValue.from('1e4.0'), null);
  });
});
