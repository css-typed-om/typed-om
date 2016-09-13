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

suite('CSSResourceValue', function() {
  test('CSSResourceValue is a CSSResourceValue and a CSSStyleValue', function() {
    assert.instanceOf(new CSSResourceValue('loading'), CSSResourceValue);
    assert.instanceOf(new CSSResourceValue('loading'), CSSStyleValue);
  });

  test('Constructor only accepts a string of CSSResourceState', function() {
    var stateErr = /^State of a CSSResourceValue must be one of CSSResourceState$/;
    assert.throws(function() { new CSSResourceValue(); }, TypeError, stateErr);
    assert.throws(function() { new CSSResourceValue(1); }, TypeError, stateErr);
    assert.throws(function() { new CSSResourceValue([1, 2]); }, TypeError, stateErr);
    assert.throws(function() { new CSSResourceValue('undefined'); }, TypeError, stateErr);
  });
});
