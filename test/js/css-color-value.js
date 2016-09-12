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

  test('Parse simple rgb color', function() {
    var result = typedOM.internal.parsing.consumeColorValue('rgb(1,2,3)');
    assert.isNotNull(result);
    assert.strictEqual(result[1], '');

    var color = result[0];
    assert.instanceOf(color, CSSColorValue);
    assert.strictEqual(color.r, 1);
    assert.strictEqual(color.g, 2);
    assert.strictEqual(color.b, 3);
  });

  test('Parse simple rgba color', function() {
    var result = typedOM.internal.parsing.consumeColorValue('rgba(45,12,56,0.5)');
    assert.isNotNull(result);
    assert.strictEqual(result[1], '');

    var color = result[0];
    assert.instanceOf(color, CSSColorValue);
    assert.strictEqual(color.r, 45);
    assert.strictEqual(color.g, 12);
    assert.strictEqual(color.b, 56);
    assert.strictEqual(color.a, 0.5);
  });

  test('Whitespace is ignored when parsing', function() {
    var result = typedOM.internal.parsing.consumeColorValue('  rgba( 45  , 12  , 56  , 0.5  )');
    assert.isNotNull(result);
    assert.strictEqual(result[1], '');

    var color = result[0];
    assert.instanceOf(color, CSSColorValue);
    assert.strictEqual(color.cssText, 'rgba(45,12,56,0.5)');
  });

  test('Parsing invalid strings result in null', function() {
    var consumeColorValue = typedOM.internal.parsing.consumeColorValue;
    assert.isNull(consumeColorValue('asdfas'));
    // Not enough values
    assert.isNull(consumeColorValue('rgb()'));
    assert.isNull(consumeColorValue('rgb(1)'));
    assert.isNull(consumeColorValue('rgb(1, 2)'));
    assert.isNull(consumeColorValue('rgba(1, 2, 3)'));
    // Too many values
    assert.isNull(consumeColorValue('rgb(1, 2, 3, 1, 5)'));
    assert.isNull(consumeColorValue('rgba(1, 2, 3, 1, 5)'));
    // Non numbers
    assert.isNull(consumeColorValue('rgb(a, 2, 1)'));
    // Non integer values for rgb
    assert.isNull(consumeColorValue('rgb(1.1, 2, 3)'));
    assert.isNull(consumeColorValue('rgb(1, 2.1, 3)'));
    assert.isNull(consumeColorValue('rgb(1, 2, 3.1)'));
    // Values too large
    assert.isNull(consumeColorValue('rgb(256, 1, 1)'));
    assert.isNull(consumeColorValue('rgb(1, 256, 1)'));
    assert.isNull(consumeColorValue('rgb(1, 1, 256)'));
    assert.isNull(consumeColorValue('rgba(1, 1, 1, 1.1)'));
    // Negative values
    assert.isNull(consumeColorValue('rgb(-1, 1, 1)'));
    assert.isNull(consumeColorValue('rgb(1, -1, 1)'));
    assert.isNull(consumeColorValue('rgb(1, 1, -1)'));
    assert.isNull(consumeColorValue('rgba(1, 1, 1, -0.1)'));
    // Missing braces
    assert.isNull(consumeColorValue('rgb1, 2, 1)'));
    assert.isNull(consumeColorValue('rgb(1, 2, 1'));
  });
});
