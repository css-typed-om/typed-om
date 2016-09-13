(function(internal, scope) {

  function CSSVariableReferenceValue(variable, fallback) {
    if (arguments.length != 2) {
      throw new TypeError('CSSVariableReferenceValue constructor should get two parameters');
    }
    if (typeof variable != 'string') {
      throw new TypeError('Variable of CSSVariableReferenceValue must be a string');
    }
    if ((fallback !== undefined) && !(fallback instanceof CSSUnparsedValue)) {
      throw new TypeError('Fallback of CSSVariableReferenceValue must be a CSSUnparsedValue');
    }
    this.variable = variable;
    this.fallback = fallback;
  }

  scope.CSSVariableReferenceValue = CSSVariableReferenceValue;

})(typedOM.internal, window);
