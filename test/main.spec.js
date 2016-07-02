describe("The Starter App", function() {

  it("it should work", function() {
    chai.assert.isArray([]);
  });

  it("it should fail", function() {
    chai.assert.isArray(8);
  });

});
