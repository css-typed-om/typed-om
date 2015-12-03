suite('LengthValue', function() {
  test('fromValue returns a SimpleLength which is an instance of LengthValue and StyleValue', function() {
    var simpleLength = LengthValue.fromValue(9.2, 'px');
    assert.instanceOf(simpleLength, SimpleLength, 'A new simpleLength should be an instance of SimpleLength');
    assert.instanceOf(simpleLength, LengthValue, 'A new simpleLength should be an instance of LengthValue');
    assert.instanceOf(simpleLength, StyleValue, 'A new simpleLength should be an instance of StyleValue');
  });

  test('fromDictionary returns a CalcLength which is an instance of LengthValue and StyleValue', function() {
    var calcLength = LengthValue.fromDictionary({px: 10});
    assert.instanceOf(calcLength, CalcLength, 'A new calcLength should be an instance of CalcLength');
    assert.instanceOf(calcLength, LengthValue, 'A new calcLength should be an instance of LengthValue');
    assert.instanceOf(calcLength, StyleValue, 'A new calcLength should be an instance of StyleValue');
  });
});
