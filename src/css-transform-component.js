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

(function(internal, testing) {

  function CSSTransformComponent() {
  }

  CSSTransformComponent.prototype.asMatrix = function() {
    throw new TypeError('Should not be reached.');
  };

  CSSTransformComponent.prototype.is2D = function() {
    return this.asMatrix().is2D;
  };

  internal.CSSTransformComponent = CSSTransformComponent;
  if (TYPED_OM_TESTING) {
    testing.CSSTransformComponent = CSSTransformComponent;
  }

})(typedOM.internal, typedOMTesting);
