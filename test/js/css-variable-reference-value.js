suite('CSSVariableReferenceValue', function() {
    test("The 'variable' attribute is correct", function() {
        var expected = 'anything';
        var referenceValue = new CSSVariableReferenceValue(expected);
        assert.instanceOf(referenceValue, CSSVariableReferenceValue,
            'A new CSSVariableReferenceValue should be an instance of CSSVariableReferenceValue');
        assert.strictEqual(referenceValue.variable, expected,
            'A new CSSVariableReferenceValue variable should be the same as its constructor');
    });

    test('Constructor does not throw', function() {
        assert.doesNotThrow(function() { new CSSVariableReferenceValue("12345"); });  
    })
});
