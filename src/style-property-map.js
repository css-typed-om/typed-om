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
      throw new TypeError(property + ' is not a supported CSS property');
    }

    if (value instanceof Array) {
      this._styleObject[property] = '';
      this.append(property, value);
      return;
    }

    if (!value instanceof StyleValue) {
      throw new TypeError(
        'The value must be a StyleValue or sequence of StyleValues');
    }

    if (!cssPropertyDictionary.isValidInput(property, value)) {
      cssPropertyDictionary.throwInvalidInputError(property, value);
    }
    this._styleObject[property] = value.cssString;
  };

  StylePropertyMap.prototype.append = function(property, values) {
    var cssPropertyDictionary = propertyDictionary();
    if (!cssPropertyDictionary.isSupportedProperty(property)) {
      throw new TypeError(property + ' is not a supported CSS property');
    }

    if (!cssPropertyDictionary.isListValuedProperty(property)) {
      throw new TypeError(property + ' does not support sequences of styleValues');
    }

    if (values == null) {
      throw new TypeError('null cannot be appended to CSS properties');
    }

    if (!(values instanceof Array)) {
      values = [values];
    }

    var cssAppendString = this._styleObject[property];
    var valueSeparator = cssPropertyDictionary.getListValueSeparator(property);
    for (var i = 0; i < values.length; i++) {
      if (!cssPropertyDictionary.isValidInput(property, values[i])) {
        cssPropertyDictionary.throwInvalidInputError(property, values[i]);
      }
      if (cssAppendString == '') {
        cssAppendString += values[i].cssString;
        continue;
      }
      cssAppendString += valueSeparator + values[i].cssString;
    }
    return this._styleObject[property] = cssAppendString;
  };

  StylePropertyMap.prototype.delete = function(property) {
    var cssPropertyDictionary = propertyDictionary();
    if (!cssPropertyDictionary.isSupportedProperty(property)) {
      throw new TypeError(property + ' is not a supported CSS property');
    }
    this._styleObject[property] = '';
  };

  StylePropertyMap.prototype.has = function(property) {
    var cssPropertyDictionary = propertyDictionary();
    if (!cssPropertyDictionary.isSupportedProperty(property)) {
      throw new TypeError(property + ' is not a supported CSS property');
    }
    return !(this._styleObject[property] == '');
  };

  Element.prototype.styleMap = function() {
    return new StylePropertyMap(this.style);
  };

  internal.StylePropertyMap = StylePropertyMap;
  if (TYPED_OM_TESTING) {
    testing.StylePropertyMap = StylePropertyMap;
  }

})(typedOM.internal, typedOMTesting);
