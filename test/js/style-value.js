suite('StyleValue', function() {
  test('parse successfully creates a KeywordValue object if the cssString is a valid keyword for a property', function() {
    var keywordValueArray = StyleValue.parse('height', 'auto');

    assert.strictEqual(keywordValueArray[0].cssString, 'auto');
  });

  test('parse successfully creates a LengthValue object if the cssString is a valid and the property supports lengthValues', function() {
    var keywordValueArray = StyleValue.parse('height', 'calc(10px + 3em)');

    assert.strictEqual(keywordValueArray[0].cssString, 'calc(10px + 3em)');
  });

  test('parse should be case insensitive', function() {
    var keywordValueArray = StyleValue.parse('height', 'CaLc(10px + 3em)');

    assert.strictEqual(keywordValueArray[0].cssString, 'calc(10px + 3em)');
  });

  test('parse successfully creates an array of StyleValue objects if the cssString is a valid list of values ' +
    'for a property', function() {
    var keywordValueArray = StyleValue.parse('animation-iteration-count', 'infinite, 4, 5, 7, 9');

    assert.deepEqual(keywordValueArray, [new KeywordValue('infinite'), new NumberValue(4), new NumberValue(5), new NumberValue(7), new NumberValue(9)]);
  });

  test('parse throws an error if either the property or the cssString is not a string', function() {
    assert.throws(function() {StyleValue.parse(4, 'auto')}, TypeError, 'Property name must be a string');
    assert.throws(function() {StyleValue.parse('height', 5)}, TypeError, 'Must parse a string');
  });

  test('parse throws an error if an unsupported property is entered', function() {
    assert.throws(function() {StyleValue.parse('lemons', '10px')}, TypeError, 'Can\'t parse an unsupported property.');
  });

  test('parse throws an error if a cssString representing a StyleValue type unsupported by a property is entered', function() {
    assert.throws(function() {StyleValue.parse('height', '10')}, TypeError, 'height has an unsupported StyleValue type or Sequence value separator');
  });
});
