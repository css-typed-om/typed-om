(function(internal, scope) {

  function CSSTokenStreamValue() {
    throw new TypeError('CSSTokenStreamValue cannot be instantiated.');
  }
  internal.inherit(CSSTokenStreamValue, CSSStyleValue);

  CSSTokenStreamValue.prototype.keys = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return key; });
  };

  CSSTokenStreamValue.prototype.values = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return value; });
  };

  CSSTokenStreamValue.prototype.entries = function() {
    return internal.objects.iterator(this._listOfReferences, function(key, value) { return [key, value]; });
  };

  scope.CSSTokenStreamValue = CSSTokenStreamValue;

  (function() {
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
    CSSTokenStreamValue.prototype = Object.create(scope.CSSTokenStreamValue.prototype);

    internal.CSSTokenStreamValue = CSSTokenStreamValue;
  })();

})(typedOM.internal, window);
