// Copyright 2016 Google Inc. All rights reserved.
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

  function CSSUnparsedValue(values) {
    if (values == undefined) {
      values = [];
    }
    if (!Array.isArray(values)) {
      throw new TypeError('CSSUnparsedValue should be an array of string or CSSVariableReferenceValue');
    }
    for (var i = 0; i < values.length; i++) {
      if (typeof values[i] != 'string' && !(values[i] instanceof CSSVariableReferenceValue)) {
        throw new TypeError("CSSUnparsedValue's elements should be string or CSSVariableReferenceValue");
      }
    }
    this._listOfReferences = values;
  }
  internal.inherit(CSSUnparsedValue, CSSStyleValue);

  CSSUnparsedValue.prototype.keys = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return key; });
  };

  CSSUnparsedValue.prototype.values = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return value; });
  };

  CSSUnparsedValue.prototype.entries = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return [key, value]; });
  };

  scope.CSSUnparsedValue = CSSUnparsedValue;

})(typedOM.internal, window);
