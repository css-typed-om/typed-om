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

(function(internal, scope, testing) {

  function StylePropertyMapReadOnly(styleObject) {
    this._styleObject = styleObject;
  }

  StylePropertyMapReadOnly.prototype.get = function(property) {
    if (typeof property != 'string') {
      throw new TypeError('parameter 1 is not of type \'string\'');
    }

    var value = this._styleObject[property];
    if (!value) {
      return null;
    }
    if (value == 'inherit') {
      // TODO: Properly detect when it's a keyword.
      throw new TypeError('Not implemented yet');
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
        return new scope.NumberValue(Number(value));

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

  StylePropertyMapReadOnly.prototype.getAll = function(property) {
    if (typeof property != 'string') {
      throw new TypeError('parameter 1 is not of type \'string\'');
    }

    switch (property) {
      // These properties always return a single value.
      case 'line-height':
      case 'opacity':
      case 'orphans':
      case 'pitch-range':
      case 'richness':
      case 'speech-rate':
      case 'stress':
      case 'volume':
      case 'widows':
      case 'z-index':
        var value = this.get(property);
        return value ? [value] : [];

      // TODO: Stuff that takes shorthands will need to be handled separately.

      default:
        throw new TypeError('Not implemented yet');
    }

  };

  StylePropertyMapReadOnly.prototype.getProperties = function() {
    var output = [];
    for (var i = 0, l = this._styleObject.length; i < l; ++i) {
      var property = this._styleObject[i];
      // TODO: Construct the objects for each type of thing and add them to the
      // output array.
    }
    return output;
  };

  getComputedStyleMap = function(element) {
    return new StylePropertyMapReadOnly(getComputedStyle(element));
  };

  internal.StylePropertyMapReadOnly = StylePropertyMapReadOnly;
  scope.getComputedStyleMap = getComputedStyleMap;
  if (TYPED_OM_TESTING) {
    testing.StylePropertyMapReadOnly = StylePropertyMapReadOnly;
  }

})(typedOM.internal, window, typedOMTesting);
