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

(function(internal, scope) {

  function onLoad() {
    this.state = "loaded";
    this.intrinsicWidth = this._image.naturalWidth;
    this.intrinsicHeight = this._image.naturalHeight;
    if (this.intrinsicHeight != 0)
      this.intrinsicRatio = this.intrinsicWidth / this.intrinsicHeight;
  }

  function onError() {
    this.state = "error";
  }

  function onProgress() {
    this.state = "loading";
  }

  function CSSImageValue(image) {
    if (!(image instanceof Image)) {
      throw new TypeError("image must be an Image object");
    }

    this._image = image;
    this.state = "unloaded";
    this.intrinsicWidth = null;
    this.intrinsicHeight = null;
    this.intrinsicRatio = null;
    this._image.onload = onLoad.bind(this);
    this._image.onerror = onError.bind(this);
    this._image.onprogess = onProgress.bind(this);
  }
  internal.inherit(CSSImageValue, CSSResourceValue);

  internal.CSSImageValue = CSSImageValue;

  (function() {
    var CSSImageValue = function() {
      throw new TypeError('CSSImageValue cannot be instantiated');
    }
    CSSImageValue.prototype = Object.create(internal.CSSImageValue.prototype);

    scope.CSSImageValue = CSSImageValue;
  })();

})(typedOM.internal, window);
