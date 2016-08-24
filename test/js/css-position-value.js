suite('CSSPositionValue', function() {

  test('Constructor throws if xPos or yPos is not a CSSLengthValue', function() {
    assert.throws(function() { new CSSPositionValue(2, 3) });
    assert.throws(function() { new CSSPositionValue(new CSSSimpleLength(3, 'px'), 3) });
  });

  test('CSSPositionValue cssText is the x and y cssTexts separated by a space', function() {
    var lengthValue_1 = new CSSCalcLength({px: 10, em: 3.2});
    var lengthValue_2 = new CSSSimpleLength(3, 'px');
    var positionValue = new CSSPositionValue(lengthValue_1, lengthValue_2);

    assert.strictEqual(positionValue.cssText, 'calc(10px + 3.2em) 3px');
  });

  test('Parsing works for simple values', function() {
    var input = '5px 3px';
    var result = typedOM.internal.parsing.parsePositionValue(input);
    assert.strictEqual(result[0].constructor, CSSPositionValue);
    assert.strictEqual(result[0].cssText, input);
  });

  test('Parsing works when using calc values', function() {
    var input = 'calc(-2% + 6em) calc(3vmin - 9pc)';
    var result = typedOM.internal.parsing.parsePositionValue(input);
    assert.strictEqual(result[0].constructor, CSSPositionValue);
    assert.strictEqual(result[0].cssText, input);
  });

  test('Parsing works when using mixed value types', function() {
    var input = '99.2px calc(3vmin - 9pc)';
    var result = typedOM.internal.parsing.parsePositionValue(input);
    assert.strictEqual(result[0].constructor, CSSPositionValue);
    assert.strictEqual(result[0].cssText, input);
  });

  test('Invalid input to parsing returns null (and does not throw)', function() {
    assert.isNull(typedOM.internal.parsing.parsePositionValue(''));
    assert.isNull(typedOM.internal.parsing.parsePositionValue('bananas'));
    assert.isNull(typedOM.internal.parsing.parsePositionValue('5px'));
    assert.isNull(typedOM.internal.parsing.parsePositionValue('6px 3'));
    assert.isNull(typedOM.internal.parsing.parsePositionValue('calc(3px - 3em 6px'));
  });
});
