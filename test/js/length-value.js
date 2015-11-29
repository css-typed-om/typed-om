suite('LengthValue', function() {
  test('fromValue returns instanceof a LengthValue and StyleValue', function() {
    var fromVal = (new LengthValue()).fromValue(9.2, 'px');
    assert.instanceOf(fromVal, SimpleLength, 'A new fromValue should be an instance of SimpleLength');
    assert.instanceOf(fromVal, LengthValue, 'A new fromValue should be an instance of LengthValue');
    assert.instanceOf(fromVal, StyleValue, 'A new fromValue should be an instance of StyleValue');
  });

  test('fromDictionary returns instanceof a LengthValue and StyleValue', function() {
    var fromDict = (new LengthValue()).fromDictionary({px: 10});
    assert.instanceOf(fromDict, CalcLength, 'A new fromDictionary should be an instance of CalcLength');
    assert.instanceOf(fromDict, LengthValue, 'A new fromDictionary should be an instance of LengthValue');
    assert.instanceOf(fromDict, StyleValue, 'A new fromDictionary should be an instance of StyleValue');
  });
});
