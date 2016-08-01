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
    assert.strictEqual(value.cssText, '10');
    assert.strictEqual(value.value, 10);
  });

  test('Parsing valid values', function() {
    var values = [
      { str: '12', num: 12, remaining: '' },
      { str: '4.01', num: 4.01, remaining: '' },
      { str: '-456.8', num: -456.8, remaining: '' },
      { str: '0.0', num: 0, remaining: '' },
      { str: '+0.0', num: 0, remaining: '' },
      { str: '-0.0', num: 0, remaining: '' },
      { str: '.60', num: 0.6, remaining: '' },
      { str: '10e3', num: 10000, remaining: '' },
      { str: '-3.4e-2', num: -0.034, remaining: '' },
      { str: '3px', num: 3, remaining: 'px' },
      { str: '1e-.0', num: 1, remaining: 'e-.0' }, 
    ];
    for (var i = 0; i < values.length; i++) {
      var result = typedOM.internal.parsing.consumeNumberValue(values[i].str);
      assert.isNotNull(result);
      assert.strictEqual(result[1], values[i].remaining, 'Parsing ' + values[i].str +
          ' expected ' + values[i].remaining + ' as trailing characters');

      assert.instanceOf(result[0], CSSNumberValue);
      assert.strictEqual(result[0].value, values[i].num);
    }
  });

  test('Parsing returns null on failure', function() {
    var consumeNumberValue = typedOM.internal.parsing.consumeNumberValue;
    assert.isNull(consumeNumberValue('hello, world'));
    assert.isNull(consumeNumberValue('calc(10px+3.2em) 3px'));
    assert.isNull(consumeNumberValue('scale(3, -1)'));
  });
});
