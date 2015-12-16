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

  // TODO: SimpleLength(simpleLength), SimpleLength(cssString)
  function SimpleLength(value, type) {
    if (typeof value != 'number') {
      throw new TypeError('Value of SimpleLength must be a number.');
    }
    if (internal.LengthValue.LengthType.indexOf(type) < 0) {
      throw new TypeError('\'' + type + '\' is not a valid type for a SimpleLength.');
    }
    this.type = type;
    this.value = value;
    this.cssString = this.value + internal.LengthValue.cssStringTypeRepresentation(this.type);
  }
  internal.inherit(SimpleLength, internal.LengthValue);

  SimpleLength.prototype.multiply = function(multiplier) {
    return new SimpleLength((this.value * multiplier), this.type);
  };

  SimpleLength.prototype.divide = function(divider) {
    return new SimpleLength((this.value / divider), this.type);
  };

  SimpleLength.prototype._addSimpleLengths = function(addedLength) {
    if (!(addedLength instanceof SimpleLength)) {
      throw new TypeError('Argument must be a SimpleLength');
    }
    if (this.type != addedLength.type) {
      throw new TypeError('SimpleLength units are not the same');
    }
    return new SimpleLength((this.value + addedLength.value), this.type);
  };

  SimpleLength.prototype._subtractSimpleLengths = function(subtractedLength) {
    if (!(subtractedLength instanceof SimpleLength)) {
      throw new TypeError('Argument must be a SimpleLength');
    }
    if (this.type != subtractedLength.type) {
      throw new TypeError('SimpleLength units are not the same');
    }
    return new SimpleLength((this.value - subtractedLength.value), this.type);
  };

  SimpleLength.prototype._asCalcLength = function() {
    var calcDictionary = {};
    calcDictionary[this.type] = this.value;
    return new CalcLength(calcDictionary);
  };

  SimpleLength.prototype.equals = function(other) {
    if (!(other instanceof SimpleLength)) {
      return false;
    }
    if (!(this.type == other.type && this.value == other.value)) {
      return false;
    }
    return true;
  };

  scope.SimpleLength = SimpleLength;

})(typedOM.internal, window);
