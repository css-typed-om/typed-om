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

(function(internal, scope, testing) {

  function StylePropertyMapReadOnly(styleObject) {
    this._styleObject = styleObject;
  }

  StylePropertyMapReadOnly.prototype.get = function(property) {
    if (!propertyDictionary().isSupportedProperty(property)) {
      throw new TypeError(property + ' is not a supported CSS property');
    }

    propertyString = this._styleObject[property];
    if (propertyString == '') {
      return null;
    }

    var parsed = StyleValue.parse(property, propertyString);

    if (parsed.constructor == Array) {
      return parsed[0];
    }
    return parsed;
  };

  StylePropertyMapReadOnly.prototype.getProperties = function() {
    var output = [];
    for (var i = 0, l = this._styleObject.length; i < l; ++i) {
      var property = this._styleObject[i];
      // TODO: Construct the objects for each type of thing and add them to the
      // output array.
    }
    return output;
  };

  getComputedStyleMap = function(element) {
    return new StylePropertyMapReadOnly(getComputedStyle(element));
  };

  internal.StylePropertyMapReadOnly = StylePropertyMapReadOnly;
  scope.getComputedStyleMap = getComputedStyleMap;
  if (TYPED_OM_TESTING) {
    testing.StylePropertyMapReadOnly = StylePropertyMapReadOnly;
  }

})(typedOM.internal, window, typedOMTesting);
