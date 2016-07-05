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

  function CSSTransformValue(values) {
    if (values === undefined) {
      values = [];
    }
    if (!Array.isArray(values)) {
      throw new TypeError('CSSTransformValue must have an array ' +
          'of CSSTransformComponents or must be empty');
    }

    this.transformComponents = [];
    for (var i = 0; i < values.length; i++) {
      if (!(values[i] instanceof CSSTransformComponent)) {
        throw new TypeError('Argument at index ' + i + ' is not an instance ' +
            'of \'CSSTransformComponent\'.');
      }
      this.transformComponents.push(values[i]);
    }

    this._matrix = this._computeMatrix();
    this.cssText = this._generateCssString();
  }
  internal.inherit(CSSTransformValue, CSSStyleValue);

  CSSTransformValue.prototype.asMatrix = function() {
    return this._matrix;
  };

  CSSTransformValue.prototype.is2D = function() {
    return this.asMatrix().is2D();
  };

  CSSTransformValue.prototype._computeMatrix = function() {
    if (!this.transformComponents.length) {
      return new CSSMatrix(1, 0, 0, 1, 0, 0);
    }
    var matrix = this.transformComponents[0].asMatrix();
    for (var i = 1; i < this.transformComponents.length; ++i) {
      matrix = matrix.multiply(this.transformComponents[i].asMatrix());
    }
    return matrix;
  };

  CSSTransformValue.prototype._generateCssString = function() {
    function getCssString(value) {
      return value.cssText;
    }
    return this.transformComponents.map(getCssString).join(' ');
  };

  scope.CSSTransformValue = CSSTransformValue;

})(typedOM.internal, window);
