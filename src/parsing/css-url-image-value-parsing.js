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

  function consumeURLImageValue(string) {
    // need to remove 'url("' and '")'
    var temp = string.substring(5);
    var clean = temp.substr(0, temp.length - 2);
    return [[new CSSURLImageValue(clean)]];
  }

  internal.parsing.consumeURLImageValue = consumeURLImageValue;
})(typedOM.internal);
