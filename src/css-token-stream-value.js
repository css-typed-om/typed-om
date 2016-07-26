(function(internal, scope) {

  function CSSTokenStreamValue(values) {
    if (values == undefined) {
      values = [];
    }
    if (!Array.isArray(values)) {
      throw new TypeError('CSSTokenStreamValue should be an array of string or CSSVariableReferenceValue');
    }
    for (var i = 0; i < values.length; i++) {
      if (typeof values[i] != 'string' && !(values[i] instanceof CSSVariableReferenceValue)) {
        throw new TypeError("CSSTokenStreamValue's elements should be string or CSSVariableReferenceValue");
      }
    }
    this._listOfReferences = values;
  }
  internal.inherit(CSSTokenStreamValue, CSSStyleValue);

  CSSTokenStreamValue.prototype[Symbol.iterator] = function() {
    return this.entries();
  };

  CSSTokenStreamValue.prototype.entries = function() {
    return internal.objects.arrayIterator(this._listOfReferences, function(key, value) { return [key, value]; });
  };

  CSSTokenStreamValue.prototype.keys = function() {
    return internal.objects.arrayIterator(this._listOfReferences, function(key, value) { return key; });
  };

  CSSTokenStreamValue.prototype.values = function() {
    return internal.objects.arrayIterator(this._listOfReferences, function(key, value) { return value; });
  };

  scope.CSSTokenStreamValue = CSSTokenStreamValue;

})(typedOM.internal, window);
