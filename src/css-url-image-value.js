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

  function CSSURLImageValue(url) {
    if (typeof(url) != 'string') {
      throw new TypeError("URL must be a string");
    }
    internal.CSSImageValue.call(this, new Image());
    this._image.src = url;
    this.url = url;
    this.cssText = 'url(' + this.url + ')';
  }

  internal.inherit(CSSURLImageValue, internal.CSSImageValue);

  scope.CSSURLImageValue = CSSURLImageValue;

})(typedOM.internal, window);
