suite('CSSImageValue', function() {
  test('Can only create internal CSSImageValue object', function() {
    assert.throw(function() { new CSSImageValue(new Image()); }, TypeError, "Can\'t instantiate CSSImageValue");
    assert.doesNotThrow(function() { new typedOM.internal.CSSImageValue(new Image()); });
  });

  test('CSSImageValue object is a CSSImageValue, CSSResourceValue, and CSSStyleValue', function() {
    assert.instanceOf(new typedOM.internal.CSSImageValue(new Image()), CSSImageValue);
    assert.instanceOf(new typedOM.internal.CSSImageValue(new Image()), CSSResourceValue);
    assert.instanceOf(new typedOM.internal.CSSImageValue(new Image()), CSSStyleValue);
  });

  test('CSSImageValue only accepts Image object', function() {
    assert.throw(function() { new typedOM.internal.CSSImageValue(); }, TypeError, "image must be an Image object");
    assert.throw(function() { new typedOM.internal.CSSImageValue(1); }, TypeError, "image must be an Image object");
    assert.throw(function() { new typedOM.internal.CSSImageValue("abc"); }, TypeError, "image must be an Image object");
    assert.throw(function() { new typedOM.internal.CSSImageValue([]); }, TypeError, "image must be an Image object");
    assert.throw(function() { new typedOM.internal.CSSImageValue({ x: 1, y: 2 }); }, TypeError, "image must be an Image object");
  });

  test('CSSImageValue\'s state and dimensions are correct before and after loaded', function(done) {
    var image = new typedOM.internal.CSSImageValue(new Image());
    assert.strictEqual(image.state, "unloaded");
    assert.strictEqual(image.intrinsicWidth, null);
    assert.strictEqual(image.intrinsicHeight, null);
    assert.strictEqual(image.intrinsicRatio, null);
    image._image.src = "resources/1x1-green.png";
    var oldOnload = image._image.onload;
    image._image.onload = function() {
      oldOnload();
      assert.strictEqual(image.state, "loaded");
      assert.strictEqual(image.intrinsicWidth, 1);
      assert.strictEqual(image.intrinsicHeight, 1);
      assert.strictEqual(image.intrinsicRatio, 1);
      done();
    };
  });
});
