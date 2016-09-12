// Copyright 2016 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

suite('CSSAngleValue', function() {

var EPSILON = 1e-6;

test('CSSAngleValue constructor works for valid arguments', function() {
  var values = [
    new CSSAngleValue(1.1, 'deg'),
    new CSSAngleValue(-2, 'rad'),
    new CSSAngleValue(3.0003, 'grad'),
    new CSSAngleValue(400, 'turn')
  ];
  var expectations = [
    {degrees: 1.1, value: 1.1, unit: 'deg', cssText: '1.1deg'},
    {degrees: -114.591559, value: -2, unit: 'rad', cssText: '-2rad'},
    {degrees: 2.700270, value: 3.0003, unit: 'grad', cssText: '3.0003grad'},
    {degrees: 144000, value: 400, unit: 'turn', cssText: '400turn'}
  ];
  for (var i = 0; i < values.length; i++) {
    assert.instanceOf(values[i], CSSAngleValue);
    assert.approximately(values[i].degrees, expectations[i].degrees, EPSILON);
    assert.strictEqual(values[i]._value, expectations[i].value);
    assert.strictEqual(values[i]._unit, expectations[i].unit);
    assert.strictEqual(values[i].cssText, expectations[i].cssText);
  }
});

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
    {str: '1.1deg', degrees: 1.1, value: 1.1, unit: 'deg', cssText: '1.1deg'},
    {str: '-2rad', degrees: -114.591559, value: -2, unit: 'rad', cssText: '-2rad'},
    {str: '3.0003grad', degrees: 2.700270, value: 3.0003, unit: 'grad', cssText: '3.0003grad'},
    {str: '400turn', degrees: 144000, value: 400, unit: 'turn', cssText: '400turn'},
  ];
  for (var i = 0; i < values.length; i++) {
    var result = typedOM.internal.parsing.consumeAngleValue(values[i].str);
    assert.isNotNull(result, 'Failed parsing ' + values[i].str);
    assert.instanceOf(result[0], CSSAngleValue);
    assert.approximately(result[0].degrees, values[i].degrees, EPSILON);
    assert.strictEqual(result[0]._value, values[i].value);
    assert.strictEqual(result[0]._unit, values[i].unit);
    assert.strictEqual(result[0].cssText, values[i].cssText);
  }
});

test('Parsing is case insensitive', function() {
  var values = [
    {str: '1.1DEG', degrees: 1.1, value: 1.1, unit: 'deg', cssText: '1.1deg'},
    {str: '-2rAd', degrees: -114.591559, value: -2, unit: 'rad', cssText: '-2rad'},
    {str: '3.0003GrAd', degrees: 2.700270, value: 3.0003, unit: 'grad', cssText: '3.0003grad'},
    {str: '400tuRN', degrees: 144000, value: 400, unit: 'turn', cssText: '400turn'},
  ];
  for (var i = 0; i < values.length; i++) {
    var result = typedOM.internal.parsing.consumeAngleValue(values[i].str);
    assert.isNotNull(result, 'Failed parsing ' + values[i].str);
    assert.instanceOf(result[0], CSSAngleValue);
    assert.approximately(result[0].degrees, values[i].degrees, EPSILON);
    assert.strictEqual(result[0]._value, values[i].value);
    assert.strictEqual(result[0]._unit, values[i].unit);
    assert.strictEqual(result[0].cssText, values[i].cssText);
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
