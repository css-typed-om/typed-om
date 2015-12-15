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

(function(shared, scope, testing) {

  function PropertyDictionary() {
    this.propertyMap = {
     'height': [LengthValue],
     'pitch-range': [NumberValue],
     'border-top-width': [LengthValue]
    };

    this.propertyKeywords = {
      'height': ['auto', 'inherit'],
      'pitch-range': ['inherit'],
      'border-top-width': ['inherit']
    };

    this.allowsPercentage = {
      'height': true
    };
  }
  var instance;

  PropertyDictionary.prototype.isSupportedProperty = function(property) {
    return (this.propertyMap.hasOwnProperty(property));
  };

  PropertyDictionary.prototype._lengthValueHasPercentage = function(lengthValue) {
    if (!(lengthValue instanceof LengthValue)) {
      throw new TypeError('The input to this method must be an object of type LengthValue');
    }

    if (lengthValue instanceof CalcLength) {
      return (lengthValue.percent != null);
    }

    return (lengthValue.type == 'percent');
  };

  PropertyDictionary.prototype.isValidInput = function(property, styleValue) {
    if (!this.isSupportedProperty(property)) {
      return false;
    }

    if (styleValue instanceof KeywordValue) {
      if (!(this.propertyKeywords.hasOwnProperty(property))) {
        return false;
      }
      return (this.propertyKeywords[property].indexOf(styleValue.keywordValue) > -1);
    }

    for (var i = 0; i < this.propertyMap[property].length; i++) {
      var styleValueType = this.propertyMap[property][i];
      if (!(styleValue instanceof styleValueType)) {
        continue;
      }
      if (!(styleValue instanceof LengthValue)) {
        return true;
      }
      if (!this._lengthValueHasPercentage(styleValue) || this.allowsPercentage.hasOwnProperty(property)) {
        return true;
      }
    }
    return false;
  };

  var createInstance = function() {
    var object = new PropertyDictionary();
    return object;
  };

  var getInstance = function() {
    if (!instance) {
     instance = createInstance();
    }
    return instance;
  };

  shared.getInstance = getInstance;
  if (TYPED_OM_TESTING)
    testing.getInstance = getInstance;

})(typedOM.internal, window, typedOMTesting);
