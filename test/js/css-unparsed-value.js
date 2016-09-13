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

suite('CSSUnparsedValue', function() {
  test("CSSUnparsedValue is a CSSUnparsedValue and CSSStyleValue", function() {
    assert.instanceOf(new CSSUnparsedValue(), CSSUnparsedValue);
    assert.instanceOf(new CSSUnparsedValue(), CSSStyleValue);
  });

  test('Values not an array throws', function() {
    var valueErr = /^CSSUnparsedValue should be an array of string or CSSVariableReferenceValue$/;
    assert.throws(function() { new CSSUnparsedValue(1); }, TypeError, valueErr);
    assert.throws(function() { new CSSUnparsedValue("123"); }, TypeError, valueErr);
    assert.throws(function() { new CSSUnparsedValue({h: 10, w: 5, d: 4, t: "5"});}, TypeError, valueErr);
  });

  test('Values not an array of string or CSSVariableReferenceValue throws', function() {
    var valueErr = /^CSSUnparsedValue's elements should be string or CSSVariableReferenceValue$/;
    assert.throws(function() { new CSSUnparsedValue([1]); }, TypeError, valueErr);
    assert.throws(function() { new CSSUnparsedValue(["1234", "2342", 1]); }, TypeError, valueErr);
  });

  test('Using spread operator on CSSUnparsedValue results in the correct values', function() {
    var values = ['string', new CSSVariableReferenceValue('val', new CSSUnparsedValue(['innerStr']))];
    var tokenStream = new CSSUnparsedValue(values);

    var expected = [[0, values[0]], [1, values[1]]];
    var result = [...tokenStream];
    
    assert.deepEqual(result, expected);
  });

  test('Using iterator operations on entries() gets correct values', function() {
    var values = ['test', new CSSVariableReferenceValue('var', new CSSUnparsedValue(['1']))];
    var expectedEntries = [[0, values[0]], [1, values[1]]];

    var tokenStreamValue = new CSSUnparsedValue(values);

    // One by one
    assert.deepEqual(
        iteratorExpansionUsingNext(tokenStreamValue.entries()),
        expectedEntries);
    // for..of
    assert.deepEqual(
        iteratorExpansionUsingForOf(tokenStreamValue.entries()),
        expectedEntries);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.entries()], expectedEntries);
  });

  test('Using iterator operations on keys() gets correct values', function() {
    var values = ['test', new CSSVariableReferenceValue('var', new CSSUnparsedValue(['1']))];
    var expectedKeys = [0, 1];
    var tokenStreamValue = new CSSUnparsedValue(values);

    // One by one
    assert.deepEqual(
        iteratorExpansionUsingNext(tokenStreamValue.keys()),
        expectedKeys);
    // for..of
    assert.deepEqual(
        iteratorExpansionUsingForOf(tokenStreamValue.keys()),
        expectedKeys);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.keys()], expectedKeys);
  });

  test('Using iterator operations on values() gets correct values', function() {
    var inputValues = ['test', new CSSVariableReferenceValue('var', new CSSUnparsedValue(['1']))];
    var tokenStreamValue = new CSSUnparsedValue(inputValues);
    // One by one
    assert.deepEqual(
        iteratorExpansionUsingNext(tokenStreamValue.values()),
        inputValues);
    // for..of
    assert.deepEqual(
        iteratorExpansionUsingForOf(tokenStreamValue.values()),
        inputValues);
    // Spread operator
    assert.deepEqual([...tokenStreamValue.values()], inputValues);
  });

});
