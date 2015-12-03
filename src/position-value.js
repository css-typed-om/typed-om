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
   * PositionValue(xPos, yPos)
   */
  function PositionValue(xPos, yPos) {
    //Check that method parameters are of type LengthValue
    if(!(xPos instanceof LengthValue)){
      throw new TypeError('xPos is not of type: LengthValue');
    }

    if(!(yPos instanceof LengthValue)){
      throw new TypeError('yPos is not of type: LengthValue');
    }

    this.x = xPos;
    this.y = yPos;

    this._createCssString();
  }

  PositionValue.prototype = Object.create(shared.StyleValue.prototype)

  PositionValue.prototype._createCssString = function(){
    this.cssString = this.x.cssString + " " + this.y.cssString;
  }

   scope.PositionValue = PositionValue;
  if (TYPED_OM_TESTING)
    testing.PositionValue = PositionValue;

})(baseClasses, window, typedOMTesting);
