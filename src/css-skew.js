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

  function tanDegrees(degrees) {
    var radians = degrees * Math.PI / 180;
    return Math.tan(radians);
  }

  function computeMatrix(cssSkew) {
    // CSSSkew represented by the 2D matrix:
    //   1     tan(ax)  0
    // tan(ay)    1     0

    var tanAx = tanDegrees(cssSkew.ax);
    var tanAy = tanDegrees(cssSkew.ay);
    return new DOMMatrixReadonly([1, tanAy, tanAx, 1, 0, 0]);
  };

  function generateCssString(cssSkew) {
    return 'skew(' + cssSkew.ax + 'deg' + ', ' + cssSkew.ay + 'deg' + ')';
  };

  function CSSSkew(ax, ay) {
    if (arguments.length != 2) {
      throw new TypeError('CSSSkew must have 2 arguments.');
    // Arguments must both be CSSAngleValues or both be doubles.
    } else if (!(ay instanceof CSSAngleValue && ax instanceof CSSAngleValue) && !(typeof ay == 'number' && typeof ax == 'number')) {
      throw new TypeError('CSSSkew arguments must be all numbers or all CSSAngleValues.');
    }

    if (ax instanceof CSSAngleValue) {
      this.ax = ax.degrees;
      this.ay = ay.degrees;
      this._ax = ax;
      this._ay = ay;
    } else {
      this.ax = ax;
      this.ay = ay;
      this._ax = new CSSAngleValue(ax, 'deg');
      this._ay = new CSSAngleValue(ay, 'deg');
    }

    this.matrix = computeMatrix(this);
    this.is2D = this.matrix.is2D;
    this.cssText = generateCssString(this);
  }
  internal.inherit(CSSSkew, internal.CSSTransformComponent);

  scope.CSSSkew = CSSSkew;

})(typedOM.internal, window);
