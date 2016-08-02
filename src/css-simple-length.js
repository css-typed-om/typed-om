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

  function generateCssString(simpleLength) {
    var cssText = simpleLength.value +
        CSSLengthValue.cssTextTypeRepresentation(simpleLength.type);
    return cssText;
  }

  // TODO: CSSSimpleLength(simpleLength), CSSSimpleLength(cssText)
  function CSSSimpleLength(value, type) {
    if (value instanceof CSSSimpleLength && arguments.length == 1) {
      return new CSSSimpleLength(value.value, value.type);
    }
    if (typeof value != 'number') {
      throw new TypeError('Value of CSSSimpleLength must be a number.');
    }
    if (!CSSLengthValue.isValidLengthType(type)) {
      throw new TypeError('\'' + type + '\' is not a valid type for a CSSSimpleLength.');
    }
    this.type = type;
    this.value = value;
    this.cssText = generateCssString(this);
  }
  internal.inherit(CSSSimpleLength, CSSLengthValue);

  CSSSimpleLength.prototype.multiply = function(multiplier) {
    return new CSSSimpleLength((this.value * multiplier), this.type);
  };

  CSSSimpleLength.prototype.divide = function(divider) {
    return new CSSSimpleLength((this.value / divider), this.type);
  };

  function addSimpleLengths(length, addedLength) {
    if (!(addedLength instanceof CSSSimpleLength)) {
      throw new TypeError('Argument must be a CSSSimpleLength');
    }
    if (length.type != addedLength.type) {
      throw new TypeError('CSSSimpleLength units are not the same');
    }
    return new CSSSimpleLength(length.value + addedLength.value, length.type);
  };

  function subtractSimpleLengths(length, subtractedLength) {
    if (!(subtractedLength instanceof CSSSimpleLength)) {
      throw new TypeError('Argument must be a CSSSimpleLength');
    }
    if (length.type != subtractedLength.type) {
      throw new TypeError('CSSSimpleLength units are not the same');
    }
    return new CSSSimpleLength(length.value - subtractedLength.value, length.type);
  };

  function simpleLengthToCalcLength(simpleLength) {
    var calcDictionary = {};
    calcDictionary[simpleLength.type] = simpleLength.value;
    return new CSSCalcLength(calcDictionary);
  };

  CSSSimpleLength.prototype.equals = function(other) {
    if (!(other instanceof CSSSimpleLength)) {
      return false;
    }
    if (!(this.type == other.type && this.value == other.value)) {
      return false;
    }
    return true;
  };

  scope.CSSSimpleLength = CSSSimpleLength;

  internal.addSimpleLengths = addSimpleLengths;
  internal.subtractSimpleLengths = subtractSimpleLengths;
  internal.simpleLengthToCalcLength = simpleLengthToCalcLength;

})(typedOM.internal, window);
