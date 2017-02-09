var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('c1', data);
pokeApp.controller('c2', dat2);

function data($scope) {
	$scope.myBestTeamPokemon = [
	{"id":1, "name":"dracaufeau"},
	{"id":2, "name":"amphinobi"},
	{"id":3, "name":"junko"},
	{"id":4, "name":"lucario"},
	{"id":5, "name":"drattak"},
	{"id":6, "name":"voltali"}
	]
}
