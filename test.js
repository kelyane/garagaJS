var expect = chai.expect;

describe("GarageJS", function() {
    
    describe("Level", function() {

        it("is 1+1 equal 2", function() {
            expect(1+1).to.equal(2);
        });
        
        it("creates a Level with 1 free car slot and 1 free motobike slot", function() {
            var level = new Level(1,1,1); 
            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(1);
        });
        
        it("creates a Level with 3 free car slots and 0 free motobike slot", function() {
            var level = new Level(3,0,1); 
            expect(level.countFreeCarSlots()).to.equal(3);
            expect(level.countFreeMotobikeSlots()).to.equal(0);
        });
        
        it("creates a Level with 0 free car slot and 2 free motobike slots", function() {
            var level = new Level(0,2,1); 
            expect(level.countFreeCarSlots()).to.equal(0);
            expect(level.countFreeMotobikeSlots()).to.equal(2);
        });        
                
        it("creates a Level with 2 car slots and 35 motobike slots but park 1 car slot", function() {
            var level = new Level(2,35,1); 
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
            var level = new Level(2,35,1); 
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
            var level = new Level(2,35,1);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
                        
            expect(level.tryToUnparkVehicle("K - X 324")).to.be.ok;
            
            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(34);

        });
        
        it("remove 1 parked motobike", function() {
            var level = new Level(2,2,1);             
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
            var level = new Level(2,35,1);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
                        
            expect(level.tryToUnparkVehicle("X - 111")).to.not.be.ok;
            
            expect(level.countFreeCarSlots()).to.equal(0);
            expect(level.countFreeMotobikeSlots()).to.equal(34);

        });
        
        it("try to remove 2 parked cars ", function() {
            var level = new Level(2,35,1);             
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
            var level = new Level(2,35,1);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
            
            var carList = [
                {licensePlate: "ZM - 1345", type: "car", slot: 0, level: 1}, {licensePlate: "K - X 324", type: "car", slot: 1, level: 1} 
            ];
            
            expect(level.listAllParkedCars()).to.deep.equal(carList);
        });
        
        it("list all parked cars after some cars were uparked ", function() {
            var level = new Level(2,35,1);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - X 324","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
                        
            level.tryToUnparkVehicle("ZM - 1345");
            
            var carList = [
                {licensePlate: "K - X 324", type: "car", slot: 1, level: 1} 
            ];
            
            expect(level.listAllParkedCars()).to.deep.equal(carList);

            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(34);

        });
        
        it("list all parked motobikes", function() {
            var level = new Level(2,2,1);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
            level.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            level.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"));
                                  
            var carList = [
                {licensePlate: "LA - X 52", type: "motobike", slot: 2, level: 1},
                {licensePlate: "KL - K 26", type: "motobike", slot: 3, level: 1} 
            ];
            
            expect(level.listAllParkedMotobike()).to.deep.equal(carList);

            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(0);

        });
        
        it("list all parked motobikes after some motobikes were uparked ", function() {
            var level = new Level(2,2,1);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("LA - X 52","motobike"));
            level.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            level.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"));
                        
            level.tryToUnparkVehicle("LA - X 52");
            
            var carList = [
                {licensePlate: "KL - K 26", type: "motobike", slot: 3, level: 1} 
            ];
            
            expect(level.listAllParkedMotobike()).to.deep.equal(carList);

            expect(level.countFreeCarSlots()).to.equal(1);
            expect(level.countFreeMotobikeSlots()).to.equal(1);
        });
        
        it("filter by license Plate", function() {            
            var level = new Level(5,8,1);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - 1345","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("KL - X 52","motobike"));
            level.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            level.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"))
            
            var vehicleList = [
                {licensePlate: "ZM - 1345", type: "car", slot: 0, level: 1}, 
                {licensePlate: "K - 1345", type: "car", slot: 1, level: 1},
                {licensePlate: "X - 111", type: "car", slot: 2, level: 1},
                {licensePlate: "KL - X 52", type: "motobike", slot: 5, level: 1},           
                {licensePlate: "KL - K 26", type: "motobike", slot: 6, level: 1},
                {licensePlate: "LOM - 8970", type: "motobike", slot: 7, level: 1}
            ];
                        
            expect(level.filterByLicensePlate("")).to.deep.equal(vehicleList);
        });
        
        it("filter by license Plate with K", function() {            
            var level = new Level(5,8,1);             
            level.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            level.tryToParkVehicle(new Vehicle("K - 1345","car"));
            level.tryToParkVehicle(new Vehicle("X - 111","car"));
            level.tryToParkVehicle(new Vehicle("KL - X 52","motobike"));
            level.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            level.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"))
            
            var vehicleList = [
                {licensePlate: "K - 1345", type: "car", slot: 1, level: 1},
                {licensePlate: "KL - X 52", type: "motobike", slot: 5, level: 1},           
                {licensePlate: "KL - K 26", type: "motobike", slot: 6, level: 1}
            ];
                        
            expect(level.filterByLicensePlate("K")).to.deep.equal(vehicleList);
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
    
    describe("Garage", function() {
        it("creates a garage with 1 level with 10 cars slots and 5 motobikes slots", function() {
            var garage = new Garage([[10,5]]);
            
            expect(garage.countFreeCarSlots()).to.equal(10);
            expect(garage.countFreeMotobikeSlots()).to.equal(5);

        });
                
        it("creates a garage with 2 level with 1-> 10 cars and 5 motobikes slots and 2-> 3 cars and 2 motobikes slots", function() {
            var garage = new Garage([[10,5],[3,2]]);
            
            expect(garage.countFreeCarSlots()).to.equal(13);
            expect(garage.countFreeMotobikeSlots()).to.equal(7);
        });
        
        it("parks 1 car", function() {
            var garage = new Garage([[10,5],[3,2]]);
            var vehicle = new Vehicle("MX - 897","car");
            expect(garage.tryToParkVehicle(vehicle)).to.be.ok;
            
            expect(garage.countFreeCarSlots()).to.equal(12);
            expect(garage.countFreeMotobikeSlots()).to.equal(7);
        });
        
        it("unparks 1 car", function() {
            var garage = new Garage([[10,5],[3,2]]);
            garage.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("K - X 324","car"));
            garage.tryToParkVehicle(new Vehicle("X - 111","car"));
            garage.tryToParkVehicle(new Vehicle("LA - X 52","motobike"))
                        
            expect(garage.tryToUnparkVehicle("ZM - 1345")).to.be.ok;
            
            expect(garage.countFreeCarSlots()).to.equal(11);
            expect(garage.countFreeMotobikeSlots()).to.equal(6);
        });
        
        it("filter by license Plate", function() {            
            var garage = new Garage([[1,5],[3,2]]);
             
            garage.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("K - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("X - 111","car"));
            garage.tryToParkVehicle(new Vehicle("KL - X 52","motobike"));
            garage.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            garage.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"))
            
            var vehicleList = [
                {licensePlate: "ZM - 1345", type: "car", slot: 0, level: 1},           
                {licensePlate: "KL - X 52", type: "motobike", slot: 1, level: 1},           
                {licensePlate: "KL - K 26", type: "motobike", slot: 2, level: 1},
                {licensePlate: "LOM - 8970", type: "motobike", slot: 3, level: 1},
                {licensePlate: "K - 1345", type: "car", slot: 0, level: 2},
                {licensePlate: "X - 111", type: "car", slot: 1, level: 2}
            ];
                        
            expect(garage.filterByLicensePlate("")).to.deep.equal(vehicleList);
        });
        
        it("filter by license Plate with M", function() {            
            var garage = new Garage([[1,5],[3,2]]);
             
            garage.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("K - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("X - 111","car"));
            garage.tryToParkVehicle(new Vehicle("KL - X 52","motobike"));
            garage.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            garage.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"))
            
            var vehicleList = [
                {licensePlate: "ZM - 1345", type: "car", slot: 0, level: 1},           
                {licensePlate: "LOM - 8970", type: "motobike", slot: 3, level: 1}
            ];
                        
            expect(garage.filterByLicensePlate("M")).to.deep.equal(vehicleList);
        });
        
        it("filter by level 1", function() {            
            var garage = new Garage([[1,5],[3,2]]);
             
            garage.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("K - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("X - 111","car"));
            garage.tryToParkVehicle(new Vehicle("KL - X 52","motobike"));
            garage.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            garage.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"))
            
            var vehicleList = [
                {licensePlate: "ZM - 1345", type: "car", slot: 0, level: 1},           
                {licensePlate: "KL - X 52", type: "motobike", slot: 1, level: 1},           
                {licensePlate: "KL - K 26", type: "motobike", slot: 2, level: 1},
                {licensePlate: "LOM - 8970", type: "motobike", slot: 3, level: 1}
            ];
                        
            expect(garage.filterByLevel(1)).to.deep.equal(vehicleList);
        });
        
        it("filter by cars", function() {            
            var garage = new Garage([[1,5],[3,2]]);
             
            garage.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("K - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("X - 111","car"));
            garage.tryToParkVehicle(new Vehicle("KL - X 52","motobike"));
            garage.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            garage.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"))
            
            var vehicleList = [
                {licensePlate: "ZM - 1345", type: "car", slot: 0, level: 1}, 
                {licensePlate: "K - 1345", type: "car", slot: 0, level: 2},
                {licensePlate: "X - 111", type: "car", slot: 1, level: 2}
            ];
                        
            expect(garage.filterByCars()).to.deep.equal(vehicleList);
        });
        
        it("filter by motobikes", function() {            
            var garage = new Garage([[1,5],[3,2]]);
             
            garage.tryToParkVehicle(new Vehicle("ZM - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("K - 1345","car"));
            garage.tryToParkVehicle(new Vehicle("X - 111","car"));
            garage.tryToParkVehicle(new Vehicle("KL - X 52","motobike"));
            garage.tryToParkVehicle(new Vehicle("KL - K 26","motobike"));
            garage.tryToParkVehicle(new Vehicle("LOM - 8970","motobike"))
            
            var vehicleList = [
                {licensePlate: "KL - X 52", type: "motobike", slot: 1, level: 1},           
                {licensePlate: "KL - K 26", type: "motobike", slot: 2, level: 1},
                {licensePlate: "LOM - 8970", type: "motobike", slot: 3, level: 1}
            ];
                        
            expect(garage.filterByMotobikes()).to.deep.equal(vehicleList);
        });
        
        
        
                
    });
    
});


