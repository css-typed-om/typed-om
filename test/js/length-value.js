suite('LengthValue', function() {
  test('fromDictionary returns instanceof a LengthValue and StyleValue', function() {
    var fromDictionary = (new LengthValue()).fromValue(9.2, 'px');
    assert.instanceOf(fromDictionary, SimpleLength, 'A new fromDictionary should be an instance of SimpleLength');
    assert.instanceOf(fromDictionary, LengthValue, 'A new fromDictionary should be an instance of LengthValue');
    assert.instanceOf(fromDictionary, StyleValue, 'A new fromDictionary should be an instance of StyleValue');
  });

  test('fromDictionary returns instanceof a LengthValue and StyleValue', function() {
    var fromDictionary = (new LengthValue()).fromDictionary({px: 10});
    assert.instanceOf(fromDictionary, CalcLength, 'A new fromDictionary should be an instance of CalcLength');
    assert.instanceOf(fromDictionary, LengthValue, 'A new fromDictionary should be an instance of LengthValue');
    assert.instanceOf(fromDictionary, StyleValue, 'A new fromDictionary should be an instance of StyleValue');
  });
});
