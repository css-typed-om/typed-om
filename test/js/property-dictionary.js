suite('PropertyDictionary', function() {
  setup(function() {
    propertyDictionary = getInstance();
  });

  test('The isProperty method should return true if the input is a valid CSS property', function() {
    assert.isTrue(propertyDictionary.isProperty('height'));
  });

  test('The isProperty method should return false if the input is not a valid CSS property', function() {
    assert.isFalse(propertyDictionary.isProperty('lemons'));
  });

  test('The _lengthValueHasPercentage method should return true if a CalcLength object has a' +
      'value that is not null for its percent property', function() {
    assert.isTrue(propertyDictionary._lengthValueHasPercentage(new CalcLength({percent: 10})));
  });

  test('The _lengthValueHasPercentage method should return true if a SimpleLength object has a type of percent', function() {
    assert.isTrue(propertyDictionary._lengthValueHasPercentage(new SimpleLength(10, 'percent')));
  });

  test('The isValidInput method should return true if the property can accept the style value entered', function() {
    assert.isTrue(propertyDictionary.isValidInput('height', new SimpleLength(9.2, 'px')));
  });

  test('Testing the isValidInput method with a non Length value property' , function() {
    assert.isTrue(propertyDictionary.isValidInput('pitch-range', new NumberValue(5)));
  });

  test('The isValidInput method should return false if the property cant accept the style value entered' , function() {
    assert.isFalse(propertyDictionary.isValidInput('height', new NumberValue(5)));
  });

  test('The isValidInput method should return true when a percentage type LengthValue is given as input' +
      'with a CSS property that can accept percentage types', function() {
    assert.isTrue(propertyDictionary.isValidInput('height', new SimpleLength(9.2, 'percent')));
  });

  test('The isValidInput method should return false when a percentage type LengthValue is given as input' +
      'with a CSS property that cannot accept percentage types', function() {
    assert.isFalse(propertyDictionary.isValidInput('border-top-width', new CalcLength({percent: 10})));
  });

  test('The isValidInput method should return true when a KeywordValue object contains a keyword' +
      'that is accepted by the CSS property', function() {
    assert.isTrue(propertyDictionary.isValidInput('height', new KeywordValue('inherit')));
  });

  test('The isValidInput method should return false when a KeywordValue object contains a keyword' +
      'that is not accepted by the CSS property', function() {
    assert.isFalse(propertyDictionary.isValidInput('height', new KeywordValue('unset')));
  });
});
