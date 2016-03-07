(function() {

    var app = angular.module('garageJS',['ui.bootstrap']);

    app.controller("ListSlotsController", function($scope){
        'use strict';
                
        var vehicles = $scope.vehicles = garage.filterByLicensePlate("");
        $scope.itemsPerPage = 2;
        $scope.currentPage = 1;
        $scope.filteredVehicles = [];
                
        $scope.filterByCars = function(){  
            $scope.licensePlate = "";
            $scope.vehicles = garage.filterByCars();
            $scope.figureOutVehiclesToDisplay();

        };
        
        $scope.filterByMotobikes = function(){
            $scope.licensePlate = "";
            $scope.vehicles = garage.filterByMotobikes();
            $scope.figureOutVehiclesToDisplay();

        };
                
        $scope.filterByLevel = function(level){
            $scope.licensePlate = "";
            $scope.vehicles = garage.filterByLevel(level);
            $scope.figureOutVehiclesToDisplay();

            
        };
        
        $scope.filterByLicensePlate = function(){
            $scope.vehicles = garage.filterByLicensePlate($scope.licensePlate); 
            $scope.figureOutVehiclesToDisplay();

        }
        
        var levelNumber = garage.countLevels();
        $scope.levels = new Array(levelNumber).fill(null).map(function(value, index){
            return (index+1);
        });
        
        $scope.figureOutVehiclesToDisplay = function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            var end = begin + $scope.itemsPerPage;
            $scope.filteredVehicles = $scope.vehicles.slice(begin, end);
        };
        
        $scope.figureOutVehiclesToDisplay();

        $scope.pageChanged = function() {
            $scope.figureOutVehiclesToDisplay();
        };
        
        
    });  
       
 
})(); 
