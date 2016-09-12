suite('CSSVariableReferenceValue', function() {
  test('The new CSSVariableReferenceValue attributes are correct', function() {
    var expectedVariable = 'anything';
    var expectedFallback = new CSSUnparsedValue(["123"]);
    var referenceValue = new CSSVariableReferenceValue(expectedVariable, expectedFallback);
    assert.instanceOf(referenceValue, CSSVariableReferenceValue,
      'A new CSSVariableReferenceValue should be an instance of CSSVariableReferenceValue');
    assert.strictEqual(referenceValue.variable, expectedVariable,
      'A new CSSVariableReferenceValue\'s variable should be the same as its constructor');
    assert.strictEqual(referenceValue.fallback, expectedFallback,
      'A new CSSVariableReferenceValue\'s fallback should be the same as its constructor');
  });

  test('Constructor only accepts a string and a CSSUnparsedValue', function() {
    assert.throw(function() { new CSSVariableReferenceValue(); }, TypeError, 'CSSVariableReferenceValue constructor should get two parameters');
    assert.throw(function() { new CSSVariableReferenceValue("123"); }, TypeError, 'CSSVariableReferenceValue constructor should get two parameters');
    assert.throw(function() { new CSSVariableReferenceValue(1234, 1234); }, TypeError, 'Variable of CSSVariableReferenceValue must be a string');
    assert.throw(function() { new CSSVariableReferenceValue(["1"], 1234); }, TypeError, 'Variable of CSSVariableReferenceValue must be a string');
    assert.throw(function() { new CSSVariableReferenceValue("123", 1234); }, TypeError, 'Fallback of CSSVariableReferenceValue must be a CSSUnparsedValue');
  });

  test('CSSVariableReferenceValue can have undefined fallback', function() {
    assert.doesNotThrow(function() { new CSSVariableReferenceValue("--var", undefined); });
  })
});
