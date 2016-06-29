suite('CSSTransformComponent', function() {
  test('asMatrix and is2DComponent methods throw errors', function() {
    var component = new CSSTransformComponent();
    assert.throws(function() {component.asMatrix()});
    assert.throws(function() {component.is2DComponent()});
  });
});
