var expect = chai.expect;

describe("GarageJS", function() {
    
    it("is 1+1 equal 2", function() {
      expect(1+1).to.equal(2);
    });
    
    it("creates a Level with 1 free car slot and 1 free motocycle slot", function() {
        var level = new Level(1,1); 
        expect(level.countFreeCarSlot()).to.equal(1);
        expect(level.countFreeMotocycleSlot()).to.equal(1);
    });
    
    it("creates a Level with 2 car slots but park 1 car slot", function() {
        var level = new Level(2,0); 
        var vehicle = new Vehicle();
        level.addVehicle(vehicle);
        expect(level.countFreeCarSlot()).to.equal(1);
    });
    
});


