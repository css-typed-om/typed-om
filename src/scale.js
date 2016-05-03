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

  function CSSScale(x, y, z) {
    if (arguments.length != 2 && arguments.length != 3) {
      throw new TypeError('CSSScale must have 2 or 3 arguments.');
    }

    for (var index = 0; index < arguments.length; index++) {
      if (typeof arguments[index] != 'number') {
        throw new TypeError('CSSScale arguments must be of type \'number\'.');
      }
    }

    this.x = x;
    this.y = y;
    this.z = (typeof z == 'number') ? z : null;

    this._matrix = this._computeMatrix();
    this.cssString = this._generateCssString();
  }
  internal.inherit(CSSScale, internal.CSSTransformComponent);

  CSSScale.prototype.asMatrix = function() {
    return this._matrix;
  };

  CSSScale.prototype._computeMatrix = function() {
    var matrix;
    if (this.z == null) {
      matrix = new CSSMatrix(this.x, 0, 0, this.y, 0, 0);
    } else {
      matrix = new CSSMatrix(this.x, 0, 0, 0, 0, this.y, 0, 0, 0, 0, this.z, 0, 0,
          0, 0, 1);
    }
    return matrix;
  };

  CSSScale.prototype._generateCssString = function() {
    var cssString;
    if (this.is2DComponent()) {
      cssString = 'scale(' + this.x + ', ' + this.y + ')';
    } else {
      cssString = 'scale3d(' + this.x + ', ' + this.y + ', ' + this.z + ')';
    }
    return cssString;
  };

  scope.CSSScale = CSSScale;

})(typedOM.internal, window);
