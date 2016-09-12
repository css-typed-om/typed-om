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
   *
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
   *
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
   * Gets an iterator for an object.
   *
   * An iterator returns { done: false, value: expression } if it has not
   *   reached the end of the array-like object, or otherwise it returns
   *   { done: true, value: undefined }.
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
   * for more information about iterators.
   * @param {!Array} keys: An array of keys to iterate over.
   * @param {Function} callback: A function that returns the value for the
   *   iterator. The function takes a single argument: the current key and
   *   should return one of the following: key, value, or an array containing
   *   one or more of (key, value). Generally, key is used for the keys()
   *   method, value is used for the values() method, and [key, value] for
   *   the entries() method.
   */
  function iterator(keys, callback) {
    var index = 0;
    function _next() {
      if (index < keys.length) {
        var key = keys[index++];
        return { done: false, value: callback(key) };
      } else {
        return { done: true, value: undefined };
      }
    }
    var result = {
      next: _next,
    };
    result[Symbol.iterator] = function() { return result; };
    return result;
  }

  /*
   * Gets an iterator for array-like object.
   *
   * @param {number} length: The length of the array object
   * @param {Function} callback: A function that returns the value for the
   *   iterator. The function takes a single argument: the current index, and
   *   should return one of the following: index, value, or an array containing
   *   one or more of (index, value). Generally, index is used for the keys()
   *   method, value is used for the values() method, and [index, value] for
   *   the entries() method.
   */
  function arrayIterator(length, callback) {
    return iterator([...Array(length).keys()], callback);
  }

  /*
   * Execute a list of functions
   * @param {!List} functions: List of functions to call.
   * @param {Object} opt_this: The value that will appear as 'this' within the
   *   functions.
   */
  function chain(functions, opt_this) {
    return function() {
      for (var i = 0; i < functions.length; ++i) {
        functions[i].call(opt_this);
      }
    };
  }

  internal.objects.foreach = foreach;
  internal.objects.any = any;
  internal.objects.iterator = iterator;
  internal.objects.arrayIterator = arrayIterator;
  internal.inherit = inherit;
  internal.objects.chain = chain;

})(typedOM.internal);
