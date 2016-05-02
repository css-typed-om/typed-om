suite('CSSPositionValue', function() {
  test('If either xPos or yPos is not a CSSLengthValue object then the constructor should throw a type error', function() {
    assert.throws(function() { new CSSPositionValue(2, 3) }, 'xPos is not a CSSLengthValue object');
    assert.throws(function() { new CSSPositionValue(new CSSSimpleLength(3, 'px'), 3) }, 'yPos is not a CSSLengthValue object');
  });

  test('CssStrings created by a CSSPositionValue object should be the x and y css strings separated by a space', function() {
    var lengthValue_1 = new CSSCalcLength({px: 10, em: 3.2});
    var lengthValue_2 = new CSSSimpleLength(3, 'px');
    var positionValue = new CSSPositionValue(lengthValue_1, lengthValue_2);

    assert.strictEqual(positionValue.cssString, 'calc(10px + 3.2em) 3px');
  });
});
