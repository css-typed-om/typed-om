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

  // These should be alphabetical order as much as possible.
  var typedOMSrc = [
      // Utility functions
      'src/util.js',
      // CSSTransformComponent and subclasses
      'src/css-transform-component.js',
      'src/css-matrix.js',
      'src/css-perspective.js',
      'src/css-rotation.js',
      'src/css-scale.js',
      'src/css-skew.js',
      'src/css-translation.js',
      // CSSStyleValue and subclasses
      'src/css-style-value.js',
      'src/internal-css-style-value.js',
      'src/css-angle-value.js',
      'src/css-color-value.js',
      'src/css-number-value.js',
      'src/css-keyword-value.js',
      'src/css-resource-value.js',
      'src/css-image-value.js',
      'src/css-token-stream-value.js',
      'src/css-transform-value.js',
      'src/css-url-image-value.js',
      'src/css-variable-reference-value.js',
      // CSSLengthValue and subclasses
      'src/css-length-value.js',
      'src/css-simple-length.js',
      'src/css-calc-length.js',
      // Depends on LengthValues
      'src/css-position-value.js',
      // Other stuff
      'src/dom-matrix-readonly.js',
      'src/style-property-map-readonly.js',
      'src/style-property-map.js',
      'src/property-dictionary.js',
      // Parsing
      'src/parsing/parsing.js',
      'src/parsing/css-color-value-parsing.js',
      'src/parsing/css-matrix-parsing.js',
      'src/parsing/css-number-value-parsing.js',
      'src/parsing/css-perspective-parsing.js',
      'src/parsing/css-rotation-parsing.js',
      'src/parsing/css-scale-parsing.js',
      'src/parsing/css-skew-parsing.js',
      'src/parsing/css-translation-parsing.js',
      'src/parsing/css-angle-value-parsing.js',
      'src/parsing/css-transform-value-parsing.js',
      'src/parsing/css-length-value-parsing.js',
      'src/parsing/css-position-value-parsing.js',
      'src/parsing/css-transform-component-parsing.js',
      // Depends on both transform component subclasses and length parsing
      'src/parsing/css-style-value-parsing.js',
  ];

  var typedOMTest = [
      'test/js/css-angle-value.js',
      'test/js/css-calc-length.js',
      'test/js/css-color-value.js',
      'test/js/css-image-value.js',
      'test/js/css-keyword-value.js',
      'test/js/css-length-value.js',
      'test/js/css-matrix.js',
      'test/js/css-number-value.js',
      'test/js/css-perspective.js',
      'test/js/css-position-value.js',
      'test/js/css-resource-value.js',
      'test/js/css-rotation.js',
      'test/js/css-scale.js',
      'test/js/css-simple-length.js',
      'test/js/css-skew.js',
      'test/js/css-style-value.js',
      'test/js/css-token-stream-value.js',
      'test/js/css-transform-component.js',
      'test/js/css-transform-value.js',
      'test/js/css-translation.js',
      'test/js/css-url-image-value.js',
      'test/js/css-variable-reference-value.js',
      'test/js/computed-style-property-map.js',
      'test/js/dom-matrix-readonly.js',
      'test/js/inline-style-property-map.js',
      'test/js/parsing.js',
      'test/js/property-dictionary.js',
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
