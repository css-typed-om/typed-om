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

(function(internal, testing) {

  function consumeLengthValue(str) {
    var lengthUnits = 'px|%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc';
    var result = internal.parsing.parseDimension(new RegExp(lengthUnits, 'g'), value);
    if (!result) {
      return null;
    }
    if (result['%'] != undefined) {
      // Percent is a special case - We require 'percent' instead
      // of '%' as the unit.
      result['percent'] = result['%'];
      delete result['%'];
    }
    var keys = Object.keys(result);
    if (internal.parsing.isCalc(value)) {
      return [new CSSCalcLength(result)];
    } else {
      return [new CSSSimpleLength(result[keys[0]], keys[0])];
    }
  }

  function consumeCalcLength(str) {
    var result = internal.parsing.consumeToken(/^calc/, str);
    if (!result) {
      return;
    }

    // Consume until balanced closing parens
    var unitRegexp = /px|%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc/g;
    result = internal.parsing.consumeParenthesised(
        internal.parsing.parseDimension.bind(null, unitRegexp), result[1]);
  }

  if (!internal.parsing) {
    internal.parsing = {};
  }
  internal.parsing.consumeCalcLength = consumeCalcLength;

})(typedOM.internal, typedOMTesting);
