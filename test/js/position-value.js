suite('PositionValue', function() {
  test('If either xPos or yPos is not a LengthValue object then the constructor should throw a type error', function() {
    assert.throws(function() { new PositionValue(2, 3) }, 'xPos is not a LengthValue object');
    assert.throws(function() { new PositionValue(new SimpleLength(3, 'px'), 3) }, 'yPos is not a LengthValue object');
  });

  test('CssStrings created by a PositionValue object should be the x and y css strings separated by a space', function() {
    var lengthValue_1 = new CalcLength({px: 10, em: 3.2});
    var lengthValue_2 = new SimpleLength(3, 'px');

    var positionValue = new PositionValue(lengthValue_1, lengthValue_2);
    console.log(lengthValue_1.cssString + ' ' + lengthValue_2.cssString);
    assert.strictEqual(positionValue.cssString, lengthValue_1.cssString + ' ' + lengthValue_2.cssString);
  });
});
