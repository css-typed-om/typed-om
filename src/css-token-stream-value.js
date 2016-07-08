(function(internal, scope) {

    function CSSTokenStreamValue(values) {
        if (values == undefined) {
            values = [];
        }
        if (!Array.isArray(values)) {
            throw new TypeError('CSSTokenStreamValue should be an array of string');
        }
        for (var i = 0; i < values.length; i++) {
            if (typeof values[i] != 'string') {
                throw new TypeError("CSSTokenStreamValue's elements should be strings");
            }
        }
        this.values = values;
        // TODO: may need to be changed like 
        //       https://drafts.css-houdini.org/css-typed-om/#tokenstreamvalue-normalization
    }

    internal.inherit(CSSTokenStreamValue, CSSStyleValue);

    CSSTokenStreamValue.prototype.size = function() {
        return this.values.length;
    }

    CSSTokenStreamValue.prototype.referenceAtIndex = function(index) {
        return this.values[index];
    }

    CSSTokenStreamValue.prototype.getIterator = function(){
        var nextIndex = 0;
        var values = this.values;

        return {
           next: function(){
               return nextIndex < values.length ?
                   {value: values[nextIndex++], done: false} :
                   {done: true};
           }
        }
    }

    scope.CSSTokenStreamValue = CSSTokenStreamValue;

}) (typedOM.internal, window);
