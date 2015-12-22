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

(function() {

  var scopeSrc = [
      'src/scope.js'
  ];

  var typedOMSrc = [
      'src/util.js',
      'src/parsing.js',
      'src/style-value.js',
      'src/number-value.js',
      'src/keyword-value.js',
      'src/length-value.js',
      'src/simple-length.js',
      'src/calc-length.js',
      'src/position-value.js',
      'src/transform-component.js',
      'src/matrix.js',
      'src/perspective.js',
      'src/rotation.js',
      'src/scale.js',
      'src/skew.js',
      'src/translation.js',
      'src/transform-value.js',
      'src/style-property-map-readonly.js',
      'src/style-property-map.js',
      'src/property-dictionary.js'
  ];

  var typedOMTest = [
      'test/js/number-value.js',
      'test/js/keyword-value.js',
      'test/js/length-value.js',
      'test/js/simple-length.js',
      'test/js/position-value.js',
      'test/js/calc-length.js',
      'test/js/transform-component.js',
      'test/js/matrix.js',
      'test/js/perspective.js',
      'test/js/rotation.js',
      'test/js/scale.js',
      'test/js/skew.js',
      'test/js/translation.js',
      'test/js/transform-value.js',
      'test/js/computed-style-property-map.js',
      'test/js/inline-style-property-map.js',
      'test/js/property-dictionary.js'
  ];

  // This object specifies the source and test files for different build targets.
  var targetConfig = {
    'typed-om': {
      scopeSrc: scopeSrc,
      typedOMSrc: typedOMSrc,
      src: scopeSrc.concat(typedOMSrc),
      test: typedOMTest,
    },
  };

  if (typeof module != 'undefined') {
    module.exports = targetConfig;
  } else {
    window.typedOMTargetConfig = targetConfig;
  }
})();
