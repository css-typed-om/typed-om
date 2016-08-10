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

var TYPED_OM_TESTING = false;
var typedOMIncludePath = typedOMIncludePath || 'typed-om';
var loadScript = function(sourceFile) {
  return new Promise(function(resolve, reject) {
    var s = document.createElement('script');
    s.src = typedOMIncludePath + '/' + sourceFile;
    s.onload = function() {
      resolve();
    };
    document.head.appendChild(s);
  });
};
var loadScripts = function(sourceFiles) {
  sourceFiles.reduce(function(prev, cur) {
    return prev.then(function() {
      return loadScript(cur);
    });
  }, Promise.resolve());
}

loadScripts(['target-config.js', 'target-loader.js']);
