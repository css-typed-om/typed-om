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

  function Translation(x, y, z) {
    if (arguments.length != 2 && arguments.length != 3) {
      throw new TypeError('Translation takes 2 or 3 arguments.');
    }

    for (var i = 0; i < arguments.length; i++) {
      // TODO: Change check of 'px' when LengthValue.LengthType enum is updated.
      if (!(arguments[i] instanceof SimpleLength) ||
          arguments[i].type != 'px') {
        throw new TypeError('Unsupported argument for Translation. Only ' +
            'SimpleLength instances with type \'px\' are supported.');
      }
    }

    this.x = x;
    this.y = y;
    this.z = (z instanceof LengthValue) ? z : null;

    this._matrix = this._computeMatrix();
    this.cssString = this._generateCssString();
  }
  internal.inherit(Translation, internal.TransformComponent);

  Translation.prototype.asMatrix = function() {
    return this._matrix;
  };

  Translation.prototype._computeMatrix = function() {
    // Translation is represented by the identity matrix with the translation
    // values down the last column.
    // See documentation https://drafts.csswg.org/css-transforms-1/.
    var matrix;
    if (this.z == null) {
      matrix = new Matrix(1, 0, 0, 1, this.x.value, this.y.value);
    } else {
      matrix = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, this.x.value,
          this.y.value, this.z.value, 1);
    }
    return matrix;
  };

  Translation.prototype._generateCssString = function() {
    var cssString;
    if (this.is2DComponent()) {
      cssString = 'translate(' + this.x.cssString + ', ' + this.y.cssString +
          ')';
    } else {
      cssString = 'translate3d(' + this.x.cssString + ', ' + this.y.cssString +
          ', ' + this.z.cssString + ')';
    }
    return cssString;
  };

  scope.Translation = Translation;

})(typedOM.internal, window);
