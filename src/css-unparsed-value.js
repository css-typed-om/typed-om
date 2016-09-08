(function(internal, scope) {

  function CSSUnparsedValue(values) {
    if (values == undefined) {
      values = [];
    }
    if (!Array.isArray(values)) {
      throw new TypeError('CSSUnparsedValue should be an array of string or CSSVariableReferenceValue');
    }
    for (var i = 0; i < values.length; i++) {
      if (typeof values[i] != 'string' && !(values[i] instanceof CSSVariableReferenceValue)) {
        throw new TypeError("CSSUnparsedValue's elements should be string or CSSVariableReferenceValue");
      }
    }
    this._listOfReferences = values;
  }
  internal.inherit(CSSUnparsedValue, CSSStyleValue);

  CSSUnparsedValue.prototype.keys = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return key; });
  };

  CSSUnparsedValue.prototype.values = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return value; });
  };

  CSSUnparsedValue.prototype.entries = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return [key, value]; });
  };

  scope.CSSUnparsedValue = CSSUnparsedValue;

})(typedOM.internal, window);
