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

    var tanAx = tanDegrees(cssSkew.ax.degrees);
    var tanAy = tanDegrees(cssSkew.ay.degrees);
    return new DOMMatrixReadonly([1, tanAy, tanAx, 1, 0, 0]);
  };

  function generateCssString(cssSkew) {
    switch (cssSkew._inputType) {
      case '1':
        return 'skew(' + cssSkew.ax.cssText + ')';
      case '2':
        return 'skew(' + cssSkew.ax.cssText + ', ' + cssSkew.ay.cssText + ')';
      case 'x':
        return 'skewx(' + cssSkew.ax.cssText + ')';
      case 'y':
        return 'skewy(' + cssSkew.ay.cssText + ')';
    }
  };

  function CSSSkew(ax, ay) {
    if (arguments.length != 2) {
      throw new TypeError('CSSSkew must have 2 arguments.');
    } else if (!(ay instanceof CSSAngleValue && ax instanceof CSSAngleValue)) {
      throw new TypeError('CSSSkew arguments must be all CSSAngleValues.');
    }

    this.ax = ax;
    this.ay = ay;

    this.matrix = computeMatrix(this);
    this.is2D = this.matrix.is2D;
    this._inputType = '2';

    Object.defineProperty(this, 'cssText', {
      get: function() {
        if (!this._cssText) {
          this._cssText = generateCssString(this);
        }
        return this._cssText;
      },
      set: function(newCssText) {}
    });
  }

  internal.inherit(CSSSkew, internal.CSSTransformComponent);

  scope.CSSSkew = CSSSkew;

})(typedOM.internal, window);
