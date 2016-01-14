suite('Computed StylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.element.style.opacity = 0.5;
  });
  teardown(function() {
    document.body.removeChild(this.element);
  });

  test('get method throws a TypeError if the property is not supported', function() {
    var computedStyleMap = getComputedStyleMap(this.element);

    assert.throw(function() {computedStyleMap.get('lemon')}, TypeError,
      'lemon is not a supported CSS property');
  });

  test('get method returns a NumberValue object if CSS property is set to a number', function() {
    var computedStyleMap = getComputedStyleMap(this.element);
    var propertyStyleValue = computedStyleMap.get('opacity');

    assert.instanceOf(propertyStyleValue, NumberValue);
    assert.strictEqual(propertyStyleValue.cssString, '0.5');
  });

  test('get method returns the first StyleValue in the sequence if a property has been set a sequence ' +
    'of StyleValues', function() {
    var inlineStyleMap = this.element.styleMap();
    var computedStyleMap = getComputedStyleMap(this.element);
    var valueArray = [new NumberValue(4), new NumberValue(5), new KeywordValue('infinite')];
    inlineStyleMap.set('animation-iteration-count', valueArray);
    var propertyStyleValue = computedStyleMap.get('animation-iteration-count');

    assert.instanceOf(propertyStyleValue, NumberValue);
    assert.strictEqual(propertyStyleValue.cssString, '4');
  });

  test('getProperties returns an ordered list of properties that have been set on an element', function() {
    var inlineStyleMap = this.element.styleMap();
    this.element.style['opacity'] = '0.5';
    this.element.style['height'] = '5px';
    this.element.style['border-top-color'] = 'initial';
    this.element.style['border-top-width'] = 'initial';

    assert.deepEqual(inlineStyleMap.getProperties(), ['opacity', 'height', 'border-top-color', 'border-top-width']);
  });

  test('getAll method returns an array containing the sequence of StyleValues set on a property', function() {
    var inlineStyleMap = this.element.styleMap();
    var computedStyleMap = getComputedStyleMap(this.element);
    var valueArray = [new NumberValue(4), new NumberValue(5), new KeywordValue('infinite')];
    inlineStyleMap.set('animation-iteration-count', valueArray);
    var propertyStyleValue = computedStyleMap.getAll('animation-iteration-count');

    assert.strictEqual(propertyStyleValue[0].cssString, '4');
    assert.strictEqual(propertyStyleValue[1].cssString, '5');
    assert.strictEqual(propertyStyleValue[2].cssString, 'infinite');
  });

  test('getAll method returns an array of size 1 if only a single StyleValue is set on a property', function() {
    var computedStyleMap = getComputedStyleMap(this.element);
    var propertyStyleValue = computedStyleMap.getAll('opacity');

    assert.strictEqual(propertyStyleValue.length, 1);
    assert.strictEqual(propertyStyleValue[0].cssString, '0.5');
  });

  test('getAll method throws a TypeError if the property is not supported', function() {
    var computedStyleMap = getComputedStyleMap(this.element);

    assert.throw(function() {computedStyleMap.getAll('lemon')}, TypeError,
      'lemon is not a supported CSS property');
  });
});
