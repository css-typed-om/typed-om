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

  CSSTokenStreamValue.prototype.keys = function() {
    return internal.objects.iterator(this._listOfReferences, "key");
  }

  CSSTokenStreamValue.prototype.values = function() {
    return internal.objects.iterator(this._listOfReferences, "value");
  }

  CSSTokenStreamValue.prototype.entries = function() {
    return internal.objects.iterator(this._listOfReferences, "[key, value]");
  }

  scope.CSSTokenStreamValue = CSSTokenStreamValue;

}) (typedOM.internal, window);
