(function() {

    var app = angular.module('garageJS', []);

    app.controller("ListSlotsController", function($scope){
        'use strict';
        var vehicles = $scope.vehicles = garage.filterByLicensePlate("");
                
        $scope.filterByCars = function(){  
            $scope.licensePlate = "";
            $scope.vehicles = garage.filterByCars();
        };
        
        $scope.filterByMotobikes = function(){
            $scope.licensePlate = "";
            $scope.vehicles = garage.filterByMotobikes();
        };
                
        $scope.filterByLevel = function($event){
            $scope.licensePlate = "";
            console.log($event);
            $scope.vehicles = garage.filterByLevel();
            
        };
        
        $scope.filterByLicensePlate = function(){
            $scope.vehicles = garage.filterByLicensePlate($scope.licensePlate);            
        }
        
        var levelNumber = garage.countLevels();
        $scope.levels = new Array(levelNumber).fill(null).map(function(value, index){
            return (index+1);
        });
        
    });  
    
 
})(); 
