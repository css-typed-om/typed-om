(function(internal, scope) {

    function CSSVariableReferenceValue(variable) {
        if (typeof variable != 'string') {
            throw new TypeError('Variable of CSSVariableReferenceValue must be a string');
        }
        this.variable = variable;
    }

    scope.CSSVariableReferenceValue = CSSVariableReferenceValue;
    
}) (typedOM.internal, window);
