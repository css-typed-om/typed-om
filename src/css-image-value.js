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
    if (this.intrinsicHeight != 0) {
      this.intrinsicRatio = this.intrinsicWidth / this.intrinsicHeight;
    }
  }

  function onError() {
    this.state = "error";
  }

  function onProgress() {
    this.state = "loading";
  }

  var CSSImageValue = function() {
    throw new TypeError('CSSImageValue cannot be instantiated');
  }
  internal.inherit(CSSImageValue, CSSResourceValue);

  scope.CSSImageValue = CSSImageValue;

  (function() {
    function CSSImageValue(image) {
      if (!(image instanceof Image) && typeof image != 'string') {
        throw new TypeError("image must be an Image object or string URL");
      }
      var src = image instanceof Image ? image.src : image;

      this.state = "unloaded";
      this.intrinsicWidth = null;
      this.intrinsicHeight = null;
      this.intrinsicRatio = null;
      this._image = new Image();
      this._image.onload = onLoad.bind(this);
      this._image.onerror = onError.bind(this);  // nb. loading blank src calls onerror
      this._image.onprogess = onProgress.bind(this);
      this._image.src = src;  // load last, to force callbacks
    }
    CSSImageValue.prototype = Object.create(scope.CSSImageValue.prototype);

    internal.CSSImageValue = CSSImageValue;
  })();

})(typedOM.internal, window);
