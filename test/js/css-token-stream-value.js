suite('CSSTokenStreamValue', function() {
    test("All of the values of the array are correct", function() {
        var values = ['test', '12345', '1', 'a2', '2a'];
        var tokenStreamValues = new CSSTokenStreamValue(values);
        assert.instanceOf(tokenStreamValues, CSSTokenStreamValue,
            'A new CSSTokenStreamValue should be an instance of CSSTokenStreamValue');
        assert.strictEqual(tokenStreamValues.size(), values.length,
            'A new CSSTokenStreamValue array\'s size must be the same as its constructor');
        for (var i = 0; i < values.length; ++i) {
            assert.strictEqual(tokenStreamValues.referenceAtIndex(i), values[i],
                'A new CSSTokenStreamValue array\'s values should be the same as its constructor');
        }
    });

    test('Constructor does not throw', function() {
        assert.doesNotThrow(function() { new CSSTokenStreamValue(["12345"]); });
        assert.doesNotThrow(function() { new CSSTokenStreamValue(); });
    })
});
