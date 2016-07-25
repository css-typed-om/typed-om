suite('CSSTransformComponent', function() {

test('Parsing delegates correctly', function() {
  consumeTransformComponent = typedOM.internal.parsing.consumeTransformComponent;
  assert.isNotNull(consumeTransformComponent('matrix(1,2,3,4,5,6)'));
  assert.isNotNull(consumeTransformComponent('perspective(5px)'));
  assert.isNotNull(consumeTransformComponent('rotate(30deg)'));
  assert.isNotNull(consumeTransformComponent('scale(2)'));
  // assert.isNotNull(consumeTransformComponent('skew(10deg)'));
  // assert.isNotNull(consumeTransformComponent('translate(30px)'));
});

});
