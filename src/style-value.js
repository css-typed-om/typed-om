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

  StyleValue.parse = function(property, value) {
    if (!propertyDictionary().isSupportedProperty(property)) {
      return null;
    }

    if (propertyDictionary().isValidKeyword(property, value)) {
      return new KeywordValue(value);
    }

    //Currently only supports sequences separated by ', '
    var valueArray = value.split(', ');
    var styleValueArray = [];
    var supportedStyleValues =
        propertyDictionary().getValidStyleValuesArray(property);

    for (var i = 0; i < valueArray.length; i++) {
      if (propertyDictionary().isValidKeyword(property, valueArray[i])) {
        styleValueArray[i] = new KeywordValue(value);
        continue;
      }

      var styleValueObject = null;
      var successfulParse = false;
      for (var j = 0; j < supportedStyleValues.length; j++) {
        styleValueObject = supportedStyleValues[j].parse(valueArray[i]);
        if (styleValueObject != null) {
          styleValueArray[i] = styleValueObject;
          successfulParse = true;
          break;
        }
      }

      if (successfulParse == false) {
        throw new TypeError(property +
          ' has an unsupported StyleValue type or Sequence value separator');
      }
    }
    console.log(styleValueArray);
    return styleValueArray;
  };

  StyleValue.prototype.
      _getValueArray = function(property, value) {
    return cssSplitStrings =
      value.split(propertyDictionary().getListValueSeparator(property));
  };

  internal.StyleValue = StyleValue;
  if (TYPED_OM_TESTING) {
    testing.StyleValue = StyleValue;
  }

})(typedOM.internal, window, typedOMTesting);
