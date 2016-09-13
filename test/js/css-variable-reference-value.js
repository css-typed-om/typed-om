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

suite('CSSVariableReferenceValue', function() {
  test('The new CSSVariableReferenceValue attributes are correct', function() {
    var expectedVariable = 'anything';
    var expectedFallback = new CSSUnparsedValue(["123"]);
    var referenceValue = new CSSVariableReferenceValue(expectedVariable, expectedFallback);
    assert.instanceOf(referenceValue, CSSVariableReferenceValue,
      'A new CSSVariableReferenceValue should be an instance of CSSVariableReferenceValue');
    assert.strictEqual(referenceValue.variable, expectedVariable,
      'A new CSSVariableReferenceValue\'s variable should be the same as its constructor');
    assert.strictEqual(referenceValue.fallback, expectedFallback,
      'A new CSSVariableReferenceValue\'s fallback should be the same as its constructor');
  });

  test('Constructor only accepts a string and a CSSUnparsedValue', function() {
    var paramsErr = /^CSSVariableReferenceValue constructor should get two parameters$/;
    assert.throws(function() { new CSSVariableReferenceValue(); }, TypeError, paramsErr);
    assert.throws(function() { new CSSVariableReferenceValue("123"); }, TypeError, paramsErr);

    var stringErr = /^Variable of CSSVariableReferenceValue must be a string$/;
    assert.throws(function() { new CSSVariableReferenceValue(1234, 1234); }, TypeError, stringErr);
    assert.throws(function() { new CSSVariableReferenceValue(["1"], 1234); }, TypeError, stringErr);

    var fallbackErr = /^Fallback of CSSVariableReferenceValue must be a CSSUnparsedValue$/;
    assert.throws(function() { new CSSVariableReferenceValue("123", 1234); }, TypeError, fallbackErr);
  });

  test('CSSVariableReferenceValue can have undefined fallback', function() {
    assert.doesNotThrow(function() { new CSSVariableReferenceValue("--var", undefined); });
  })
});
