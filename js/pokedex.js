var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('c1', data);
function data($scope, $log){
	
	$scope.myBestTeamPokemon = [
		
	{id: 1, name: " dracaufeu"},	
	{id: 2, name: " amphinobi"},
	{id: 3, name: " junko"},
	{id: 4, name: " lucario"},
	{id: 5, name: " drattak"},
	{id: 6, name: " voltali"}
		
	];
	
	$scope.$log = $log;
}

