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

  function KeywordValue(value) {
    if (!KeywordValue.isKeywordValue(value)) {
      throw new TypeError('Value must be a valid style value keyword.');
    }
    this.keywordValue = value;
    this.cssString = value;
  }

  KeywordValue.StyleValueKeyword = ['auto', 'initial', 'inherit', 'revert', 'unset'];

  KeywordValue.isKeywordValue = function(cssString) {
    return KeywordValue.StyleValueKeyword.indexOf(cssString) >= 0;
  };

  KeywordValue.prototype = Object.create(shared.StyleValue.prototype);

  scope.KeywordValue = KeywordValue;
  if (TYPED_OM_TESTING)
    testing.KeywordValue = KeywordValue;

})(baseClasses, window, typedOMTesting);
