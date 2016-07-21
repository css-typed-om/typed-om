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

(function(internal) {
  var parsing = internal.parsing;

  function consumePerspective(string) {
    var params = parsing.consumeList([
        parsing.ignore(parsing.consumeToken.bind(null, /^perspective/i)),
        parsing.ignore(parsing.consumeToken.bind(null, /^\(/)),
        parsing.consumeSimpleLength,
        parsing.ignore(parsing.consumeToken.bind(null, /^\)/))
    ], string);
    if (!params) {
      return null;
    }

    var length = params[0][0];
    var remaining = params[1];

    if (length.type !== 'px') {
      return null;
    }

    return [new CSSPerspective(length), remaining];
  }

  internal.parsing.consumePerspective = consumePerspective;

})(typedOM.internal);
