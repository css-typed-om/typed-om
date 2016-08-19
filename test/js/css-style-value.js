suite('CSSStyleValue', function() {
  test('parse works for keywords', function() {
    var keywordValue  = CSSStyleValue.parse('height', 'auto');
    assert.strictEqual(keywordValue.cssText, 'auto');
  });

  test('parse works for lengths', function() {
    var value = CSSStyleValue.parse('height', 'calc(10px + 3em)');
    assert.strictEqual(value.cssText, 'calc(10px + 3em)');
    assert.strictEqual(value.px, 10);
    assert.strictEqual(value.em, 3);

    value = CSSStyleValue.parse('height', '11px');
    assert.strictEqual(value.cssText, '11px');
    assert.strictEqual(value.value, 11);
    assert.strictEqual(value.type, 'px');
  });

  test('parse works for numbers', function() {
    var value = CSSStyleValue.parse('opacity', '0.3');
    assert.strictEqual(value.cssText, '0.3');
    assert.strictEqual(value.value, 0.3);
  });

  test('parse works for transforms', function() {
    var value = CSSStyleValue.parse('transform', 'translate(10px)');
    console.log(value);
    assert.strictEqual(value.cssText, 'translate(10px, 0px)');
    assert.instanceOf(value.transformComponents[0], CSSTranslation);
    assert.strictEqual(value.transformComponents[0].x.value, 10);
    assert.strictEqual(value.transformComponents[0].x.type, 'px');
    assert.strictEqual(value.transformComponents[0].y.value, 0);
    assert.strictEqual(value.transformComponents[0].y.type, 'px');
    // TODO: Renee: Really? Null?
    assert.isNull(value.transformComponents[0].z);
    // TODO: Renee: Add skewx(10rad), rotate(1rad), rotate3d(1, 1, 1, 1rad) and more.
  });

  test('parse should be case insensitive', function() {
    var value = CSSStyleValue.parse('height', 'CaLc(10px + 3em)');
    assert.strictEqual(value.cssText, 'calc(10px + 3em)');
  });

  //TODO: Renee: Make these check the error string.
  test('parse throws an error if either the property or the cssText is not a string', function() {
    assert.throws(function() {CSSStyleValue.parse(4, 'auto')}, TypeError, 'Property name must be a string');
    assert.throws(function() {CSSStyleValue.parse('height', 5)}, TypeError, 'Must parse a string');
  });

  test('parse returns null if an unsupported property is entered', function() {
    assert.isNull(CSSStyleValue.parse('lemons', '10px'));
  });

  test('parse returns null if a cssText representing a CSSStyleValue type unsupported by a property is entered', function() {
    assert.isNull(CSSStyleValue.parse('height', '10'));
  });

  //TODO: Renee: Make these check the error string.
  test('instantiating CSSStyleValue throws', function() {
    assert.throws(function() {new CSSStyleValue('10px')}, TypeError, 'CSSStyleValue cannot be instantiated.');
  });

  test('internal.CSSStyleValue can be constructed and appears to be a regular CSSStyleValue', function() {
    var internalStyleValue;
    assert.doesNotThrow(function() { internalStyleValue = new typedOM.internal.CSSStyleValue('foo'); });
    assert.strictEqual(internalStyleValue.cssText, 'foo');
    assert.strictEqual(internalStyleValue.constructor, CSSStyleValue);
  });

  // Skipping until parse is hooked up through methods other than .from
  test.skip('parse successfully creates an array of CSSStyleValue objects if the cssText is a valid list of values ' +
    'for a property', function() {
    var keywordValueArray = CSSStyleValue.parse('animation-iteration-count', 'infinite, 4, 5, 7, 9');
    assert.deepEqual(keywordValueArray, [new CSSKeywordValue('infinite'), new CSSNumberValue(4), new CSSNumberValue(5), new CSSNumberValue(7), new CSSNumberValue(9)]);
  });
});
