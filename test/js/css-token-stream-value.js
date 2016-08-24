suite('CSSTokenStreamValue', function() {

  test("CSSTokenStreamValue is a CSSTokenStreamValue and CSSStyleValue", function() {
    assert.instanceOf(new CSSTokenStreamValue(), CSSTokenStreamValue);
    assert.instanceOf(new CSSTokenStreamValue(), CSSStyleValue);
  });

  test('Values not an array throws', function() {
    assert.throw(function() { new CSSTokenStreamValue(1); }, TypeError, 'CSSTokenStreamValue should be an array of string or CSSVariableReferenceValue');
    assert.throw(function() { new CSSTokenStreamValue("123"); }, TypeError, 'CSSTokenStreamValue should be an array of string or CSSVariableReferenceValue');
    assert.throw(function() { new CSSTokenStreamValue({ h:10, w:5, d:4, t:"5" });}, TypeError, 'CSSTokenStreamValue should be an array of string or CSSVariableReferenceValue');
  });

  test('Values not an array of string or CSSVariableReferenceValue throws', function() {
    assert.throw(function() { new CSSTokenStreamValue([1]); }, TypeError, "CSSTokenStreamValue\'s elements should be string or CSSVariableReferenceValue");
    assert.throw(function() { new CSSTokenStreamValue(["1234", "2342", 1]); }, TypeError, "CSSTokenStreamValue\'s elements should be string or CSSVariableReferenceValue");
  });

  test('Using spread operator on CSSTokenStreamValue results in the correct values', function() {
    var values = ['string', new CSSVariableReferenceValue('val', new CSSTokenStreamValue(['innerStr']))];
    var tokenStream = new CSSTokenStreamValue(values);

    var expected = [[0, values[0]], [1, values[1]]];
    var result = [...tokenStream];
    
    assert.deepEqual(result, expected);
  });

  test('Using iterator operations on entries() gets correct values', function() {
    var values = ['test', new CSSVariableReferenceValue('var', new CSSTokenStreamValue(['1']))];
    var expectedEntries = [[0, values[0]], [1, values[1]]];

    var tokenStreamValue = new CSSTokenStreamValue(values);

    // One by one
    assert.deepEqual(
        iteratorExpansionUsingNext(tokenStreamValue.entries()),
        expectedEntries);
    // for..of
    assert.deepEqual(
        iteratorExpansionUsingForOf(tokenStreamValue.entries()),
        expectedEntries);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.entries()], expectedEntries);
  });

  test('Using iterator operations on keys() gets correct values', function() {
    var values = ['test', new CSSVariableReferenceValue('var', new CSSTokenStreamValue(['1']))];
    var expectedKeys = [0, 1];
    var tokenStreamValue = new CSSTokenStreamValue(values);

    // One by one
    assert.deepEqual(
        iteratorExpansionUsingNext(tokenStreamValue.keys()),
        expectedKeys);
    // for..of
    assert.deepEqual(
        iteratorExpansionUsingForOf(tokenStreamValue.keys()),
        expectedKeys);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.keys()], expectedKeys);
  });

  test('Using iterator operations on values() gets correct values', function() {
    var inputValues = ['test', new CSSVariableReferenceValue('var', new CSSTokenStreamValue(['1']))];
    var tokenStreamValue = new CSSTokenStreamValue(inputValues);
    // One by one
    assert.deepEqual(
        iteratorExpansionUsingNext(tokenStreamValue.values()),
        inputValues);
    // for..of
    assert.deepEqual(
        iteratorExpansionUsingForOf(tokenStreamValue.values()),
        inputValues);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.values()], inputValues);
  });

});
