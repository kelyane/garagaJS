var expect = chai.expect;

describe("GarageJS", function() {
    
    describe("Level", function() {

        it("is 1+1 equal 2", function() {
            expect(1+1).to.equal(2);
        });
        
        it("creates a Level with 1 free car slot and 1 free motocycle slot", function() {
            var level = new Level(1,1); 
            expect(level.countFreeCarSlot()).to.equal(1);
            expect(level.countFreeMotocycleSlot()).to.equal(1);
        });
        
        it("creates a Level with 3 free car slots and 0 free motocycle slot", function() {
            var level = new Level(3,0); 
            expect(level.countFreeCarSlot()).to.equal(3);
            expect(level.countFreeMotocycleSlot()).to.equal(0);
        });
        
        it("creates a Level with 0 free car slot and 2 free motocycle slots", function() {
            var level = new Level(0,2); 
            expect(level.countFreeCarSlot()).to.equal(0);
            expect(level.countFreeMotocycleSlot()).to.equal(2);
        });
        
        /*it("creates a Level with 2 car slots but park 1 car slot", function() {
            var level = new Level(2,0); 
            var vehicle = new Vehicle();
            level.addVehicle(vehicle);
            expect(level.countFreeCarSlot()).to.equal(1);
        });*/
    });
    
    describe("Vehicle", function() {
        it("creates a car", function() {
            var vehicle = new Vehicle("MX - 897","car");
            expect(vehicle.getLicensePlate()).to.equal("MX - 897");
            expect(vehicle.getType()).to.equal("car");
        });
    
        it("creates a motocycle", function() {
            var vehicle = new Vehicle("LA - X 523","motocycle");
            expect(vehicle.getLicensePlate()).to.equal("LA - X 523");
            expect(vehicle.getType()).to.equal("motocycle");
        });
    });
    
});


