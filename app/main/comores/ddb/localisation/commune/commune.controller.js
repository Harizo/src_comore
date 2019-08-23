(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.commune')
        .controller('CommuneController', CommuneController);

    /** @ngInject */
    function CommuneController($mdDialog, $scope, $location, apiFactory, $cookieStore,serveur_central)
    {
      var vm = this;
	  vm.serveur_central = serveur_central;
      vm.ajout = ajout ;
      var NouvelItem=false;
      var currentItem;

      vm.selectedItem = {} ;
      vm.allcommune = [] ;
      vm.allprefecture = [] ;
      

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
    vm.commune_column = [
      {
        titre:"Code"
      },
      {
        titre:"Commune"
      },
      {
        titre:"Préfecture"
      },
      {
        titre:"Programme"
      }
    ];
    
    apiFactory.getAll("region/index").then(function(result)
    {
      vm.allprefecture = result.data.response;
     // console.log(vm.allprefecture);
    });

    apiFactory.getAll("commune/index").then(function(result)
    {
      vm.allcommune = result.data.response;
     //console.log(vm.allcommune);
    });
    
    apiFactory.getAll("programme/index").then(function(result)
    {
        vm.allprogramme= result.data.response;
    }); 
        function ajout(commune,suppression)   
        {
              if (NouvelItem==false) 
              {
                test_existance (commune,suppression); 
              }
              else
              {
                insert_in_base(commune,suppression);
              }
                
                
            
        }

        function insert_in_base(commune,suppression)
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
                Code: commune.Code,
                Commune: commune.Commune,
                region_id:commune.prefecture_id,
                programme_id:commune.programme_id
                
            });
        
            //factory
            apiFactory.add("commune/index",datas, config).success(function (data)
            { 
              var prog = vm.allprogramme.filter(function(obj)
                {
                    return obj.id == vm.commune.programme_id;
                });
              var pref = vm.allprefecture.filter(function(obje)
                {
                    return obje.id == vm.commune.prefecture_id;
                });

                  if (NouvelItem == false) 
                  {
                    // Update or delete: id exclu
                    
                    if(suppression==0) 
                    {
                      vm.selectedItem.Commune = vm.commune.Commune;
                      vm.selectedItem.Code = vm.commune.Code;
                      vm.selectedItem.prefecture = pref[0];
                      vm.selectedItem.programme = prog[0];
                      vm.afficherboutonModifSupr = 0 ;
                      vm.afficherboutonnouveau = 1 ;
                      vm.selectedItem.$selected = false;
                      vm.selectedItem ={};
                    } 
                    else 
                    {    
                      vm.allcommune = vm.allcommune.filter(function(obj) {

                        return obj.id !== currentItem.id;
                      });
                    }
                  }
                  else
                  {
                    var item = {
                        Commune: commune.Commune,
                        Code: commune.Code,
                        id:String(data.response) ,
                        prefecture:pref[0] ,
                        programme:prog[0] 
                    };
        
                    vm.allcommune.push(item);
                    vm.commune={};
                    
                    NouvelItem=false;
                  }

                  vm.affichageMasque = 0 ;

                })
                .error(function (data) {
                    alert('Error');
                });
                
        }

      //*****************************************************************

     

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
        if (!vm.allcommune) return;
        vm.allcommune.forEach(function(item) {
            item.$selected = false;
        });
        vm.selectedItem.$selected = true;
      });

      //function cache masque de saisie
        vm.ajouter = function () 
        {
          vm.selectedItem.$selected = false;
          vm.affichageMasque = 1 ;
          vm.commune={};
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
          vm.commune= {};
        };

        vm.modifier = function() 
        {

          NouvelItem = false ;
          vm.affichageMasque = 1 ;
          vm.commune.id = vm.selectedItem.id ;
          vm.commune.Code = vm.selectedItem.Code ;
          vm.commune.Commune = vm.selectedItem.Commune ;
          vm.commune.programme_id = vm.selectedItem.programme.id;
          vm.commune.prefecture_id = vm.selectedItem.prefecture.id;

          vm.afficherboutonModifSupr = 0;
          vm.afficherboutonnouveau = 0;  

        };

        vm.supprimer = function() 
        {
          vm.afficherboutonModifSupr = 0 ;
          vm.affichageMasque = 0 ;
         var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('ok')
                .cancel('annuler');

          $mdDialog.show(confirm).then(function() {

            ajout(vm.selectedItem,1);
          }, function() {
            //alert('rien');
          });
        };
        
        vm.modifierprefecture = function (item) {
          var pref = vm.allprefecture.filter(function(obj)
          {
              return obj.id == item.prefecture_id;
          });
          //console.log(prefecture);
          item.programme_id=pref[0].programme.id;
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
                var com = vm.allcommune.filter(function(obj)
                {
                   return obj.id == item.id;
                });
                if(com[0])
                {
                   if((com[0].Code!=item.Code)
                        ||(com[0].Commune!=item.Commune)
                        ||(com[0].prefecture.id!=item.prefecture_id)
                        ||(com[0].programme.id!=item.programme_id))                    
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
										var pref=null;
										if(element.prefecture) {
											pref=element.prefecture.id;
										}
										var datas = $.param({
											supprimer:0,
											etat_download:true,
											id:element.id,      
											Code: element.Code,
											Commune: element.Commune,
											zone_id: element.zone_id,
											nombremenage: element.nombremenage,
											programme_id: element.programme.id,
											region_id: pref,
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
