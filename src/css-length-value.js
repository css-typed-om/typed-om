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

  // Constructor (CSSLengthValue)
  function CSSLengthValue(value) {
    if (!(value instanceof CSSLengthValue)) {
      throw new TypeError('Value in the CSSLengthValue constructor must be a ' +
          'CSSLengthValue.');
    }

    if (value instanceof CSSSimpleLength) {
      return new CSSSimpleLength(value);
    } else {
      return new CSSCalcLength(value);
    }
  }
  internal.inherit(CSSLengthValue, CSSStyleValue);

  // The different possible length types.
  CSSLengthValue.LengthType = {
    PX: 'px',
    PERCENT: 'percent',
    EM: 'em',
    EX: 'ex',
    CH: 'ch',
    REM: 'rem',
    VW: 'vw',
    VH: 'vh',
    VMIN: 'vmin',
    VMAX: 'vmax',
    CM: 'cm',
    MM: 'mm',
    IN: 'in',
    PC: 'pc',
    PT: 'pt'
  };

  CSSLengthValue.isValidLengthType = function(str) {
    return internal.objects.any(CSSLengthValue.LengthType, function(type) {
      return str == type;
    });
  };

  CSSLengthValue.cssTextTypeRepresentation = function(type) {
    if (!CSSLengthValue.isValidLengthType(type)) {
      throw new TypeError('Invalid Length Type.');
    }

    switch (type) {
      case 'percent':
        return '%';
      default:
        return type;
    }
  };

  CSSLengthValue.from = function(value, type) {
    if (type !== undefined) {
      return new CSSSimpleLength(value, type);
    }
    if (typeof value == 'object') {
      return new CSSCalcLength(value);
    }
    if (typeof value != 'string') {
      throw new TypeError('Must make a length out of a string, calc dictionary, or number-type pair.');
    }
    var consumedLength = internal.parsing.consumeLengthValue(value);
    if (!consumedLength) {
      throw new TypeError('Unable to parse a length out of ' + value);
    }
    if (consumedLength[1]) {
      throw new TypeError('Trailing characters');
    }
    return consumedLength[0];
  };

  CSSLengthValue.prototype.add = function(addedLength) {
    if (this instanceof CSSSimpleLength &&
        addedLength instanceof CSSSimpleLength &&
        this.type == addedLength.type) {
      return internal.addSimpleLengths(this, addedLength);
    } else if (addedLength instanceof CSSLengthValue) {
      return internal.simpleLengthToCalcLength(this).add(addedLength);
    } else {
      throw new TypeError('Argument must be a CSSLengthValue');
    }
  };

  CSSLengthValue.prototype.subtract = function(subtractedLength) {
    if (this instanceof CSSSimpleLength &&
        subtractedLength instanceof CSSSimpleLength &&
        this.type == subtractedLength.type) {
      return internal.subtractSimpleLengths(this, subtractedLength);
    } else if (subtractedLength instanceof CSSLengthValue) {
      return internal.simpleLengthToCalcLength(this).subtract(subtractedLength);
    } else {
      throw new TypeError('Argument must be a CSSLengthValue');
    }
  };

  CSSLengthValue.prototype.multiply = function(multiplier) {
    throw new TypeError('Should not be reached');
  };

  CSSLengthValue.prototype.divide = function(divider) {
    throw new TypeError('Should not be reached');
  };

  CSSLengthValue.prototype.equals = function(other) {
    throw new TypeError('Should not be reached');
  };

  scope.CSSLengthValue = CSSLengthValue;
})(typedOM.internal, window);
