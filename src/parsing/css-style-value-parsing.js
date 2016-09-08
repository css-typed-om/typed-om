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

  var parsers = {};
  parsers['CSSNumberValue'] = internal.parsing.consumeNumberValue;
  parsers['CSSLengthValue'] = internal.parsing.consumeLengthValue;
  parsers['CSSTransformValue'] = internal.parsing.consumeTransformValue;
  parsers['CSSURLImageValue'] = internal.parsing.consumeURLImageValue;

  function consumeKeyword(property, string) {
    var consumed = internal.parsing.consumeToken(/^[a-z_]+[a-z0-9_-]*/i, string);
    if (!consumed) {
      return null;
    }
    if (!internal.propertyDictionary().isValidKeyword(property, consumed[0])) {
      return null;
    }
    return [new CSSKeywordValue(consumed[0]), consumed[1]];
  }

  function consumeStyleValue(property, string) {
    if (!internal.propertyDictionary().isSupportedProperty(property)) {
      // TODO: How do custom properties play into this?
      return null;
    }

    var consumedKeyword = consumeKeyword(property, string);
    if (consumedKeyword) {
      return consumedKeyword;
    }

    var supportedStyleValues = internal.propertyDictionary().supportedStyleValues(property);
    for (var i = 0; i < supportedStyleValues.length; i++) {
      var consumer = parsers[supportedStyleValues[i].name];
      if (!consumer) {
        continue;
      }
      var parsed = consumer(string);
      if (parsed) {
        return parsed;
      }
    }
    return null;
  }

  function consumeStyleValueOrStyleValueList(property, string) {
    var propertyDictionary = internal.propertyDictionary();
    if (propertyDictionary.isListValuedProperty(property)) {
      var separator = propertyDictionary.listValueSeparator(property);
      return internal.parsing.consumeRepeated(consumeStyleValue.bind(null, property), new RegExp('^' + separator), string);
    } else {
      return consumeStyleValue(property, string);
    }
  }

  internal.parsing.consumeStyleValueOrStyleValueList = consumeStyleValueOrStyleValueList;

})(typedOM.internal);
