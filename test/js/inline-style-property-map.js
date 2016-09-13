suite('Inline StylePropertyMap', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.element.style.opacity = '0.5';
  });
  teardown(function() {
    document.body.removeChild(this.element);
  });

  function validateIsDefaultEntries(arr) {
    // Should be [['opacity', CSSNumberValue(0.5)]]
    assert.strictEqual(arr.length, 1);
    assert.strictEqual(arr[0].length, 2);
    assert.strictEqual(arr[0][0], 'opacity');
    assert.instanceOf(arr[0][1], CSSNumberValue);
    assert.strictEqual(arr[0][1].value, 0.5);
  }

  test('The Element.styleMap method returns a StylePropertyMap object for that element', function() {
    var inlineStyleMap = this.element.styleMap();
    assert.instanceOf(inlineStyleMap, typedOM.internal.StylePropertyMap);
  });

  test('Set successfully sets the CSS string of the CSSStyleValue on an element', function() {
    var inlineStyleMap = this.element.styleMap();
    var simpleLength = new CSSSimpleLength(9.2, 'percent');
    inlineStyleMap.set('height', simpleLength);

    assert.strictEqual(this.element.style['height'], simpleLength.cssText);
  });

  test('Set successfully sets the style string for the list of CSSStyleValues on a property that supports sequences', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueArray = [new CSSNumberValue(4), new CSSNumberValue(5), new CSSKeywordValue('infinite')];
    this.element.style['animation-iteration-count'] = 'infinite, 2, 5';
    inlineStyleMap.set('animation-iteration-count', valueArray);

    assert.strictEqual(this.element.style['animation-iteration-count'], '4, 5, infinite');
  });

  test('Set should throw a TypeError for properties that do not support sequences of style values', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueSequence = [new CSSSimpleLength(3, 'px'), new CSSSimpleLength(6, 'px')];

    assert.throw(function() {inlineStyleMap.set('height', valueSequence)}, TypeError, 'height does not support sequences of styleValues');
  });

  test('Set should throw a TypeError if a non CSSKeywordValue CSSStyleValue unsupported by the CSS style property is set', function() {
    var inlineStyleMap = this.element.styleMap();
    var numberValue = new CSSNumberValue(42);

    assert.throw(function() {inlineStyleMap.set('height', numberValue)}, TypeError);
  });

  test('Set should throw a TypeError if a CSSKeywordValue unsupported by the CSS style property is set ', function() {
    var inlineStyleMap = this.element.styleMap();
    var keyword = new CSSKeywordValue('lemon');

    assert.throw(function() {inlineStyleMap.set('height', keyword)}, 'height does not take the keyword lemon');
  });

  test('Set should throw a TypeError if a non CSSStyleValue is inputed into the function', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.set('height', 4)}, TypeError);
  });

  test('Set should throw a TypeError if an unsupported property is inputed into the function', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.set('lemons', new CSSSimpleLength(3, 'px'))}, TypeError);
  });

  test('The delete method clears a given property', function() {
    var inlineStyleMap = this.element.styleMap();
    this.element.style.height = '10px';
    inlineStyleMap.delete('height');

    assert.strictEqual(this.element.style['height'], '');
  });

  test('The delete method should throw a TypeError if an unsupported property', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.delete('lemons')}, TypeError);
  });

  test('The has method will return true if the valid CSS property input has been assigned a value' +
    'or false if it has not been assigned a value', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.isTrue(inlineStyleMap.has('opacity'));
    assert.isFalse(inlineStyleMap.has('height'));
  });

  test('The has method should throw a TypeError if an unsupported property', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.has('lemons')}, TypeError);
  });

  test('The append method should successfully append a supported CSSStyleValue to a property ' +
      'that supports sequences of CSSStyleValues', function() {
    this.element.style['animation-iteration-count'] = 'infinite, 2, 5';
    var inlineStyleMap = this.element.styleMap();
    inlineStyleMap.append('animation-iteration-count', new CSSNumberValue(4));

    assert.strictEqual(this.element.style['animation-iteration-count'], 'infinite, 2, 5, 4');
  });

  test('The append method should successfully append a sequence of CSSStyleValues to a property ' +
      'that supports sequences of CSSStyleValues', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueSequence = [new CSSNumberValue(4), new CSSNumberValue(5), new CSSKeywordValue('infinite')];
    this.element.style['animation-iteration-count'] = 'infinite, 2, 5';
    inlineStyleMap.append('animation-iteration-count', valueSequence);

    assert.strictEqual(this.element.style['animation-iteration-count'], 'infinite, 2, 5, 4, 5, infinite');
  });

  test('The append method should successfully append a sequence of CSSStyleValues even when the CSS property ' +
    'is not currently set', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueSequence = [new CSSNumberValue(4), new CSSNumberValue(5), new CSSKeywordValue('infinite')];
    this.element.style['animation-iteration-count'] = '';
    inlineStyleMap.append('animation-iteration-count', valueSequence);

    assert.strictEqual(this.element.style['animation-iteration-count'], '4, 5, infinite');
  });

  test('The append method should throw a TypeError if the CSSStyleValue at any index in the values array ' +
    'is not supported by the property', function() {
    var inlineStyleMap = this.element.styleMap();
    var valueSequence = [new CSSNumberValue(4), new CSSNumberValue(5), new CSSSimpleLength(3, 'px'), new CSSKeywordValue('infinite')];
    this.element.style['animation-iteration-count'] = 'infinite, 2, 5';

    assert.throw(function() {inlineStyleMap.append('animation-iteration-count', valueSequence)}, TypeError,
      'animation-iteration-count does not take values of type CSSSimpleLength');
  });

  test('The append method should throw a TypeError when an unsupported CSS property is entered', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('lemon', new CSSNumberValue(4))}, TypeError,
      'lemon is not a supported CSS property');
  });

  test('The append method should throw a TypeError when a CSS property that does not support list values is entered', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('height', new CSSNumberValue(4))}, TypeError,
      'height does not support sequences of styleValues');
  });

  test('The append method should throw a TypeError when null is entered as the value', function() {
    var inlineStyleMap = this.element.styleMap();

    assert.throw(function() {inlineStyleMap.append('animation-iteration-count', null)}, TypeError,
      'null cannot be appended to CSS properties');
  });

  test('getProperties returns an ordered list of properties that have been set on an element', function() {
    var inlineStyleMap = this.element.styleMap();
    this.element.style['opacity'] = '0.5';
    this.element.style['height'] = '5px';
    this.element.style['border-top-color'] = 'initial';
    this.element.style['border-top-width'] = 'initial';

    assert.deepEqual(inlineStyleMap.getProperties(), ['opacity', 'height', 'border-top-color', 'border-top-width']);
  });

  test('Getting an unset value does not throw', function() {
    assert.isNull(this.element.styleMap().get('height'));
  });

  test('Using spread operator on StylePropertyMap results in correct values', function() {
    validateIsDefaultEntries([...this.element.styleMap()]);
  });

  test('Using iterator operations on entries() gets correct values', function() {
    // One by one
    validateIsDefaultEntries(
        iteratorExpansionUsingNext(this.element.styleMap().entries()));
    // for..of
    validateIsDefaultEntries(
        iteratorExpansionUsingForOf(this.element.styleMap().entries()));
    // Spread operator
    validateIsDefaultEntries([...this.element.styleMap().entries()]);
  });

  test('Using iterator operations on keys() gets correct values', function() {
    function validateKeys(arr) {
      assert.strictEqual(arr.length, 1);
      assert.strictEqual(arr[0], 'opacity');
    }
    // One by one
    validateKeys(
        iteratorExpansionUsingNext(this.element.styleMap().keys()));
    // for..of
    var forOfKeys = [];
    validateKeys(
        iteratorExpansionUsingForOf(this.element.styleMap().keys()));
    // Spread operator
    validateKeys([...this.element.styleMap().keys()]);
  });

  test('Using iterator operations on values() gets correct values', function() {
    function validateValues(arr) {
      assert.strictEqual(arr.length, 1);
      assert.instanceOf(arr[0], CSSNumberValue);
      assert.strictEqual(arr[0].value, 0.5);
    }
    // One by one
    validateValues(
        iteratorExpansionUsingNext(this.element.styleMap().values()));
    // for..of
    validateValues(
        iteratorExpansionUsingForOf(this.element.styleMap().values()));
    // Spread operator
    validateValues([...this.element.styleMap().values()]);
  });
});
