suite('CSSSkew', function() {

  test('CSSSkew constructor throws exception for invalid types', function() {
    argCountErr = /^CSSSkew must have 2 arguments\./;
    assert.throws(function() {new CSSSkew()}, TypeError, argCountErr);
    assert.throws(function() {new CSSSkew({})}, TypeError, argCountErr);
    assert.throws(function() {new CSSSkew(1)}, TypeError, argCountErr);
    assert.throws(function() {new CSSSkew(1, 2, 3)}, TypeError, argCountErr);
    var argTypeErr = /^CSSSkew arguments must be all numbers or all CSSAngleValues\./;
    assert.throws(function() {new CSSSkew({}, {})}, TypeError, argTypeErr);
    assert.throws(function() {new CSSSkew('1', '2')}, TypeError, argTypeErr);
    assert.throws(function() {new CSSSkew(1, new CSSAngleValue(2, 'deg'))}, TypeError, argTypeErr);
    assert.throws(function() {new CSSSkew(3, null)}, TypeError, argTypeErr);
  });

  test('CSSSkew constructor works correctly', function() {
    var values = [
    {skew: new CSSSkew(30, 180), cssTextExpected: 'skew(30deg, 180deg)'},
    {skew: new CSSSkew(new CSSAngleValue(30, 'deg'), new CSSAngleValue(180, 'deg')), cssTextExpected: 'skew(30deg, 180deg)'},
    {skew: new CSSSkew(new CSSAngleValue(0.52359878, 'rad'), new CSSAngleValue(3.14159265, 'rad')), cssTextExpected: 'skew(0.52359878rad, 3.14159265rad)'}];
    var expectedMatrix = new DOMMatrixReadonly([1, 0, 0.577350, 1, 0, 0]);
    for (var i = 0; i < values.length; i++) {
      assert.strictEqual(values[i].skew.cssText, values[i].cssTextExpected);
      assert.closeTo(values[i].skew.ax, 30, 1e-6);
      assert.closeTo(values[i].skew.ay, 180, 1e-6);
      assert.isTrue(values[i].skew.is2D);
      typedOM.internal.testing.matricesApproxEqual(values[i].skew.matrix, expectedMatrix);
    }
  });

  test('Parsing valid strings results in CSSSkew with correct values', function() {
    var values = [
      {str: 'skew(45deg)', x: 45, y: 0, remaining: ''}, // skew with 1 arg
      {str: 'skew(5rad)', x: 286.478897, y: 0, remaining: ''},
      {str: 'skew(215grad)', x: 193.5, y: 0, remaining: ''},
      {str: 'skew(0.6turn)', x: 216, y: 0, remaining: ''},
      {str: 'SkeW(5dEg)', x: 5, y: 0, remaining: ''},
      {str: 'SKEW(4DeG)', x: 4, y: 0, remaining: ''},
      {str: 'skew(45deg))))', x: 45, y: 0, remaining: ')))'},
      {str: 'skew(60deg, -0.2turn)', x: 60, y: -72, remaining: ''}, // skew with 2 args
      {str: 'SkEW(0.2TURN, 1Rad)', x: 72, y: 57.295780, remaining: ''},
      {str: 'skew(20deg, 1rad) 123', x: 20, y: 57.295780, remaining: '123'},
      {str: 'skewx(10deg)', x: 10, y: 0, remaining: ''}, // skewx
      {str: 'SkewX(1TuRn)', x: 360, y: 0, remaining: ''},
      {str: 'skewx(100grad) abc', x: 90, y: 0, remaining: 'abc'},
      {str: 'skewy(0.45turn)', x: 0, y: 162, remaining: ''}, // skewy
      {str: 'SkEwY(2.1RAD)', x: 0, y: 120.321137, remaining: ''},
      {str: 'skewy(20DEG))))', x: 0, y: 20, remaining: ')))'},
    ];
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumeSkew(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse a CSSSkew');
      assert.strictEqual(parsed[1], values[i].remaining, values[i].str + ' expected ' + values[i].remaining + ' as trailing characters');
      assert.instanceOf(parsed[0], CSSSkew);
      assert.isTrue(parsed[0].is2D); // Skew matrices should always be 2D
      assert.approximately(parsed[0].ax, values[i].x, 1e-6);
      assert.approximately(parsed[0].ay, values[i].y, 1e-6);
    }
  });

  test('Parsing skew with invalid string returns null', function() {
    var consumeSkew = typedOM.internal.parsing.consumeSkew;
    assert.isNull(consumeSkew(''));
    assert.isNull(consumeSkew('pears'));
    assert.isNull(consumeSkew('skew(2)')); // No units
    assert.isNull(consumeSkew('skewx(2)'));
    assert.isNull(consumeSkew('skewy(2)'));
    assert.isNull(consumeSkew('skew(50%)')); // Invalid unit
    assert.isNull(consumeSkew('skew(deg)')); // No angle
    assert.isNull(consumeSkew('skew(1deg, 2deg, 3deg)')); // Too many arguments
    assert.isNull(consumeSkew('skewy(1deg, 2deg)'));
    assert.isNull(consumeSkew('skewz(45deg)')); // Invalid keyword
    assert.isNull(consumeSkew('skew(5deg')); // Missing bracket
  });
});
