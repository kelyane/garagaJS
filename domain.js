"use strict";

class Level {
    
    constructor(carSlots,motobikeSlots,levelNumber){        
        this.totalCarSlots = new Array(carSlots).fill(null);
        this.totalMotobikeSlots = new Array(motobikeSlots).fill(null);
        this.levelNumber = levelNumber;
    }
    
    countFreeCarSlots(){
        return this.totalCarSlots.reduce(function(acc, cur) { 
            return acc + ( cur === null ? 1 : 0)          
        }, 0);
    }
    
    countFreeMotobikeSlots(){
        return this.totalMotobikeSlots.reduce(function(acc, cur) { 
            return acc + ( cur === null ? 1 : 0)
        }, 0);
    }    
      
    tryToParkVehicle(vehicle){
        if(vehicle.getType() == "car"){
            var freeSlot = this.totalCarSlots.findIndex(function(slot){
                return slot == null;
            });
            if( freeSlot != -1){
                this.totalCarSlots[freeSlot] = vehicle;
                return true;
            }
            return false;
        }else if(vehicle.getType() == "motobike"){
            var freeSlot = this.totalMotobikeSlots.findIndex(function(slot){
                return slot == null;
            });
            if( freeSlot != -1){
                this.totalMotobikeSlots[freeSlot] = vehicle;
                return true;
            }
            return false
        }        
             
        return false;
    }
    
    tryToUnparkVehicle(licensePlate){
        var parkedCar = this.totalCarSlots.findIndex(function(slot){
            return slot != null && slot.getLicensePlate() === licensePlate;
        });
        
        if (parkedCar == -1){
            var parkedMotobike = this.totalMotobikeSlots.findIndex(function(slot){
                return slot != null && slot.getLicensePlate() === licensePlate;
            });
            
            if (parkedMotobike != -1){
                this.totalMotobikeSlots[parkedMotobike] = null;
                return true;
            }
            
            return false;
            
        }else{
            this.totalCarSlots[parkedCar] = null;
            return true;
        }
        
        return false;
    }
    
    listAllParkedCars(){        
        return this.filterCarsByLicencePlate("");
    }
    
    listAllParkedMotobike(){  
        return this.filterMotobikeByLicensePlate("");
    }
    
    filterByLicensePlate(criteria){
        return this.filterCarsByLicencePlate(criteria).concat(this.filterMotobikeByLicensePlate(criteria));    
    }
    
    filterCarsByLicencePlate(criteria){
        var self = this;
        return this.totalCarSlots.map(function(slot,i){
            return slot != null && slot.getLicensePlate().search(criteria) != -1 ? { licensePlate: slot.getLicensePlate(), type: slot.getType(), slot: i, level: self.levelNumber} : null; 
        }).filter(function(e){
            return e != null ;
        });  
    }
    
    filterMotobikeByLicensePlate(criteria){
        var self = this;
        return this.totalMotobikeSlots.map(function(slot,i){
            return slot != null && slot.getLicensePlate().search(criteria) != -1 ? { licensePlate: slot.getLicensePlate(), type: slot.getType(), slot: (self.totalCarSlots.length + i), level: self.levelNumber} : null; 
        }).filter(function(e){
            return e != null ;
        });  
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

class Garage {
    constructor(infoLevels){
        this.levels = infoLevels.map(function(infoLevel,i){
            return new Level(infoLevel[0], infoLevel[1],(i+1));
        });  
    }
    
    countLevels(){
        return this.levels.length;
    }
    
    countFreeCarSlots(){
        return this.levels.reduce(function(acc, cur){
            return acc + cur.countFreeCarSlots();         
        },0);
    }
    
    countFreeMotobikeSlots(){
        return this.levels.reduce(function(acc, cur){
            return acc + cur.countFreeMotobikeSlots();         
        },0);
    }
    
    tryToParkVehicle(vehicle){
        return this.levels.findIndex(function(level){
            return level.tryToParkVehicle(vehicle);
        }) != -1; 
    }
    
    tryToUnparkVehicle(licensePlate){
        return this.levels.findIndex(function(level){
            return level.tryToUnparkVehicle(licensePlate);
        }) != -1;
    }
    
    filterByLicensePlate(criteria){
        return this.levels.reduce(function(acc, curLevel){
            return acc.concat(curLevel.filterByLicensePlate(criteria));
        },[]);
    }
    
    filterByLevel(levelNumber){
        return this.levels[levelNumber-1].filterByLicensePlate("");
    }
    
    filterByCars(){
        return this.levels.reduce(function(acc, curLevel){
            return acc.concat(curLevel.listAllParkedCars());
        },[]);
    }
    
    filterByMotobikes(){
        return this.levels.reduce(function(acc, curLevel){
            return acc.concat(curLevel.listAllParkedMotobike());
        },[]);
    }
}