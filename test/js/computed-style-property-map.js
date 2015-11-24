suite('ComputedStylePropertyMap', function() {
  test('ComputedStylePropertyMap is a ComputedStylePropertyMap and a StylePropertyMap', function() {
  	var element = document.createElement('div');
    var computedStyleMap = new ComputedStylePropertyMap(element);
    assert.instanceOf(computedStyleMap, ComputedStylePropertyMap);
    assert.instanceOf(computedStyleMap, typedOMTesting.StylePropertyMap);
  });
});