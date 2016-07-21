suite('CSSScale', function() {
  test('CSSScale is a CSSScale and CSSTransformComponent', function() {
    var scale = new CSSScale(1, 2);
    assert.instanceOf(scale, CSSScale,
        'A new CSSScale should be an instance of CSSScale');
    assert.instanceOf(scale, typedOM.internal.CSSTransformComponent,
        'A new CSSScale should be an instance of CSSTransformComponent');
  });

  test('CSSScale constructor throws exception for invalid types', function() {
    assert.throws(function() {new CSSScale()});
    assert.throws(function() {new CSSScale({})});
    assert.throws(function() {new CSSScale(1)});
    assert.throws(function() {new CSSScale('1', '2')});
    assert.throws(function() {new CSSScale(3, 4, null)});
    assert.throws(function() {new CSSScale({x:1, y:2, z:4})});
  });

  test('CSSScale constructor works correctly for 2 arguments', function() {
    var scale;
    assert.doesNotThrow(function() {scale = new CSSScale(3, -1)});
    assert.strictEqual(scale.cssText, 'scale(3, -1)');
    assert.strictEqual(scale.x, 3);
    assert.strictEqual(scale.y, -1);
    assert.isNull(scale.z);
    assert.isTrue(scale.is2D);

    var expectedMatrix = new DOMMatrixReadonly([3, 0, 0, -1, 0, 0]);
    typedOM.internal.testing.matricesApproxEqual(scale.matrix, expectedMatrix);
  });

  test('CSSScale constructor works correctly for 3 arguments', function() {
    var scale;
    assert.doesNotThrow(function() {scale = new CSSScale(3, 0.5, -4)});
    assert.strictEqual(scale.cssText, 'scale3d(3, 0.5, -4)');
    assert.strictEqual(scale.x, 3);
    assert.strictEqual(scale.y, 0.5);
    assert.strictEqual(scale.z, -4);
    assert.isFalse(scale.is2D);

    var expectedMatrix = new DOMMatrixReadonly([3, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, -4, 0, 0, 0, 0, 1]);
    typedOM.internal.testing.matricesApproxEqual(scale.matrix, expectedMatrix);
  });

  test('Parsing valid strings results in CSSScale with correct values', function() {
    var values = [
      {str: 'scale(1.001)', x: 1.001, y: 1.001, z: null, remaining: ''},
      {str: 'ScAle(2)', x: 2, y: 2, z: null, remaining: ''},
      {str: 'scale(2, 3)', x: 2, y: 3, z: null, remaining: ''},
      {str: 'SCALE(2.2, 3)', x: 2.2, y: 3, z: null, remaining: ''},
      {str: 'scalex(4)', x: 4, y: 1, z: null, remaining: ''},
      {str: 'scaleX(5)bananas', x: 5, y: 1, z: null, remaining: 'bananas'},
      {str: 'scaley(6)', x: 1, y: 6, z: null, remaining: ''},
      {str: 'ScaleY(7) bananas', x: 1, y: 7, z: null, remaining: 'bananas'},
      {str: 'scalez(8) ', x: 1, y: 1, z: 8, remaining: ''},
      {str: 'ScaleZ(9) abc', x: 1, y: 1, z: 9, remaining: 'abc'},
      {str: 'scale3d(10, 11, 12) abc', x: 10, y: 11, z: 12, remaining: 'abc'},
      {str: 'Scale3D(13, 14, 15) abc', x: 13, y: 14, z: 15, remaining: 'abc'},
      {str: 'Scale3D(0.8, 2, 0.2)', x: 0.8, y: 2, z: 0.2, remaining: ''},
    ];
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumeScale(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse into a CSSScale');
      assert.strictEqual(parsed[1], values[i].remaining, values[i].str + ' should expected ' + values[i].remaining + ' as trailing characters');
      assert.strictEqual(parsed[0].x, values[i].x);
      assert.strictEqual(parsed[0].y, values[i].y);
      assert.strictEqual(parsed[0].z, values[i].z);
    }
  });

  test('Parsing invalid strings results in null', function() {
    var consumeScale = typedOM.internal.parsing.consumeScale;
    assert.isNull(consumeScale(''));
    assert.isNull(consumeScale('bananas'));
    assert.isNull(consumeScale('scale()')); // Missing args.
    assert.isNull(consumeScale('scalex()'));
    assert.isNull(consumeScale('scaley()'));
    assert.isNull(consumeScale('scalez()'));
    assert.isNull(consumeScale('scale3d()'));
    assert.isNull(consumeScale('scale(hello)')); // Invalid dimension.
    assert.isNull(consumeScale('scale(5px)')); // Spurious unit.
    assert.isNull(consumeScale('scale(1,2,3,4)')); // Too many args.
    assert.isNull(consumeScale('scalex(1,2,3,4)'));
    assert.isNull(consumeScale('scaley(1,2,3,4)'));
    assert.isNull(consumeScale('scalez(1,2,3,4)'));
    assert.isNull(consumeScale('scale3d(1,2,3,4)'));
    assert.isNull(consumeScale('scale3d(1)')); // Not enough args.
    assert.isNull(consumeScale('scale(1,2,3')); // Missing bracket.
    assert.isNull(consumeScale('scalea(1)')); // Invalid keyword.
  });
});
