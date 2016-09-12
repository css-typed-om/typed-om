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

suite('CSSTransformComponent', function() {

test('Parsing delegates correctly', function() {
  consumeTransformComponent = typedOM.internal.parsing.consumeTransformComponent;
  assert.isNotNull(consumeTransformComponent('matrix(1,2,3,4,5,6)'));
  assert.isNotNull(consumeTransformComponent('perspective(5px)'));
  assert.isNotNull(consumeTransformComponent('rotate(30deg)'));
  assert.isNotNull(consumeTransformComponent('scale(2)'));
  // assert.isNotNull(consumeTransformComponent('skew(10deg)'));
  // assert.isNotNull(consumeTransformComponent('translate(30px)'));
});

});
