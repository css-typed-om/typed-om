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

  /*
   * Calls the callback for each value in the object.
   * @param {!Object} object: The object to iterate over.
   * @param {Function} callback: A function to be called for each value in the
   *   object. It should be specified as function(value, key, inputObject).
   *   Its return value is ignored.
   * @param {Object} opt_this: The value that will appear as 'this' within the
   *   callback.
   */
  function foreach(object, callback, opt_this) {
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      callback.call(opt_this, object[key], key, object);
    }
  }

  /*
   * Calls the callback on each value in object until a callback returns true.
   * @param {!Object} object: The object to iterate over.
   * @param {Function} callback: A function to be called for each value in the
   *   object. It should be specified as function(value, key, inputObject). If
   *   any callback returns true, this function will exit early without calling
   *   the callback on the rest of the values.
   * @param {Object} opt_this: The value that will appear as 'this' within the
   *   callback.
   */
  function any(object, callback, opt_this) {
    var keys = Object.keys(object);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (callback.call(opt_this, object[key], key, object)) {
        return true;
      }
    }
    return false;
  }


  /*
   * Get iterator of object which returns a { done: false, value: expression }
   *   if it has not reached the end of the object, or otherwise it returns
   *   { done: true, value: undefined }.
   * @param {!Object} object: The object to iterate over.
   * @param {String} expression: The expression that will be executed if the
   *   iterator has not reached the end of the array. expression contains the
   *   format that we want to get as the value.
   */

  function iterator(object, expression) {
    if (!(this instanceof arguments.callee))
      return new arguments.callee(object, expression);
    var index = 0;

    this.next = function next() {
      if (index < object.length) {
          var key = index;
          var value = object[index++];
          return { done: false, value: eval(expression) };
      } else return { done: true, value: undefined };
    };
  }

  internal.objects.foreach = foreach;
  internal.objects.any = any;
  internal.objects.iterator = iterator;

  internal.inherit = inherit;
})(typedOM.internal);
