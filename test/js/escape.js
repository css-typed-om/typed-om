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

suite('CSS.escape polyfill', function() {
  var escape = typedOM.internal.escape;

  test('Test invalid usage', function() {
    assert.throws(function() { CSS.escape(); }, TypeError,
        /^Failed to execute 'escape' on 'CSS': 1 argument required, but only 0 present\.$/);
    assert.equal('null', CSS.escape(null));
    assert.equal('\\[object\\ Object\\]', CSS.escape({}));
  });

  test('Test escaping', function() {
    assert.equal('', escape(''));

    assert.equal('\\-', escape('-'), 'escaped single dash');
    assert.equal('-\\30 ', escape('-0'), 'escaped number after dash');
    assert.equal('-\\31 abc', escape('-1abc'), 'escaped number and string after dash');
    assert.equal('\\32 abc', escape('2abc'), 'escaped initial number');
    assert.equal('abc3', escape('abc3'), 'trailing number not escaped');

    assert.equal('abc\\ def', escape('abc def'), 'escaped space');

    assert.equal('long\\`string', escape('long`string'), 'escaped non-word char');

    assert.equal('√π', escape('√π'), 'high code point not escaped');
  });

  test('Test CSS strings', function() {
    assert.equal('border-radius', escape('border-radius'));
    assert.equal('-webkit-transform', escape('-webkit-transform'));
    assert.equal('\\30 \\ 4px\\ 8px\\ rgba\\(255\\,\\ 255\\,\\ 255\\,\\ 0\\.25\\)',
        escape('0 4px 8px rgba(255, 255, 255, 0.25)'));
  });
});
