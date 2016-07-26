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
    function entriesCallback(index) {
      return [index, this._listOfReferences[index]];
    }
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        entriesCallback.bind(this));
  };

  CSSTokenStreamValue.prototype.keys = function() {
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        function(index) { return index; });
  };

  CSSTokenStreamValue.prototype.values = function() {
    function valuesCallback(index) {
      return this._listOfReferences[index];
    }
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        valuesCallback.bind(this));
  };

  scope.CSSTokenStreamValue = CSSTokenStreamValue;

})(typedOM.internal, window);
