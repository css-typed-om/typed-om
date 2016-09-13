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
    if (str === undefined) {
      throw new TypeError("Failed to execute 'escape' on 'CSS': 1 argument required, " +
          "but only 0 present.");
    }

    str = '' + str;
    var len = str.length;
    var escaped = '';

    // This follows the algorithm at-
    //   https://drafts.csswg.org/cssom/#serialize-an-identifier

    if (str == '-') {
      return '\\-';  // special-case single dash
    }

    for (var i = 0; i < len; ++i) {
      var code = str.charCodeAt(i);
      if (code == 0) {
        escaped += '\uFFFD';
      } else if (code == 0x007f || (code >= 0x001 && code <= 0x001f)) {
        // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
        excaped += '\\' + code.toString(16) + ' ';
      } else if (code >= 0x0080 || code == 0x002d || code == 0x005f ||
          (code >= 0x0041 && code <= 0x005a) ||
          (code >= 0x0061 && code <= 0x007a)) {
        // the character itself
        escaped += str.charAt(i);
      } else if (code >= 0x0030 && code <= 0x0039) {
        if (i == 0) {
          escaped += '\\' + code.toString(16) + ' ';  // initial number as code point
        } else if (i == 1 && str.charCodeAt(0) == 0x002d) {
          escaped += '\\' + code.toString(16) + ' ';  // dash (0x002d) then number as code point
        } else {
          escaped += str.charAt(i);  // the character itself
        }
      } else {
        // https://drafts.csswg.org/cssom/#escape-a-character
        escaped += '\\' + str.charAt(i);
      }
    }

    return escaped;
  }

  if (!scope.CSS) {
    scope.CSS = {};
  }
  if (!scope.CSS.escape) {
    scope.CSS.escape = escape;
  }

  internal.escape = escape;
})(typedOM.internal, window);
