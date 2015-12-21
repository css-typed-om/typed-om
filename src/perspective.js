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

  function Perspective(length) {
    if (arguments.length != 1) {
      throw new TypeError('Perspective takes exactly 1 argument.');
    }
    // TODO: Change check of 'px' when LengthValue.LengthType enum is updated.
    if (!(length instanceof SimpleLength) || length.type != 'px') {
      throw new TypeError('Unsupported Perspective length. Only SimpleLength ' +
          'instances with type \'px\' are supported.');
    }
    if (length.value <= 0) {
      throw new TypeError('Perspective length must be strictly positive.');
    }

    this.length = new SimpleLength(length);
    this._matrix = this._computeMatrix();
    this.cssString = this._generateCssString();
  }
  internal.inherit(Perspective, internal.TransformComponent);

  Perspective.prototype.asMatrix = function() {
    return this._matrix;
  };

  Perspective.prototype._computeMatrix = function() {
    // Perspective represented by the 3D identity matrix with the value
    // -1/length in the 4th row, 3rd column.
    // See documentation https://drafts.csswg.org/css-transforms-1/.
    var value = -1 / this.length.value;
    return new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, value, 0, 0, 0, 1);
  };

  Perspective.prototype._generateCssString = function() {
    return 'perspective(' + this.length.cssString + ')';
  };

  scope.Perspective = Perspective;

})(typedOM.internal, window);
