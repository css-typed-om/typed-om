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

  function CSSPerspective(length) {
    if (arguments.length != 1) {
      throw new TypeError('CSSPerspective takes exactly 1 argument.');
    }
    if (!(length instanceof CSSSimpleLength) ||
        length.type != CSSLengthValue.LengthType.PX) {
      throw new TypeError('Unsupported CSSPerspective length. Only CSSSimpleLength ' +
          'instances with type \'px\' are supported.');
    }
    if (length.value <= 0) {
      throw new TypeError('CSSPerspective length must be strictly positive.');
    }

    this.length = new CSSSimpleLength(length);
    this._matrix = this._computeMatrix();
    this.cssString = this._generateCssString();
  }
  internal.inherit(CSSPerspective, internal.CSSTransformComponent);

  CSSPerspective.prototype.asMatrix = function() {
    return this._matrix;
  };

  CSSPerspective.prototype._computeMatrix = function() {
    // CSSPerspective represented by the 3D identity matrix with the value
    // -1/length in the 4th row, 3rd column.
    // See documentation https://drafts.csswg.org/css-transforms-1/.
    var value = -1 / this.length.value;
    return new CSSMatrix(new internal.DOMMatrixReadonly([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, value, 0, 0, 0, 1]));
  };

  CSSPerspective.prototype._generateCssString = function() {
    return 'perspective(' + this.length.cssString + ')';
  };

  scope.CSSPerspective = CSSPerspective;

})(typedOM.internal, window);
