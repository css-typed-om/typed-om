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

(function(shared, scope, testing) {

  function ComputedStylePropertyMap(element) {
    this._element = element;
  }

  ComputedStylePropertyMap.prototype =
    Object.create(shared.StylePropertyMap.prototype);

  ComputedStylePropertyMap.prototype.append = function(property, value) {
    throw new TypeError('ComputedStylePropertyMap is immutable');
  };

  ComputedStylePropertyMap.prototype.delete = function(property) {
    throw new TypeError('ComputedStylePropertyMap is immutable');
  };

  ComputedStylePropertyMap.prototype.get = function(property) {
    if (typeof property != 'string') {
      throw new TypeError('parameter 1 is not of type \'string\'');
    }

    var value = window.getComputedStyle(this._element)[property];
    if (!value) {
      return null;
    }

    if (scope.KeywordValue.isKeywordValue(value)) {
      return new scope.KeywordValue(value);
    }

    // TODO: The rest of the properties once the rest of the StyleValues are
    // defined.
    switch (property) {
      // These properties always take numbers or a keyword handled above.
      case 'opacity':
      case 'orphans':
      case 'pitch-range':
      case 'richness':
      case 'stress':
      case 'widows':
      case 'z-index':
        return new scope.NumberValue(value);

      // These properties take only a length value (length and percentage),
      // or a keyword handled above.
      case 'bottom':
      case 'height':
      case 'left':
      case 'max-height':
      case 'max-width':
      case 'min-height':
      case 'min-width':
      case 'right':
      case 'text-indent':
      case 'top':
      case 'width':
        // TODO: ensure that LengthValue.parse is being implemented,
        // or update to other appropriate function.
        return new scope.LengthValue.parse(value);

      // These properties only take a length value, but do not take percentage.
      // TODO: Validation and implementation of this case.
      case 'letter-spacing':
      case 'word-spacing':
        throw new TypeError('Not implemented yet');

      // These properties take a number or SimpleLength

      case 'line-height':
        // normal | <number> | <length> | <percentage> | inherit
        throw new TypeError('Not implemented yet');

      case 'speech-rate':
        // <number> | x-slow | slow | medium | fast | x-fast | faster | slower |
        // inherit
        throw new TypeError('Not implemented yet');

      case 'volume':
        // <number> | <percentage> | silent | x-soft | soft | medium | loud |
        // x-loud | inherit
        throw new TypeError('Not implemented yet');

      default:
        throw new TypeError('Not implemented yet');
    }
  };

  ComputedStylePropertyMap.prototype.getAll = function(property) {
    if (typeof property != 'string') {
      throw new TypeError('parameter 1 is not of type \'string\'');
    }

    var value = this.get(property);
    if (Array.isArray(value)) {
      // TODO: Handle shorthands
      throw new TypeError('Not implemented yet');
    } else {
      return value ? [value] : [];
    }
  };

  ComputedStylePropertyMap.prototype.set = function(property, value) {
    throw new TypeError('ComputedStylePropertyMap is immutable');
  };

  ComputedStylePropertyMap.prototype.getProperties = function() {
    var computedStyles = window.getComputedStyle(this._element);
    var output = [];
    for (var i = 0, l = computedStyles.length; i < l; ++i) {
      var property = computedStyles[i];
      // TODO: Construct the objects for each type of thing and add them to the
      // output array.
    }
    return output;
  };

  function getComputedStyleMap(element) {
    return new ComputedStylePropertyMap(element);
  }

  scope.getComputedStyleMap = getComputedStyleMap;
  if (TYPED_OM_TESTING)
    testing.ComputedStylePropertyMap = ComputedStylePropertyMap;

})(baseClasses, window, typedOMTesting);
