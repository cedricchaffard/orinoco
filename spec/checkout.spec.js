describe("Panier", function() {

    it("should remove an item from my cart", function() {
        //Preparer le test (Mock, Spy..)
        localStorage.setItem('cart', { 'AAAAAABBBBBB': {quantity: 2} })

        //Execute le test
        removeItem('AAAAAABBBBBB')

        // Assertion
        expect(localStorage.getItem('cart')).toEqual(null)
    });

    it("should compute the total price per teddy", function() {

        //Execute le test
        const result = getTotalPricePerTeddy(2, 14)

        // Assertion
        expect(result).toEqual('28,00€');
    });
});
