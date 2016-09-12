suite('CSSURLImageValue', function() {
  test('CSSURLImageValue is a CSSURLImageValue, CSSImageValue, CSSResourceValue, and CSSStyleValue', function() {
    assert.instanceOf(new CSSURLImageValue('resources/1x1-green.png'), CSSURLImageValue);
    assert.instanceOf(new CSSURLImageValue('resources/1x1-green.png'), CSSImageValue);
    assert.instanceOf(new CSSURLImageValue('resources/1x1-green.png'), CSSResourceValue);
    assert.instanceOf(new CSSURLImageValue('resources/1x1-green.png'), CSSStyleValue);
  });

  test('CSSURLImageValue only accepts string', function() {
    assert.throw(function() { new CSSURLImageValue(); }, TypeError, "URL must be a string");
    assert.throw(function() { new CSSURLImageValue([]); }, TypeError, "URL must be a string");
    assert.throw(function() { new CSSURLImageValue(1); }, TypeError, "URL must be a string");
    assert.doesNotThrow(function() { new CSSURLImageValue(''); });
  });

  test('URL, state, intrinsic dimensions, and cssText of CSSURLImageValue object are correct', function(done) {
    var urlImageValue = new CSSURLImageValue('resources/1x1-green.png');
    assert.equal(urlImageValue.url, "resources/1x1-green.png");
    assert.equal(urlImageValue.cssText, "url(resources/1x1-green.png)");

    urlImageValue._image.onload = typedOM.internal.objects.chain([
      urlImageValue._image.onload,
      function() {
        assert.strictEqual(urlImageValue.state, "loaded");
        assert.strictEqual(urlImageValue.intrinsicWidth, 1);
        assert.strictEqual(urlImageValue.intrinsicHeight, 1);
        assert.strictEqual(urlImageValue.intrinsicRatio, 1);
        done();
      }
    ]);
  });

  test('Invalid image will have error state and null intrinsic dimensions', function(done) {
    var urlImageValue = new CSSURLImageValue('resources/nonexisting.png');
    assert.equal(urlImageValue.url, 'resources/nonexisting.png');
    assert.equal(urlImageValue.cssText, "url(resources/nonexisting.png)");

    urlImageValue._image.onerror = typedOM.internal.objects.chain([
      urlImageValue._image.onerror,
      function() {
        assert.strictEqual(urlImageValue.state, "error");
        assert.strictEqual(urlImageValue.intrinsicWidth, null);
        assert.strictEqual(urlImageValue.intrinsicHeight, null);
        assert.strictEqual(urlImageValue.intrinsicRatio, null);
        done();
      }
    ]);
  });

  test('Can set and get correct CSSURLImageValue from StyleMap', function(done) {
    var inlineStyleMap = document.documentElement.styleMap();
    inlineStyleMap.set("border-image-source", new CSSURLImageValue('resources/1x1-green.png'));
    var urlImageValue = inlineStyleMap.get("border-image-source");
    assert.instanceOf(urlImageValue, CSSURLImageValue);
    assert.equal(urlImageValue.url, "resources/1x1-green.png");

    urlImageValue._image.onload = typedOM.internal.objects.chain([
      urlImageValue._image.onload,
      function() {
        assert.strictEqual(urlImageValue.state, "loaded");
        assert.strictEqual(urlImageValue.intrinsicWidth, 1);
        assert.strictEqual(urlImageValue.intrinsicHeight, 1);
        assert.strictEqual(urlImageValue.intrinsicRatio, 1);
        done();
      }
    ]);
  });
});
