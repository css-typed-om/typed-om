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

  function NumberValue(value) {
    if (typeof value != 'number') {
      throw new TypeError('Value of NumberValue must be a number.');
    }
    this.value = value;
    this.cssString = '' + value;
  }
  internal.inherit(NumberValue, internal.StyleValue);

  NumberValue.parse = function(value) {
    if (/^\s*[-+]?(\d*\.)?\d+(e[-+]?\d+)?\s*$/.test(value)) {
      return new NumberValue(parseFloat(value));
    }
    return null;
  };

  scope.NumberValue = NumberValue;

})(typedOM.internal, window);
