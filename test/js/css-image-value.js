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

  test('CSSImageValue only accepts Image object or string URL', function() {
    var imageErr = /^image must be an Image object or string URL$/;
    assert.throws(function() { new typedOM.internal.CSSImageValue(); }, TypeError, imageErr);
    assert.throws(function() { new typedOM.internal.CSSImageValue(1); }, TypeError, imageErr);
    assert.throws(function() { new typedOM.internal.CSSImageValue([]); }, TypeError, imageErr);
    assert.throws(function() { new typedOM.internal.CSSImageValue({ x: 1, y: 2 }); }, TypeError, imageErr);
  });


  test('CSSImageValue\'s state and dimensions are correct before and after loaded', function(done) {
    var iv = new typedOM.internal.CSSImageValue('resources/1x1-green.png');
    assert.strictEqual(iv.state, "unloaded");
    assert.strictEqual(iv.intrinsicWidth, null);
    assert.strictEqual(iv.intrinsicHeight, null);
    assert.strictEqual(iv.intrinsicRatio, null);

    iv._image.addEventListener('load', function() {
      assert.strictEqual(iv.state, "loaded");
      assert.strictEqual(iv.intrinsicWidth, 1);
      assert.strictEqual(iv.intrinsicHeight, 1);
      assert.strictEqual(iv.intrinsicRatio, 1);
      done();
    });
  });
});
