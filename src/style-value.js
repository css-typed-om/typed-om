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

(function(shared, testing) {

  function StyleValue() {
  }

  // TODO: Include parsing logic here.
  StyleValue.parse = function(property, value) {
    if (typeof value == 'string') {
      numberValue = Number.parseFloat(value);
      if (numberValue !== NaN) {
        return new NumberValue(numberValue);
      }
    }
    return null;
  }

  shared.StyleValue = StyleValue;
  if (TYPED_OM_TESTING)
    testing.StyleValue = StyleValue;

})(baseClasses, typedOMTesting);
