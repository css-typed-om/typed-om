suite('TransformComponent', function() {
  test('TransformComponent is a TransformComponent', function() {
    var component = new TransformComponent();
    assert.instanceOf(component, TransformComponent,
      'A new TransformComponent should be an instance of TransformComponent');
  });

  test('asMatrix and is2DComponent methods throw errors', function() {
    var component = new TransformComponent();
    assert.throws(function() {component.asMatrix()});
    assert.throws(function() {component.is2DComponent()});
  });
});
