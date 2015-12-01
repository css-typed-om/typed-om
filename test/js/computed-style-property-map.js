suite('ComputedStylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.documentElement.appendChild(this.element);
    this.element.style.opacity = '0.5';
    this.element.style.height = '100px';
    this.element.style.width = 'calc(50px+10em)';
    this.element.style.right = 'inherit';
  });
  teardown(function() {
    document.documentElement.removeChild(this.element);
  });

  test('ComputedStylePropertyMap is a ComputedStylePropertyMap and a StylePropertyMap', function() {
    var computedStyleMap = new ComputedStylePropertyMap(this.element);
    assert.instanceOf(computedStyleMap, ComputedStylePropertyMap);
    assert.instanceOf(computedStyleMap, typedOMTesting.StylePropertyMap);
  });

  test('ComputedStylePropertyMap.get works for properties that can only be NumberValues', function() {
    var computedStyleMap = new ComputedStylePropertyMap(this.element);
    var opacity = computedStyleMap.get('opacity');
    assert.instanceOf(opacity, NumberValue);
    assert.equal(opacity.value, 0.5);
    assert.equal(opacity.cssString, '0.5');
  });

  test('window.getComputedStyleMap works', function() {
    var computedStyleMap = getComputedStyleMap(this.element);
    assert.instanceOf(computedStyleMap, typedOMTesting.StylePropertyMap);
    var opacity = computedStyleMap.get('opacity');
    assert.instanceOf(opacity, NumberValue);
    assert.equal(opacity.value, 0.5);
    assert.equal(opacity.cssString, '0.5');
  });

  test('ComputedStylePropertyMap.get works for KeywordValues', function() {
    var computedStyleMap = new ComputedStylePropertyMap(this.element);
    var right = computedStyleMap.get('right');
    assert.instanceOf(right, KeywordValue);
    assert.instanceOf(right, StyleValue);
    // 'inherit' resolves to 'auto' in this case.
    assert.equal(right.keywordValue, 'auto');
    assert.equal(right.cssString, 'auto');
  });

  test.skip('ComputedStylePropertyMap.get works for properties that can only be LengthValues', function() {
    var computedStyleMap = new ComputedStylePropertyMap(this.element);
    var height = computedStyleMap.get('height');
    assert.instanceOf(height, LengthValue);
    assert.instanceOf(height, SimpleLength);
    assert.equal(height.value, 100);
    assert.equal(height.type, 'px');
    assert.equal(height.cssString, '100px');
  });

  test.skip('ComputedStylePropertyMap.get works for properties with CalcLengths', function() {
    var computedStyleMap = new ComputedStylePropertyMap(this.element);
    var width = computedStyleMap.get('width');
    assert.instanceOf(width, LengthValue);
    assert.instanceOf(width, CalcLength);
    assert.equal(width.px, 50);
    assert.equal(width.em, 10);
    assert.equal(width.cssString, 'calc(50px+10em)');
  });
});
