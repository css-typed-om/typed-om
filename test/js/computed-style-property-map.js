suite('Computed StylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.documentElement.appendChild(this.element);
    this.element.style.opacity = 0.5;
  });
  teardown(function() {
    document.documentElement.removeChild(this.element);
  });

  test('Computed StylePropertyMap.get works for properties that can be NumberValues', function() {
    var computedStyleMap = getComputedStyleMap(this.element);
    var opacity = computedStyleMap.get('opacity');
    assert.instanceOf(opacity, NumberValue);
    assert.equal(opacity.value, 0.5);
    assert.equal(opacity.cssString, '0.5');
  });

  test('window.getComputedStyleMap works', function() {
    var computedStyleMap = getComputedStyleMap(this.element);
    assert.instanceOf(computedStyleMap, typedOMTesting.StylePropertyMapReadOnly);
    var opacity = computedStyleMap.get('opacity');
    assert.instanceOf(opacity, NumberValue);
    assert.equal(opacity.value, 0.5);
    assert.equal(opacity.cssString, '0.5');
  });
});
