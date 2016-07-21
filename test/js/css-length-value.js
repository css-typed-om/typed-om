suite('CSSLengthValue', function() {
  test('from returns a CSSSimpleLength which is an instance of CSSLengthValue and CSSStyleValue', function() {
    var simpleLength = CSSLengthValue.from(9.2, 'px');
    assert.instanceOf(simpleLength, CSSSimpleLength, 'A new simpleLength should be an instance of CSSSimpleLength');
    assert.instanceOf(simpleLength, CSSLengthValue, 'A new simpleLength should be an instance of CSSLengthValue');
    assert.instanceOf(simpleLength, CSSStyleValue, 'A new simpleLength should be an instance of CSSStyleValue');
  });

  test('from returns a CSSCalcLength which is an instance of CSSLengthValue and CSSStyleValue', function() {
    var calcLength = CSSLengthValue.from({px: 10});
    assert.instanceOf(calcLength, CSSCalcLength, 'A new calcLength should be an instance of CSSCalcLength');
    assert.instanceOf(calcLength, CSSLengthValue, 'A new calcLength should be an instance of CSSLengthValue');
    assert.instanceOf(calcLength, CSSStyleValue, 'A new calcLength should be an instance of CSSStyleValue');
  });

  test('CSSLengthValue copy constructor returns a CSSLengthValue', function() {
    var simple = new CSSSimpleLength(3, 'px');
    var simpleCopy;
    assert.doesNotThrow(function() {simpleCopy = new CSSLengthValue(simple)});
    assert.instanceOf(simpleCopy, CSSSimpleLength,
        'A new simpleLength should be an instanceOf CSSSimpleLength');
    assert.deepEqual(simpleCopy, simple);

    var calc = new CSSCalcLength({px: 10});
    var calcCopy;
    assert.doesNotThrow(function() {calcCopy = new CSSLengthValue(calc)});
    assert.instanceOf(calcCopy, CSSCalcLength,
        'A new calcLength should be an instanceOf CSSCalcLength');
    assert.deepEqual(calcCopy, calc);
  });

  test('CSSLengthValue.from returns expected CSSSimpleLengths for simple strings', function() {
    var values = [
      {str: '0', out: new CSSSimpleLength(0, 'px')},
      {str: '1px', out: new CSSSimpleLength(1, 'px')},
      {str: '2%', out: new CSSSimpleLength(2, 'percent')},
      {str: '3em', out: new CSSSimpleLength(3, 'em')},
      {str: '4ex', out: new CSSSimpleLength(4, 'ex')},
      {str: '6ch', out: new CSSSimpleLength(6, 'ch')},
      {str: '7rem', out: new CSSSimpleLength(7, 'rem')},
      {str: '8vw', out: new CSSSimpleLength(8, 'vw')},
      {str: '9vh', out: new CSSSimpleLength(9, 'vh')},
      {str: '10vmin', out: new CSSSimpleLength(10, 'vmin')},
      {str: '11vmax', out: new CSSSimpleLength(11, 'vmax')},
      {str: '12cm', out: new CSSSimpleLength(12, 'cm')},
      {str: '13mm', out: new CSSSimpleLength(13, 'mm')},
      {str: '14in', out: new CSSSimpleLength(14, 'in')},
      {str: '15pc', out: new CSSSimpleLength(15, 'pc')},
      {str: '16pt', out: new CSSSimpleLength(16, 'pt')},
      // more complicated numbers.
      {str: '4.01px', out: new CSSSimpleLength(4.01, 'px')},
      {str: '-456.8px', out: new CSSSimpleLength(-456.8, 'px')},
      {str: '0.0px', out: new CSSSimpleLength(0, 'px')},
      {str: '+0.0px', out: new CSSSimpleLength(0, 'px')},
      {str: '-0.0px', out: new CSSSimpleLength(0, 'px')},
      {str: '.7px', out: new CSSSimpleLength(0.7, 'px')},
      {str: '10e3px', out: new CSSSimpleLength(10e3, 'px')},
      {str: '-3.4e-2px', out: new CSSSimpleLength(-3.4e-2, 'px')},
      // Case for units.
      {str: '1PX', out: new CSSSimpleLength(1, 'px')},
      {str: '3EM', out: new CSSSimpleLength(3, 'em')},
      {str: '4EX', out: new CSSSimpleLength(4, 'ex')},
      {str: '6CH', out: new CSSSimpleLength(6, 'ch')},
      {str: '7REM', out: new CSSSimpleLength(7, 'rem')},
      {str: '8VW', out: new CSSSimpleLength(8, 'vw')},
      {str: '9VH', out: new CSSSimpleLength(9, 'vh')},
      {str: '10VMIN', out: new CSSSimpleLength(10, 'vmin')},
      {str: '11VMAX', out: new CSSSimpleLength(11, 'vmax')},
      {str: '12CM', out: new CSSSimpleLength(12, 'cm')},
      {str: '13MM', out: new CSSSimpleLength(13, 'mm')},
      {str: '14IN', out: new CSSSimpleLength(14, 'in')},
      {str: '15PC', out: new CSSSimpleLength(15, 'pc')},
      {str: '16PT', out: new CSSSimpleLength(16, 'pt')},
    ];

    for (var i = 0; i < values.length; i++) {
      var result = CSSLengthValue.from(values[i].str);
      assert.instanceOf(result, CSSSimpleLength);
      assert.isTrue(values[i].out.equals(result),
          'Parsing ' + values[i].str + ' did not produce the expected CSSSimpleLength.');
    }
  });

  test('CSSLengthValue.from returns expected CSSCalcLengths for calc() strings.', function() {
    var values = [
      {str: 'calc(10px)', out: new CSSCalcLength({px: 10})},
      {str: 'calc(-10px)', out: new CSSCalcLength({px: -10})},
      // Addition and subtraction.
      {str: 'calc(10px + 5%)', out: new CSSCalcLength({px: 10, percent: 5})},
      {str: 'calc(-10px - 5%)', out: new CSSCalcLength({px: -10, percent: -5})},
      {str: 'calc(-10px + 5%)', out: new CSSCalcLength({px: -10, percent: 5})},
      {str: 'calc(10px - 5%)', out: new CSSCalcLength({px: 10, percent: -5})},
      // Multiplication and division.
      {str: 'calc(2*(10px - 5%))', out: new CSSCalcLength({px: 20, percent: -10})},
      {str: 'calc((10px - 5%)/2)', out: new CSSCalcLength({px: 5, percent: -2.5})},
      // More nesting.
      {str: 'calc(((10px - 5%)/2) + 10px)', out: new CSSCalcLength({px: 15, percent: -2.5})},
      // Complicated numbers in calcs.
      {
        str: 'calc(4.01px + -0.65% + .5em + 10e2ch + -3.6e-6vmax)',
        out: new CSSCalcLength({px: 4.01, percent: -0.65, em: 0.5, ch: 10e2, vmax: -3.6e-6})
      }
    ];
    for (var i = 0; i < values.length; i++) {
      var result = CSSLengthValue.from(values[i].str);
      assert.instanceOf(result, CSSCalcLength);
      assert.isTrue(values[i].out.equals(result),
          'Parsing ' + values[i].str + ' did not produce the expected CSSCalcLength.');
    }
  });

  test('CSSLengthValue.from throws exceptions for invalid input.', function() {
    // Invalid types.
    assert.throws(function() { CSSLengthValue.from(); });
    assert.throws(function() { CSSLengthValue.from(null); });
    assert.throws(function() { CSSLengthValue.from(5); });
    assert.throws(function() { CSSLengthValue.from('abc', 'px'); });
    // Completely invalid strings.
    assert.throws(function() { CSSLengthValue.from(''); });
    assert.throws(function() { CSSLengthValue.from('lemons'); });
    // Invalid numbers
    assert.throws(function() { CSSLengthValue.from('-3.4e-2.6px'); });
    // Invalid calc statements.
    assert.throws(function() { CSSLengthValue.from('calc()'); });
    assert.throws(function() { CSSLengthValue.from('calc(5)'); });
    assert.throws(function() { CSSLengthValue.from('calc(50 + 5px)'); });
    assert.throws(function() { CSSLengthValue.from('calc(pickles)'); });
    assert.throws(function() { CSSLengthValue.from('calc(5px + 5invalid)'); });
    assert.throws(function() { CSSLengthValue.from('calc(5px * 5px)'); });
    assert.throws(function() { CSSLengthValue.from('calc(5px + calc(3%))'); });
    assert.throws(function() { CSSLengthValue.from('calc(5px + 4em'); });
    assert.throws(function() { CSSLengthValue.from('calc(5px + 3 * (4em)'); });
    // Invalid or missing units.
    assert.throws(function() { CSSLengthValue.from('100'); });
    assert.throws(function() { CSSLengthValue.from('50somethings'); });
    // Trailing characters.
    assert.throws(function() { CSSLengthValue.from('calc(10px) abc'); });
    assert.throws(function() { CSSLengthValue.from('calc(10px))'); });
    assert.throws(function() { CSSLengthValue.from('5px abc'); });
  });
});
