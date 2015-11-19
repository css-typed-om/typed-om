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