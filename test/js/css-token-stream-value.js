suite('CSSTokenStreamValue', function() {
    var values = ['test', '12345', '1', 'a2', '2a'];
    var tokenStreamValues = new CSSTokenStreamValue(values);

    test("CSSTokenStreamValue is a CSSTokenStreamValue and CSSStyleValue", function() {
        assert.instanceOf(tokenStreamValues, CSSTokenStreamValue,
            'A new CSSTokenStreamValue should be an instance of CSSTokenStreamValue');
        assert.instanceOf(tokenStreamValues, CSSStyleValue,
            'A new CSSTokenStreamValue should be an instance of CSSStyleValue');
    });

    test("All of the values of the array are correct", function() {
        assert.strictEqual(tokenStreamValues.size(), values.length,
            'A new CSSTokenStreamValue array\'s size must be the same as its constructor');

        var it = tokenStreamValues.getIterator();
        for (let v of values) {
            assert.strictEqual(it.next().value, v,
                'A new CSSTokenStreamValue array\'s values should be the same as its constructor');
        }
    });

    test('Constructor does not throw', function() {
        assert.doesNotThrow(function() { new CSSTokenStreamValue(["12345"]); });
        assert.doesNotThrow(function() { new CSSTokenStreamValue(); });
    });

    test('Values not an array throws', function() {
        assert.throw(function() { new CSSTokenStreamValue(1); }, TypeError, 'CSSTokenStreamValue should be an array of string');
        assert.throw(function() { new CSSTokenStreamValue("123"); }, TypeError, 'CSSTokenStreamValue should be an array of string');
        assert.throw(function() { new CSSTokenStreamValue({h:10, w:5, d:4, t:"5"});}, TypeError, 'CSSTokenStreamValue should be an array of string');
    });

    test('Values not an array of string throws', function() {
        assert.throw(function() { new CSSTokenStreamValue([1]); }, TypeError, "CSSTokenStreamValue's elements should be strings");
        assert.throw(function() { new CSSTokenStreamValue(["1234", "2342", 1]); }, TypeError, "CSSTokenStreamValue's elements should be strings");
    });
});
