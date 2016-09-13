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

(function(internal, scope) {

  CSSResourceState = {
    UNLOADED: 'unloaded',
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error'
  };

  function isValidResourceState(str) {
    return internal.objects.any(CSSResourceState, function(type) {
      return str == type;
    });
  };

  function CSSResourceValue(state) {
    if (!isValidResourceState(state)) {
      throw new TypeError('State of a CSSResourceValue must be one of CSSResourceState');
    }
    this._state = state;
  }
  internal.inherit(CSSResourceValue, CSSStyleValue);

  scope.CSSResourceValue = CSSResourceValue;

})(typedOM.internal, window);
