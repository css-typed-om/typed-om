suite('CSSTranslation', function() {
  test('csstranslation is a csstransformcomponent', function() {
    var validLength = new CSSSimpleLength(1, 'px');
    var translation = new CSSTranslation(validLength, validLength);
    assert.instanceOf(translation, typedOM.internal.CSSTransformComponent,
        'A new CSSTranslation should be an instance of CSSTransformComponent');
  });

  test('CSSTranslation constructor throws exception for non CSSLengthValue types',
      function() {
    assert.throws(function() {new CSSTranslation()});
    assert.throws(function() {new CSSTranslation({})});
    assert.throws(function() {new CSSTranslation(null)});
    assert.throws(function() {new CSSTranslation('1px', '2px')});
    assert.throws(function() {new CSSTranslation(1, 2)});
    assert.throws(function() {new CSSTranslation(null, null)});
    assert.throws(function() {new CSSTranslation({}, {})});
    assert.throws(function() {new CSSTranslation(null, null, null)});
  });

  test('CSSTranslation constructor throws exception for unsupported CSSLengthValues',
      function() {
    var validLength = new CSSSimpleLength(3, 'px');
    var emSimpleLength = new CSSSimpleLength(3, 'em');
    var pxCalcLength = new CSSCalcLength({px: 3});
    assert.throws(function() {new CSSTranslation(validLength, emSimpleLength)});
    assert.throws(function() {new CSSTranslation(emSimpleLength, emSimpleLength)});
    assert.throws(function() {new CSSTranslation(validLength, pxCalcLength)});
    assert.throws(function() {new CSSTranslation(pxCalcLength, pxCalcLength)});
    // Check that it can only take 2 or 3 arguments, not 1, nor 4.
    assert.throws(function() {new CSSTranslation(validLength)});
    assert.throws(function() {new CSSTranslation(validLength, validLength,
        validLength, validLength)});
    // Check that it doesn't make a 2D translation if z is invalid.
    assert.throws(function() {new CSSTranslation(validLength, validLength, null)});
    assert.throws(function() {new CSSTranslation(validLength, validLength,
        undefined)});
    assert.throws(function() {new CSSTranslation(validLength, validLength, {})});
    assert.throws(function() {new CSSTranslation(validLength, validLength,
        emSimpleLength)});
  });

  test('CSSTranslation constructor works correctly for 2 arguments', function() {
    var translation;
    var x = new CSSSimpleLength(3, 'px');
    var y = new CSSSimpleLength(-1, 'px');
    assert.doesNotThrow(function() {translation = new CSSTranslation(x, y)});

    assert.strictEqual(translation.x.value, 3);
    assert.strictEqual(translation.y.value, -1);
    assert.isNull(translation.z);
    assert.deepEqual(translation.x, x);
    assert.deepEqual(translation.y, y);

    assert.isTrue(translation.is2D);
    assert.strictEqual(translation.cssText,
        'translate(' + x.cssText + ', ' + y.cssText + ')');

    var expectedMatrix = new DOMMatrixReadonly([1, 0, 0, 1, 3, -1]);
    typedOM.internal.testing.matricesApproxEqual(translation.matrix, expectedMatrix);
  });

  test('CSSTranslation constructor works correctly for 3 arguments', function() {
    var translation;
    var x = new CSSSimpleLength(3, 'px');
    var y = new CSSSimpleLength(0.5, 'px');
    var z = new CSSSimpleLength(-4, 'px');
    assert.doesNotThrow(function() {translation = new CSSTranslation(x, y, z)});

    assert.strictEqual(translation.x.value, 3);
    assert.strictEqual(translation.y.value, 0.5);
    assert.strictEqual(translation.z.value, -4);
    assert.deepEqual(translation.x, x);
    assert.deepEqual(translation.y, y);
    assert.deepEqual(translation.z, z);

    assert.isFalse(translation.is2D);

    var expectedCssString = 'translate3d(' + x.cssText + ', ' + y.cssText +
        ', ' + z.cssText + ')';
    assert.strictEqual(translation.cssText, expectedCssString);

    var expectedMatrix = new DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 0.5, -4, 1]);
    typedOM.internal.testing.matricesApproxEqual(translation.matrix, expectedMatrix);
  });

  test('Parsing valid basic strings results in CSSTranslation with correct values', function() {
    var values = [
      {str: 'translate(10PX)', x: 10, y: 0, remaining: ''},
      {str: 'translate(10px) YAY', x: 10, y: 0, remaining: 'YAY'},
      {str: 'translate(-13px)', x: -13, y: 0, remaining: ''},
      {str: 'TrAnSlAtE(14px)', x: 14, y: 0, remaining: ''},
      {str: 'translate(11px, 12px)', x: 11, y: 12, remaining: ''},
      {str: 'translate(11px, 12px)YAY', x: 11, y: 12, remaining: 'YAY'},
      {str: 'translate(-13px, -14px)', x: -13, y: -14, remaining: ''},
      {str: 'TrAnSlAtE(15px, 16px)', x: 15, y: 16, remaining: ''},
    ];
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumeTranslation(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse a CSSTranslation');
      assert.strictEqual(parsed[1], values[i].remaining, values[i].str + ' expected ' + values[i].remaining + ' as trailing characters');
      assert.instanceOf(parsed[0], CSSTranslation);
      assert.isTrue(parsed[0].is2D);
      assert.approximately(parsed[0].x.value, values[i].x, 1e-6);
      assert.approximately(parsed[0].y.value, values[i].y, 1e-6);
      assert.strictEqual(parsed[0].x.type, 'px');
      assert.strictEqual(parsed[0].y.type, 'px');
      assert.strictEqual(parsed[0].z, null);
    }
  });

  test('Parsing valid 3d translation strings results in CSSTranslation with correct values', function() {
    var values = [
      {str: 'translate3D(10PX, 11px, 12PX)', x: 10, y: 11, z: 12, remaining: ''},
      {str: 'translate3d(-13px, -14px, 15px)', x: -13, y: -14, z: 15, remaining: ''},
      {str: 'TrAnSlAtE3d(16px, 17px, 18px)', x: 16, y: 17, z: 18, remaining: ''},
      {str: 'translate3d(16px, 17px, 18px)123', x: 16, y: 17, z: 18, remaining: '123'},
      {str: 'translatez(19PX)', x: 0, y: 0, z: 19, remaining: ''},
      {str: 'translateZ(20px)', x: 0, y: 0, z: 20, remaining: ''},
      {str: 'translateZ(20px) a1b2', x: 0, y: 0, z: 20, remaining: 'a1b2'},
    ];
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumeTranslation(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse a CSSTranslation');
      assert.strictEqual(parsed[1], values[i].remaining, values[i].str + ' expected ' + values[i].remaining + ' as trailing characters');
      assert.instanceOf(parsed[0], CSSTranslation);
      assert.isFalse(parsed[0].is2D);
      assert.approximately(parsed[0].x.value, values[i].x, 1e-6);
      assert.approximately(parsed[0].y.value, values[i].y, 1e-6);
      assert.approximately(parsed[0].z.value, values[i].z, 1e-6);
      assert.strictEqual(parsed[0].x.type, 'px');
      assert.strictEqual(parsed[0].y.type, 'px');
      assert.strictEqual(parsed[0].z.type, 'px');
    }
  });

  test('Parsing valid X/Y-specific translation strings results in CSSTranslation with correct values', function() {
    var values = [
      {str: 'translatex(19px)', x: 19, y: 0, remaining: ''},
      {str: 'translateX(20PX)', x: 20, y: 0, remaining: ''},
      {str: 'TranslateX(20px)bananas', x: 20, y: 0, remaining: 'bananas'},
      {str: 'translatey(21px)', x: 0, y: 21, remaining: ''},
      {str: 'translateY(22PX)', x: 0, y: 22, remaining: ''},
      {str: 'Translatey(22PX) bananas', x: 0, y: 22, remaining: 'bananas'},
    ];
    for (var i = 0; i < values.length; i++) {
      var parsed = typedOM.internal.parsing.consumeTranslation(values[i].str);
      assert.isNotNull(parsed, values[i].str + ' should parse a CSSTranslation');
      assert.strictEqual(parsed[1], values[i].remaining, values[i].str + ' expected ' + values[i].remaining + ' as trailing characters');
      assert.instanceOf(parsed[0], CSSTranslation);
      assert.isTrue(parsed[0].is2D);
      assert.approximately(parsed[0].x.value, values[i].x, 1e-6);
      assert.approximately(parsed[0].y.value, values[i].y, 1e-6);
      assert.strictEqual(parsed[0].x.type, 'px');
      assert.strictEqual(parsed[0].y.type, 'px');
      assert.strictEqual(parsed[0].z, null);
    }
  });

  test('Parsing translation with invalid string returns null', function() {
      var consumeTranslation = typedOM.internal.parsing.consumeTranslation;
      assert.isNull(consumeTranslation(''));
      assert.isNull(consumeTranslation('bananas'));
      assert.isNull(consumeTranslation('translate(45)')); // No units
      assert.isNull(consumeTranslation('translatex(45)'));
      assert.isNull(consumeTranslation('translatey(45)'));
      assert.isNull(consumeTranslation('translatez(45)'));
      assert.isNull(consumeTranslation('translate(45%)')); // Unsupported units
      assert.isNull(consumeTranslation('translatex(45%)'));
      assert.isNull(consumeTranslation('translatey(45%)'));
      assert.isNull(consumeTranslation('translatez(45%)'));
      assert.isNull(consumeTranslation('translate(px)')); // No value
      assert.isNull(consumeTranslation('translate3d(10px, 10px)')); // Missing z
      assert.isNull(consumeTranslation('translatee(10px, 10px, 10px)')); // Invalid keyword
      assert.isNull(consumeTranslation('translate(10px')); // Missing bracket
  });
});
