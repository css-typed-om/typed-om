// Copyright 2015 Google Inc. All rights reserved.
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

  function StylePropertyMapReadOnly(styleObject) {
    this._styleObject = styleObject;
  }

  StylePropertyMapReadOnly.prototype.get = function(property) {
    var parsed = this.getAll(property);
    return parsed && parsed.length ? parsed[0] : null;
  };

  StylePropertyMapReadOnly.prototype.getAll = function(property) {
    if (!(property in document.documentElement.style)) {
      throw new TypeError(property + ' is not a supported CSS property');
    }

    propertyString = this._styleObject[property];
    if (!propertyString) {
      return null;
    }

    if (internal.propertyDictionary().isSupportedProperty(property)) {
      var parsed = CSSStyleValue.parse(property, propertyString);
      if (parsed.length) {
        return parsed;
      }
      return [parsed];
    }
    return [new internal.CSSStyleValue(propertyString)];
  };

  StylePropertyMapReadOnly.prototype.getProperties = function() {
    var propertyArray = [];
    for (var i = 0; i < this._styleObject.length; i++) {
      propertyArray.push(this._styleObject[i]);
    }
    return propertyArray;
  };

  getComputedStyleMap = function(element) {
    return new StylePropertyMapReadOnly(getComputedStyle(element));
  };

  internal.StylePropertyMapReadOnly = StylePropertyMapReadOnly;
  scope.getComputedStyleMap = getComputedStyleMap;
})(typedOM.internal, window);
