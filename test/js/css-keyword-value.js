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

suite('CSSKeywordValue', function() {
  test('CSSKeywordValue is a CSSKeywordValue and a CSSStyleValue', function() {
    var keywordValue = new CSSKeywordValue('initial');
    assert.instanceOf(keywordValue, CSSKeywordValue,
      'A new CSSKeywordValue should be an instance of CSSKeywordValue');
    assert.instanceOf(keywordValue, CSSStyleValue,
      'A new CSSKeywordValue should be an instance of CSSStyleValue');
  });

  test('CSSKeywordValue.cssText and CSSKeywordValue.keywordValue are correctly ' +
      'initialized', function() {
    var keywordValue = new CSSKeywordValue('initial');
    var cssText = 'initial';
    assert.strictEqual(keywordValue.keywordValue, cssText);
    assert.strictEqual(keywordValue.cssText, cssText);
  });

  test('cssText returns a string with the same format as CSS.escape()', function() {
    assert.strictEqual(new CSSKeywordValue('initial').cssText, 'initial');
    assert.strictEqual(new CSSKeywordValue('center').cssText, 'center');
    assert.strictEqual(new CSSKeywordValue('customLemon').cssText, 'customLemon');
    assert.strictEqual(new CSSKeywordValue(' Hello World').cssText, CSS.escape(' Hello World'));
    assert.strictEqual(new CSSKeywordValue('3').cssText, CSS.escape('3'));
  });

  test('keywordValue returns a string equal to the string used in the constructor', function() {
    assert.strictEqual(new CSSKeywordValue('initial').keywordValue, 'initial');
    assert.strictEqual(new CSSKeywordValue('center').keywordValue, 'center');
    assert.strictEqual(new CSSKeywordValue('customLemon').keywordValue, 'customLemon');
    assert.strictEqual(new CSSKeywordValue(' Hello World').keywordValue, ' Hello World');
    assert.strictEqual(new CSSKeywordValue('3').keywordValue, '3');
  });

  test('CSSKeywordValue constructor throws an exception for invalid inputs', function() {
    assert.throws(function() { new CSSKeywordValue(); });
    assert.throws(function() { new CSSKeywordValue(1); });
    assert.throws(function() { new CSSKeywordValue(''); });
    assert.throws(function() { new CSSKeywordValue(null); });
    assert.throws(function() { new CSSKeywordValue(true); });
  });
});
