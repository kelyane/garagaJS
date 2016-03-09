"use strict";

var Level = function(carSlots,motobikeSlots,levelNumber){         
    this.totalCarSlots = new Array(carSlots).fill(null);
    this.totalMotobikeSlots = new Array(motobikeSlots).fill(null);
    this.levelNumber = levelNumber;
}

Level.prototype.countFreeCarSlots = function(){
    return this.totalCarSlots.reduce(function(acc, cur) { 
        return acc + ( cur === null ? 1 : 0)          
    }, 0);
}
    
Level.prototype.countFreeMotobikeSlots = function(){
    return this.totalMotobikeSlots.reduce(function(acc, cur) { 
        return acc + ( cur === null ? 1 : 0)
    }, 0);
}    
    
Level.prototype.isVehicleParked = function(vehicle){
    var carParked = this.totalCarSlots.findIndex(function(slot){
            return slot != null && slot.getLicensePlate() == vehicle.getLicensePlate();
    });
    
    var motobikeParked = this.totalMotobikeSlots.findIndex(function(slot){
            return slot != null && slot.getLicensePlate() == vehicle.getLicensePlate();
    });
    
    //the car or the vehicle is already parked
    return carParked != -1 || motobikeParked != -1;
}
      
Level.prototype.tryToParkVehicle = function(vehicle){ 
    if(vehicle.getType() == "car"){
        var freeSlot = this.totalCarSlots.findIndex(function(slot){
            return slot == null;
        });            
        if( freeSlot != -1){
            this.totalCarSlots[freeSlot] = vehicle;
            return true;
        }
        
        //there is no more car slot available
        return false;
    }else if(vehicle.getType() == "motobike"){
        var freeSlot = this.totalMotobikeSlots.findIndex(function(slot){
            return slot == null;
        });
        if( freeSlot != -1){
            this.totalMotobikeSlots[freeSlot] = vehicle;
            return true;
        }
        
        //there is no more motobike slot available
        return false
    }        
            
    return false;
}
    
Level.prototype.tryToUnparkVehicle = function(licensePlate){
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
    
Level.prototype.listAllParkedCars = function(){       
    return this.filterCarsByLicencePlate("");
}
    
Level.prototype.listAllParkedMotobike = function(){  
    return this.filterMotobikeByLicensePlate("");
}
    
Level.prototype.filterByLicensePlate = function(criteria){
    return this.filterCarsByLicencePlate(criteria).concat(this.filterMotobikeByLicensePlate(criteria));    
}
    
Level.prototype.filterCarsByLicencePlate = function(criteria){
    var self = this;
    return this.totalCarSlots.map(function(slot,i){
        return slot != null && slot.getLicensePlate().search(criteria) != -1 ? { licensePlate: slot.getLicensePlate(), type: slot.getType(), slot: i, level: self.levelNumber} : null; 
    }).filter(function(e){
        return e != null ;
    });  
}
    
Level.prototype.filterMotobikeByLicensePlate = function(criteria){
    var self = this;
    return this.totalMotobikeSlots.map(function(slot,i){
        return slot != null && slot.getLicensePlate().search(criteria) != -1 ? { licensePlate: slot.getLicensePlate(), type: slot.getType(), slot: (self.totalCarSlots.length + i), level: self.levelNumber} : null; 
    }).filter(function(e){
        return e != null ;
    });  
}


var Vehicle = function(licensePlate, type){
    this.licensePlate = licensePlate;
    this.type = type;
}
    
Vehicle.prototype.getLicensePlate = function(){
    return this.licensePlate;
}

Vehicle.prototype.getType = function(){
    return this.type;
}


var Garage = function(infoLevels){
    this.levels = infoLevels.map(function(infoLevel,i){
        return new Level(infoLevel[0], infoLevel[1],(i+1));
    });  
}
    
Garage.prototype.countLevels = function(){
    return this.levels.length;
}

Garage.prototype.countFreeCarSlots = function(){
    return this.levels.reduce(function(acc, cur){
        return acc + cur.countFreeCarSlots();         
    },0);
}

Garage.prototype.countFreeMotobikeSlots = function(){
    return this.levels.reduce(function(acc, cur){
        return acc + cur.countFreeMotobikeSlots();         
    },0);
}

Garage.prototype.isVehicleParked = function(vehicle){
    return this.levels.findIndex(function(level){
        return level.isVehicleParked(vehicle);
    }) != -1;
}

Garage.prototype.tryToParkVehicle = function(vehicle){
    return !this.isVehicleParked(vehicle) && this.levels.findIndex(function(level){
        return level.tryToParkVehicle(vehicle);
    }) != -1; 
}

Garage.prototype.tryToUnparkVehicle = function(licensePlate){
    return this.levels.findIndex(function(level){
        return level.tryToUnparkVehicle(licensePlate);
    }) != -1;
}

Garage.prototype.filterByLicensePlate = function(criteria){
    return this.levels.reduce(function(acc, curLevel){
        return acc.concat(curLevel.filterByLicensePlate(criteria));
    },[]);
}

Garage.prototype.filterByLevel = function(levelNumbers){
    return this.levels.filter(function(level,i){
        return levelNumbers.includes(i+1);
    }).reduce(function(acc, cur){
        return acc.concat(cur.filterByLicensePlate(""));
    },[]);
}
    
Garage.prototype.filterByLevelType = function(levelNumbers,types){
    return this.filterByLevel(levelNumbers).filter(function(obj){
        return types.includes(obj.type);
    });
}

Garage.prototype.filter = function(levelNumbers,types,criteria){
    return this.filterByLevelType(levelNumbers,types).filter(function(obj){
        return obj.licensePlate.search(criteria) != -1;
    });
}
    
