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

suite('Parsing utilities', function() {
  test('isNumberValueString valid strings', function() {
    var isNumberValueString = typedOM.internal.parsing.isNumberValueString;
    assert.isTrue(isNumberValueString('12'));
    assert.isTrue(isNumberValueString('4.01'));
    assert.isTrue(isNumberValueString('-456.8'));
    assert.isTrue(isNumberValueString('0.0'));
    assert.isTrue(isNumberValueString('+0.0'));
    assert.isTrue(isNumberValueString('-0.0'));
    assert.isTrue(isNumberValueString('.60'));
    assert.isTrue(isNumberValueString('10e3'));
    assert.isTrue(isNumberValueString('-3.4e-2'));
  });

  test('isNumberValueString invalid strings', function() {
    var isNumberValueString = typedOM.internal.parsing.isNumberValueString;
    assert.isFalse(isNumberValueString('hello, world'));
    assert.isFalse(isNumberValueString('calc(10px+3.2em) 3px'));
    assert.isFalse(isNumberValueString('3px calc(10px+3.2em)'));
    assert.isFalse(isNumberValueString('3px'));
    assert.isFalse(isNumberValueString('scale(3, -1)'));
    assert.isFalse(isNumberValueString('1e-.0'));
    assert.isFalse(isNumberValueString('9 manyRandomLemons'));
    assert.isFalse(isNumberValueString('1e4.0'));
  });

  test('consumeNumber', function() {
    var consumeNumber = typedOM.internal.parsing.consumeNumber;
    assert.deepEqual(consumeNumber('12'), [12, '']);
    assert.deepEqual(consumeNumber('4.01'), [4.01, '']);
    assert.deepEqual(consumeNumber('-456.8'), [-456.8, '']);
    assert.deepEqual(consumeNumber('0.0'), [0, '']);
    assert.deepEqual(consumeNumber('+0.0'), [0, '']);
    assert.deepEqual(consumeNumber('-0.0'), [-0, '']);
    assert.deepEqual(consumeNumber('.60'), [0.6, '']);
    assert.deepEqual(consumeNumber('10e3'), [10e3, '',]);
    assert.deepEqual(consumeNumber('-3.4e-2'), [-3.4e-2, '']);

    assert.deepEqual(consumeNumber('12 5'), [12, ' 5']);
    assert.deepEqual(consumeNumber('4.01 abc'), [4.01, ' abc']);
    assert.deepEqual(consumeNumber('-456.8def'), [-456.8, 'def']);
    assert.deepEqual(consumeNumber('-3.4e-2 123'), [-3.4e-2, ' 123']);
  });

  test('consumeRepeated with separator', function() {
    var consumeRepeated = typedOM.internal.parsing.consumeRepeated;
    var consumer = typedOM.internal.parsing.consumeNumber;
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3'), [[1,2,3], '']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3,'), [[1,2,3], '']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3a'), [[1,2,3], 'a']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3,a'), [[1,2,3], 'a']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,a,3'), [[1,2], 'a,3']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '  1 ,   2 ,  3    '), [[1,2,3], '']);
    assert.deepEqual(consumeRepeated(consumer, /^\./, '1.0.2.0.3.0'), [[1.0,2.0,3.0], ''])
  });

  test('consumeRepeated with null (space) separator', function() {
    var consumeRepeated = typedOM.internal.parsing.consumeRepeated;
    var consumer = typedOM.internal.parsing.consumeNumber;
    assert.deepEqual(consumeRepeated(consumer, null, '1 2 3'), [[1,2,3], '']);
    assert.deepEqual(consumeRepeated(consumer, null, '1 2 3 a'), [[1,2,3], 'a']);
    assert.deepEqual(consumeRepeated(consumer, null, '1 2 3a'), [[1,2,3], 'a']);
    assert.deepEqual(consumeRepeated(consumer, null, '  1    2   3    '), [[1,2,3], '']);
  });

  test('consumeRepeated with max results and separator', function() {
    var consumeRepeated = typedOM.internal.parsing.consumeRepeated;
    var consumer = typedOM.internal.parsing.consumeNumber;
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3', 5 /* opt_max */), [[1,2,3], '']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3,a', 5), [[1,2,3], 'a']);

    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3', 2 /* opt_max */), [[1,2], '3']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3,', 2), [[1,2], '3,']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '1,2,3,a', 2), [[1,2], '3,a']);
    assert.deepEqual(consumeRepeated(consumer, /^,/, '  1 ,   2 ,  3    ', 2), [[1,2], '  3    ']);
  });

  test('consumeRepeated with max results and null (space) separator', function() {
    var consumeRepeated = typedOM.internal.parsing.consumeRepeated;
    var consumer = typedOM.internal.parsing.consumeNumber;
    assert.deepEqual(consumeRepeated(consumer, null, '1 2 3', 5 /* opt_max */), [[1,2,3], '']);
    assert.deepEqual(consumeRepeated(consumer, null, '1 2 3 a', 5), [[1,2,3], 'a']);

    assert.deepEqual(consumeRepeated(consumer, null, '1 2 3', 2 /* opt_max */), [[1,2], '3']);
    assert.deepEqual(consumeRepeated(consumer, null, '1 2 3 a', 2), [[1,2], '3 a']);
    assert.deepEqual(consumeRepeated(consumer, null, '  1     2    3    ', 2), [[1,2], '3    ']);
  });
});
