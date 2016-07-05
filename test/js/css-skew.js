suite('CSSSkew', function() {
  test('CSSSkew is a CSSSkew and CSSTransformComponent', function() {
    var skew = new CSSSkew(1, 2);
    assert.instanceOf(skew, CSSSkew, 'A new CSSSkew should be an instance of CSSSkew');
    assert.instanceOf(skew, CSSTransformComponent,
        'A new CSSSkew should be an instance of CSSTransformComponent');
  });

  test('CSSSkew constructor throws exception for invalid types', function() {
    assert.throws(function() {new CSSSkew()});
    assert.throws(function() {new CSSSkew({})});
    assert.throws(function() {new CSSSkew({}, {})});
    assert.throws(function() {new CSSSkew(1)});
    assert.throws(function() {new CSSSkew('1', '2')});
    assert.throws(function() {new CSSSkew(3, null)});
    assert.throws(function() {new CSSSkew(1, 2, 3)});
  });

  test('CSSSkew constructor works correctly', function() {
    var skew;
    assert.doesNotThrow(function() {skew = new CSSSkew(30, 180)});
    assert.strictEqual(skew.cssText, 'skew(30deg, 180deg)');
    assert.strictEqual(skew.ax, 30);
    assert.strictEqual(skew.ay, 180);
    assert.isTrue(skew.is2D());

    var tanAx = CSSSkew._tanDegrees(30);
    var tanAy = CSSSkew._tanDegrees(180);

    var expectedMatrix = new CSSMatrix(1, tanAy, tanAx, 1, 0, 0);
    assert.strictEqual(skew.asMatrix().cssText, expectedMatrix.cssText);
    assert.deepEqual(skew.asMatrix(), expectedMatrix);
  });

  test('CSSSkew._tanDegrees works correctly', function() {
    var delta = 0.000001;
    assert.closeTo(CSSSkew._tanDegrees(0), Math.tan(0), delta);
    assert.closeTo(CSSSkew._tanDegrees(30), Math.tan(Math.PI / 6), delta);
    assert.closeTo(CSSSkew._tanDegrees(60), Math.tan(Math.PI / 3), delta);
    assert.closeTo(CSSSkew._tanDegrees(180), Math.tan(Math.PI), delta);
  });
});
