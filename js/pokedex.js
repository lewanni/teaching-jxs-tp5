var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('c1', ['$scope', '$log', '$http', data]);

function data($scope, $log, $http) {
	$scope.myBestTeamPokemon = [
	{id: 1, name: "dracaufeu"},
	{id: 2, name: "amphinobi"},
	{id: 3, name: "junko"},
	{id: 4, name: "lucario"},
	{id: 5, name: "drattak"},
	{id: 6, name: "voltali"}];
	
	$scope.$log = $log;
	for(i = 1; i < 150; i++) {
		$http.get("http://pokeapi.co/api/v2/pokemon/" + i + "/").then(function(response) {
			$scope.status = response.status;
			$scope.lsPoke = "id : " + response.data.id + " name : " + response.data.name;
		});
		i++;
	}
	/*$http.get("http://pokeapi.co/api/v2/pokemon/" + 1 + "/").then(function(response) {
		$scope.status = response.status;
		$scope.lsPoke = "id : " + response.data.id + " name : " + response.data.name " </br>";
	});*/
}
