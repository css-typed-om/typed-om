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

  // TODO: CalcLength(cssString)
  function CalcLength(dictionary) {
    if (typeof dictionary != 'object') {
      throw new TypeError('CalcLength must be passed a dictionary object');
    }

    var isEmpty = true;
    internal.objects.foreach(internal.LengthValue.LengthType, function(type) {
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
      throw new TypeError('A CalcDictionary must have at least one valid length.');
    }

    this.cssString = this.createCssString();
  }
  internal.inherit(CalcLength, internal.LengthValue);

  CalcLength.prototype.createCssString = function() {
    var result = 'calc(';

    var isFirst = true;
    internal.objects.foreach(internal.LengthValue.LengthType, function(type) {
      var value = this[type];
      if (value == null) {
        return;  // Exit callback.
      }
      if (!isFirst && value >= 0) {
        result += '+';
      }
      result += value + internal.LengthValue.cssStringTypeRepresentation(type);
      isFirst = false;
    }, this);

    result += ')';
    return result;
  };

  CalcLength.prototype.multiply = function(multiplier) {
    var calcDictionary = {};

    // Iterate through all length types and multiply all non null lengths.
    internal.objects.foreach(internal.LengthValue.LengthType, function(type) {
      if (this[type] != null) {
        calcDictionary[type] = this[type] * multiplier;
      }
    }, this);

    return new CalcLength(calcDictionary);
  };

  CalcLength.prototype.divide = function(divider) {
    var calcDictionary = {};

    // Iterate through all length types and divide all non null lengths.
    internal.objects.foreach(LengthValue.LengthType, function(type) {
      if (this[type] != null) {
        calcDictionary[type] = this[type] / divider;
      }
    }, this);

    return new CalcLength(calcDictionary);
  };

  CalcLength.prototype._addCalcLengths = function(addedLength) {
    if (!(addedLength instanceof CalcLength)) {
      throw new TypeError('Argument must be a CalcLength');
    }

    var calcDictionary = {};

    // Iterate through all possible length types and add their values
    internal.objects.foreach(internal.LengthValue.LengthType, function(type) {
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

    return new CalcLength(calcDictionary);
  };

  CalcLength.prototype._subtractCalcLengths = function(subtractedLength) {
    if (!(subtractedLength instanceof CalcLength)) {
      throw new TypeError('Argument must be a CalcLength');
    }

    var calcDictionary = {};

    // Iterate through all possible length types and add their values
    internal.objects.foreach(internal.LengthValue.LengthType, function(type) {
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

    return new CalcLength(calcDictionary);
  };

  CalcLength.prototype._asCalcLength = function() {
    return this;
  };

  CalcLength.prototype.equals = function(other) {
    if (!(other instanceof CalcLength)) {
      return false;
    }

    // Iterate through all length types and check that both objects contain the same values
    return !internal.objects.any(LengthValue.LengthType, function(type) {
      return this[type] != other[type];
    }, this);
  };

  scope.CalcLength = CalcLength;

})(typedOM.internal, window);
