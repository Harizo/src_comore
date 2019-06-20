(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.region')
        .controller('RegionController', RegionController);
    /** @ngInject */
    function RegionController($mdDialog, $scope, apiFactory, $state)  {
		var vm   = this;
		vm.ajout = ajout ;
		var NouvelItem = false;
		var currentItem;
		vm.selectedItem = {} ;
		vm.allregion    = [] ;
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
		vm.ile_column = [{titre:"Code"},{titre:"Ile"},{titre:"programme"}];
		apiFactory.getAll("ile/index").then(function(result)
    {
			vm.allile = result.data.response;
      //console.log(vm.allile);    
		});

    apiFactory.getAll("programme/index").then(function(result)
    {
      vm.allprogramme = result.data.response;
      console.log(vm.allprogramme);    
    });
        function ajout(ile,suppression)
        {
            if (NouvelItem==false)
            {
                test_existance (ile,suppression); 
            } 
            else
            {
                insert_in_base(ile,suppression);
            }
        }
        function insert_in_base(ile,suppression)
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
                Code: ile.Code,
                Ile: ile.Ile,
                programme_id:ile.programme_id,               
            });
            //factory
            apiFactory.add("ile/index",datas, config).success(function (data)
            { 
              var prog = vm.allprogramme.filter(function(obj)
              {
                  return obj.id == vm.ile.programme_id;
              });
              
      				if (NouvelItem == false)
              {
                  // Update or delete: id exclu                 
                  if(suppression==0)
                  {
          						vm.selectedItem.Ile = vm.ile.Ile;
          						vm.selectedItem.Code = vm.ile.Code;
          						vm.selectedItem.programme = prog[0];
          						vm.afficherboutonModifSupr = 0 ;
          						vm.afficherboutonnouveau = 1 ;
          						vm.selectedItem.$selected = false;
          						//vm.selectedItem ={};
                  }
                  else
                  {    
      						  vm.allile = vm.allile.filter(function(obj)
                    {
      							return obj.id !== currentItem.id;
      						  });
                  }
      				}
              else
              {
                var item = {
                      Ile: ile.Ile,
                      Code: ile.Code,
                      id:String(data.response) ,
                      programme:prog[0] 
                };                
                vm.allile.push(item);
                vm.ile = {} ;                   
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
    			if (!vm.allile) return;
    			vm.allile.forEach(function(item) {
    				item.$selected = false;
    			});
    			vm.selectedItem.$selected = true;
    		});
      //function cache masque de saisie
        vm.ajouter = function ()
        {
      			vm.selectedItem.$selected = false;
      			vm.affichageMasque = 1 ;
      			vm.ile = {} ;
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
            vm.ile.id = vm.selectedItem.id ;
            vm.ile.Code = vm.selectedItem.Code ;
            vm.ile.Ile = vm.selectedItem.Ile ;
            vm.ile.programme_id = vm.selectedItem.programme.id ;
      		  
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
               var reg = vm.allile.filter(function(obj)
                {
                   return obj.id == item.id;
                });
                if(reg[0])
                {
                   if((reg[0].Code!=item.Code)
                        ||(reg[0].Ile!=item.Ile)
                        ||(reg[0].programme.id!=item.programme_id))                    
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
