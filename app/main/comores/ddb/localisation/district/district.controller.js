(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.district')
        .controller('DistrictController', DistrictController);

    /** @ngInject */
    function DistrictController($mdDialog, $scope, apiFactory, $state,serveur_central)
    {
      var vm = this;
	  vm.serveur_central = serveur_central;
      vm.ajout = ajout ;

      var NouvelItem=false;
      var currentItem;
		vm.titrepage="Ajout district";
      vm.selectedItem = {} ;
      vm.alldistrict = [] ;
      

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
    vm.prefecture_column = [
      {
        titre:"Code"
      },
      {
        titre:"Nom"
      },
      {
        titre:"Ile"
      },
      {
        titre:"Programme"
      }
    ];

      apiFactory.getAll("ile/index").then(function(result)
      {
        vm.allile= result.data.response;
      });
      apiFactory.getAll("programme/index").then(function(result)
      {
        vm.allprogramme= result.data.response;
      });

      apiFactory.getAll("region/index").then(function(result){
        vm.allprefecture = result.data.response;
       // console.log(vm.allprefecture);
       /* for (var i = 0; i < vm.allprefecture.length; i++) 
        {
          var item = {
                  id: vm.allprefecture[i].id,
                  nom: vm.allprefecture[i].nom,
                  code: vm.allprefecture[i].code,
                  ile_id: vm.allprefecture[i].ile_id,
                  ile_nom: vm.allprefecture[i].ile.nom
                 
              };
              
              vm.allprefecture.push(item);             
        }*/
      });


       function ajout(prefecture,suppression)   
        {
              if (NouvelItem==false) 
              {
                test_existance (prefecture,suppression); 
              }
              else
              {
                insert_in_base(prefecture,suppression);
              }
                
                
            
        }

        function insert_in_base(prefecture,suppression)
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
            var datas = $.param(
            {
                supprimer:suppression,
                id:getId,      
                Code: prefecture.Code,
                Region: prefecture.Region,
                ile_id:prefecture.ile_id,
                programme_id:prefecture.programme_id                
            });
          
            //factory
            apiFactory.add("region/index",datas, config).success(function (data)
            {   var prog = vm.allprogramme.filter(function(obj)
                {
                    return obj.id == vm.prefecture.programme_id;
                });
            console.log(prog);
                var il = vm.allile.filter(function(obj)
                {
                    return obj.id == vm.prefecture.ile_id;
                });

                  if (NouvelItem == false) 
                  {
                    // Update or delete: id exclu
                    
                    if(suppression==0) 
                    {
                      vm.selectedItem.Region = vm.prefecture.Region;
                      vm.selectedItem.Code = vm.prefecture.Code;
                      vm.selectedItem.ile = il[0];
                      vm.selectedItem.programme = prog[0];
                      vm.afficherboutonModifSupr = 0 ;
                      vm.afficherboutonnouveau = 1 ;
                      vm.selectedItem.$selected = false;
                      vm.selectedItem ={};
                    } 
                    else 
                    {    
                      vm.allprefecture = vm.allprefecture.filter(function(obj) {

                        return obj.id !== currentItem.id;
                      });
                    }
                  }
                  else
                  {
                    var item = {
                        Region: prefecture.Region,
                        Code: prefecture.Code,
                        id:String(data.response) ,
                        ile:il[0],
                        programme:prog[0] 
                    };
                  
                    vm.allprefecture.push(item);
                    vm.prefecture={};
                    
                    NouvelItem=false;
                  }

                  vm.affichageMasque = 0 ;

                })
                .error(function (data) {
                    alert('Error');
                });
                
        }


      //selection sur la liste
      vm.selection= function (item) {
  //      vm.modifiercategorie(item);
        
          vm.selectedItem = item;
          vm.nouvelItem = item;
          currentItem = JSON.parse(JSON.stringify(vm.selectedItem));
          vm.afficherboutonModifSupr = 1 ;
          vm.affichageMasque = 0 ;
          vm.afficherboutonnouveau = 1 ;
      };

      $scope.$watch('vm.selectedItem', function() {
        if (!vm.allprefecture) return;
        vm.allprefecture.forEach(function(item) {
            item.$selected = false;
        });
        vm.selectedItem.$selected = true;
      });

      //function cache masque de saisie
        vm.ajouter = function () 
        {
			vm.titrepage="Ajout prefecture";
          vm.selectedItem.$selected = false;
          vm.affichageMasque = 1 ;
          vm.prefecture.code='';
          vm.prefecture.nom='';
          vm.prefecture.prefecture_id='';
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
          vm.titrepage="Modifier prefecture";
          NouvelItem = false ;
          vm.affichageMasque = 1 ;
          vm.prefecture.id = vm.selectedItem.id ;
          vm.prefecture.Code = vm.selectedItem.Code ;
          vm.prefecture.Region = vm.selectedItem.Region;
          vm.prefecture.ile_id = vm.selectedItem.ile.id;
          vm.prefecture.programme_id = vm.selectedItem.programme.id;
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

          $mdDialog.show(confirm).then(function() {

            vm.ajout(vm.selectedItem,1);
          }, function() {
            //alert('rien');
          });
        };
        
        vm.modifierile = function (item) 
        {
          var ile = vm.allile.filter(function(obj)
          {
              return obj.id == item.ile_id;
          });
          //console.log(ile);
          item.programme_id=ile[0].programme.id;
        }
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
                var pref = vm.allprefecture.filter(function(obj)
                {
                   return obj.id == item.id;
                });
                if(pref[0])
                {
                   if((pref[0].Code!=item.Code)
                        ||(pref[0].Region!=item.Region)
                        ||(pref[0].ile.id!=item.ile_id)
                        ||(pref[0].programme.id!=item.programme_id))                    
                      { 
                         insert_in_base(item,suppression);
                         vm.affichageMasque = 0;
                      }
                      else
                      {  
                         vm.affichageMasque = 0;
                      }
                }
            }
            else
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
										var nosy =null;
										if(element.ile) {
											nosy = element.ile.id;
										}	
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											ile_id: nosy,
											Code: element.Code,
											Region: element.Region,
											programme_id: element.programme.id,
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
