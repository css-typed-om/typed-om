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

(function(shared, testing) {

  function LengthValue() {
  }

  // The different possible length types.
  LengthValue.LengthType = [
    'px', 'percent', 'em', 'ex', 'ch',
    'rem', 'vw', 'vh', 'vmin', 'vmax',
    'cm', 'mm', 'q', 'in', 'pc', 'pt'
  ];

  LengthValue.cssStringTypeRepresentation = function(type) {
    if (LengthValue.LengthType.indexOf(type) < 0) {
      throw new TypeError('Invalid LengthType.');
    }

    switch (type) {
      case 'percent':
        return '%';
      default:
        return type;
    }
  }

  LengthValue.prototype = Object.create(shared.StyleValue.prototype);

  // Length Calculation Methods
  LengthValue.prototype.add = function(addedLength) {
    if (this instanceof SimpleLength && addedLength instanceof SimpleLength && this.type == addedLength.type) {
      return this._addSimpleLengths(addedLength);
    }
    throw new TypeError('Not implemented yet');
  };

  LengthValue.prototype.subtract = function(subtractedLength) {
    if (this instanceof SimpleLength && subtractedLength instanceof SimpleLength && this.type == subtractedLength.type) {
      return this._subtractSimpleLengths(subtractedLength);
    }
    throw new TypeError('Not implemented yet');
  };

  LengthValue.prototype.multiply = function(multiplier) {
    throw new TypeError('Not implemented yet');
  };

  LengthValue.prototype.divide = function(divider) {
    throw new TypeError('Not implemented yet');
  };

  // LengthValue static methods
  LengthValue.parse = function(cssString) {
    throw new TypeError('Not implemented yet');
  };

  LengthValue.fromValue = function(value, type) {
    return new SimpleLength(value, type);
  };

  LengthValue.fromDictionary = function(dictionary) {
    return new CalcLength(dictionary);
  };

  shared.LengthValue = LengthValue;
  if (TYPED_OM_TESTING)
    testing.LengthValue = LengthValue;

})(baseClasses, typedOMTesting);
