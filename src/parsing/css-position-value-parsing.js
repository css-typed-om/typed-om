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

  function parsePositionValue(str) {
    var params = internal.parsing.consumeRepeated(
        internal.parsing.consumeLengthValue,
        null, // separator not required due to use of consumeTrimmed.
        str);
    if (!params || params[0].length != 2) {
      return null;
    }
    var lengths = params[0];
    return [new CSSPositionValue(lengths[0], lengths[1]), params[1]];
  }

  internal.parsing.parsePositionValue = parsePositionValue;
})(typedOM.internal);
