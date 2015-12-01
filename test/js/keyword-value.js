suite('KeywordValue', function() {
  test('KeywordValue is a KeywordValue and a StyleValue', function() {
    var keywordValue = new KeywordValue('initial');
    assert.instanceOf(keywordValue, KeywordValue, 'A new KeywordValue should be an instance of KeywordValue');
    assert.instanceOf(keywordValue, StyleValue, 'A new KeywordValue should be an instance of StyleValue');
  });

  test('KeywordValue constructor throws exception for invalid values', function() {
    assert.throws(function() {new KeywordValue('a')});
    assert.throws(function() {new KeywordValue('')});
    assert.throws(function() {new KeywordValue(null)});
    assert.throws(function() {new KeywordValue(true)});
    assert.throws(function() {new KeywordValue()});
    assert.throws(function() {new KeywordValue({})});
  });

  test('KeywordValue.isKeywordValue is true for valid values', function() {
    assert.isTrue(KeywordValue.isKeywordValue('initial'));
    assert.isTrue(KeywordValue.isKeywordValue('inherit'));
    assert.isTrue(KeywordValue.isKeywordValue('revert'));
    assert.isTrue(KeywordValue.isKeywordValue('unset'));
  });

  test('KeywordValue.isKeywordValue is false for invalid values', function() {
    assert.isFalse(KeywordValue.isKeywordValue('i'));
    assert.isFalse(KeywordValue.isKeywordValue(''));
    assert.throws(function() {new KeywordValue(null)});
    assert.isFalse(KeywordValue.isKeywordValue(true));
    assert.isFalse(KeywordValue.isKeywordValue());
    assert.isFalse(KeywordValue.isKeywordValue({}));
  });

  test('KeywordValue.cssString and KeywordValue.keywordValue are correctly initialized', function() {
    var initial;
    var cssString = 'initial';
    assert.doesNotThrow(function() {initial = new KeywordValue(cssString)});
    assert.strictEqual(initial.keywordValue, cssString);
    assert.strictEqual(initial.cssString, cssString);
  });
});
