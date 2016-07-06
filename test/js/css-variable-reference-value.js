suite('CSSVariableReferenceValue', function() {
    test("The 'variable' attribute is correct", function() {
        var expected = 'anything';
        var temp = new CSSVariableReferenceValue(expected);
        assert.instanceOf(temp, CSSVariableReferenceValue,
            'A new CSSVariableReferenceValue should be an instance of CSSVariableReferenceValue');
        assert.strictEqual(temp.variable, expected,
            'A new CSSVariableReferenceValue variable should be the same as its constructor');
    });

    test('Constructor does not throw', function() {
        var expected = '12345';
        var temp;
        assert.doesNotThrow(function() { temp = new CSSVariableReferenceValue(expected); });  
    })
});