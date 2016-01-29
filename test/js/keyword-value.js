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

  test('KeywordValue should convert all strings to lower case', function() {
    var keywordValue = new KeywordValue('Initial');
    var cssString = 'initial';
    assert.strictEqual(keywordValue.keywordValue, cssString);
    assert.strictEqual(keywordValue.cssString, cssString);

    var keywordValue = new KeywordValue('HeLlO');
    var cssString = 'hello';
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

  test('parse method should create a KeywordValue object with a cssString equal to the input', function() {
    assert.strictEqual(KeywordValue.parse('auto').cssString, 'auto');
  });

  test('parse method should throw an error if its input is not a string', function() {
    assert.throws(function() { KeywordValue.parse(3) }, TypeError, 'Keyword value must be a non-empty string.');
  });

  test('parse method should throw an error if its input is an empty string', function() {
    assert.throws(function() { KeywordValue.parse('') }, TypeError, 'Keyword value must be a non-empty string.');
  });
});
