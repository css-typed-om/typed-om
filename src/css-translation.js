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

  function CSSTranslation(x, y, z) {
    if (arguments.length != 2 && arguments.length != 3) {
      throw new TypeError('CSSTranslation takes 2 or 3 arguments.');
    }

    for (var i = 0; i < arguments.length; i++) {
      if (!(arguments[i] instanceof CSSSimpleLength) ||
          arguments[i].type != CSSLengthValue.LengthType.PX) {
        throw new TypeError('Unsupported argument for CSSTranslation. Only ' +
            'CSSSimpleLength instances with type \'px\' are supported.');
      }
    }

    this.x = new CSSSimpleLength(x);
    this.y = new CSSSimpleLength(y);
    this.z = (z instanceof CSSSimpleLength) ? new CSSSimpleLength(z) : null;

    this._matrix = this._computeMatrix();
    this.cssText = this._generateCssString();
  }
  internal.inherit(CSSTranslation, internal.CSSTransformComponent);

  CSSTranslation.prototype.asMatrix = function() {
    return this._matrix;
  };

  CSSTranslation.prototype._computeMatrix = function() {
    // CSSTranslation is represented by the identity matrix with the translation
    // values down the last column.
    // See documentation https://drafts.csswg.org/css-transforms-1/.
    var matrix;
    if (this.z == null) {
      matrix = new CSSMatrix(1, 0, 0, 1, this.x.value, this.y.value);
    } else {
      matrix = new CSSMatrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, this.x.value,
          this.y.value, this.z.value, 1);
    }
    return matrix;
  };

  CSSTranslation.prototype._generateCssString = function() {
    var cssText;
    if (this.is2D()) {
      cssText = 'translate(' + this.x.cssText + ', ' + this.y.cssText +
          ')';
    } else {
      cssText = 'translate3d(' + this.x.cssText + ', ' + this.y.cssText +
          ', ' + this.z.cssText + ')';
    }
    return cssText;
  };

  scope.CSSTranslation = CSSTranslation;

})(typedOM.internal, window);
