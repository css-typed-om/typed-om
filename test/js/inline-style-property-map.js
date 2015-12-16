suite('Inline StylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.element.style.opacity = '0.5';
  });
  teardown(function() {
    document.body.removeChild(this.element);
  });

  test('The Element.styleMap method returns a StylePropertyMap object for that element', function() {
    var inlineStyleMap = this.element.styleMap();
    assert.instanceOf(inlineStyleMap, StylePropertyMap);
  });

  test('The set method successfully sets the CSS string of the StyleValue on an element', function() {
    var inlineStyleMap = this.element.styleMap();
    var simpleLength = new SimpleLength(9.2, 'percent');
    inlineStyleMap.set('height', simpleLength);

    assert.strictEqual(this.element.style['height'], simpleLength.cssString);
  });

  test('The set method should throw a TypeError if a non KeywordValue StyleValue unsupported by the CSS style property is set', function() {
    var inlineStyleMap = this.element.styleMap();
    var numberValue = new NumberValue(42);

    assert.throw(function() {inlineStyleMap.set('height', numberValue)}, TypeError);
  });

  test('The set method should throw a TypeError if a KeywordValue unsupported by the CSS style property is set ', function() {
    var inlineStyleMap = this.element.styleMap();
    var keyword = new KeywordValue('lemon');

    assert.throw(function() {inlineStyleMap.set('height', keyword)}, 'height does not take the keyword lemon');
  });

  test('The set method should throw a TypeError if a non StyleValue is inputed into the function', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.set('height', 4)}, TypeError);
  });

  test('The set method should throw a TypeError if an unsupported property is inputed into the function', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.set('lemons', new SimpleLength(3, 'px'))}, TypeError);
  });

  test('The delete method removes any set StyleValue from a valid CSS style property', function() {
    var inlineStyleMap = this.element.styleMap();
    this.element.style.height = '10px';
    inlineStyleMap.delete('height');

    assert.strictEqual(this.element.style['height'], '');
  });

  test('The delete method should throw a TypeError if an unsupported property is inputed into the function', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.delete('lemons')}, TypeError);
  });

  test('The has method will return true if a valid CSS property input has a set value' +
    'and false if it is not set', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.isTrue(inlineStyleMap.has('opacity'));
    assert.isFalse(inlineStyleMap.has('height'));
  });

  test('The has method should throw a TypeError if an unsupported property is inputed into the function', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.has('lemons')}, TypeError);
  });
});
