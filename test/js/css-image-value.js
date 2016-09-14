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

suite('CSSImageValue', function() {
  test('Cannot instantiate base CSSImageValue', function() {
    var instantiateErr = /^CSSImageValue cannot be instantiated$/;
    assert.throws(function() { new CSSImageValue(new Image()); }, TypeError, instantiateErr);
  });

  test('CSSImageValue object is a CSSImageValue, CSSResourceValue, and CSSStyleValue', function() {
    assert.instanceOf(new typedOM.internal.CSSImageValue(new Image()), CSSImageValue);
    assert.instanceOf(new typedOM.internal.CSSImageValue(new Image()), CSSResourceValue);
    assert.instanceOf(new typedOM.internal.CSSImageValue(new Image()), CSSStyleValue);
  });

  test('CSSImageValue only accepts Image object', function() {
    var imageErr = /image must be an Image object/;
    assert.throws(function() { new typedOM.internal.CSSImageValue(); }, TypeError, imageErr);
    assert.throws(function() { new typedOM.internal.CSSImageValue(1); }, TypeError, imageErr);
    assert.throws(function() { new typedOM.internal.CSSImageValue("abc"); }, TypeError, imageErr);
    assert.throws(function() { new typedOM.internal.CSSImageValue([]); }, TypeError, imageErr);
    assert.throws(function() { new typedOM.internal.CSSImageValue({ x: 1, y: 2 }); }, TypeError, imageErr);
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
