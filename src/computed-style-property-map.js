//
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

(function(scope, shared) {

function ComputedStylePropertyMap(element) {
  this._element = element;
}

ComputedStylePropertyMap.prototype = Object.create(shared.StylePropertyMap.prototype);

ComputedStylePropertyMap.prototype.append = function(property, value) {
  throw new TypeError('ComputedStylePropertyMap is immutable');
};

ComputedStylePropertyMap.prototype.get = function(property) {
  if (typeof property != 'string') {
    throw new TypeError('parameter 1 is not of type \'string\'');
  }
  // TODO: define types
  throw new TypeError('Not implemented yet');
};

function getComputedStyleMap(element) {
  return new ComputedStylePropertyMap(element);
}

scope.getComputedStyleMap = getComputedStyleMap;
scope.ComputedStylePropertyMap = ComputedStylePropertyMap;

})(window, baseClasses)
