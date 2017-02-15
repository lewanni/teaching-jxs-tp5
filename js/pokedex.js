var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('c1', ['$scope', '$log', '$http', data]);

function data($scope, $log, $http) {
	var lsPokes = [];
	
	/*[
	{id: 1, name: "dracaufeu"},
	{id: 2, name: "amphinobi"},
	{id: 3, name: "junko"},
	{id: 4, name: "lucario"},
	{id: 5, name: "drattak"},
	{id: 6, name: "voltali"}];*/
	
	$scope.$log = $log;
	for(i = 1; i < 150; i++) {
		$http.get("http://pokeapi.co/api/v2/pokemon/" + i + "/").then(function(response) {
			lsPokes.push(response.data);
			//$scope.lsPoke = lsPokes;
		});
		i++;
	}
	$scope.myBestTeamPokemon = lsPokes;
	/*$http.get("http://pokeapi.co/api/v2/pokemon/" + 1 + "/").then(function(response) {
		var lsPokes = new Array();
		$scope.status = response.status;
		lsPokes.push(response.data.name);
		$scope.lsPoke = lsPokes;
	});*/
	//$scope.lsPoke = InfoPoke;
}

/*pokeApp.factory('InfoPoke', infoPoke);

function infoPoke() {
	var infoPok = $resource("http://pokeapi.co/api/v1/type/:1/");
	return infoPok;
}*/
