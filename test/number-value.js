suite('NumberValue', function() {
  test('NumberValue is a NumberValue and a StyleValue', function() {
    var nv = new NumberValue(3);
    assert.instanceOf(nv, NumberValue);
    assert.instanceOf(nv, StyleValue);
  });
});