suite('CSSColorValue', function() {
  test('Constructor should throw an error if r, g and b are not integers', function() {
    assert.doesNotThrow(function() {new CSSColorValue(0, 50, 255);});
    assert.throw(function() {new CSSColorValue(0, "lemon", 50);}, TypeError,
      'r, g and b must be integers.');
    assert.throw(function() {new CSSColorValue(0, 50, null);}, TypeError,
      'r, g and b must be integers.');
    assert.throw(function() {new CSSColorValue(50.5, 20, 50);}, TypeError,
      'r, g and b must be integers.');
  });

  test('Constructor should throw an error if r, g and b are not between 0 and 255', function() {
    assert.throw(function() {new CSSColorValue(0, -1, 50, 0);}, TypeError,
      'r, g and b must be integers between 0 and 255.');
    assert.throw(function() {new CSSColorValue(0, 255, 256);}, TypeError,
      'r, g and b must be integers between 0 and 255.');
    assert.throw(function() {new CSSColorValue(300, 255, 256);}, TypeError,
      'r, g and b must be integers between 0 and 255.');
  });

  test('Constructor should throw an error if a is not a number', function() {
    assert.throw(function() {new CSSColorValue(0, 50, 50, "lemon");}, TypeError,
      'a must be a number.');
    assert.throw(function() {new CSSColorValue(0, 50, 50, null);}, TypeError,
      'a must be a number.');
  });

  test('Constructor should throw an error if a is not between 0 and 1', function() {
    assert.doesNotThrow(function() {new CSSColorValue(0, 50, 255, 1);});
    assert.doesNotThrow(function() {new CSSColorValue(0, 50, 255, 0);});
    assert.throw(function() {new CSSColorValue(0, 50, 50, -0.1);}, TypeError,
      'a must be a number between 0 and 1.');
    assert.throw(function() {new CSSColorValue(0, 50, 255, 1.2);}, TypeError,
      'a must be a number between 0 and 1.');
  });

  test('cssText should return rgb(<number>,<number>,<number>) if alpha ' +
    'is equal to 1', function() {
    assert.strictEqual(new CSSColorValue(50, 100, 100).cssText, 'rgb(50,100,100)');
    assert.strictEqual(new CSSColorValue(50, 100, 100, 1).cssText, 'rgb(50,100,100)');
  });

  test('cssText should return rgb(<number>,<number>,<number>,<number>) if alpha ' +
    'is not equal to 1', function() {
    var color = new CSSColorValue(50, 100, 100, 0.2);

    assert.strictEqual(color.cssText, 'rgba(50,100,100,0.2)');
  });
});
