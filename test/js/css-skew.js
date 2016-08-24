suite('CSSSkew', function() {

  test('CSSSkew constructor throws exception for invalid types', function() {
    var argCountErr = /^CSSSkew must have 2 arguments\./;
    assert.throws(function() {new CSSSkew()}, TypeError, argCountErr);
    assert.throws(function() {new CSSSkew({})}, TypeError, argCountErr);
    assert.throws(function() {new CSSSkew(new CSSAngleValue(2, 'deg'))}, TypeError, argCountErr);
    assert.throws(function() {new CSSSkew(new CSSAngleValue(1, 'deg'), new CSSAngleValue(2, 'deg'), new CSSAngleValue(3, 'deg'))}, TypeError, argCountErr);
    var argTypeErr = /^CSSSkew arguments must be all CSSAngleValues\./;
    assert.throws(function() {new CSSSkew({}, {})}, TypeError, argTypeErr);
    assert.throws(function() {new CSSSkew('1', '2')}, TypeError, argTypeErr);
    assert.throws(function() {new CSSSkew(1, 2)}, TypeError, argTypeErr);
    assert.throws(function() {new CSSSkew(1, new CSSAngleValue(2, 'deg'))}, TypeError, argTypeErr);
    assert.throws(function() {new CSSSkew(3, null)}, TypeError, argTypeErr);
  });

  test('CSSSkew constructor works correctly', function() {
    var values = [
      new CSSSkew(new CSSAngleValue(30, 'deg'), new CSSAngleValue(180, 'deg')),
      new CSSSkew(new CSSAngleValue(0.52359878, 'rad'), new CSSAngleValue(3.14159265, 'rad'))
    ];
    var expectations = [
      {cssText: 'skew(30deg, 180deg)', xValue: 30, xUnit: 'deg', yValue: 180, yUnit: 'deg'},
      {cssText: 'skew(0.52359878rad, 3.14159265rad)', xValue: 0.52359878, xUnit: 'rad', yValue: 3.14159265, yUnit: 'rad'}
    ];
    var expectedMatrix = new DOMMatrixReadonly([1, 0, 0.577350, 1, 0, 0]);
    for (var i = 0; i < values.length; i++) {
      assert.strictEqual(values[i].cssText, expectations[i].cssText);
      assert.strictEqual(values[i].ax._value, expectations[i].xValue);
      assert.strictEqual(values[i].ax._unit, expectations[i].xUnit);
      assert.strictEqual(values[i].ay._value, expectations[i].yValue);
      assert.strictEqual(values[i].ay._unit, expectations[i].yUnit);
      assert.closeTo(values[i].ax.degrees, 30, 1e-6);
      assert.closeTo(values[i].ay.degrees, 180, 1e-6);
      assert.isTrue(values[i].is2D);
      typedOM.internal.testing.matricesApproxEqual(values[i].matrix, expectedMatrix);
    }
  });

  test('Parsing valid strings results in CSSSkew with correct values', function() {
    var values = [
      // skew with 1 arg
      {str: 'skew(45deg)', cssText: 'skew(45deg)', xValue: 45, xUnit: 'deg', yValue: 0, yUnit: 'deg', remaining: ''},
      {str: 'skew(5rad)', cssText: 'skew(5rad)', xValue: 5, xUnit: 'rad', yValue: 0, yUnit: 'deg', remaining: ''},
      {str: 'skew(215grad)', cssText: 'skew(215grad)', xValue: 215, xUnit: 'grad', yValue: 0, yUnit: 'deg', remaining: ''},
      {str: 'skew(0.6turn)', cssText: 'skew(0.6turn)', xValue: 0.6, xUnit: 'turn', yValue: 0, yUnit: 'deg', remaining: ''},
      {str: 'SkeW(5dEg)', cssText: 'skew(5deg)', xValue: 5, xUnit: 'deg', yValue: 0, yUnit: 'deg', remaining: ''},
      {str: 'SKEW(4DeG)', cssText: 'skew(4deg)', xValue: 4, xUnit: 'deg', yValue: 0, yUnit: 'deg', remaining: ''},
      {str: 'skew(45deg))))', cssText: 'skew(45deg)', xValue: 45, xUnit: 'deg', yValue: 0, yUnit: 'deg', remaining: ')))'},
      // skew with 2 args
      {str: 'skew(60deg, -0.2turn)', cssText: 'skew(60deg, -0.2turn)', xValue: 60, xUnit: 'deg', yValue: -0.2, yUnit: 'turn', remaining: ''},
      {str: 'SkEW(0.2TURN, 1Rad)', cssText: 'skew(0.2turn, 1rad)', xValue: 0.2, xUnit: 'turn', yValue: 1, yUnit: 'rad', remaining: ''},
      {str: 'skew(20deg, 1rad) 123', cssText: 'skew(20deg, 1rad)', xValue: 20, xUnit: 'deg', yValue: 1, yUnit: 'rad', remaining: '123'},
      // skewx
      {str: 'skewx(10deg)', cssText: 'skewx(10deg)', xValue: 10, xUnit: 'deg', yValue: 0, yUnit: 'deg', remaining: ''},
      {str: 'SkewX(1TuRn)', cssText: 'skewx(1turn)', xValue: 1, xUnit: 'turn', yValue: 0, yUnit: 'deg', remaining: ''},
      {str: 'skewx(100grad) abc', cssText: 'skewx(100grad)', xValue: 100, xUnit: 'grad', yValue: 0, yUnit: 'deg', remaining: 'abc'},
      // skewy
      {str: 'skewy(0.45turn)', cssText: 'skewy(0.45turn)', xValue: 0, xUnit: 'deg', yValue:0.45 , yUnit: 'turn', remaining: ''},
      {str: 'SkEwY(2.1RAD)', cssText: 'skewy(2.1rad)', xValue: 0, xUnit: 'deg', yValue: 2.1, yUnit: 'rad', remaining: ''},
      {str: 'skewy(20DEG))))', cssText: 'skewy(20deg)', xValue: 0, xUnit: 'deg', yValue: 20, yUnit: 'deg', remaining: ')))'},
    ];
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumeSkew(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse a CSSSkew');
      assert.strictEqual(parsed[1], values[i].remaining, values[i].str + ' expected ' + values[i].remaining + ' as trailing characters');
      assert.instanceOf(parsed[0], CSSSkew);
      assert.strictEqual(parsed[0].cssText, values[i].cssText);
      assert.strictEqual(parsed[0].ax._value, values[i].xValue);
      assert.strictEqual(parsed[0].ax._unit, values[i].xUnit);
      assert.strictEqual(parsed[0].ay._value, values[i].yValue);
      assert.strictEqual(parsed[0].ay._unit, values[i].yUnit);
      assert.isTrue(parsed[0].is2D); // Skew matrices should always be 2D
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
