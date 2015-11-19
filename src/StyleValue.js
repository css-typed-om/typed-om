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

function StyleValue() {
}

StyleValue.prototype = {
	parse: function(property, value) {
		if (typeof value == 'string') {
			nValue = Number.parseFloat(value);
			if (nValue !== NaN) {
				return new NumberValue(nValue);
			}
			throw('not a number');
		}
	}
}

function NumberValue(value) {
	this.cssString = '' + value;
	if (typeof value == 'number') {
		this.value = value;
	}
	else if (typeof value == 'string') {
		nValue = Number.parseFloat(value);
		if (nValue !== NaN) {
			this.value = nValue;
		}
	}
	else {
		throw('not a number');
	}
}

NumberValue.prototype = Object.create(StyleValue.prototype);

