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

  function CSSVariableReferenceValue(variable, fallback) {
    if (arguments.length != 2) {
      throw new TypeError('CSSVariableReferenceValue constructor should get two parameters');
    }
    if (typeof variable != 'string') {
      throw new TypeError('Variable of CSSVariableReferenceValue must be a string');
    }
    if ((fallback !== undefined) && !(fallback instanceof CSSUnparsedValue)) {
      throw new TypeError('Fallback of CSSVariableReferenceValue must be a CSSUnparsedValue');
    }
    this.variable = variable;
    this.fallback = fallback;
  }

  scope.CSSVariableReferenceValue = CSSVariableReferenceValue;

})(typedOM.internal, window);
