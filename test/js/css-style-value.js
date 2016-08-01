suite('CSSStyleValue', function() {
  test('parse successfully creates a CSSKeywordValue object if the cssText is a valid keyword for a property', function() {
    var keywordValueArray = CSSStyleValue.parse('height', 'auto');

    assert.strictEqual(keywordValueArray[0].cssText, 'auto');
  });

  test('parse successfully creates a CSSLengthValue object if the cssText is a valid and the property supports lengthValues', function() {
    var keywordValueArray = CSSStyleValue.parse('height', 'calc(10px + 3em)');

    assert.strictEqual(keywordValueArray[0].cssText, 'calc(10px + 3em)');
  });

  test('parse should be case insensitive', function() {
    var keywordValueArray = CSSStyleValue.parse('height', 'CaLc(10px + 3em)');

    assert.strictEqual(keywordValueArray[0].cssText, 'calc(10px + 3em)');
  });

  // Skipping until parse is hooked up through methods other than .from
  test.skip('parse successfully creates an array of CSSStyleValue objects if the cssText is a valid list of values ' +
    'for a property', function() {
    var keywordValueArray = CSSStyleValue.parse('animation-iteration-count', 'infinite, 4, 5, 7, 9');

    assert.deepEqual(keywordValueArray, [new CSSKeywordValue('infinite'), new CSSNumberValue(4), new CSSNumberValue(5), new CSSNumberValue(7), new CSSNumberValue(9)]);
  });

  test('parse throws an error if either the property or the cssText is not a string', function() {
    assert.throws(function() {CSSStyleValue.parse(4, 'auto')}, TypeError, 'Property name must be a string');
    assert.throws(function() {CSSStyleValue.parse('height', 5)}, TypeError, 'Must parse a string');
  });

  test('parse throws an error if an unsupported property is entered', function() {
    assert.throws(function() {CSSStyleValue.parse('lemons', '10px')}, TypeError, 'Can\'t parse an unsupported property.');
  });

  test('parse throws an error if a cssText representing a CSSStyleValue type unsupported by a property is entered', function() {
    assert.throws(function() {CSSStyleValue.parse('height', '10')}, TypeError, 'height has an unsupported CSSStyleValue type or Sequence value separator');
  });

  test('instantiating CSSStyleValue throws', function() {
    assert.throws(function() {new CSSStyleValue('10px')}, TypeError, 'CSSStyleValue cannot be instantiated.');
  });

  test('internal.CSSStyleValue can be constructed and appears to be a regular CSSStyleValue', function() {
    var internalStyleValue;
    assert.doesNotThrow(function() { internalStyleValue = new typedOM.internal.CSSStyleValue('foo'); });
    assert.strictEqual(internalStyleValue.cssText, 'foo');
    assert.strictEqual(internalStyleValue.constructor, CSSStyleValue);
  });
});
