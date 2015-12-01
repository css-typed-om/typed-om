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

  /**
   * CalcLength(dictionary)
   * TODO: CalcLength(cssString)
   */
  function CalcLength(dictionary) {
    if (typeof dictionary != 'object') {
      throw new TypeError('CalcLength must be passed a dictionary object');
    }

    var isEmpty = true;
    for (var index in shared.LengthValue.LengthType) {
      var type = shared.LengthValue.LengthType[index];
      var value = dictionary[type];
      if (typeof value == 'number') {
        this[type] = value;
        isEmpty = false;
      } else if (value == undefined || value == null) {
        this[type] = null;
      } else {
        throw new TypeError('Value of each field must be null or a number.');
      }
    }

    if (isEmpty) {
      throw new TypeError('A CalcDictionary must have at least one valid length.');
    }

    function createCssString(calcLength) {
      calcLength.cssString = 'calc(';
      var isFirst = true;
      for (var index in shared.LengthValue.LengthType) {
        var type = shared.LengthValue.LengthType[index];
        var value = calcLength[type];
        if (value != null) {
          // Add a "+" in the cssString if needed
          // (i.e before non-negative numbers, not including the first number)
          if (!isFirst && value >= 0) {
            calcLength.cssString += '+';
          }
          calcLength.cssString += value + shared.LengthValue.cssStringTypeRepresentation(type);
          isFirst = false;
        }
      }
      calcLength.cssString += ')';
    }
    createCssString(this);
  }

  CalcLength.prototype = Object.create(shared.LengthValue.prototype);

  // Length Calculation Methods
  CalcLength.prototype.multiply = function(multiplier) {
    var calcDictionary = {};

    //iterate through all length types and multiply all non null lengths 
    for(var i = 0; i < shared.LengthValue.LengthType.length; i++){
      var type = shared.LengthValue.LengthType[i];
      if(this[type] != null){
        calcDictionary[type] = this[type] * multiplier;
      }
    }

    return new CalcLength(calcDictionary);
  };

  CalcLength.prototype.divide = function(divider) {
    var calcDictionary = new Object;

    //iterate through all length types and multiply all non null lengths 
    for(var index in shared.LengthValue.LengthType){
      var type = shared.LengthValue.LengthType[index];
      if(this[type] != null){
        calcDictionary[type] = this[type] / divider;
      }
    }

    return new CalcLength(calcDictionary);
  };

  scope.CalcLength = CalcLength;
  if (TYPED_OM_TESTING)
    testing.CalcLength = CalcLength;

})(baseClasses, window, typedOMTesting);
