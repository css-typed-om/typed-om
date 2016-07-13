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
        this.listOfReferences = values;
    }

    internal.inherit(CSSTokenStreamValue, CSSStyleValue);

    CSSTokenStreamValue.prototype.size = function() {
        return this.listOfReferences.length;
    }

    CSSTokenStreamValue.prototype.referenceAtIndex = function(index) {
        return this.listOfReferences[index];
    }

    CSSTokenStreamValue.prototype.keys = function() {
        var nextIndex = 0;
        var values = this.listOfReferences;

        return {
            next: function() {
                return nextIndex < values.length ?
                    { done: false, value: nextIndex++ } :
                    { done: true, value: undefined };
            }
        }
    }

    CSSTokenStreamValue.prototype.values = function() {
        var nextIndex = 0;
        var values = this.listOfReferences;

        return {
           next: function() {
               return nextIndex < values.length ?
                   { done: false, value: values[nextIndex++] } :
                   { done: true, value: undefined};
           }
        }
    }

    CSSTokenStreamValue.prototype.entries = function() {
        var nextIndex = 0;
        var values = this.listOfReferences;

        return {
            next: function() {
                return nextIndex < values.length ?
                    { done: false, value: [nextIndex, values[nextIndex++]] } :
                    { done: true, value: undefined};
            }
        }
    }

    scope.CSSTokenStreamValue = CSSTokenStreamValue;

}) (typedOM.internal, window);
