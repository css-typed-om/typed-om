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

    // Currently only supports sequences separated by ', '
    var valueArray = cssString.toLowerCase().split(', ');
    var styleValueArray = [];
    var supportedStyleValues =
        propertyDictionary().getValidStyleValuesArray(property);

    var styleValueObject = null;
    var successfulParse = false;
    for (var i = 0; i < valueArray.length; i++) {
      var cssStringStyleValue = valueArray[i];
      cssStringStyleValue = cssStringStyleValue.trim();
      if (propertyDictionary().isValidKeyword(property, cssStringStyleValue)) {
        styleValueArray[i] = new KeywordValue(cssStringStyleValue);
        continue;
      }

      styleValueObject = null;
      successfulParse = false;
      for (var j = 0; j < supportedStyleValues.length; j++) {
        try {
          styleValueObject = supportedStyleValues[j].parse(cssStringStyleValue);
        } catch (e) {
          // Ensures method does not terminate if a StyleValue parse method throws an error
          continue;
        }
        if (styleValueObject != null) {
          styleValueArray[i] = styleValueObject;
          successfulParse = true;
          break;
        }
      }

      if (!successfulParse) {
        throw new TypeError(property +
          ' has an unsupported StyleValue type or Sequence value separator');
      }
    }
    return styleValueArray;
  };

  internal.StyleValue = StyleValue;
  if (TYPED_OM_TESTING) {
    testing.StyleValue = StyleValue;
  }

})(typedOM.internal, window, typedOMTesting);
