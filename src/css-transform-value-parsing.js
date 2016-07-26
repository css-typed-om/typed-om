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

  function consumeTransformValue(string) {
    var components = [];
    while (true) {
      var result = internal.parsing.consumeTransformComponent(string);
      if (!result) {
        break;
      }
      components.push(result[0]);
      string = result[1];
    } 
    if (!components.length) {
      return null;
    }
    return [new CSSTransformValue(components), string];
  }

  internal.parsing.consumeTransformValue = consumeTransformValue;
})(typedOM.internal);
