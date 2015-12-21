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

  // Constructor (LengthValue)
  function LengthValue(value) {
    if (!(value instanceof LengthValue)) {
      throw new TypeError('Value in the LengthValue constructor must be a ' +
          'LengthValue.');
    }

    if (value instanceof SimpleLength) {
      return new SimpleLength(value);
    } else {
      return new CalcLength(value);
    }
  }
  internal.inherit(LengthValue, internal.StyleValue);

  // The different possible length types.
  LengthValue.LengthType = [
    'px', 'percent', 'em', 'ex', 'ch',
    'rem', 'vw', 'vh', 'vmin', 'vmax',
    'cm', 'mm', 'in', 'pc', 'pt'
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
  };

  LengthValue.fromValue = function(value, type) {
    return new SimpleLength(value, type);
  };

  LengthValue.fromDictionary = function(dictionary) {
    return new CalcLength(dictionary);
  };

  LengthValue.prototype.add = function(addedLength) {
    if (this instanceof SimpleLength && addedLength instanceof SimpleLength && this.type == addedLength.type) {
      return this._addSimpleLengths(addedLength);
    } else if (addedLength instanceof LengthValue) {
      // Ensure both lengths are of type CalcLength before adding
      return this._asCalcLength()._addCalcLengths(addedLength._asCalcLength());
    } else {
      throw new TypeError('Argument must be a LengthValue');
    }
  };

  LengthValue.prototype.subtract = function(subtractedLength) {
    if (this instanceof SimpleLength && subtractedLength instanceof SimpleLength && this.type == subtractedLength.type) {
      return this._subtractSimpleLengths(subtractedLength);
    } else if (subtractedLength instanceof LengthValue) {
      // Ensure both lengths are of type CalcLength before subtracting
      return this._asCalcLength()._subtractCalcLengths(subtractedLength._asCalcLength());
    } else {
      throw new TypeError('Argument must be a LengthValue');
    }
  };

  LengthValue.prototype.multiply = function(multiplier) {
    throw new TypeError('Should not be reached');
  };

  LengthValue.prototype.divide = function(divider) {
    throw new TypeError('Should not be reached');
  };

  LengthValue.prototype.parse = function(cssString) {
    throw new TypeError('Should not be reached');
  };

  LengthValue.prototype._asCalcLength = function() {
    throw new TypeError('Should not be reached');
  };

  LengthValue.prototype.equals = function(other) {
    throw new TypeError('Should not be reached');
  };

  internal.LengthValue = LengthValue;
  if (TYPED_OM_TESTING) {
    testing.LengthValue = LengthValue;
  }

})(typedOM.internal, typedOMTesting);
