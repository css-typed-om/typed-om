suite('CalcLength', function() {
  test('CalcLength is a CalcLength, LengthValue and StyleValue', function() {
    var calcLen = new CalcLength({px: 10});
    assert.instanceOf(calcLen, CalcLength, 'A new CalcLength should be an instance of CalcLength');
    assert.instanceOf(calcLen, LengthValue, 'A new CalcLength should be an instance of LengthValue');
    assert.instanceOf(calcLen, StyleValue, 'A new CalcLength should be an instance of StyleValue');
  });

  test('CalcLength constructor throws exception for invalid types', function() {
    assert.throws(function() {new CalcLength({px: 'abc'})});
    assert.throws(function() {new CalcLength({px: {}})});
    assert.throws(function() {new CalcLength({})});
  });

  test('CalcLength empty constructor initializes other fields to null', function() {
    var lenFromEmptyDict;
    assert.doesNotThrow(function() {lenFromEmptyDict = new CalcLength({px: 10})});
    for (var index in LengthValue.LengthType) {
      var type = LengthValue.LengthType[index];
      if (type != 'px') {
        assert.isNull(lenFromEmptyDict[type], 'Each field in an empty instantiated CalcLength is null');
      }
    }
  });

  // Possible constructor: CalcLength(dictionary)
  test('CalcLength constructor works correctly for numbers and numeric strings', function() {
    var valueFromNumber;
    assert.doesNotThrow(function() {valueFromNumber = new CalcLength({px: 10})});
    assert.strictEqual(valueFromNumber.px, 10);

    var multiValue;
    assert.doesNotThrow(function() {multiValue = new CalcLength({px: 10, em: 3.2})});
    assert.strictEqual(multiValue.px, 10);
    assert.strictEqual(multiValue.em, 3.2);
  });
});
