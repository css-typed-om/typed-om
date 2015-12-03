suite('LengthValue', function() {
  test('fromValue returns instanceof a LengthValue and StyleValue', function() {
    var fromValue = LengthValue.fromValue(9.2, 'px');
    assert.instanceOf(fromValue, SimpleLength, 'LengthValue.fromValue should be an instance of SimpleLength');
    assert.instanceOf(fromValue, LengthValue, 'LengthValue.fromValue should be an instance of LengthValue');
    assert.instanceOf(fromValue, StyleValue, 'LengthValue.fromValue should be an instance of StyleValue');
  });

  test('fromDictionary returns instanceof a LengthValue and StyleValue', function() {
    var fromDictionary = LengthValue.fromDictionary({px: 10});
    assert.instanceOf(fromDictionary, CalcLength, 'LengthValue.fromDictionary should be an instance of CalcLength');
    assert.instanceOf(fromDictionary, LengthValue, 'LengthValue.fromDictionary should be an instance of LengthValue');
    assert.instanceOf(fromDictionary, StyleValue, 'LengthValue.fromDictionary should be an instance of StyleValue');
  });
});
