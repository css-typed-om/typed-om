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

(function(internal) {

  function computeMatrix(cssTransform) {
    if (!cssTransform.transformComponents.length) {
      return new DOMMatrixReadonly([1, 0, 0, 1, 0, 0]);
    }
    var matrix = cssTransform.transformComponents[0].matrix;
    for (var i = 1; i < cssTransform.transformComponents.length; ++i) {
      matrix = matrix.multiply(cssTransform.transformComponents[i].matrix);
    }
    return matrix;
  };

  function generateCssString(cssTransform) {
    function getCssString(value) {
      return value.cssText;
    }
    return cssTransform.transformComponents.map(getCssString).join(' ');
  };

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
      if (!(values[i] instanceof internal.CSSTransformComponent)) {
        throw new TypeError('Argument at index ' + i + ' is not an instance ' +
            'of \'CSSTransformComponent\'.');
      }
      this.transformComponents.push(values[i]);
    }

    this.matrix = computeMatrix(this);
    this.is2D = this.matrix.is2D;
    this.cssText = generateCssString(this);
  }
  internal.inherit(CSSTransformValue, CSSStyleValue);

  CSSTransformValue.prototype[Symbol.iterator] = function() {
    return this.entries();
  };

  CSSTransformValue.prototype.entries = function() {
    function entriesCallback(index) {
      return [index, this.transformComponents[index]];
    }
    return internal.objects.arrayIterator(
        this.transformComponents.length,
        entriesCallback.bind(this));
  };

  CSSTransformValue.prototype.keys = function() {
    return internal.objects.arrayIterator(
        this.transformComponents.length,
        function(index) { return index; });
  };

  CSSTransformValue.prototype.values = function() {
    function valuesCallback(index) {
      return this.transformComponents[index];
    }
    return internal.objects.arrayIterator(
        this.transformComponents.length,
        valuesCallback.bind(this));
  };

  window.CSSTransformValue = CSSTransformValue;

})(typedOM.internal);
