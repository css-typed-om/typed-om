suite('CSSKeywordValue', function() {
  test('CSSKeywordValue is a CSSKeywordValue and a CSSStyleValue', function() {
    var keywordValue = new CSSKeywordValue('initial');
    assert.instanceOf(keywordValue, CSSKeywordValue,
      'A new CSSKeywordValue should be an instance of CSSKeywordValue');
    assert.instanceOf(keywordValue, CSSStyleValue,
      'A new CSSKeywordValue should be an instance of CSSStyleValue');
  });

  test('CSSKeywordValue.cssString and CSSKeywordValue.keywordValue are correctly ' +
      'initialized', function() {
    var keywordValue = new CSSKeywordValue('initial');
    var cssString = 'initial';
    assert.strictEqual(keywordValue.keywordValue, cssString);
    assert.strictEqual(keywordValue.cssString, cssString);
  });

  test('cssString returns a string with the same format as CSS.escape()', function() {
    assert.strictEqual(new CSSKeywordValue('initial').cssString, 'initial');
    assert.strictEqual(new CSSKeywordValue('center').cssString, 'center');
    assert.strictEqual(new CSSKeywordValue('customLemon').cssString, 'customLemon');
    assert.strictEqual(new CSSKeywordValue(' Hello World').cssString, CSS.escape(' Hello World'));
    assert.strictEqual(new CSSKeywordValue('3').cssString, CSS.escape('3'));
  });

  test('keywordValue returns a string equal to the string used in the constructor', function() {
    assert.strictEqual(new CSSKeywordValue('initial').keywordValue, 'initial');
    assert.strictEqual(new CSSKeywordValue('center').keywordValue, 'center');
    assert.strictEqual(new CSSKeywordValue('customLemon').keywordValue, 'customLemon');
    assert.strictEqual(new CSSKeywordValue(' Hello World').keywordValue, ' Hello World');
    assert.strictEqual(new CSSKeywordValue('3').keywordValue, '3');
  });

  test('CSSKeywordValue constructor throws an exception for invalid inputs', function() {
    assert.throws(function() { new CSSKeywordValue(); });
    assert.throws(function() { new CSSKeywordValue(1); });
    assert.throws(function() { new CSSKeywordValue(''); });
    assert.throws(function() { new CSSKeywordValue(null); });
    assert.throws(function() { new CSSKeywordValue(true); });
  });

  test('from method should create a CSSKeywordValue object with a cssString equal to the input', function() {
    assert.strictEqual(CSSKeywordValue.from('auto').cssString, 'auto');
  });

  test('from method should throw an error if its input is not a string', function() {
    assert.throws(function() { CSSKeywordValue.from(3) }, TypeError, 'Keyword value must be a non-empty string.');
  });

  test('from method should throw an error if its input is an empty string', function() {
    assert.throws(function() { CSSKeywordValue.from('') }, TypeError, 'Keyword value must be a non-empty string.');
  });
});
