"use strict";

class Level {
    
    constructor(carSlots,motocycleSlots){
        this.carSlots = carSlots;
        this.motocycleSlots = motocycleSlots;
    }
    
    countFreeCarSlot(){
        return this.carSlots;
    }
    
    countFreeMotocycleSlot(){
        return this.motocycleSlots;
    }
    
    addVehicle(Vehicle vehicle){
        
    }
}

class Vehicle {
    
    constructor(licensePlate, type){
        this.licensePlate = licensePlate;
        this.type = type;
    }
    
    getLicensePlate(){
        return this.licensePlate;
    }
    
    getType(){
        return this.type;
    }

}