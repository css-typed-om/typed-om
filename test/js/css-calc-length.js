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

suite('CSSCalcLength', function() {
  test('CSSCalcLength is a CSSCalcLength, CSSLengthValue and CSSStyleValue', function() {
    var calcLength = new CSSCalcLength({px: 10});
    assert.instanceOf(calcLength, CSSCalcLength, 'A new CSSCalcLength should be an instance of CSSCalcLength');
    assert.instanceOf(calcLength, CSSLengthValue, 'A new CSSCalcLength should be an instance of CSSLengthValue');
    assert.instanceOf(calcLength, CSSStyleValue, 'A new CSSCalcLength should be an instance of CSSStyleValue');
  });

  test('CSSCalcLength constructor throws exception for invalid types', function() {
    assert.throws(function() {new CSSCalcLength({px: 'abc'})});
    assert.throws(function() {new CSSCalcLength({px: {}})});
    assert.throws(function() {new CSSCalcLength({})});
  });

  test('CSSCalcLength empty constructor initializes other fields to null', function() {
    var calcLength;
    assert.doesNotThrow(function() {calcLength = new CSSCalcLength({px: 10})});

   typedOM.internal.objects.foreach(typedOM.internal.CSSLengthTypes, function(type) {
      if (type != typedOM.internal.CSSLengthTypes.PX) {
        assert.isNull(calcLength[type], 'Each field in an empty instantiated CSSCalcLength is null');
      }
    });
  });

  // Possible constructor: CSSCalcLength(dictionary)
  test('CSSCalcLength constructor works correctly for single and multi value CalcDictionaries', function() {
    var valueFromNumber;
    assert.doesNotThrow(function() {valueFromNumber = new CSSCalcLength({px: 10})});
    assert.strictEqual(valueFromNumber.px, 10);

    var multiValue;
    assert.doesNotThrow(function() {multiValue = new CSSCalcLength({px: 10, em: 3.2})});
    assert.strictEqual(multiValue.px, 10);
    assert.strictEqual(multiValue.em, 3.2);
  });

  test('CSSCalcLength constructor works correctly for (CSSCalcLength)', function() {
    var original;
    var copy;
    assert.doesNotThrow(function() {original = new CSSCalcLength({px: 10, em: 3.2})});
    assert.doesNotThrow(function() {copy = new CSSCalcLength(original)});
    assert.strictEqual(copy.px, original.px);
    assert.strictEqual(copy.em, original.em);
    assert.strictEqual(copy.cssText, original.cssText);
    assert.deepEqual(copy, original);

    // Ensure that the copied object is not tied to the original.
    assert.doesNotChange(function() {original.px = 3}, copy, 'px');
  });

  test('CSSCalcLength cssText is correct for single and multi value strings', function() {
    var singleValue;
    assert.doesNotThrow(function() {singleValue = new CSSCalcLength({px: 10})});
    assert.strictEqual(singleValue.px, 10);
    assert.strictEqual(singleValue.cssText, 'calc(10px)');

    var multiValue;
    assert.doesNotThrow(function() {multiValue = new CSSCalcLength({px: 10, em: 3.2})});
    assert.strictEqual(multiValue.px, 10);
    assert.strictEqual(multiValue.em, 3.2);
    assert.strictEqual(multiValue.cssText, 'calc(10px + 3.2em)');

    var negativeValues;
    assert.doesNotThrow(function() {negativeValues = new CSSCalcLength({px: -10, em: -3.2, pt: 0})});
    assert.strictEqual(negativeValues.px, -10);
    assert.strictEqual(negativeValues.em, -3.2);
    assert.strictEqual(negativeValues.pt, 0);
    assert.strictEqual(negativeValues.cssText, 'calc(-10px - 3.2em + 0pt)');

    var percentValue;
    assert.doesNotThrow(function() {percentValue = new CSSCalcLength({percent: 10})});
    assert.strictEqual(percentValue.percent, 10);
    assert.strictEqual(percentValue.cssText, 'calc(10%)');
  });

  test('Multiplication of a CSSCalcLength length produces a new CSSCalcLength object', function() {
    var calcLength = new CSSCalcLength({px: 10, em: 3.2});
    var result = calcLength.multiply(4);

    assert.strictEqual(result.cssText, 'calc(40px + 12.8em)');
  });

  test('Multiplication of a decimal number produces expected result', function() {
    var calcLength = new CSSCalcLength({px: 10, em: 3.2});
    var result = calcLength.multiply(0.5);

    assert.strictEqual(result.cssText, 'calc(5px + 1.6em)');
  });

  test('Division of a CSSCalcLength length produces a new CSSCalcLength object', function() {
    var calcLength = new CSSCalcLength({px: 10, em: 4.0});
    var result = calcLength.divide(4);

    assert.strictEqual(result.cssText, 'calc(2.5px + 1em)');
  });

  test('Division of a decimal number produces expected result', function() {
    var calcLength = new CSSCalcLength({px: 25, em: 3.2});
    var result = calcLength.divide(2.5);

    assert.strictEqual(result.cssText, 'calc(10px + 1.28em)');
  });

  test('Adding two CSSCalcLengths returns a new CSSCalcLength with expected values in each value type', function() {
    var calcLength1 = new CSSCalcLength({px: 15, em: 6});
    var calcLength2 = new CSSCalcLength({px: 10, em: 3});
    var result = calcLength1.add(calcLength2);
    var expectedResult = new CSSCalcLength({px: 25, em: 9});

    assert.isTrue(expectedResult.equals(result));
  });

  test('All values in added CSSCalcLengths appear in the output', function() {
    var calcLength1 = new CSSCalcLength({px: 15, em: 6, percent: 5});
    var calcLength2 = new CSSCalcLength({px: 10, em: 3, ex: 6});
    var result = calcLength1.add(calcLength2);
    var expectedResult = new CSSCalcLength({px: 25, em: 9, percent: 5, ex: 6});

    assert.isTrue(expectedResult.equals(result));
  });

  test('Null length values in CSSCalcLengths add to null, not zero', function() {
    var calcLength1 = new CSSCalcLength({px: 15, em: null, percent: 5});
    var calcLength2 = new CSSCalcLength({px: 10, em: null, ex: 6});
    var result = calcLength1.add(calcLength2);

    assert.strictEqual(null, result.em);
  });

  test('Subtracting two CSSCalcLengths returns a new CSSCalcLength with expected values in each value type', function() {
    var calcLength1 = new CSSCalcLength({px: 15, em: 6});
    var calcLength2 = new CSSCalcLength({px: 10, em: 3});
    var result = calcLength1.subtract(calcLength2);
    var expectedResult = new CSSCalcLength({px: 5, em: 3});

    assert.isTrue(expectedResult.equals(result));
  });

  test('All values in subtracted CSSCalcLengths appear in the output', function() {
    var calcLength1 = new CSSCalcLength({px: 15, em: 6, percent: 5});
    var calcLength2 = new CSSCalcLength({px: 10, em: 3, ex: 6});
    var result = calcLength1.subtract(calcLength2);
    var expectedResult = new CSSCalcLength({px: 5, em: 3, percent: 5, ex: -6});

    assert.isTrue(expectedResult.equals(result));
  });

  test('Subtracting null length values in CSSCalcLengths results in null, not zero', function() {
    var calcLength1 = new CSSCalcLength({px: 15, em: null, percent: 5});
    var calcLength2 = new CSSCalcLength({px: 10, em: null, ex: 6});
    var result = calcLength1.subtract(calcLength2);

    assert.strictEqual(null, result.em);
  });

  test('CSSCalcLength.equals returns true if the compared CSSCalcLengths are the same', function() {
    var calcLength1 = new CSSCalcLength({px: 25, em: 3.2});
    var calcLength2 = new CSSCalcLength({px: 25, em: 3.2});

    assert.isTrue(calcLength1.equals(calcLength2));
  });

  test('equals method should return false when one CSSCalcLength has additional length types with non null values' +
      'even if all other types are equivalent', function() {
    var calcLength1 = new CSSCalcLength({px: 25, em: 3.2, percent: 5});
    var calcLength2 = new CSSCalcLength({px: 25, em: 3.2});

    assert.isFalse(calcLength1.equals(calcLength2));
  });

  test('equals method should return true when one CSSCalcLength has additional length types with null values', function() {
    var calcLength1 = new CSSCalcLength({px: 25, em: 3.2, percent: null});
    var calcLength2 = new CSSCalcLength({px: 25, em: 3.2});

    assert.isTrue(calcLength1.equals(calcLength2));
  });
});
