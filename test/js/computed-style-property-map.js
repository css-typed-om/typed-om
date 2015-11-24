suite('ComputedStylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.documentElement.appendChild(this.element);
    this.element.style.opacity = '0.5';
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
});
