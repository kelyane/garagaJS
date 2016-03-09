(function() {

    var app = angular.module('garageJS',['ui.bootstrap']);

    app.controller("ListSlotsController", function($scope){
        'use strict';
                
        var vehicles = $scope.vehicles = garage.filterByLicensePlate("");
        
        $scope.itemsPerPage = 2;
        $scope.currentPage = 1;
        $scope.filteredVehicles = []
        $scope.checkboxModelType = {
            car : true,
            motobike : true
        }; 
                                                
        $scope.filter = function(){
            var filterLeves = $scope.levels.filter(function(i){ return i.enabled }).map(function(obj){ return obj.index; });
            var filterTypes = Object.keys($scope.checkboxModelType).filter(function(v) { return $scope.checkboxModelType[v] });
            
            $scope.vehicles = garage.filter(filterLeves,filterTypes,$scope.licensePlate);
            $scope.figureOutVehiclesToDisplay();
        };
                
        var levelNumber = garage.countLevels();
        $scope.levels = new Array(levelNumber).fill(null).map(function(value, index){
            return {index: index+1, enabled: true};
        });
        
        $scope.figureOutVehiclesToDisplay = function() {
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            var end = begin + $scope.itemsPerPage;
            $scope.filteredVehicles = $scope.vehicles.slice(begin, end);
            $scope.numPages = Math.ceil($scope.vehicles.length / $scope.itemsPerPage);
        };
        
        $scope.figureOutVehiclesToDisplay();
        
        $scope.pageChanged = function() {
            $scope.figureOutVehiclesToDisplay();
        };
        
        
    });  
       
 
})(); 
