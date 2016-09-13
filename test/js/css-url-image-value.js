// Copyright 2016 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

suite('CSSURLImageValue', function() {
  test('CSSURLImageValue is a CSSURLImageValue, CSSImageValue, CSSResourceValue, and CSSStyleValue', function() {
    assert.instanceOf(new CSSURLImageValue('resources/1x1-green.png'), CSSURLImageValue);
    assert.instanceOf(new CSSURLImageValue('resources/1x1-green.png'), CSSImageValue);
    assert.instanceOf(new CSSURLImageValue('resources/1x1-green.png'), CSSResourceValue);
    assert.instanceOf(new CSSURLImageValue('resources/1x1-green.png'), CSSStyleValue);
  });

  test('CSSURLImageValue only accepts string', function() {
    var stringErr = /^URL must be a string$/;
    assert.throws(function() { new CSSURLImageValue(); }, TypeError, stringErr);
    assert.throws(function() { new CSSURLImageValue([]); }, TypeError, stringErr);
    assert.throws(function() { new CSSURLImageValue(1); }, TypeError, stringErr);
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
