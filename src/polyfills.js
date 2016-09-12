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
  // Adds non-CSS related ES6 polyfills needed for Typed OM.
  if (!Number.isFinite) {
    Number.isFinite = function(v) { return typeof v === 'number' && isFinite(v); };
  }
  if (!Number.isInteger) {
    Number.isInteger = function(v) {
      return typeof v === 'number' && isFinite(v) && Math.floor(v) === v;
    };
  }
  if (!Number.isNaN) {
    Number.isNaN = function(v) { return typeof v === 'number' && isNaN(v); };
  }
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(v) { return this.substr(0, v.length) === v; };
  }

  /**
   * Escapes the passed string for use as part of a CSS selector. This is a polyfill for browsers
   * that do not impement this feature (As of 2016-09, supported only in Chrome and Firefox).
   * @param {string|number} str to escape
   * @return {string} escaped string
   */
  function escape(str) {
    // TODO(samthor): Implement escape().
    return '' + str;
  }

  if (!scope.CSS) {
    scope.CSS = {};
  }
  if (!scope.CSS.escape) {
    scope.CSS.escape = escape;
  }

  internal.escape = escape;
})(typedOM.internal, window);
