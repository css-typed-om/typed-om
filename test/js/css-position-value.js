// Copyright 2015 Google Inc. All rights reserved.
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

suite('CSSPositionValue', function() {

  test('Constructor throws if xPos or yPos is not a CSSLengthValue', function() {
    assert.throws(function() { new CSSPositionValue(2, 3) });
    assert.throws(function() { new CSSPositionValue(new CSSSimpleLength(3, 'px'), 3) });
  });

  test('CSSPositionValue cssText is the x and y cssTexts separated by a space', function() {
    var lengthValue_1 = new CSSCalcLength({px: 10, em: 3.2});
    var lengthValue_2 = new CSSSimpleLength(3, 'px');
    var positionValue = new CSSPositionValue(lengthValue_1, lengthValue_2);

    assert.strictEqual(positionValue.cssText, 'calc(10px + 3.2em) 3px');
  });

  test('Parsing works for simple values', function() {
    var input = '5px 3px';
    var result = typedOM.internal.parsing.consumePositionValue(input);
    assert.strictEqual(result[0].constructor, CSSPositionValue);
    assert.strictEqual(result[0].cssText, input);
  });

  test('Parsing works when using calc values', function() {
    var input = 'calc(-2% + 6em) calc(3vmin - 9pc)';
    var result = typedOM.internal.parsing.consumePositionValue(input);
    assert.strictEqual(result[0].constructor, CSSPositionValue);
    assert.strictEqual(result[0].cssText, input);
  });

  test('Parsing works when using mixed value types', function() {
    var input = '99.2px calc(3vmin - 9pc)';
    var result = typedOM.internal.parsing.consumePositionValue(input);
    assert.strictEqual(result[0].constructor, CSSPositionValue);
    assert.strictEqual(result[0].cssText, input);
  });

  test('Invalid input to parsing returns null (and does not throw)', function() {
    assert.isNull(typedOM.internal.parsing.consumePositionValue(''));
    assert.isNull(typedOM.internal.parsing.consumePositionValue('bananas'));
    assert.isNull(typedOM.internal.parsing.consumePositionValue('5px'));
    assert.isNull(typedOM.internal.parsing.consumePositionValue('6px 3'));
    assert.isNull(typedOM.internal.parsing.consumePositionValue('calc(3px - 3em 6px'));
  });
});
