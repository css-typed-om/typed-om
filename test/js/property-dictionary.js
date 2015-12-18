suite('PropertyDictionary', function() {
  setup(function() {
    cssPropertyDictionary = propertyDictionary();
  });

  test('The isSupportedProperty method should return true if the input is a valid CSS property', function() {
    assert.isTrue(cssPropertyDictionary.isSupportedProperty('height'));
  });

  test('The isSupportedProperty method should return false if the input is not a valid CSS property', function() {
    assert.isFalse(cssPropertyDictionary.isSupportedProperty('lemons'));
  });

  test('The _lengthValueHasPercentage method should return true if a CalcLength object has a' +
      'value that is not null for its percent property', function() {
    assert.isTrue(cssPropertyDictionary._lengthValueHasPercentage(new CalcLength({percent: 10})));
  });

  test('The _lengthValueHasPercentage method should return true if a SimpleLength object has a type of percent', function() {
    assert.isTrue(cssPropertyDictionary._lengthValueHasPercentage(new SimpleLength(10, 'percent')));
  });

  test('The isValidInput method should return true if the property can accept the style value entered', function() {
    assert.isTrue(cssPropertyDictionary.isValidInput('height', new SimpleLength(9.2, 'px')));
    assert.isTrue(cssPropertyDictionary.isValidInput('lineHeight', new NumberValue(5)));
  });

  test('The isValidInput method should return false if the property can\'t accept the style value entered' , function() {
    assert.isFalse(cssPropertyDictionary.isValidInput('height', new NumberValue(5)));
  });

  test('The isValidInput method should return true when a percentage type LengthValue is given as input' +
      'with a CSS property that can accept percentage types', function() {
    assert.isTrue(cssPropertyDictionary.isValidInput('height', new SimpleLength(9.2, 'percent')));
  });

  test('The isValidInput method should return false when a percentage type LengthValue is given as input' +
      'with a CSS property that cannot accept percentage types', function() {
    assert.isFalse(cssPropertyDictionary.isValidInput('borderTopWidth', new CalcLength({percent: 10})));
  });

  test('The isValidInput method should return true when a KeywordValue object contains a keyword' +
      'that is accepted by the CSS property', function() {
    assert.isTrue(cssPropertyDictionary.isValidInput('height', new KeywordValue('inherit')));
  });

  test('The isValidInput method should return false when a KeywordValue object contains a keyword' +
      'that is not accepted by the CSS property', function() {
    assert.isFalse(cssPropertyDictionary.isValidInput('height', new KeywordValue('unset')));
  });

  test('the isListValuedProperty method should return true if the property accepts list values' +
      'and false if it does not', function() {
    assert.isTrue(cssPropertyDictionary.isListValuedProperty('animationIterationCount'));
    assert.isFalse(cssPropertyDictionary.isListValuedProperty('height'));
  });

  test('The getListValueSeparator method should return the string used to separate a list of StyleValue strings' +
      'for a given property', function() {

    assert.strictEqual(cssPropertyDictionary.getListValueSeparator('animationIterationCount'), ', ');
  });

  test('The getListValueSeparator method should throw a TypeError if the property entered does not support list values', function() {

    assert.throw(function() {cssPropertyDictionary.getListValueSeparator('height')}, TypeError);
  });
});
