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

  /**
   * SimpleLength(value, type)
   * TODO: SimpleLength(simpleLength), SimpleLength(cssString)
   */
  function SimpleLength(value, type) {
    if (arguments.length == 2 && typeof type == 'string' &&
      type.toUpperCase() in LengthValue.LengthType) {
      this.type = type.toUpperCase();
      if (typeof value == 'number') {
        this.value = value;
      } else if (typeof value == 'string') {
        nValue = Number.parseFloat(value);
        if (!isNaN(nValue)) {
          this.value = nValue;
        }
      }
    }
    if (this.value == undefined) {
      throw new TypeError('Value of SimpleLength must be a number or a numeric string.');
    }

    this.cssString = this.value + LengthValue.LengthType[this.type];
  }

  SimpleLength.prototype = Object.create(shared.LengthValue.prototype);

  scope.SimpleLength = SimpleLength;
  if (TYPED_OM_TESTING)
    testing.SimpleLength = SimpleLength;

})(baseClasses, window, typedOMTesting);
