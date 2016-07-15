suite('CSSAngleValue', function() {

var EPSILON = 1e-6;

test('Wrong number of arguments throws', function() {
  assert.throw(function() { new CSSAngleValue(); }, TypeError, 'Must specify an angle and a unit');
  assert.throw(function() { new CSSAngleValue(5); }, TypeError, 'Must specify an angle and a unit');
  assert.throw(function() { new CSSAngleValue(5, 5, 5); }, TypeError, 'Must specify an angle and a unit');
});

test('Value not a number throws', function() {
  assert.throw(function() { new CSSAngleValue('foo', 'deg'); }, TypeError, 'Value must be a number');
  assert.throw(function() { new CSSAngleValue({}, 'deg'); }, TypeError, 'Value must be a number');
  assert.throw(function() { new CSSAngleValue(undefined, 'deg'); }, TypeError, 'Value must be a number');
});

test('Invalid unit throws', function() {
  assert.throw(function() { new CSSAngleValue(5, 'asdfa'); }, TypeError, 'Invalid unit type');
  assert.throw(function() { new CSSAngleValue(5, {}); }, TypeError, 'Invalid unit type');
  assert.throw(function() { new CSSAngleValue(5, 5); }, TypeError, 'Invalid unit type');
});

test('Conversions when specified as degrees', function() {
  var angleValue = new CSSAngleValue(40, 'deg');
  assert.strictEqual(angleValue.degrees, 40);
  assert.approximately(angleValue.radians, 0.698132, EPSILON);
  assert.approximately(angleValue.gradians, 44.444444, EPSILON);
  assert.approximately(angleValue.turns, 0.111111, EPSILON);
});

test('Conversions when specified as radians', function() {
  var angleValue = new CSSAngleValue(100, 'rad');
  assert.approximately(angleValue.degrees, 5729.577951, EPSILON);
  assert.strictEqual(angleValue.radians, 100);
  assert.approximately(angleValue.gradians, 6366.197724, EPSILON);
  assert.approximately(angleValue.turns, 15.915494, EPSILON);
});

test('Conversions when specified as gradians', function() {
  var angleValue = new CSSAngleValue(215, 'grad');
  assert.approximately(angleValue.degrees, 193.5, EPSILON);
  assert.approximately(angleValue.radians, 3.377212, EPSILON);
  assert.strictEqual(angleValue.gradians, 215);
  assert.approximately(angleValue.turns, 0.5375, EPSILON);
});

test('Conversions when specified as turns', function() {
  var angleValue = new CSSAngleValue(0.6, 'turn');
  assert.approximately(angleValue.degrees, 216, EPSILON);
  assert.approximately(angleValue.radians, 3.769911, EPSILON);
  assert.approximately(angleValue.gradians, 240, EPSILON);
  assert.strictEqual(angleValue.turns, 0.6);
});

test('Parsing valid strings results in expected CSSAngleValues', function() {
  var values = [
    {str: '1.1deg', value: new CSSAngleValue(1.1, 'deg')},
    {str: '-2rad', value: new CSSAngleValue(-2, 'rad')},
    {str: '3.0003grad', value: new CSSAngleValue(3.0003, 'grad')},
    {str: '400turn', value: new CSSAngleValue(400, 'turn')},
  ];
  for (var i = 0; i < values.length; i++) {
    var result = typedOM.internal.parsing.consumeAngleValue(values[i].str);
    assert.isNotNull(result, 'Failed parsing ' + values[i].str);
    assert.instanceOf(result[0], CSSAngleValue);
    assert.strictEqual(result[0].deg, values[i].value.deg);
  }
});

test('Parsing is case insensitive', function() {
  var values = [
    {str: '1.1DEG', value: new CSSAngleValue(1.1, 'deg')},
    {str: '-2rAd', value: new CSSAngleValue(-2, 'rad')},
    {str: '3.0003GrAd', value: new CSSAngleValue(3.0003, 'grad')},
    {str: '400tuRN', value: new CSSAngleValue(400, 'turn')},
  ];
  for (var i = 0; i < values.length; i++) {
    var result = typedOM.internal.parsing.consumeAngleValue(values[i].str);
    assert.isNotNull(result, 'Failed parsing ' + values[i].str);
    assert.instanceOf(result[0], CSSAngleValue);
    assert.strictEqual(result[0].deg, values[i].value.deg);
  }
});

test('Parsing returns null for invalid strings', function() {
  assert.isNull(typedOM.internal.parsing.consumeAngleValue(''));
  assert.isNull(typedOM.internal.parsing.consumeAngleValue('bananas'));
  assert.isNull(typedOM.internal.parsing.consumeAngleValue('deg66'));
  // No unit.
  assert.isNull(typedOM.internal.parsing.consumeAngleValue('0'));
  // Invalid unit.
  assert.isNull(typedOM.internal.parsing.consumeAngleValue('60ra'));
  // No angle.
  assert.isNull(typedOM.internal.parsing.consumeAngleValue('rad'));
});

});
