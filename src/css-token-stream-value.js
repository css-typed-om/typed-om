(function(internal, scope) {

    function CSSTokenStreamValue(values) {
        if (values == undefined) {
            values = [];
        }
        if (!Array.isArray(values)) {
            throw new TypeError('CSSTokenStreamValue should consist of an array of strings');
        }
        this.values = values;
        // TODO: may need change like 
        //       https://drafts.css-houdini.org/css-typed-om/#tokenstreamvalue-normalization
    }

    CSSTokenStreamValue.prototype.size = function() {
        return this.values.length;
    }

    CSSTokenStreamValue.prototype.referenceAtIndex = function(index) {
        return this.values[index];
    }

    scope.CSSTokenStreamValue = CSSTokenStreamValue;

}) (typedOM.internal, window);
