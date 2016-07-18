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

  function consumeMatrix(string) {
  }

  function consumePerspective(string) {
  }

  function consumeRotation(string) {
  }

  function consumeScale(string) {
  }
  
  function consumeSkew(string) {
  }

  function consumeTranslate(string) {
  }

  var transformFunctions = {
    'matrix': consumeMatrix,
    'perspective': consumePerspective,
    'rotate': consumeRotation,
    'scale': consumeScale,
    'skew': consumeSkew,
    'translate': consumeTranslate,
  };

  function consumeTransformComponent(string) {
    for (var fn in transformFunctions) {
      if (string.startsWith(fn)) {
        return transformFunctions[fn](string);
      }
    }
    return null;
  }

  internal.parsing.consumeTransformComponent = consumeTransformComponent;
})(typedOM.internal);