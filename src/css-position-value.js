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

  function generateCssString(positionValue) {
    return positionValue.x.cssText + ' ' + positionValue.y.cssText;
  };

  /**
   * CSSPositionValue(xPos, yPos)
   */
  function CSSPositionValue(xPos, yPos) {
    if (!(xPos instanceof CSSLengthValue)) {
      throw new TypeError('xPos is not a CSSLengthValue object');
    }

    if (!(yPos instanceof CSSLengthValue)) {
      throw new TypeError('yPos is not a CSSLengthValue object');
    }

    this.x = new CSSLengthValue.from(xPos);
    this.y = new CSSLengthValue.from(yPos);
    this.cssText = generateCssString(this);
  }
  internal.inherit(CSSPositionValue, CSSStyleValue);

  scope.CSSPositionValue = CSSPositionValue;

})(typedOM.internal, window);
