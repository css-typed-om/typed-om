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

  function StyleValue() {}

  // TODO: Add support for cssString being a sequence.
  StyleValue.parse = function(property, cssString) {
    if (typeof property != 'string') {
      throw new TypeError('Property name must be a string');
    }
    if (typeof cssString != 'string') {
      throw new TypeError('Must parse a string');
    }
    if (!propertyDictionary().isSupportedProperty(property)) {
      // TODO: How do custom properties play into this?
      throw new TypeError('Can\'t parse an unsupported property.');
    }

    // Make sure that there is no leading or trailing whitespace, case insensitive.
    cssString = cssString.trim().toLowerCase();
    if (propertyDictionary().isValidKeyword(property, cssString)) {
      return new KeywordValue(cssString);
    }

    var styleValueObject = null;
    var supportedStyleValues = propertyDictionary().getValidStyleValuesArray(property);
    for (var i = 0; i < supportedStyleValues.length; i++) {
      styleValueObject = supportedStyleValues[i].parse(cssString);
      if (styleValueObject != null) {
        return styleValueObject;
      }
    }
    return styleValueObject;
  };

  internal.StyleValue = StyleValue;
  if (TYPED_OM_TESTING) {
    testing.StyleValue = StyleValue;
  }

})(typedOM.internal, window, typedOMTesting);
