suite('PositionValue', function() {
  test('Constructor for Position value will throw a type error if either xPos or yPos is not an instance'
      +'of the LengthValue class', function() {
    assert.throws(function () { new PositionValue(2, 3) }, 'xPos is not of type: LengthValue');

    assert.throws(function () { new PositionValue(new SimpleLength(3, 'px'), 3) }, 'yPos is not of type: LengthValue');
  });

  test('CssStrings created by an instance of the PositionValue class should be the xPos cssString followed '
      +'by a space and the the yPos cssString', function() {
    var lengthValue_1 = new CalcLength({px: 10, em: 3.2});
    var lengthValue_2 = new SimpleLength(3, 'px');

    var positionValue = new PositionValue(lengthValue_1, lengthValue_2);
    assert.strictEqual(positionValue.cssString, lengthValue_1.cssString + " " + lengthValue_2.cssString);
  });
});
