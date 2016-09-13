(function(internal, scope) {

  function CSSUnparsedValue(values) {
    throw new TypeError('CSSUnparsedValue cannot be instantiated.');
  }
  internal.inherit(CSSUnparsedValue, CSSStyleValue);

  CSSUnparsedValue.prototype[Symbol.iterator] = function() {
    return this.entries();
  };

  CSSUnparsedValue.prototype.entries = function() {
    function entriesCallback(index) {
      return [index, this._listOfReferences[index]];
    }
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        entriesCallback.bind(this));
  };

  CSSUnparsedValue.prototype.keys = function() {
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        function(index) { return index; });
  };

  CSSUnparsedValue.prototype.values = function() {
    function valuesCallback(index) {
      return this._listOfReferences[index];
    }
    return internal.objects.arrayIterator(
        this._listOfReferences.length,
        valuesCallback.bind(this));
  };

  scope.CSSUnparsedValue = CSSUnparsedValue;

  (function() {
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
    CSSUnparsedValue.prototype = Object.create(scope.CSSUnparsedValue.prototype);

    internal.CSSUnparsedValue = CSSUnparsedValue;
  })();

})(typedOM.internal, window);
