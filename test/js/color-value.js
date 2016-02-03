suite('ColorValue', function() {
  test('Constructor should throw an error if r, g, b and a are not a number', function() {
    assert.throw(function() {new ColorValue(0, "lemon", 50);}, TypeError,
      'r, g, b and a must be a numbers.');
    assert.throw(function() {new ColorValue(0, 50, 50, "lemon");}, TypeError,
      'r, g, b and a must be a numbers.');
    assert.throw(function() {new ColorValue(0, 50, 50, null);}, TypeError,
      'r, g, b and a must be a numbers.');
  });

  test('Constructor should throw an error if r, g and b are not integers', function() {
    assert.throw(function() {new ColorValue(0, 50.5, 50);}, TypeError,
      'r, g, b must be integers.');
  });

  test('Constructor should throw an error if r, g and b are not between 0 and 255', function() {
    assert.throw(function() {new ColorValue(0, -1, 50, 0);}, TypeError,
      'r, g, b and a must be a number between 0 and 255.');
    assert.throw(function() {new ColorValue(0, 255, 256);}, TypeError,
      'r, g, b and a must be a number between 0 and 255.');
  });

  test('Constructor should throw an error if a is not between 0 and 1', function() {
    assert.throw(function() {new ColorValue(0, 50, 50, -0.1);}, TypeError,
      'a must be a number between 0 and 1.');
    assert.throw(function() {new ColorValue(0, 50, 255, 1.2);}, TypeError,
      'a must be a number between 0 and 1.');
  });

  test('cssString should return rgb(<number>,<number>,<number>) if the three ' +
    'input constructor is used', function() {
    var color = new ColorValue(50, 100, 100);

    assert.strictEqual(color.cssString, 'rgb(50,100,100)');
  });

  test('cssString should return rgb(<number>,<number>,<number>,<number>) if the four ' +
    'input constructor is used', function() {
    var color = new ColorValue(50, 100, 100, 1);

    assert.strictEqual(color.cssString, 'rgba(50,100,100,1)');
  });
});
