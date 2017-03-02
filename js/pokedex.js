var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('c1', data);

function data($scope, $log, $http, POKEAPI, PokeSearched) {
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

  //q10 : http get pour récupérer la liste de tous les pokémons
  $http({
      method: 'GET',
      url: POKEAPI + "/api/v2/pokedex/1/"}).then(function successCallback(response) {
        $scope.lsAllPoke = response.data.pokemon_entries;
  });

  //q10 améliorée
  $scope.infoPokeLog = function(namePoke, id) {
    for (var i = 0; i < $scope.lsAllPoke.length; i++) {
      if ($scope.lsAllPoke[i].pokemon_species.name == namePoke || $scope.lsAllPoke[i].entry_number == id) {
        return {
          id: $scope.lsAllPoke[i].entry_number,
          namePokemon: $scope.lsAllPoke[i].pokemon_species.name
        }
      }
    }
  };

  // q13 : récupère id ou nom du pokémon recherché et les stockent dans les variables du service PokeSearched
  $scope.inPokeDetails = function(idSearched) {
    PokeSearched.id = idSearched;
  }
}

// q11 : création service pour récupérer les informations d'UN pokémon
pokeApp.factory('PokeService', function($resource, POKEAPI) {
  return $resource(POKEAPI + "/api/v2/pokemon/:id/", {id:'@id'});
});

// q12 : nouveau controller pour afficher les informations de bulbizarre
// et q13 : nouveau controller pour afficher les informations de n'importe quel pokémon
pokeApp.controller('c2', data2);

function data2($scope, PokeService, PokeSearched) {
  // q12 : affcihe les infos de bulbizarre le 1er pokémon du pokédex
  // var bulbi = PokeService.get({id:1});
  // // $scope.id = bulbi.id;
  // // $scope.name = bulbi.name;
  // // $scope.attacks = bulbi.moves;
  // // console.log($scope.id);
  //
  // bulbi.$promise.then(function(data) {
  //   $scope.bulbi = data;
  //   $scope.id = data.id;
  //   $scope.name = data.name;
  //   $scope.attacks = data.moves;
  // }, true);

  // q14 : affiche les infos d'un pokémon tout en mettant à jour l'affichage du pokédex à chaque nouvelle recherche d'un pokémon
  // affectation d'un service à un scope pour utiliser le $scope.$watch
  $scope.pokeSearched = PokeSearched;
  $scope.$watch('pokeSearched.id', function() {
    // récupère les informations d'un pokémon grace au service à partir de l'id
    var infoPoke = PokeService.get({id:PokeSearched.id});

    // on fait une promesse pour qu'une fois le get json obtenu, on stocke les infos puis on les affiche
    infoPoke.$promise.then(function(data) {
      $scope.infoPoke = data;
      $scope.id = data.id;
      $scope.name = data.name;
      $scope.attacks = data.moves;
      $scope.taille = data.height * 10;
      $scope.poids = data.weight / 10;
      // q16 : récupère les images + types pour afficher plus d'informations sur le pokémon sélectionné
      $scope.img1 = data.sprites.front_default;
      $scope.img2 = data.sprites.front_shiny;
      $scope.img3 = data.sprites.back_default;
      $scope.img4 = data.sprites.back_shiny;
      $scope.types = data.types;
      console.log(data.types);
      console.log({id: $scope.id, name: $scope.name});
    }, true);
  });
}

// q13 : création service pour lier nos 2 controllers grace a l'id
pokeApp.factory('PokeSearched', function() {
  return {
    id: 1
  };
});

// fonctionne que sur firefox.............
pokeApp.directive('ngPokedex', function() {
  return {
    restrict: 'E', // autorise la directive en tant qu'élément
    templateUrl: 'pokedex.html'
  }
});
