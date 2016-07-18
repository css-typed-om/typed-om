suite('Parsing utilities', function() {
  test('isNumberValueString valid strings', function() {
    var isNumberValueString = typedOM.internal.parsing.isNumberValueString;
    assert.isTrue(isNumberValueString('12'));
    assert.isTrue(isNumberValueString('4.01'));
    assert.isTrue(isNumberValueString('-456.8'));
    assert.isTrue(isNumberValueString('0.0'));
    assert.isTrue(isNumberValueString('+0.0'));
    assert.isTrue(isNumberValueString('-0.0'));
    assert.isTrue(isNumberValueString('.60'));
    assert.isTrue(isNumberValueString('10e3'));
    assert.isTrue(isNumberValueString('-3.4e-2'));
  });

  test('isNumberValueString invalid strings', function() {
    var isNumberValueString = typedOM.internal.parsing.isNumberValueString;
    assert.isFalse(isNumberValueString('hello, world'));
    assert.isFalse(isNumberValueString('calc(10px+3.2em) 3px'));
    assert.isFalse(isNumberValueString('3px calc(10px+3.2em)'));
    assert.isFalse(isNumberValueString('3px'));
    assert.isFalse(isNumberValueString('scale(3, -1)'));
    assert.isFalse(isNumberValueString('1e-.0'));
    assert.isFalse(isNumberValueString('9 manyRandomLemons'));
    assert.isFalse(isNumberValueString('1e4.0'));
  });

  test('consumeNumber', function() {
    var consumeNumber = typedOM.internal.parsing.consumeNumber;
    assert.deepEqual(consumeNumber('12'), [12, '']);
    assert.deepEqual(consumeNumber('4.01'), [4.01, '']);
    assert.deepEqual(consumeNumber('-456.8'), [-456.8, '']);
    assert.deepEqual(consumeNumber('0.0'), [0, '']);
    assert.deepEqual(consumeNumber('+0.0'), [0, '']);
    assert.deepEqual(consumeNumber('-0.0'), [-0, '']);
    assert.deepEqual(consumeNumber('.60'), [0.6, '']);
    assert.deepEqual(consumeNumber('10e3'), [10e3, '',]);
    assert.deepEqual(consumeNumber('-3.4e-2'), [-3.4e-2, '']);

    assert.deepEqual(consumeNumber('12 5'), [12, ' 5']);
    assert.deepEqual(consumeNumber('4.01 abc'), [4.01, ' abc']);
    assert.deepEqual(consumeNumber('-456.8def'), [-456.8, 'def']);
    assert.deepEqual(consumeNumber('-3.4e-2 123'), [-3.4e-2, '123']);
  });

  test('consumeRepeated with separator', function() {
    assert.deep
  });

  test('consumeRepeated without separator', function() {
  });

  test('consumeRepeated with max results', function() {
  });

  test('consumeRepeated with max results and separator', function() {
  });
});
