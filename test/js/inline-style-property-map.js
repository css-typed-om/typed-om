suite('InlineStylePropertyMap', function() {
	setup(function() {
    this.element = document.createElement('div');
    document.documentElement.appendChild(this.element);
    this.element.style.opacity = '0.5';
  });
  teardown(function() {
    document.documentElement.removeChild(this.element);
  });

	test('Test that a new InlineStylePropertyMap is created when a HTML element referance calls the' +
		'styleMap method', function() {
			inlineStyleMap = this.element.styleMap();
			assert.instanceOf(inlineStyleMap, InlineStylePropertyMap, 'The styleMap method should return an instance of InlineStylePropertyMap');
  });
});