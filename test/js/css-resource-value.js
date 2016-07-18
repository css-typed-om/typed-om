suite('CSSResourceValue', function() {
  test('CSSResourceValue is a CSSResourceValue and a CSSStyleValue', function() {
    assert.instanceOf(new CSSResourceValue('loading'), CSSResourceValue);
    assert.instanceOf(new CSSResourceValue('loading'), CSSStyleValue);
  });

  test('Constructor only accepts a string of CSSResourceState', function() {
    assert.throw(function() { new CSSResourceValue(); }, TypeError, 'State of a CSSResourceValue must be one of CSSResourceState');
    assert.throw(function() { new CSSResourceValue(1); }, TypeError, 'State of a CSSResourceValue must be one of CSSResourceState');
    assert.throw(function() { new CSSResourceValue([1, 2]); }, TypeError, 'State of a CSSResourceValue must be one of CSSResourceState');
    assert.throw(function() { new CSSResourceValue('undefined'); }, TypeError, 'State of a CSSResourceValue must be one of CSSResourceState');
  });
});
