suite('CalcLength', function() {
  test('CalcLength is a CalcLength, LengthValue and StyleValue', function() {
    var calcLength = new CalcLength({px: 10});
    assert.instanceOf(calcLength, CalcLength, 'A new CalcLength should be an instance of CalcLength');
    assert.instanceOf(calcLength, LengthValue, 'A new CalcLength should be an instance of LengthValue');
    assert.instanceOf(calcLength, StyleValue, 'A new CalcLength should be an instance of StyleValue');
  });

  test('CalcLength constructor throws exception for invalid types', function() {
    assert.throws(function() {new CalcLength({px: 'abc'})});
    assert.throws(function() {new CalcLength({px: {}})});
    assert.throws(function() {new CalcLength({})});
  });

  test('CalcLength empty constructor initializes other fields to null', function() {
    var calcLength;
    assert.doesNotThrow(function() {calcLength = new CalcLength({px: 10})});
    for (var index in LengthValue.LengthType) {
      var type = LengthValue.LengthType[index];
      if (type != 'px') {
        assert.isNull(calcLength[type], 'Each field in an empty instantiated CalcLength is null');
      }
    }
  });

  // Possible constructor: CalcLength(dictionary)
  test('CalcLength constructor works correctly for single and multi value CalcDictionaries', function() {
    var valueFromNumber;
    assert.doesNotThrow(function() {valueFromNumber = new CalcLength({px: 10})});
    assert.strictEqual(valueFromNumber.px, 10);

    var multiValue;
    assert.doesNotThrow(function() {multiValue = new CalcLength({px: 10, em: 3.2})});
    assert.strictEqual(multiValue.px, 10);
    assert.strictEqual(multiValue.em, 3.2);
  });

  test('CalcLength cssString is correct for single and multi value strings', function() {
    var singleValue;
    assert.doesNotThrow(function() {singleValue = new CalcLength({px: 10})});
    assert.strictEqual(singleValue.px, 10);
    assert.strictEqual(singleValue.cssString, 'calc(10px)');

    var multiValue;
    assert.doesNotThrow(function() {multiValue = new CalcLength({px: 10, em: 3.2})});
    assert.strictEqual(multiValue.px, 10);
    assert.strictEqual(multiValue.em, 3.2);
    assert.strictEqual(multiValue.cssString, 'calc(10px+3.2em)');

    var negativeValues;
    assert.doesNotThrow(function() {negativeValues = new CalcLength({px: -10, em: -3.2, pt:0})});
    assert.strictEqual(negativeValues.px, -10);
    assert.strictEqual(negativeValues.em, -3.2);
    assert.strictEqual(negativeValues.pt, 0);
    assert.strictEqual(negativeValues.cssString, 'calc(-10px-3.2em+0pt)');

    var percentValue;
    assert.doesNotThrow(function() {percentValue = new CalcLength({percent: 10})});
    assert.strictEqual(percentValue.percent, 10);
    assert.strictEqual(percentValue.cssString, 'calc(10%)');
  });

  test('Multiplication of a CalcLength length produces a new CalcLength object', function() {
    var calcLength = new CalcLength({px: 10, em: 3.2})
    var multipliedCalcLength = calcLength.multiply(4);
    assert.strictEqual(multipliedCalcLength.cssString, 'calc(40px+12.8em)');
  });

  test('Multiplication of a decimal number produces expected result', function() {
    var calcLength = new CalcLength({px: 10, em: 3.2})
    var multipliedCalcLength = calcLength.multiply(0.5);
    assert.strictEqual(multipliedCalcLength.cssString, 'calc(5px+1.6em)');
  });

  test('Division of a CalcLength length produces a new CalcLength object', function() {
    var calcLength = new CalcLength({px: 10, em: 4.0})
    var dividedCalcLength = calcLength.divide(4);
    assert.strictEqual(dividedCalcLength.cssString, 'calc(2.5px+1em)');
  });

  test('Division of a decimal number produces expected result', function() {
    var calcLength = new CalcLength({px: 25, em: 3.2})
    var dividedCalcLength = calcLength.divide(2.5);
    assert.strictEqual(dividedCalcLength.cssString, 'calc(10px+1.28em)');
  });

  test('Adding two Claclengths returns a new Calclength with expected values in each value type', function() {
    var cLength_1 = new CalcLength({px: 15, em: 6})
    var cLength_2 = new CalcLength({px: 10, em: 3})
    var lengthAddition = cLength_1.add(cLength_2);
    var expectedlengthAddition = new CalcLength({px: 25, em: 9})

    assert.instanceOf(lengthAddition, CalcLength, 'two added Calclegths of same type should be an instance of CalcLength');
    assert.isTrue(expectedlengthAddition.equals(lengthAddition));
  });

    test('Calclegths do not have to have the same value types in order to be added and all value types seen in both'
        +'CalcLengths with be in the outputted calc length', function() {
    var cLength_1 = new CalcLength({px: 15, em: 6, percent: 5})
    var cLength_2 = new CalcLength({px: 10, em: 3, ex: 6})
    var lengthAddition = cLength_1.add(cLength_2);
    var expectedlengthAddition = new CalcLength({px: 25, em: 9, percent: 5, ex: 6});

    assert.instanceOf(lengthAddition, CalcLength, 'two added Calclegths of same type should be an instance of CalcLength');
    assert.isTrue(expectedlengthAddition.equals(lengthAddition));
  });

  test('Subtracting two Claclengths returns a new Calclength with expected values in each value type', function() {
    var cLength_1 = new CalcLength({px: 15, em: 6})
    var cLength_2 = new CalcLength({px: 10, em: 3})
    var lengthAddition = cLength_1.subtract(cLength_2);
    var expectedlengthAddition = new CalcLength({px: 5, em: 3})

    assert.instanceOf(lengthAddition, CalcLength, 'two added Calclegths of same type should be an instance of CalcLength');
    assert.isTrue(expectedlengthAddition.equals(lengthAddition));
  });

    test('Calclegths do not have to have the same value types in order to be subtracted from each other and all value types '
        +'seen in both CalcLengths with be in the outputted calc length', function() {
    var cLength_1 = new CalcLength({px: 15, em: 6, percent: 5})
    var cLength_2 = new CalcLength({px: 10, em: 3, ex: 6})
    var lengthAddition = cLength_1.subtract(cLength_2);
    var expectedlengthAddition = new CalcLength({px: 5, em: 3, percent: -5, ex: -6});

    assert.instanceOf(lengthAddition, CalcLength, 'two added Calclegths of same type should be an instance of CalcLength');
    assert.isTrue(expectedlengthAddition.equals(lengthAddition));
  });

  test('convertToCalcLength method returns the object that called it if it is of type CalcLength', function() {
    var cLength = new CalcLength({px: 25, em: 3.2})
    var convertedCalcLength = cLength._convertToCalcLength();
    assert.strictEqual(cLength, convertedCalcLength);
  });

  test('Test equals method of Calclength such that it will return true if two Calclength\'s are the same', function() {
  var cLength_1 = new CalcLength({px: 25, em: 3.2})
  var cLength_2 = new CalcLength({px: 25, em: 3.2})
  
  assert.isTrue(cLength_1.equals(cLength_2));
  });

  test('Equals method should return false when one calc length has additinal length types with non null values'
      +'even if all other types are equivilent', function() {
  var cLength_1 = new CalcLength({px: 25, em: 3.2, percent: 5})
  var cLength_2 = new CalcLength({px: 25, em: 3.2})
  
  assert.isFalse(cLength_1.equals(cLength_2));
  });

  test('Equals method should return true when one calc length has additinal length types with null values', function() {
  var cLength_1 = new CalcLength({px: 25, em: 3.2, percent: null})
  var cLength_2 = new CalcLength({px: 25, em: 3.2})
  
  assert.isTrue(cLength_1.equals(cLength_2));
  });
});
