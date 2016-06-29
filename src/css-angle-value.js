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

  function isValidAngleUnit(unit) {
    return internal.objects.any(AngleType, function(type) {
      return unit == type;
    });
  }

  function rad2deg(rad) {
    return rad * 180 / Math.PI;
  }
  function grad2deg(grad) {
    return grad * 9 / 10;
  }
  function turn2deg(turn) {
    return turn * 360;
  }
  function deg2rad(deg) {
    return deg * Math.PI / 180;
  }
  function deg2grad(deg) {
    return deg * 10 / 9;
  }
  function deg2turn(deg) {
    return deg / 360;
  }

  function CSSAngleValue(value, unit) {
    if (arguments.length != 2) {
      throw new TypeError('Must specify an angle and a unit');
    }
    if (typeof value != 'number') {
      throw new TypeError('Value must be a number');
    }
    if (!isValidAngleUnit(unit)) {
      throw new TypeError('Invalid unit type');
    }

    this._unit = unit;
    this._value = value;
    switch (unit) {
      case AngleType.DEG:
        this.degrees = value;
        this.radians = deg2rad(value);
        this.gradians = deg2grad(value);
        this.turns = deg2turn(value);
        break;
      case AngleType.RAD:
        this.degrees = rad2deg(value);
        this.radians = value;
        this.gradians = deg2grad(this.degrees);
        this.turns = deg2turn(this.degrees);
        break;
      case AngleType.GRAD:
        this.degrees = grad2deg(value);
        this.radians = deg2rad(this.degrees);
        this.gradians = value;
        this.turns = deg2turn(this.degrees);
        break;
      case  AngleType.TURN:
        this.degrees = turn2deg(value);
        this.radians = deg2rad(this.degrees);
        this.gradians = deg2grad(this.degrees);
        this.turns = value;
        break;
    }

    this.cssString = this._value + this._unit;
  }
  internal.inherit(CSSAngleValue, CSSStyleValue);

  scope.CSSAngleValue = CSSAngleValue;

})(typedOM.internal, window);
