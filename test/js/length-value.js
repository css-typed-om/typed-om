suite('LengthValue', function() {
  test('fromValue returns instanceof a LengthValue and StyleValue', function() {
    var fromValue = (new LengthValue()).fromValue(9.2, 'px');
    assert.instanceOf(fromValue, SimpleLength, 'A new fromValue should be an instance of SimpleLength');
    assert.instanceOf(fromValue, LengthValue, 'A new fromValue should be an instance of LengthValue');
    assert.instanceOf(fromValue, StyleValue, 'A new fromValue should be an instance of StyleValue');
  });

  test('fromDictionary returns instanceof a LengthValue and StyleValue', function() {
    var fromDictionary = (new LengthValue()).fromDictionary({px: 10});
    assert.instanceOf(fromDictionary, CalcLength, 'A new fromDictionary should be an instance of CalcLength');
    assert.instanceOf(fromDictionary, LengthValue, 'A new fromDictionary should be an instance of LengthValue');
    assert.instanceOf(fromDictionary, StyleValue, 'A new fromDictionary should be an instance of StyleValue');
  });
});
