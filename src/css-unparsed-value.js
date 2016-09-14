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
    throw new TypeError('CSSUnparsedValue cannot be instantiated.');
  }
  internal.inherit(CSSUnparsedValue, CSSStyleValue);

  CSSUnparsedValue.prototype[Symbol.iterator] = function() {
    return this.entries();
  };

  CSSUnparsedValue.prototype.entries = function() {
    function entriesCallback(index) {
      return [index, this._listOfReferences[index]];
    }
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        entriesCallback.bind(this));
  };

  CSSUnparsedValue.prototype.keys = function() {
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        function(index) { return index; });
  };

  CSSUnparsedValue.prototype.values = function() {
    function valuesCallback(index) {
      return this._listOfReferences[index];
    }
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        valuesCallback.bind(this));
  };

  scope.CSSUnparsedValue = CSSUnparsedValue;

  (function() {
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
    CSSUnparsedValue.prototype = Object.create(scope.CSSUnparsedValue.prototype);

    internal.CSSUnparsedValue = CSSUnparsedValue;
  })();

})(typedOM.internal, window);
