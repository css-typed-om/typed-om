suite('LengthValue', function() {
  test('fromValue returns a SimpleLength which is an instance of LengthValue and StyleValue', function() {
    var simpleLength = LengthValue.fromValue(9.2, 'px');
    assert.instanceOf(simpleLength, SimpleLength, 'A new simpleLength should be an instance of SimpleLength');
    assert.instanceOf(simpleLength, LengthValue, 'A new simpleLength should be an instance of LengthValue');
    assert.instanceOf(simpleLength, StyleValue, 'A new simpleLength should be an instance of StyleValue');
  });

  test('fromDictionary returns a CalcLength which is an instance of LengthValue and StyleValue', function() {
    var calcLength = LengthValue.fromDictionary({px: 10});
    assert.instanceOf(calcLength, CalcLength, 'A new calcLength should be an instance of CalcLength');
    assert.instanceOf(calcLength, LengthValue, 'A new calcLength should be an instance of LengthValue');
    assert.instanceOf(calcLength, StyleValue, 'A new calcLength should be an instance of StyleValue');
  });

  test('LengthValue copy constructor returns a LengthValue', function() {
    var simple = new SimpleLength(3, 'px');
    var simpleCopy;
    assert.doesNotThrow(function() {simpleCopy = new LengthValue(simple)});
    assert.instanceOf(simpleCopy, SimpleLength,
        'A new simpleLength should be an instanceOf SimpleLength');
    assert.deepEqual(simpleCopy, simple);

    var calc = new CalcLength({px: 10});
    var calcCopy;
    assert.doesNotThrow(function() {calcCopy = new LengthValue(calc)});
    assert.instanceOf(calcCopy, CalcLength,
        'A new calcLength should be an instanceOf CalcLength');
    assert.deepEqual(calcCopy, calc);
  });

  test('LengthValue.parse returns expected SimpleLengths for simple strings', function() {
    var values = [
      {str: '0', out: new SimpleLength(0, 'px')},
      {str: '1px', out: new SimpleLength(1, 'px')},
      {str: '2%', out: new SimpleLength(2, 'percent')},
      {str: '3em', out: new SimpleLength(3, 'em')},
      {str: '4ex', out: new SimpleLength(4, 'ex')},
      {str: '6ch', out: new SimpleLength(6, 'ch')},
      {str: '7rem', out: new SimpleLength(7, 'rem')},
      {str: '8vw', out: new SimpleLength(8, 'vw')},
      {str: '9vh', out: new SimpleLength(9, 'vh')},
      {str: '10vmin', out: new SimpleLength(10, 'vmin')},
      {str: '11vmax', out: new SimpleLength(11, 'vmax')},
      {str: '12cm', out: new SimpleLength(12, 'cm')},
      {str: '13mm', out: new SimpleLength(13, 'mm')},
      {str: '14in', out: new SimpleLength(14, 'in')},
      {str: '15pc', out: new SimpleLength(15, 'pc')},
      {str: '16pt', out: new SimpleLength(16, 'pt')},
      // more complicated numbers.
      {str: '4.01px', out: new SimpleLength(4.01, 'px')},
      {str: '-456.8px', out: new SimpleLength(-456.8, 'px')},
      {str: '0.0px', out: new SimpleLength(0, 'px')},
      {str: '+0.0px', out: new SimpleLength(0, 'px')},
      {str: '-0.0px', out: new SimpleLength(0, 'px')},
      {str: '.7px', out: new SimpleLength(0.7, 'px')},
      {str: '10e3px', out: new SimpleLength(10e3, 'px')},
      {str: '-3.4e-2px', out: new SimpleLength(-3.4e-2, 'px')},
    ];
  
    for (var i = 0; i < values.length; i++) {
      var result = LengthValue.parse(values[i].str);
      assert.instanceOf(result, SimpleLength);
      assert.isTrue(values[i].out.equals(result),
          'Parsing ' + values[i].str + ' did not produce the expected SimpleLength.');
    }
  });

  test('LengthValue.parse returns expected CalcLengths for calc() strings.', function() {
    var values = [
      {str: 'calc(10px)', out: new CalcLength({px: 10})},
      {str: 'calc(-10px)', out: new CalcLength({px: -10})},
      // Addition and subtraction.
      {str: 'calc(10px + 5%)', out: new CalcLength({px: 10, percent: 5})},
      {str: 'calc(-10px - 5%)', out: new CalcLength({px: -10, percent: -5})},
      {str: 'calc(-10px + 5%)', out: new CalcLength({px: -10, percent: 5})},
      {str: 'calc(10px - 5%)', out: new CalcLength({px: 10, percent: -5})},
      // Multiplication and division.
      {str: 'calc(2*(10px - 5%))', out: new CalcLength({px: 20, percent: -10})},
      {str: 'calc((10px - 5%)/2)', out: new CalcLength({px: 5, percent: -2.5})},
      // More nesting.
      {str: 'calc(((10px - 5%)/2) + 10px)', out: new CalcLength({px: 15, percent: -2.5})},
      // Complicated numbers in calcs.
      {
        str: 'calc(4.01px + -0.65% + .5em + 10e2ch + -3.6e-6vmax)',
        out: new CalcLength({px: 4.01, percent: -0.65, em: 0.5, ch: 10e2, vmax: -3.6e-6})
      }
    ];
    for (var i = 0; i < values.length; i++) {
      var result = LengthValue.parse(values[i].str);
      assert.instanceOf(result, CalcLength);
      assert.isTrue(values[i].out.equals(result),
          'Parsing ' + values[i].str + ' did not produce the expected CalcLength.');
    }
  });

  test('LengthValue.parse throws exceptions for invalid input.', function() {
    var values = [
      // Invalid types.
      null, 5,
      // Completely invalid strings.
      '', 'lemons',
      // Invalid numbers
      '-3.4e-2.6px',
      // Invalid calc statements.
      'calc()', 'calc(5)', 'calc(50 + 5px)', 'calc(pickles)',
      'calc(5px + 5invalid)', 'calc(5px * 5px)',
      'calc(5px + calc(3%))',
      // Invalid or missing units.
      '100', '50somethings'
    ];
    for (var i = 0; i < values.length; i++) {
      assert.throws(function() { LengthValue.parse(values[i]); }, TypeError);
    }
  });
});
