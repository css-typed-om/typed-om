suite('LengthValue', function() {
  test('fromValue returns instanceof a SimpleLength, LengthValue and StyleValue', function() {
    var fromVal = (new LengthValue()).fromValue(9.2, 'px');
    assert.instanceOf(fromVal, SimpleLength, 'A new fromValue should be an instance of SimpleLength');
    assert.instanceOf(fromVal, LengthValue, 'A new fromValue should be an instance of LengthValue');
    assert.instanceOf(fromVal, StyleValue, 'A new fromValue should be an instance of StyleValue');
  });

  test('fromDictionary with single length returns instanceof a SimpleLength, LengthValue and StyleValue', function() {
    var fromDict = (new LengthValue()).fromDictionary({PX: 10});
    assert.instanceOf(fromDict, SimpleLength, 'A new fromDictionary with a single length should be an instance of SimpleLength');
    assert.instanceOf(fromDict, LengthValue, 'A new fromDictionary should be an instance of LengthValue');
    assert.instanceOf(fromDict, StyleValue, 'A new fromDictionary should be an instance of StyleValue');
  });

  test('fromDictionary with multiple lengths returns instanceof a CalcLength, LengthValue and StyleValue', function() {
    var fromDict = (new LengthValue()).fromDictionary({PX: 10, EM: 10});
    assert.instanceOf(fromDict, CalcLength, 'A new fromDictionary with a multiple lengths should be an instance of CalcLength');
    assert.instanceOf(fromDict, LengthValue, 'A new fromDictionary should be an instance of LengthValue');
    assert.instanceOf(fromDict, StyleValue, 'A new fromDictionary should be an instance of StyleValue');
  });

  test('fromDictionary throws exception for invalid types', function() {
    assert.throws(function() {(new LengthValue()).fromDictionary({})});
    assert.throws(function() {(new LengthValue()).fromDictionary({BLAH: 10})});
    assert.throws(function() {(new LengthValue()).fromDictionary({PX: '10'})});
  });
});
