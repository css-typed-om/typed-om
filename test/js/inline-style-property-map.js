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

  test('The delete method removes any StyleValue assigned to the CSS style property inputed', function() {
    var inlineStyleMap = this.element.styleMap();
    this.element.style.height = '10px';
    inlineStyleMap.delete('height');

    assert.strictEqual(this.element.style['height'], '');
  });

  test('The delete method should throw a TypeError if an unsupported property is given as input', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.delete('lemons')}, TypeError);
  });

  test('The has method will return true if the valid CSS property input has been assigned a value' +
    'or false if it has not been assigned a value', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.isTrue(inlineStyleMap.has('opacity'));
    assert.isFalse(inlineStyleMap.has('height'));
  });

  test('The has method should throw a TypeError if an unsupported property is given as input', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.has('lemons')}, TypeError);
  });

  test('The append method should successfully append a valid CSS values to a property ' +
      'that supports list values', function() {
    this.element.style['animationIterationCount'] = 'infinite, 2, 5'; 
    var inlineStyleMap = this.element.styleMap();
    inlineStyleMap.append('animationIterationCount', new NumberValue(4));

    assert.strictEqual(this.element.style['animationIterationCount'], 'infinite, 2, 5, 4');
  });

  test('The append method should successfully append a list of valid CSS values to a property ' +
      'that supports list values', function() { 
    var inlineStyleMap = this.element.styleMap();
    var valueArray = [new NumberValue(4), new NumberValue(5), new KeywordValue('infinite')];
    this.element.style['animationIterationCount'] = 'infinite, 2, 5';
    inlineStyleMap.append('animationIterationCount', valueArray);

    assert.strictEqual(this.element.style['animationIterationCount'], 'infinite, 2, 5, 4, 5, infinite');
  });

  test('The append method should throw a TypeError if any index in the values array is not supported by ' +
    'the property', function() { 
    var inlineStyleMap = this.element.styleMap();
    var valueArray = [new NumberValue(4), new NumberValue(5), new SimpleLength(3, 'px'), new KeywordValue('infinite')];
    this.element.style['animationIterationCount'] = 'infinite, 2, 5';

    assert.throw(function() {inlineStyleMap.append('animationIterationCount', valueArray)}, TypeError);
  });

  test('The append method should throw a TypeError when an unsupported CSS property is entered', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('lemon', new NumberValue(4))}, TypeError);
  });

  test('The append method should throw a TypeError when a CSS property that does not support list values is entered', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('height', new NumberValue(4))}, TypeError);
  });

  test('The append method should throw a TypeError when null is entered as the value', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('height', null)}, TypeError);
  });
});
