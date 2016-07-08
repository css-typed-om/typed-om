suite('CSSTransformValue', function() {
  test('CSSTransformValue is a CSSTransformValue and CSSStyleValue', function() {
    var transform = new CSSTransformValue([new CSSScale(2, -1)]);
    assert.instanceOf(transform, CSSTransformValue,
        'A new CSSTransformValue should be an instance of CSSTransformValue');
    assert.instanceOf(transform, CSSStyleValue,
        'A new CSSTransformValue should be an instance of CSSStyleValue');
  });

  test('CSSTransformValue constructor throws exception for invalid types',
      function() {
    assert.throws(function() {new CSSTransformValue(null)});
    assert.throws(function() {new CSSTransformValue({})});
    assert.throws(function() {new CSSTransformValue(['1', '2'])});
    assert.throws(function() {new CSSTransformValue([null])});
    assert.throws(function() {new CSSTransformValue([new CSSNumberValue(5)])});
  });

  test('CSSTransformValue empty constructor creates an object with ' + 
    'the following properties: cssText contains an empty string, asMatrix ' +
    'returns the 2D identity matrix', function() {
    var transform = new CSSTransformValue();
    assert.isTrue(transform.is2D);
    assert.isTrue(transform.cssText == "");
    assert.deepEqual(transform.asMatrix(), new CSSMatrix(new DOMMatrixReadonly([1, 0, 0, 1, 0, 0])));
  });

  test('CSSTransformValue constructor works with 1 component', function() {
    var transform;
    var scale = new CSSScale(2, -1);
    var values = [scale];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isTrue(transform.is2D);
    assert.strictEqual(transform.cssText, scale.cssText);
    assert.deepEqual(transform.asMatrix(), scale.asMatrix());
  });

  test('CSSTransformValue constructor works with duplicate component types',
        function() {
    var transform;
    var scale = new CSSScale(2, -1);
    var values = [scale, scale];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isTrue(transform.is2D);
    assert.strictEqual(transform.cssText,
        scale.cssText + ' ' + scale.cssText);

    var expectedMatrix = new CSSMatrix(scale.asMatrix().matrix.multiply(scale.asMatrix().matrix));
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssText, expectedMatrix.cssText);
    typedOM.internal.testing.matricesApproxEqual(transformMatrix.matrix, expectedMatrix.matrix);
  });

  test('CSSTransformValue constructor works with multiple 2D components',
        function() {
    var transform;
    var matrix = new CSSMatrix(new DOMMatrixReadonly([1, 2, 3, 4, 5, 6]));
    var scale = new CSSScale(2, -1);
    var values = [matrix, scale];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isTrue(transform.is2D);
    assert.strictEqual(transform.cssText,
        values[0].cssText + ' ' + values[1].cssText);

    var expectedMatrix = new CSSMatrix(values[0].asMatrix().matrix.multiply(values[1].asMatrix().matrix));
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssText, expectedMatrix.cssText);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });

  test('CSSTransformValue constructor works with multiple 3D components',
        function() {
    var transform;
    var matrix = new CSSMatrix(new DOMMatrixReadonly([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6]));
    var scale = new CSSScale(3, 2, 0.5);
    var values = [matrix, scale];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isFalse(transform.is2D);
    assert.strictEqual(transform.cssText,
        values[0].cssText + ' ' + values[1].cssText);

    var expectedMatrix = new CSSMatrix(values[0].asMatrix().matrix.multiply(values[1].asMatrix().matrix));
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssText, expectedMatrix.cssText);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });

  test('CSSTransformValue constructor works with multiple 2D and 3D components',
        function() {
    var transform;
    var matrix2d = new CSSMatrix(new DOMMatrixReadonly([1, 2, 3, 4, 5, 6]));
    var matrix3d = new CSSMatrix(new DOMMatrixReadonly([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6]));
    var skew = new CSSSkew(30, 60);
    var scale2d = new CSSScale(2, -1);
    var scale3d = new CSSScale(3, 2, 0.5);
    var values = [matrix2d, scale3d, matrix2d, skew, matrix3d, scale2d];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isFalse(transform.is2D);
    assert.strictEqual(transform.cssText,
        values.map(function(value) {return value.cssText}).join(' '));

    var expectedMatrix = values[0].asMatrix().matrix;
    for (var i = 1; i < values.length; ++i) {
      expectedMatrix = expectedMatrix.multiply(values[i].asMatrix().matrix);
    }
    expectedMatrix = new CSSMatrix(expectedMatrix);

    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssText, expectedMatrix.cssText);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });
});
