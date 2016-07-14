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

  // This is the internal version of CSSStyleValue so we can fake not having a
  // constructor for CSSStyleValues.
  var CSSStyleValue = function(cssText) {
    if (!cssText) {
      throw new TypeError('CSSStyleValue must have a value');
    }
    this.cssText = cssText;
  }
  CSSStyleValue.prototype = Object.create(scope.CSSStyleValue.prototype);

  internal.CSSStyleValue = CSSStyleValue;
})(typedOM.internal, window);
