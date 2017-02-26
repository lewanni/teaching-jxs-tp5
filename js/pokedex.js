var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('c1', data);

function data($scope, $log, $http, POKEAPI) {
	$scope.lsPoke =
  [
  	{id: 1, name: "dracaufeu"},
  	{id: 2, name: "amphinobi"},
  	{id: 3, name: "junko"},
  	{id: 4, name: "lucario"},
  	{id: 5, name: "drattak"},
  	{id: 6, name: "voltali"}
  ];

	$scope.$log = $log;

  $http({
      method: 'GET',
      url: POKEAPI + "/api/v2/pokedex/1/"}).then(function successCallback(response) {
        $scope.lsAllPoke = response.data.pokemon_entries;
  });

  $scope.infoPoke = function(namePoke, id) {
    for (var i = 0; i < $scope.lsAllPoke.length; i++) {
      if ($scope.lsAllPoke[i].pokemon_species.name == namePoke || $scope.lsAllPoke[i].entry_number == id) {
        return {
          id: $scope.lsAllPoke[i].entry_number,
          namePokemon: $scope.lsAllPoke[i].pokemon_species.name
        }
      }
    }
  };
}

/*pokeApp.factory('InfoPoke', infoPoke);

function infoPoke() {
	var infoPok = $resource("http://pokeapi.co/api/v1/type/:1/");
	return infoPok;
}*/
