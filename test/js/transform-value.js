suite('TransformValue', function() {
  test('TransformValue is a TransformValue and StyleValue', function() {
    var transform = new TransformValue([new Scale(2, -1)]);
    assert.instanceOf(transform, TransformValue,
        'A new TransformValue should be an instance of TransformValue');
    assert.instanceOf(transform, StyleValue,
        'A new TransformValue should be an instance of StyleValue');
  });

  test('TransformValue constructor throws exception for invalid types',
      function() {
    assert.throws(function() {new TransformValue(null)});
    assert.throws(function() {new TransformValue({})});
    assert.throws(function() {new TransformValue(['1', '2'])});
    assert.throws(function() {new TransformValue([null])});
    assert.throws(function() {new TransformValue([new NumberValue(5)])});
  });

  test('TransformValue empty constructor creates an object with ' + 
    'the following properties: cssString contains an empty string, asMatrix ' +
    'returns the 2D identity matrix', function() {
    var transform = new TransformValue();
    assert.isTrue(transform.is2D());
    assert.isTrue(transform.cssString == "");
    assert.deepEqual(transform.asMatrix(), new Matrix(1, 0, 0, 1, 0, 0));
  });

  test('TransformValue constructor works with 1 component', function() {
    var transform;
    var scale = new Scale(2, -1);
    var values = [scale];
    assert.doesNotThrow(function() {transform = new TransformValue(values)});
    assert.isTrue(transform.is2D());
    assert.strictEqual(transform.cssString, scale.cssString);
    assert.deepEqual(transform.asMatrix(), scale.asMatrix());
  });

  test('TransformValue constructor works with duplicate component types',
        function() {
    var transform;
    var scale = new Scale(2, -1);
    var values = [scale, scale];
    assert.doesNotThrow(function() {transform = new TransformValue(values)});
    assert.isTrue(transform.is2D());
    assert.strictEqual(transform.cssString,
        scale.cssString + ' ' + scale.cssString);

    var expectedMatrix = scale.asMatrix().multiply(scale.asMatrix());
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssString, expectedMatrix.cssString);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });

  test('TransformValue constructor works with multiple 2D components',
        function() {
    var transform;
    var matrix = new Matrix(1, 2, 3, 4, 5, 6);
    var scale = new Scale(2, -1);
    var values = [matrix, scale];
    assert.doesNotThrow(function() {transform = new TransformValue(values)});
    assert.isTrue(transform.is2D());
    assert.strictEqual(transform.cssString,
        values[0].cssString + ' ' + values[1].cssString);

    var expectedMatrix = values[0].asMatrix().multiply(values[1].asMatrix());
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssString, expectedMatrix.cssString);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });

  test('TransformValue constructor works with multiple 3D components',
        function() {
    var transform;
    var matrix = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6);
    var scale = new Scale(3, 2, 0.5);
    var values = [matrix, scale];
    assert.doesNotThrow(function() {transform = new TransformValue(values)});
    assert.isFalse(transform.is2D());
    assert.strictEqual(transform.cssString,
        values[0].cssString + ' ' + values[1].cssString);

    var expectedMatrix = values[0].asMatrix().multiply(values[1].asMatrix());
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssString, expectedMatrix.cssString);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });

  test('TransformValue constructor works with multiple 2D and 3D components',
        function() {
    var transform;
    var matrix2d = new Matrix(1, 2, 3, 4, 5, 6);
    var matrix3d = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6);
    var skew = new Skew(30, 60);
    var scale2d = new Scale(2, -1);
    var scale3d = new Scale(3, 2, 0.5);
    var values = [matrix2d, scale3d, matrix2d, skew, matrix3d, scale2d];
    assert.doesNotThrow(function() {transform = new TransformValue(values)});
    assert.isFalse(transform.is2D());
    assert.strictEqual(transform.cssString,
        values.map(function(value) {return value.cssString}).join(' '));

    var expectedMatrix = values[0].asMatrix();
    for (var i = 1; i < values.length; ++i) {
      expectedMatrix = expectedMatrix.multiply(values[i].asMatrix());
    }

    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssString, expectedMatrix.cssString);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });
});
