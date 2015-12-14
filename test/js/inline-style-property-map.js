suite('Inline StylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.element.style.opacity = '0.5';
  });
  teardown(function() {
    document.body.removeChild(this.element);
  });

  test('Test that the Element.styleMap method returns a StylePropertyMap object', function() {
    var inlineStyleMap = this.element.styleMap();
    assert.instanceOf(inlineStyleMap, StylePropertyMap, 'The styleMap method should return an instance of InlineStylePropertyMap');
  });
});
