suite('CSSTokenStreamValue', function() {
  test("CSSTokenStreamValue is a CSSTokenStreamValue and CSSStyleValue", function() {
    assert.instanceOf(new CSSTokenStreamValue(), CSSTokenStreamValue);
    assert.instanceOf(new CSSTokenStreamValue(), CSSStyleValue);
  });

  test('Values not an array throws', function() {
    assert.throw(function() { new internal.CSSTokenStreamValue(1); }, TypeError, 'CSSTokenStreamValue should be an array of string or CSSVariableReferenceValue');
    assert.throw(function() { new internal.CSSTokenStreamValue("123"); }, TypeError, 'CSSTokenStreamValue should be an array of string or CSSVariableReferenceValue');
    assert.throw(function() { new internal.CSSTokenStreamValue({ h:10, w:5, d:4, t:"5" });}, TypeError, 'CSSTokenStreamValue should be an array of string or CSSVariableReferenceValue');
  });

  test('Values not an array of string or CSSVariableReferenceValue throws', function() {
    assert.throw(function() { new CSSTokenStreamValue([1]); }, TypeError, "CSSTokenStreamValue\'s elements should be string or CSSVariableReferenceValue");
    assert.throw(function() { new CSSTokenStreamValue(["1234", "2342", 1]); }, TypeError, "CSSTokenStreamValue\'s elements should be string or CSSVariableReferenceValue");
  });

  test('keys() must be an iterator of an array that stores the indices', function() {
    var values = ['test', '12345', new CSSVariableReferenceValue('var', new typedOM.internal.CSSTokenStreamValue(['1'])), 'a2'];
    var tokenStreamValues = new typedOM.internal.CSSTokenStreamValue(values);
    var keys = tokenStreamValues.keys();
    for (var i = 0; i < values.length; i++) {
      var temp = keys.next();
      assert.strictEqual(temp.done, false, '\'done\' should be false');
      assert.strictEqual(temp.value, i, '\'value\' should be equal to index');
    }
    var temp = keys.next();
    assert.strictEqual(temp.done, true, '\'done\' should be true at the end');
    assert.strictEqual(temp.value, undefined, '\'value\' should be undefined at the end');
  });

  test('values() must be an iterator of an array that stores the values', function() {
    var values = ['test', '12345', new CSSVariableReferenceValue('var', new typedOM.internal.CSSTokenStreamValue(['1'])), 'a2'];
    var tokenStreamValues = new typedOM.internal.CSSTokenStreamValue(values);
    var streamValues = tokenStreamValues.values();
    for (var i = 0; i < values.length; i++) {
      var temp = streamValues.next();
      assert.strictEqual(temp.done, false, '\'done\' should be false');
      assert.strictEqual(temp.value, values[i], '\'value\' should be equal to value at the constructor' + i);
    }
    var temp = streamValues.next();
    assert.strictEqual(temp.done, true, '\'done\' should be true at the end');
    assert.strictEqual(temp.value, undefined, '\'value\' should be undefined at the end');
  });

  test('entries() must be an iterator of an array that stores array of [index, value]', function() {
    var values = ['test', '12345', new CSSVariableReferenceValue('var', new typedOM.internal.CSSTokenStreamValue(['1'])), 'a2'];
    var tokenStreamValues = new typedOM.internal.CSSTokenStreamValue(values);
    var entries = tokenStreamValues.entries();
    for (var i = 0; i < values.length; i++) {
      var temp = entries.next();
      assert.strictEqual(temp.done, false, '\'done\' should be false');
      assert.strictEqual(temp.value.length, 2, '\'value\' should have length = 2');
      assert.strictEqual(temp.value[0], i, '\'value[0]\' should be equal to index');
      assert.strictEqual(temp.value[1], values[i], '\'value[1]\' should be equal to value');
    }
    var temp = entries.next();
    assert.strictEqual(temp.done, true, '\'done\' should be true at the end');
    assert.strictEqual(temp.value, undefined, '\'value\' should be undefined at the end');
  });
});
