suite('Computed StylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.element.style.opacity = 0.5;
  });
  teardown(function() {
    document.body.removeChild(this.element);
  });

  test('get method returns a null object if the property is not supported', function() {
    var computedStyleMap = getComputedStyleMap(this.element);
    var propertyStyleValue = computedStyleMap.get('lemon');

    assert.equal(propertyStyleValue, null);
  });

  test('get method returns a NumberValue object if CSS property is set to a number', function() {
    var computedStyleMap = getComputedStyleMap(this.element);
    var propertyStyleValue = computedStyleMap.get('opacity');

    assert.instanceOf(propertyStyleValue, NumberValue);
    assert.strictEqual(propertyStyleValue.cssString, '0.5');
  });
});
