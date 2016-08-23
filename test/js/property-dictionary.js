suite('PropertyDictionary', function() {
  setup(function() {
    cssPropertyDictionary = typedOM.internal.propertyDictionary();
  });

  test('The isSupportedProperty method should return true if the input is a valid CSS property', function() {
    assert.isTrue(cssPropertyDictionary.isSupportedProperty('height'));
  });

  test('The isSupportedProperty method should return false if the input is not a valid CSS property', function() {
    assert.isFalse(cssPropertyDictionary.isSupportedProperty('lemons'));
  });

  test('The _lengthValueHasPercentage method should return true if a CSSCalcLength object has a' +
      'value that is not null for its percent property', function() {
    assert.isTrue(cssPropertyDictionary._lengthValueHasPercentage(new CSSCalcLength({percent: 10})));
  });

  test('The _lengthValueHasPercentage method should return true if a CSSSimpleLength object has a type of percent', function() {
    assert.isTrue(cssPropertyDictionary._lengthValueHasPercentage(new CSSSimpleLength(10, 'percent')));
  });

  test('The isValidInput method should return true if the property can accept the style value entered', function() {
    assert.isTrue(cssPropertyDictionary.isValidInput('height', new CSSSimpleLength(9.2, 'px')));
    assert.isTrue(cssPropertyDictionary.isValidInput('pitch-range', new CSSNumberValue(5)));
  });

  test('The isValidInput method should return false if the property can\'t accept the style value entered' , function() {
    assert.isFalse(cssPropertyDictionary.isValidInput('height', new CSSNumberValue(5)));
  });

  test('The isValidInput method should return true when a percentage type CSSLengthValue is given as input' +
      'with a CSS property that can accept percentage types', function() {
    assert.isTrue(cssPropertyDictionary.isValidInput('height', new CSSSimpleLength(9.2, 'percent')));
  });

  test('The isValidInput method should return false when a percentage type CSSLengthValue is given as input' +
      'with a CSS property that cannot accept percentage types', function() {
    assert.isFalse(cssPropertyDictionary.isValidInput('border-top-width', new CSSCalcLength({percent: 10})));
  });

  test('The isValidInput method should return true when a CSSKeywordValue object contains a keyword' +
      'that is accepted by the CSS property', function() {
    assert.isTrue(cssPropertyDictionary.isValidInput('height', new CSSKeywordValue('inherit')));
  });

  test('The isValidInput method should return false when a CSSKeywordValue object contains a keyword' +
      'that is not accepted by the CSS property', function() {
    assert.isFalse(cssPropertyDictionary.isValidInput('height', new CSSKeywordValue('unset')));
  });

  test('the isListValuedProperty method should return true if the property accepts list values' +
      'and false if it does not', function() {
    assert.isTrue(cssPropertyDictionary.isListValuedProperty('animation-iteration-count'));
    assert.isFalse(cssPropertyDictionary.isListValuedProperty('height'));
  });

  test('listValueSeparator method should return the string used to separate a list of CSSStyleValue strings' +
      'for a given property', function() {

    assert.strictEqual(cssPropertyDictionary.listValueSeparator('animation-iteration-count'), ',');
  });

  test('listValueSeparator method should throw a TypeError if the property entered does not support list values', function() {

    assert.throw(function () {cssPropertyDictionary.listValueSeparator('height')}, TypeError);
  });

  test('supportedStyleValues should return an array of constructors for all CSSStyleValue types accepted by that property', function() {
    var styleValueArray = cssPropertyDictionary.supportedStyleValues('height');

    assert.strictEqual(styleValueArray[0], CSSLengthValue);
  });

  test('supportedStyleValues should throw a type error for unsupported properties', function() {

    assert.throw(function () {cssPropertyDictionary.supportedStyleValues('lemon');}, TypeError);
  });
});
