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

  // TODO: CSSCalcLength(cssString)
  function CSSCalcLength(dictionary) {
    if (typeof dictionary != 'object') {
      throw new TypeError('CSSCalcLength must be passed a dictionary object');
    }

    var isEmpty = true;
    internal.objects.foreach(CSSLengthValue.LengthType, function(type) {
      var value = dictionary[type];
      if (value == null) {
        this[type] = null;
        return;  // Exit callback.
      }
      if (typeof value == 'number') {
        this[type] = value;
        isEmpty = false;
      } else {
        throw new TypeError('Value of each field must be null or a number.');
      }
    }, this);

    if (isEmpty) {
      throw new TypeError(
          'A CalcDictionary must have at least one valid length.');
    }

    this.cssString = this._generateCssString();
  }
  internal.inherit(CSSCalcLength, CSSLengthValue);

  CSSCalcLength.prototype._generateCssString = function() {
    var result = 'calc(';

    var isFirst = true;
    internal.objects.foreach(CSSLengthValue.LengthType, function(type) {
      var value = this[type];
      if (value == null) {
        return;  // Exit callback.
      }
      if (!isFirst) {
        if (value >= 0) {
          result += ' + ';
        } else {
          result += ' - ';
        }
        value = Math.abs(value);
      }
      result += value + CSSLengthValue.cssStringTypeRepresentation(type);
      isFirst = false;
    }, this);

    result += ')';
    return result;
  };

  CSSCalcLength.prototype.multiply = function(multiplier) {
    var calcDictionary = {};

    // Iterate through all length types and multiply all non null lengths.
    internal.objects.foreach(CSSLengthValue.LengthType, function(type) {
      if (this[type] != null) {
        calcDictionary[type] = this[type] * multiplier;
      }
    }, this);

    return new CSSCalcLength(calcDictionary);
  };

  CSSCalcLength.prototype.divide = function(divider) {
    var calcDictionary = {};

    // Iterate through all length types and divide all non null lengths.
    internal.objects.foreach(CSSLengthValue.LengthType, function(type) {
      if (this[type] != null) {
        calcDictionary[type] = this[type] / divider;
      }
    }, this);

    return new CSSCalcLength(calcDictionary);
  };

  CSSCalcLength.prototype._addCalcLengths = function(addedLength) {
    if (!(addedLength instanceof CSSCalcLength)) {
      throw new TypeError('Argument must be a CSSCalcLength');
    }

    var calcDictionary = {};

    // Iterate through all possible length types and add their values.
    internal.objects.foreach(CSSLengthValue.LengthType, function(type) {
      if (this[type] == null && addedLength[type] == null) {
        calcDictionary[type] = null;
      } else if (this[type] == null) {
        calcDictionary[type] = addedLength[type];
      } else if (addedLength[type] == null) {
        calcDictionary[type] = this[type];
      } else {
        calcDictionary[type] = this[type] + addedLength[type];
      }
    }, this);

    return new CSSCalcLength(calcDictionary);
  };

  CSSCalcLength.prototype._subtractCalcLengths = function(subtractedLength) {
    if (!(subtractedLength instanceof CSSCalcLength)) {
      throw new TypeError('Argument must be a CSSCalcLength');
    }

    var calcDictionary = {};

    // Iterate through all possible length types and subtract their values.
    internal.objects.foreach(CSSLengthValue.LengthType, function(type) {
      if (this[type] == null && subtractedLength[type] == null) {
        calcDictionary[type] = null;
      } else if (subtractedLength[type] == null) {
        calcDictionary[type] = this[type];
      } else if (this[type] == null) {
        calcDictionary[type] = -subtractedLength[type];
      } else {
        calcDictionary[type] = this[type] - subtractedLength[type];
      }
    }, this);

    return new CSSCalcLength(calcDictionary);
  };

  CSSCalcLength.prototype._asCalcLength = function() {
    return this;
  };

  CSSCalcLength.prototype.equals = function(other) {
    if (!(other instanceof CSSCalcLength)) {
      return false;
    }

    // Iterate through all length types and check that both objects contain the
    // same values.
    return !internal.objects.any(CSSLengthValue.LengthType, function(type) {
      return this[type] != other[type];
    }, this);
  };

  scope.CSSCalcLength = CSSCalcLength;

})(typedOM.internal, window);
