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
    
}