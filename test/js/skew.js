suite('Skew', function() {
  test('Skew is a Skew and TransformComponent', function() {
    var skew = new Skew(1, 2);
    assert.instanceOf(skew, Skew, 'A new Skew should be an instance of Skew');
    assert.instanceOf(skew, TransformComponent,
        'A new Skew should be an instance of TransformComponent');
  });

  test('Skew constructor throws exception for invalid types', function() {
    assert.throws(function() {new Skew()});
    assert.throws(function() {new Skew({})});
    assert.throws(function() {new Skew({}, {})});
    assert.throws(function() {new Skew(1)});
    assert.throws(function() {new Skew('1', '2')});
    assert.throws(function() {new Skew(3, null)});
    assert.throws(function() {new Skew(1, 2, 3)});
  });

  test('Skew constructor works correctly', function() {
    var skew;
    assert.doesNotThrow(function() {skew = new Skew(30, 180)});
    assert.strictEqual(skew.cssString, 'skew(30, 180)');
    assert.strictEqual(skew.ax, 30);
    assert.strictEqual(skew.ay, 180);
    assert.isTrue(skew.is2DComponent());

    var tanAx = Skew._tanDegrees(30);
    var tanAy = Skew._tanDegrees(180);

    var expectedMatrix = new Matrix(1, tanAy, tanAx, 1, 0, 0);
    assert.strictEqual(skew.asMatrix().cssString, expectedMatrix.cssString);
    assert.deepEqual(skew.asMatrix(), expectedMatrix);
  });

  test('Skew._tanDegrees works correctly', function() {
    var delta = 0.000001;
    assert.closeTo(Skew._tanDegrees(0), Math.tan(0), delta);
    assert.closeTo(Skew._tanDegrees(30), Math.tan(Math.PI / 6), delta);
    assert.closeTo(Skew._tanDegrees(60), Math.tan(Math.PI / 3), delta);
    assert.closeTo(Skew._tanDegrees(180), Math.tan(Math.PI), delta);
  });
});
