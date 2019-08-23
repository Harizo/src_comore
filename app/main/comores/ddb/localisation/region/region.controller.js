(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.region')
        .controller('RegionController', RegionController);
    /** @ngInject */
    function RegionController($mdDialog, $scope, apiFactory, $state, serveur_central)  {
		var vm   = this;
		vm.serveur_central = serveur_central ;
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
		});

    apiFactory.getAll("programme/index").then(function(result)
    {
      vm.allprogramme = result.data.response;
      //console.log(vm.allprogramme);    
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
		vm.showAlert = function(titre,textcontent) {
			$mdDialog.show(
			  $mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(false)
				.parent(angular.element(document.body))
				.title(titre)
				.textContent(textcontent)
				.ariaLabel('Alert Dialog Demo')
				.ok('Fermer')
				.targetEvent()
			);
		} 
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
		vm.download_ddb = function(controller,table){
			var nbr_data_insert = 0 ;
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			apiFactory.getAll_acteur_serveur_central(controller).then(function(result){
				var ddb = result.data.response;
				console.log(ddb);
				var datas_suppr = $.param({
						supprimer:1,
						nom_table: table,
					}); 
				apiFactory.add("delete_ddb/index",datas_suppr, config).success(function (data) {
						//add ddb
							ddb.forEach( function(element, index) {
								switch (table) {
									case "see_village":
										// statements_1
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											commune_id: element.commune_id,
											Code: element.Code,
											Village: element.Village,
											programme_id: element.programme_id,
											zone_id: element.zone_id,
											nbrpopulation: element.nbrpopulation,
											a_ete_modifie: element.a_ete_modifie,
											supprime: element.supprime,
											userid: element.userid,
											datemodification: element.datemodification,
											nom_table: table,
										});   
										break;
									case "see_commune":
										// statements_1
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											Code: element.Code,
											Commune: element.Commune,
											zone_id: element.zone_id,
											nombremenage: element.nombremenage,
											programme_id: element.programme_id,
											region_id: element.region_id,
											a_ete_modifie: element.a_ete_modifie,
											supprime: element.supprime,
											userid: element.userid,
											datemodification: element.datemodification,
											nom_table: table,
										});   
										break;
									case "see_region":
										// statements_1
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											ile_id: element.ile_id,
											Code: element.Code,
											Region: element.Region,
											programme_id: element.programme_id,
											a_ete_modifie: element.a_ete_modifie,
											supprime: element.supprime,
											userid: element.userid,
											datemodification: element.datemodification,
											nom_table: table,
										});   
										break;
									case "see_ile":
										// statements_1
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											Code: element.Code,
											Ile: element.Ile,
											programme_id: element.programme.id,
											a_ete_modifie: element.a_ete_modifie,
											supprime: element.supprime,
											userid: element.userid,
											datemodification: element.datemodification,
											nom_table: table,
										});   
										break;
									default:
										// statements_def
										break;
								}
								apiFactory.add("delete_ddb/index",datas, config).success(function (data) {
									nbr_data_insert++ ;
									if ((index+1) == ddb.length) {
										vm.showAlert('Information',nbr_data_insert + ' enregistrement ajouté avec Succès !');
									}
								}).error(function (data) {
									vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
								});
							});
					}).error(function (data) {
						vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
					});
				switch (table) {
					case "see_village":
						vm.allvillage = ddb ;
						break;
					case "see_commune":
						vm.allcommune = ddb ;
						break;
					case "see_region":
						vm.allprefecture = ddb ;
						break;					
					case "see_ile":
						vm.allile = ddb ;
						break;					
					default:
						break;
				}
			});  
		}
    }
})();
