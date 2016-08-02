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

(function(internal) {
  var parsing = internal.parsing;

  var unitRegex = /^(deg|rad|grad|turn)/i;

  function consumeAngleUnit(string) {
    return parsing.consumeToken(unitRegex, string);
  }

  function consumeAngleValue(string) {
    var params = internal.parsing.consumeList([
        parsing.consumeNumber,
        parsing.consumeToken.bind(null, unitRegex),
    ], string);
    if (!params) {
      return null;
    }
    return [new CSSAngleValue(params[0][0], params[0][1]), params[1]]
  }

  internal.parsing.consumeAngleUnit = consumeAngleUnit;
  internal.parsing.consumeAngleValue = consumeAngleValue;
})(typedOM.internal);
