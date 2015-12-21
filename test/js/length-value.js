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

  test('LengthValue copy constructor returns a LengthValue', function() {
    var simple = new SimpleLength(3, 'px');
    var simpleCopy;
    assert.doesNotThrow(function() {simpleCopy = new LengthValue(simple)});
    assert.instanceOf(simpleCopy, SimpleLength,
        'A new simpleLength should be an instanceOf SimpleLength');
    assert.deepEqual(simpleCopy, simple);

    var calc = new CalcLength({px: 10});
    var calcCopy;
    assert.doesNotThrow(function() {calcCopy = new LengthValue(calc)});
    assert.instanceOf(calcCopy, CalcLength,
        'A new calcLength should be an instanceOf CalcLength');
    assert.deepEqual(calcCopy, calc);
  });
});
