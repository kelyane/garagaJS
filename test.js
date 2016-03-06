var expect = chai.expect;

describe("GarageJS", function() {
    
    describe("Level", function() {

        it("is 1+1 equal 2", function() {
            expect(1+1).to.equal(2);
        });
        
        it("creates a Level with 1 free car slot and 1 free motobike slot", function() {
            var level = new Level(1,1); 
            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(1);
        });
        
        it("creates a Level with 3 free car slots and 0 free motobike slot", function() {
            var level = new Level(3,0); 
            expect(level.countFreeCarSlots()).to.equal(3);
            expect(level.countFreeMotobikeSlots()).to.equal(0);
        });
        
        it("creates a Level with 0 free car slot and 2 free motobike slots", function() {
            var level = new Level(0,2); 
            expect(level.countFreeCarSlots()).to.equal(0);
            expect(level.countFreeMotobikeSlots()).to.equal(2);
        });        
                
        it("creates a Level with 2 car slots and 35 motobike slots but park 1 car slot", function() {
            var level = new Level(2,35); 
            var vehicle = new Vehicle("MX - 897","car");
            expect(level.tryToParkVehicle(vehicle)).to.be.ok;
            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(35);

        });
        
        it("creates a Level with 2 car slots and 35 motobike slots but park 1 motobike slot", function() {
            var level = new Level(2,35); 
            var vehicle = new Vehicle("LA - X 523","motobike");
            expect(level.tryToParkVehicle(vehicle)).to.be.ok;
            expect(level.countFreeCarSlots()).to.equal(2);
            expect(level.countFreeMotobikeSlots()).to.equal(34);

        });
        
        it("creates a Level with 2 car slots and 35 motobike slots but park 3 car slots", function() {
            var level = new Level(2,35); 
            var vehicle1 = new Vehicle("ZM - 1345","car");
            var vehicle2 = new Vehicle("K - X 324","car");
            var vehicle3 = new Vehicle("X - 111","car");
            
            expect(level.tryToParkVehicle(vehicle1)).to.be.ok;
            expect(level.tryToParkVehicle(vehicle2)).to.be.ok;
            expect(level.tryToParkVehicle(vehicle3)).to.not.be.ok;

            expect(level.countFreeCarSlots()).to.equal(0);
            expect(level.countFreeMotobikeSlots()).to.equal(35);

        });
        
        it("remove 1 parked car", function() {
            var level = new Level(2,35);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
                        
            expect(level.tryToUnparkVehicle("K - X 324")).to.be.ok;
            
            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(34);

        });
        
        it("remove 1 parked motobike", function() {
            var level = new Level(2,2);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
            level.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            level.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"));
                        
            expect(level.tryToUnparkVehicle("LA - X 52")).to.be.ok;
            
            expect(level.countFreeCarSlots()).to.equal(0);
            expect(level.countFreeMotobikeSlots()).to.equal(1);

        });
        
        it("try to remove 1 unparked car ", function() {
            var level = new Level(2,35);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
                        
            expect(level.tryToUnparkVehicle("X - 111")).to.not.be.ok;
            
            expect(level.countFreeCarSlots()).to.equal(0);
            expect(level.countFreeMotobikeSlots()).to.equal(34);

        });
        
        it("try to remove 2 parked cars ", function() {
            var level = new Level(2,35);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
                        
            expect(level.tryToUnparkVehicle("ZM - 1345")).to.be.ok;
            expect(level.tryToUnparkVehicle("K - X 324")).to.be.ok;

            expect(level.countFreeCarSlots()).to.equal(2);
            expect(level.countFreeMotobikeSlots()).to.equal(34);

        });

        it("list all parked cars", function() {
            var level = new Level(2,35);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
            
            var carList = [
                {licensePlate: "ZM - 1345", type: "car", slot: 0}, {licensePlate: "K - X 324", type: "car", slot: 1} 
            ];
            
            expect(level.listAllParkedCars()).to.deep.equal(carList);
        });
        
        it("list all parked cars after some cars were uparked ", function() {
            var level = new Level(2,35);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
                        
            level.tryToUnparkVehicle("ZM - 1345");
            
            var carList = [
                {licensePlate: "K - X 324", type: "car", slot: 1} 
            ];
            
            expect(level.listAllParkedCars()).to.deep.equal(carList);

            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(34);

        });
        
        it("list all parked motobikes", function() {
            var level = new Level(2,2);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
            level.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            level.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"));
                                  
            var carList = [
                {licensePlate: "LA - X 52", type: "motobike", slot: 2},
                {licensePlate: "KL - K 26", type: "motobike", slot: 3} 
            ];
            
            expect(level.listAllParkedMotobike()).to.deep.equal(carList);

            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(0);

        });
        
        it("list all parked motobikes after some motobikes were uparked ", function() {
            var level = new Level(2,2);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
            level.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            level.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"));
                        
            level.tryToUnparkVehicle("LA - X 52");
            
            var carList = [
                {licensePlate: "KL - K 26", type: "motobike", slot: 3} 
            ];
            
            expect(level.listAllParkedMotobike()).to.deep.equal(carList);

            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(1);

        });
        
    });
    
    describe("Vehicle", function() {
        it("creates a car", function() {
            var vehicle = new Vehicle("MX - 897","car");
            expect(vehicle.getLicensePlate()).to.equal("MX - 897");
            expect(vehicle.getType()).to.equal("car");
        });
    
        it("creates a motobike", function() {
            var vehicle = new Vehicle("LA - X 523","motobike");
            expect(vehicle.getLicensePlate()).to.equal("LA - X 523");
            expect(vehicle.getType()).to.equal("motobike");
        });
    });
    
});


