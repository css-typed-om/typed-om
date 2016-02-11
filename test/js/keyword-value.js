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

  test('cssString returns a string with the same format as CSS.escape()', function() {
    assert.strictEqual(new KeywordValue('initial').cssString, 'initial');
    assert.strictEqual(new KeywordValue('center').cssString, 'center');
    assert.strictEqual(new KeywordValue('customLemon').cssString, 'customLemon');
    assert.strictEqual(new KeywordValue(' Hello World').cssString, CSS.escape(' Hello World'));
    assert.strictEqual(new KeywordValue('3').cssString, CSS.escape('3'));
  });

  test('keywordValue returns a string equal to the string used in the constructor', function() {
    assert.strictEqual(new KeywordValue('initial').keywordValue, 'initial');
    assert.strictEqual(new KeywordValue('center').keywordValue, 'center');
    assert.strictEqual(new KeywordValue('customLemon').keywordValue, 'customLemon');
    assert.strictEqual(new KeywordValue(' Hello World').keywordValue, ' Hello World');
    assert.strictEqual(new KeywordValue('3').keywordValue, '3');
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
