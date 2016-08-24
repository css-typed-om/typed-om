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

  test('parse works for transform(translate)', function() {
    var value = CSSStyleValue.parse('transform', 'translate(10px)');
    // TODO: Change cssText for CSSTranslation so that it reflects parsed string.
    assert.strictEqual(value.cssText, 'translate(10px, 0px)');
    assert.instanceOf(value.transformComponents[0], CSSTranslation);
    assert.strictEqual(value.transformComponents[0].x.value, 10);
    assert.strictEqual(value.transformComponents[0].x.type, 'px');
    assert.strictEqual(value.transformComponents[0].y.value, 0);
    assert.strictEqual(value.transformComponents[0].y.type, 'px');
    // TODO: Change this to something sensible. Udate spec?
    assert.isNull(value.transformComponents[0].z);

    value = CSSStyleValue.parse('transform', 'translatez(1px)');
    assert.strictEqual(value.cssText, 'translate3d(0px, 0px, 1px)');
    assert.instanceOf(value.transformComponents[0], CSSTranslation);
    assert.strictEqual(value.transformComponents[0].x.value, 0);
    assert.strictEqual(value.transformComponents[0].x.type, 'px');
    assert.strictEqual(value.transformComponents[0].y.value, 0);
    assert.strictEqual(value.transformComponents[0].y.type, 'px');
    assert.strictEqual(value.transformComponents[0].z.value, 1);
    assert.strictEqual(value.transformComponents[0].y.type, 'px');
  });

  test('parse works for transform(skew)', function() {
    var value = CSSStyleValue.parse('transform', 'skewx(10rad)');
    assert.strictEqual(value.cssText, 'skewx(10rad)');
    assert.instanceOf(value.transformComponents[0], CSSSkew);
    assert.strictEqual(value.transformComponents[0].ax.radians, 10);
    assert.strictEqual(value.transformComponents[0].ay.degrees, 0);

    value = CSSStyleValue.parse('transform', 'skew(1rad, 30deg)');
    assert.strictEqual(value.cssText, 'skew(1rad, 30deg)');
    assert.instanceOf(value.transformComponents[0], CSSSkew);
    assert.strictEqual(value.transformComponents[0].ax.radians, 1);
    assert.strictEqual(value.transformComponents[0].ay.degrees, 30);

    value = CSSStyleValue.parse('transform', 'skew(0.5turn)');
    assert.strictEqual(value.cssText, 'skew(0.5turn)');
    assert.instanceOf(value.transformComponents[0], CSSSkew);
    assert.strictEqual(value.transformComponents[0].ax.degrees, 180);
    assert.strictEqual(value.transformComponents[0].ay.degrees, 0);
  });

  test('parse works for transform(rotate)', function() {
    var value = CSSStyleValue.parse('transform', 'rotate(1rad)');
    assert.strictEqual(value.cssText, 'rotate(1rad)');
    assert.instanceOf(value.transformComponents[0], CSSRotation);
    assert.strictEqual(value.transformComponents[0].angle.radians, 1);

    value = CSSStyleValue.parse('transform', 'rotate3d(1, 1, 1, 15deg)');
    assert.strictEqual(value.cssText, 'rotate3d(1, 1, 1, 15deg)');
    assert.instanceOf(value.transformComponents[0], CSSRotation);
    assert.strictEqual(value.transformComponents[0].x, 1);
    assert.strictEqual(value.transformComponents[0].y, 1);
    assert.strictEqual(value.transformComponents[0].z, 1);
    assert.strictEqual(value.transformComponents[0].angle.degrees, 15);
  });

  test('parse works for transform(scale)', function() {
    var value = CSSStyleValue.parse('transform', 'scale(2)');
    // TODO: Change cssText for CSSScale so that it reflects parsed string.
    assert.strictEqual(value.cssText, 'scale(2, 2)');
    assert.instanceOf(value.transformComponents[0], CSSScale);
    assert.strictEqual(value.transformComponents[0].x, 2);
    assert.strictEqual(value.transformComponents[0].y, 2);
    // TODO: Change this to something sensible. Udate spec?
    assert.isNull(value.transformComponents[0].z);

    value = CSSStyleValue.parse('transform', 'scaley(2)');
    assert.strictEqual(value.cssText, 'scale(1, 2)');
    assert.instanceOf(value.transformComponents[0], CSSScale);
    assert.strictEqual(value.transformComponents[0].x, 1);
    assert.strictEqual(value.transformComponents[0].y, 2);
    assert.isNull(value.transformComponents[0].z);

    value = CSSStyleValue.parse('transform', 'scalez(2)');
    assert.strictEqual(value.cssText, 'scale3d(1, 1, 2)');
    assert.instanceOf(value.transformComponents[0], CSSScale);
    assert.strictEqual(value.transformComponents[0].x, 1);
    assert.strictEqual(value.transformComponents[0].y, 1);
    assert.strictEqual(value.transformComponents[0].z, 2);
  });

  test('parse works for transform(matrix)', function() {
    var value = CSSStyleValue.parse('transform', 'matrix(2, 0, 2, 2, 0, 0)');
    assert.strictEqual(value.cssText, 'matrix(2, 0, 2, 2, 0, 0)');
    assert.instanceOf(value.transformComponents[0], CSSMatrix);
    typedOM.internal.testing.matricesApproxEqual(value.transformComponents[0].matrix, new DOMMatrixReadonly([2, 0, 2, 2, 0, 0]));

    value = CSSStyleValue.parse('transform', 'matrix3d(1, 2, 3, 4, 5, 6, 7, 8.6, 9, 10, 11, 12, 13, 14, 15, 16)');
    assert.strictEqual(value.cssText, 'matrix3d(1, 2, 3, 4, 5, 6, 7, 8.6, 9, 10, 11, 12, 13, 14, 15, 16)');
    assert.instanceOf(value.transformComponents[0], CSSMatrix);
    typedOM.internal.testing.matricesApproxEqual(value.transformComponents[0].matrix, new DOMMatrixReadonly([1, 2, 3, 4, 5, 6, 7, 8.6, 9, 10, 11, 12, 13, 14, 15, 16]));
  });

  test('parse works for transform(perspective)', function() {
    var value = CSSStyleValue.parse('transform', 'perspective(10px)');
    assert.strictEqual(value.cssText, 'perspective(10px)');
    assert.instanceOf(value.transformComponents[0], CSSPerspective);
    assert.strictEqual(value.transformComponents[0].length.value, 10);
    assert.strictEqual(value.transformComponents[0].length.type, 'px');
  });

  test('parse should be case insensitive', function() {
    var value = CSSStyleValue.parse('height', 'CaLc(10px + 3em)');
    assert.strictEqual(value.cssText, 'calc(10px + 3em)');
  });

  test('parse throws an error if either the property or the cssText is not a string', function() {
    assert.throws(function() {CSSStyleValue.parse(4, 'auto')}, TypeError, /^Property name must be a string/);
    assert.throws(function() {CSSStyleValue.parse('height', 5)}, TypeError, /^Must parse a string/);
  });

  test('parse returns null if an unsupported property is entered', function() {
    assert.isNull(CSSStyleValue.parse('lemons', '10px'));
  });

  test('parse returns null if a cssText representing a CSSStyleValue type unsupported by a property is entered', function() {
    assert.isNull(CSSStyleValue.parse('height', '10'));
  });

  test('instantiating CSSStyleValue throws', function() {
    assert.throws(function() {new CSSStyleValue('10px')}, TypeError, 'CSSStyleValue cannot be instantiated.');
  });

  test('internal.CSSStyleValue can be constructed and appears to be a regular CSSStyleValue', function() {
    var internalStyleValue;
    assert.doesNotThrow(function() { internalStyleValue = new typedOM.internal.CSSStyleValue('foo'); });
    assert.strictEqual(internalStyleValue.cssText, 'foo');
    assert.strictEqual(internalStyleValue.constructor, CSSStyleValue);
  });

  test('parse successfully creates an array of CSSStyleValue objects if the cssText is a valid list of values ' +
    'for a property', function() {
    var keywordValueArray = CSSStyleValue.parse('animation-iteration-count', 'infinite, 4, 5, 7, 9');
    assert.deepEqual(keywordValueArray, [new CSSKeywordValue('infinite'), new CSSNumberValue(4), new CSSNumberValue(5), new CSSNumberValue(7), new CSSNumberValue(9)]);
  });
});
