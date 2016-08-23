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

  function CSSStyleValue() {
    throw new TypeError('CSSStyleValue cannot be instantiated.');
  }

  CSSStyleValue.parse = function(property, cssText) {
    if (typeof property != 'string') {
      throw new TypeError('Property name must be a string');
    }
    if (typeof cssText != 'string') {
      throw new TypeError('Must parse a string');
    }

    var consumed = internal.parsing.consumeStyleValueOrStyleValueList(property, cssText);
    if (consumed && !consumed[1]) {
      // Format is [ parsedThing, remainingString ], in this case
      // [ styleValueOrStyleValueList, remainingString ]
      // But there shouldn't be trailing characters.
      return consumed[0];
    }
    return null;
  };

  scope.CSSStyleValue = CSSStyleValue;

})(typedOM.internal, window);
