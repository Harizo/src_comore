(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.region')
        .controller('ProgrammeController', ProgrammeController);
    /** @ngInject */
    function ProgrammeController($mdDialog, $scope, apiFactory, $state)  {
		var vm   = this;
		vm.ajout = ajout ;
		var NouvelItem = false;
		var currentItem;
		vm.selectedItem = {} ;
    vm.allprogramme = [] ;    
		//variale affichage bouton nouveau
		vm.afficherboutonnouveau = 1 ;
		//variable cache masque de saisie
		vm.affichageMasque = 0 ;
		//style
		vm.dtOptions = {
			dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
			pagingType: 'simple',
			autoWidth: false,
			responsive: true
		};
		//col table
		vm.programme_column = [{titre:"libelle"}];
		apiFactory.getAll("programme/index").then(function(result)
    {
			vm.allprogramme = result.data.response;
      //console.log(vm.allprogramme);    
		});
        function ajout(programme,suppression)
        {
            if (NouvelItem==false)
            {
                test_existance (programme,suppression); 
            } 
            else
            {
                insert_in_base(programme,suppression);
            }
        }
        function insert_in_base(programme,suppression)
        {
            //add
            var config = {
                headers : {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
            };
            var getId = 0;
            if (NouvelItem==false)
            {
                getId = vm.selectedItem.id; 
            } 
            var datas = $.param({
                supprimer:suppression,
                id:getId,      
                libelle: programme.libelle               
            });
            //factory
            apiFactory.add("programme/index",datas, config).success(function (data)
            {              
      				if (NouvelItem == false)
              {
                  // Update or delete: id exclu                 
                  if(suppression==0)
                  {
          						vm.selectedItem.libelle = vm.programme.libelle;
          						vm.afficherboutonModifSupr = 0 ;
          						vm.afficherboutonnouveau = 1 ;
          						vm.selectedItem.$selected = false;
                  }
                  else
                  {    
      						  vm.allprogramme = vm.allprogramme.filter(function(obj)
                    {
      							return obj.id !== currentItem.id;
      						  });
                  }
      				}
              else
              {
                var item = {
                      libelle: programme.libelle,
                      id:String(data.response)
                };                
                vm.allprogramme.push(item);
                vm.programme = {} ;                   
                NouvelItem=false;
      				}
      				vm.affichageMasque = 0 ;
          }).error(function (data)
            {
                alert('Error');
            });                
        }
    		vm.selection= function (item)
        {
      			vm.selectedItem = item;
      			vm.nouvelItem = item;
      			currentItem = JSON.parse(JSON.stringify(vm.selectedItem));
      			vm.afficherboutonModifSupr = 1 ;
      			vm.affichageMasque = 0 ;
      			vm.afficherboutonnouveau = 1 ;
    		};
    		$scope.$watch('vm.selectedItem', function()
        {
    			if (!vm.allprogramme) return;
    			vm.allprogramme.forEach(function(item) {
    				item.$selected = false;
    			});
    			vm.selectedItem.$selected = true;
    		});
      //function cache masque de saisie
        vm.ajouter = function ()
        {
      			vm.selectedItem.$selected = false;
      			vm.affichageMasque = 1 ;
      			vm.programme = {} ;
      			NouvelItem = true ;
        };
        vm.annuler = function()
        {
            vm.selectedItem = {} ;
            vm.selectedItem.$selected = false;
            vm.affichageMasque = 0 ;
            vm.afficherboutonnouveau = 1 ;
            vm.afficherboutonModifSupr = 0 ;
            NouvelItem = false;
        };
        vm.modifier = function()
        {
            NouvelItem = false ;
            vm.affichageMasque = 1 ;
            vm.programme.id = vm.selectedItem.id ;
            vm.programme.libelle = vm.selectedItem.libelle ;      		  
            vm.afficherboutonModifSupr = 0;
            vm.afficherboutonnouveau = 0;  
        };
        vm.supprimer = function()
        {
          vm.affichageMasque = 0 ;
          vm.afficherboutonModifSupr = 0 ;
          var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('ok')
                .cancel('annuler');
          $mdDialog.show(confirm).then(function()
          {
              vm.ajout(vm.selectedItem,1);
          }, function(){
            //alert('rien');
          });
        };
        function test_existance (item,suppression)
        {          
            if (suppression!=1)
            {
               var reg = vm.allprogramme.filter(function(obj)
                {
                   return obj.id == item.id;
                });
                if(reg[0])
                {
                   if((reg[0].libelle!=item.libelle))                    
                      { 
                         insert_in_base(item,suppression);
                         vm.affichageMasque = 0;
                      }
                      else
                      {  
                         vm.affichageMasque = 0;
                      }
                }
            }  else
              insert_in_base(item,suppression);
        }
    }
})();
