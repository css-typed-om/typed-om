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

(function(internal, testing) {

  function StylePropertyMap(styleObject) {
    this._styleObject = styleObject;
  }
  internal.inherit(StylePropertyMap, internal.StylePropertyMapReadOnly);

  StylePropertyMap.prototype.set = function(property, value) {
    var cssPropertyDictionary = propertyDictionary();
    if (!cssPropertyDictionary.isSupportedProperty(property)) {
      throw new TypeError(property + 'is not a supported CSS property');
    }

    if (value instanceof Array) {
      throw new TypeError(
        'Setting a sequence of StyleValues is not implemented yet');
    }

    if (!value instanceof StyleValue) {
      throw new TypeError(
        'The value must be a StyleValue or sequence of StyleValues');
    }

    if (!cssPropertyDictionary.isValidInput(property, value)) {
      if (value instanceof KeywordValue) {
        throw new TypeError(property +
          ' does not take the keyword ' + value.cssString);
      }
      throw new TypeError(property +
        ' does not take values of type ' + value.constructor.name);
    }
    this._styleObject[property] = value.cssString;
  };

  StylePropertyMap.prototype.append = function(property, value) {
    throw new TypeError('Function not implemented yet');
  };

  StylePropertyMap.prototype.delete = function(property) {
    throw new TypeError('Function not implemented yet');
  };

  Element.prototype.styleMap = function() {
    return new StylePropertyMap(this.style);
  };

  internal.StylePropertyMap = StylePropertyMap;
  if (TYPED_OM_TESTING) {
    testing.StylePropertyMap = StylePropertyMap;
  }

})(typedOM.internal, typedOMTesting);
