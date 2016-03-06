"use strict";

class Level {
    
    constructor(carSlots,motobikeSlots){
        this.totalCarSlots = carSlots;
        this.totalMotobikeSlots = motobikeSlots;
        this.carFreeSlots = this.totalCarSlots;
        this.motobikeFreeSlots = this.totalMotobikeSlots;
    }
    
    countFreeCarSlots(){
        return this.carFreeSlots;
    }
    
    countFreeMotobikeSlots(){
        return this.motobikeFreeSlots;
    }    
    
    tryToParkVehicle(vehicle){
        if(vehicle.type == "car" && this.carFreeSlots > 0){
            this.carFreeSlots--;
            return true;
        }else if(vehicle.type == "motobike" && this.motobikeFreeSlots > 0){
            this.motobikeFreeSlots--;
            return true;
        }
        
        return false;
    }
    
    listAllParkedCars(){
        var carList = [];
        
        return carList;
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