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
    var entries = [];
    var iterator = tokenStreamValue.entries();
    var entry = iterator.next();
    while (!entry.done) {
      entries.push(entry.value);
      entry = iterator.next();
    }
    assert.deepEqual(entries, expectedEntries);
    // for..of
    var forOfEntries = [];
    for (let value of tokenStreamValue.entries()) {
      forOfEntries.push(value);
    }
    assert.deepEqual(forOfEntries, expectedEntries);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.entries()], expectedEntries);
  });

  test('Using iterator operations on keys() gets correct values', function() {
    var values = ['test', new CSSVariableReferenceValue('var', new CSSTokenStreamValue(['1']))];
    var expectedKeys = [0, 1];
    var tokenStreamValue = new CSSTokenStreamValue(values);

    // One by one
    var keys = [];
    var iterator = tokenStreamValue.keys();
    var entry = iterator.next();
    while (!entry.done) {
      keys.push(entry.value);
      entry = iterator.next();
    }
    assert.deepEqual(keys, expectedKeys);
    // for..of
    var forOfKeys = [];
    for (let value of tokenStreamValue.keys()) {
      forOfKeys.push(value);
    }
    assert.deepEqual(forOfKeys, expectedKeys);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.keys()], expectedKeys);
  });

  test('Using iterator operations on values() gets correct values', function() {
    var inputValues = ['test', new CSSVariableReferenceValue('var', new CSSTokenStreamValue(['1']))];
    var tokenStreamValue = new CSSTokenStreamValue(values);
    // One by one
    var values = [];
    var iterator = tokenStreamValue.values();
    var entry = iterator.next();
    while (!entry.done) {
      values.push(entry.value);
      entry = iterator.next();
    }
    assert.deepEqual(values, inputValues);
    // for..of
    var forOfValues = [];
    for (let value of tokenStreamValue.values()) {
      forOfValues.push(value);
    }
    assert.deepEqual(forOfValues, inputValues);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.values()], inputValues);
  });

});
