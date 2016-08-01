// Copyright 2016 Google Inc. All rights reserved.
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

  AngleType = {
    DEG: "deg",
    RAD: "rad",
    GRAD: "grad",
    TURN: "turn"
  };

  function isValidAngleType(unit) {
    return internal.objects.any(AngleType, function(type) {
      return unit == type;
    });
  }

  function radToDeg(rad) {
    return rad * 180 / Math.PI;
  }
  function gradToDeg(grad) {
    return grad * 9 / 10;
  }
  function turnToDeg(turn) {
    return turn * 360;
  }
  function degToRad(deg) {
    return deg * Math.PI / 180;
  }
  function degToGrad(deg) {
    return deg * 10 / 9;
  }
  function degToTurn(deg) {
    return deg / 360;
  }

  function CSSAngleValue(value, unit) {
    if (arguments.length != 2) {
      throw new TypeError('Must specify an angle and a unit');
    }
    if (typeof value != 'number') {
      throw new TypeError('Value must be a number');
    }
    if (!isValidAngleType(unit)) {
      throw new TypeError('Invalid unit type');
    }

    this._unit = unit;
    this._value = value;
    switch (unit) {
      case AngleType.DEG:
        this.degrees = value;
        this.radians = degToRad(value);
        this.gradians = degToGrad(value);
        this.turns = degToTurn(value);
        break;
      case AngleType.RAD:
        this.degrees = radToDeg(value);
        this.radians = value;
        this.gradians = degToGrad(this.degrees);
        this.turns = degToTurn(this.degrees);
        break;
      case AngleType.GRAD:
        this.degrees = gradToDeg(value);
        this.radians = degToRad(this.degrees);
        this.gradians = value;
        this.turns = degToTurn(this.degrees);
        break;
      case  AngleType.TURN:
        this.degrees = turnToDeg(value);
        this.radians = degToRad(this.degrees);
        this.gradians = degToGrad(this.degrees);
        this.turns = value;
        break;
    }

    this.cssText = this._value + this._unit;
  }
  internal.inherit(CSSAngleValue, CSSStyleValue);

  scope.CSSAngleValue = CSSAngleValue;

})(typedOM.internal, window);
