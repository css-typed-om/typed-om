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

  function computeMatrix(cssTranslation) {
    // CSSTranslation is represented by the identity matrix with the translation
    // values down the last column.
    // See documentation https://drafts.csswg.org/css-transforms-1/.
    var matrix;
    if (cssTranslation.z == null) {
      matrix = new DOMMatrixReadonly(
          [1, 0, 0, 1, cssTranslation.x.value, cssTranslation.y.value]);
    } else {
      matrix = new DOMMatrixReadonly(
          [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, cssTranslation.x.value,
          cssTranslation.y.value, cssTranslation.z.value, 1]);
    }
    return matrix;
  };

  function generateCssString(cssTranslation) {
    if (cssTranslation.is2D) {
      return 'translate(' + cssTranslation.x.cssText + ', ' + cssTranslation.y.cssText + ')';
    } else {
      return 'translate3d('
        + cssTranslation.x.cssText + ', '
        + cssTranslation.y.cssText + ', '
        + cssTranslation.z.cssText + ')';
    }
  };

  function CSSTranslation(x, y, z) {
    if (arguments.length != 2 && arguments.length != 3) {
      throw new TypeError('CSSTranslation takes 2 or 3 arguments.');
    }

    for (var i = 0; i < arguments.length; i++) {
      if (!(arguments[i] instanceof CSSSimpleLength) ||
          arguments[i].type != internal.CSSLengthTypes.PX) {
        throw new TypeError('Unsupported argument for CSSTranslation. Only ' +
            'CSSSimpleLength instances with type \'px\' are supported.');
      }
    }

    this.x = new CSSSimpleLength(x);
    this.y = new CSSSimpleLength(y);
    this.z = (z instanceof CSSSimpleLength) ? new CSSSimpleLength(z) : null;

    this.matrix = computeMatrix(this);
    this.is2D = this.matrix.is2D;

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

  // These functions (cssTranslationFromTranslate*) are for making CSSTranslations from parsed CSS
  // Strings. These are needed for setting the cssText.
  function cssTranslationFromTranslate(coords, string, remaining) {
    if (coords.length == 1) {
      var result = [new CSSTranslation(coords[0], new CSSSimpleLength(0, 'px')), remaining];
      result[0]._cssText = string;
      return result;
    }
    if (coords.length == 2) {
      var result = [new CSSTranslation(coords[0], coords[1]), remaining];
      result[0]._cssText = string;
      return result;
    }
    return null;
  }

  function cssTranslationFromTranslate3d(coords, string, remaining) {
    if (coords.length != 3) {
      return null;
    }
    var result = [new CSSTranslation(coords[0], coords[1], coords[2]), remaining];
    result[0]._cssText = string;
    return result;
  }

  function cssTranslationFromTranslateX(coords, string, remaining) {
    if (coords.length != 1) {
      return null;
    }
    var result = [new CSSTranslation(coords[0], new CSSSimpleLength(0, 'px')), remaining];
    result[0]._cssText = string;
    return result;
  }

  function cssTranslationFromTranslateY(coords, string, remaining) {
    if (coords.length != 1) {
      return null;
    }
    var result = [new CSSTranslation(new CSSSimpleLength(0, 'px'), coords[0]), remaining];
    result[0]._cssText = string;
    return result;
  }

  function cssTranslationFromTranslateZ(coords, string, remaining) {
    if (coords.length != 1) {
      return null;
    }
    var zeroLength = new CSSSimpleLength(0, 'px');
    var result = [new CSSTranslation(zeroLength, zeroLength, coords[0]), remaining];
    result[0]._cssText = string;
    return result;
  }

  internal.inherit(CSSTranslation, internal.CSSTransformComponent);
  internal.cssTranslationFromTranslate = cssTranslationFromTranslate;
  internal.cssTranslationFromTranslate3d = cssTranslationFromTranslate3d;
  internal.cssTranslationFromTranslateX = cssTranslationFromTranslateX;
  internal.cssTranslationFromTranslateY = cssTranslationFromTranslateY;
  internal.cssTranslationFromTranslateZ = cssTranslationFromTranslateZ;

  scope.CSSTranslation = CSSTranslation;

})(typedOM.internal, window);
