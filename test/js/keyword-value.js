suite('KeywordValue', function() {
  test('KeywordValue is a KeywordValue and a StyleValue', function() {
    var keywordValue = new KeywordValue('initial');
    assert.instanceOf(keywordValue, KeywordValue,
      'A new KeywordValue should be an instance of KeywordValue');
    assert.instanceOf(keywordValue, StyleValue,
      'A new KeywordValue should be an instance of StyleValue');
  });

  test('KeywordValue.cssString and KeywordValue.keywordValue are correctly ' +
      'initialized', function() {
    var keywordValue = new KeywordValue('initial');
    var cssString = 'initial';
    assert.strictEqual(keywordValue.keywordValue, cssString);
    assert.strictEqual(keywordValue.cssString, cssString);
  });

  test('KeywordValue constructor throws an exception for invalid inputs', function() {
    assert.throws(function() { new KeywordValue(); });
    assert.throws(function() { new KeywordValue(1); });
    assert.throws(function() { new KeywordValue(''); });
    assert.throws(function() { new KeywordValue(null); });
    assert.throws(function() { new KeywordValue(true); });
  });
});
