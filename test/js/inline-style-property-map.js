suite('Inline StylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.element.style.opacity = '0.5';
  });
  teardown(function() {
    document.body.removeChild(this.element);
  });

  test('Element.styleMap method returns a StylePropertyMap object for that element', function() {
    var inlineStyleMap = this.element.styleMap();
    assert.instanceOf(inlineStyleMap, StylePropertyMap);
  });

  test('The set method should correctly set a supported StyleValue to a CSS style property of an HTML element', function() {
    var inlineStyleMap = this.element.styleMap();
    var simpleLength = new SimpleLength(9.2, 'percent');
    inlineStyleMap.set('height', simpleLength);

    assert.strictEqual(this.element.style['height'], simpleLength.cssString);
  });

  test('The set method should correctly set a supported KeywordValue to a CSS style property of an HTML element', function() {
    var inlineStyleMap = this.element.styleMap();
    var keyword = new KeywordValue('auto');
    inlineStyleMap.set('height', keyword);

    assert.strictEqual(this.element.style['height'], keyword.cssString);
  });

  test('The set method should throw a TypeError if a StyleValue unsupported by the CSS style property is set', function() {
    var inlineStyleMap = this.element.styleMap();
    var numberValue = new NumberValue(42);

    assert.throw(function() {inlineStyleMap.set('height', numberValue)}, TypeError);
  });

  test('The set method should throw a TypeError if a KeywordValue unsupported by the CSS style property is set ', function() {
    var inlineStyleMap = this.element.styleMap();
    var keyword = new KeywordValue('lemon');

    assert.throw(function() {inlineStyleMap.set('height', keyword)}, TypeError);
  });
});
