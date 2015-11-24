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

(function(shared, scope, testing) {

function StylePropertyMap() {}

	// Nick and Nat: You will need to decide which of these methods you want to implement.
	StylePropertyMap.prototype = {
	  append: function(property, value) {},
	  delete: function(property) {},
	  get: function(property) {},
	  getAll: function(property) {},
	  has: function(property) {},
	  set: function(property, value) {},
	  getProperties: function() {}
	}

	shared.StylePropertyMap = StylePropertyMap;
	if (TYPED_OM_TESTING)
		testing.StylePropertyMap = StylePropertyMap;

})(baseClasses, window, typedOMTesting)
