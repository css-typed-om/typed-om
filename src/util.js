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

  function inherit(childCtor, parentCtor) {
    childCtor.prototype = Object.create(parentCtor.prototype);
    childCtor.prototype.constructor = childCtor;
  }

  function foreach(obj, callback, opt_this) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      callback.call(opt_this, obj[key], key, obj);
    }
  }

  function any(obj, callback, opt_this) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (callback.call(opt_this, obj[key], key, obj)) {
        return true;
      }
    }
    return false;
  }

  internal.objects = {};
  internal.objects.foreach = foreach;
  internal.objects.any = any;

  internal.inherit = inherit;

  if (TYPED_OM_TESTING) {
    testing.objects = internal.objects;
  }

})(typedOM.internal, typedOMTesting)
