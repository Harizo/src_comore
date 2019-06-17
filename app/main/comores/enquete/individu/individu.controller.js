(function ()
{
    'use strict';
    angular
        .module('app.comores.enquete.individu')
        .controller('IndividuController', IndividuController);

    /** @ngInject */
    function IndividuController(apiFactory, $state, $mdDialog, $scope) 
    {
		  var vm = this;
      vm.tab_beneficiaire = [] ;
      vm.menage_column = [{titre:"Numero d'enregistrement"},{titre:"Nom inscrire"},{titre:"Personne inscrire"},{titre:"Age"},{titre:"Addresse"}];
      vm.dtOptions =
      {
        dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        autoWidth: false,
        responsive: true
      };
	     //DDB , CLE ETRANGERE
      apiFactory.getAll("programme/index").then(function(result)
      { 
        vm.all_programme = result.data.response;    
        
      });
      //FIN DDB , CLE ETRANGERE	

      


      vm.filtrer = function()
      {
        console.log(vm.id_programme);

        apiFactory.getAPIgeneraliserREST("menage_programme/index","id_programme",vm.id_programme).then(function(result)
        { 
          vm.all_menage_programme = result.data.response;   
          console.log(vm.all_menage_programme); 
          
        });
      }

      vm.selection= function (item)
      {

        
        vm.selectedItem = item;
        vm.nouvelItem   = item;

        
      }

      $scope.$watch('vm.selectedItem', function()
      {
        if (!vm.all_menage_programme) return;
        vm.all_menage_programme.forEach(function(item) 
        {
          item.$selected = false;
        });
        vm.selectedItem.$selected = true;
      })
      
    }
  })();
