(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.enquetesurmenage')
        .controller('EnquetesurmenageController', EnquetesurmenageController);
    /** @ngInject */
    function EnquetesurmenageController($mdDialog, $scope, apiFactory, $state, serveur_central)  {
		var vm = this;

		vm.serveur_central = serveur_central ;
		
		vm.titrepage ="Ajout Tutelle";
		vm.ajout = ajout ;
		var NouvelItem=false;
		var currentItem;
		vm.selectedItemTypelogement = {} ;     
		vm.selectedItemOccupationlogement = {} ;     
		vm.selectedItemRevetementtoit = {} ;     
		vm.selectedItemRevetementsol = {} ;
		vm.selectedItemRevetementmur = {} ;     
		vm.selectedItemSourceeclairage = {} ;     
		vm.selectedItemCombustible = {} ;     
		vm.selectedItemToilette = {} ;     
		vm.selectedItemSourceeau = {} ;     
		vm.selectedItemBienequipement = {} ;     
		vm.selectedItemMoyenproduction = {} ;     
		vm.selectedItemSourcerevenu = {} ;     
		vm.selectedItemElevage = {} ;     
		vm.selectedItemCulture = {} ;     
		vm.selectedItemAliment = {} ;     
		vm.selectedItemStrategiealimentaire = {} ;     
		vm.selectedItemProblememenage = {} ;     
		vm.selectedItemStrategierevenu = {} ;     
		vm.selectedItemActiviterecoursmenage = {} ;     
		vm.selectedItemServicebeneficie = {} ;     
		vm.selectedItemInfrastructure = {} ;     
		
		vm.allRecordsTypelogement = [] ;     
		vm.allRecordsOccupationlogement = [] ;     
		vm.allRecordsRevetementtoit = [] ;    
		vm.allRecordsRevetementsol = [] ;     
		vm.allRecordsRevetementmur = [] ;     
		vm.allRecordsSourceeclairage = [] ;     
		vm.allRecordsCombustible = [] ;     
		vm.allRecordsToilette = [] ;     
		vm.allRecordsSourceeau = [] ;     
		vm.allRecordsBienequipement = [] ;     
		vm.allRecordsMoyenproduction = [] ;     
		vm.allRecordsSourcerevenu = [] ;     
		vm.allRecordsElevage = [] ;     
		vm.allRecordsCulture = [] ;     
		vm.allRecordsAliment = [] ;     
		vm.allRecordsStrategiealimentaire = [] ;     
		vm.allRecordsProblememenage = [] ;     
		vm.allRecordsStrategierevenu = [] ;     
		vm.allRecordsActiviterecoursmenage = [] ;     
		vm.allRecordsServicebeneficie = [] ;     
		vm.allRecordsInfrastructure = [] ;     

		vm.nom_table="type_logement";
		vm.cas=1;
		//variale affichage bouton nouveau
		//variable cache masque de saisie
		//style
		vm.dtOptions = {
		dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
		pagingType: 'simple',
		autoWidth: false,
		responsive: true
		};
		//col table
		vm.donnateur_column = [{titre:"Description"},{titre:"Actions"}];
		vm.typelog_titre = [{titre:"Description"},{titre:"Actions"}];
		vm.occup_titre = [{titre:"Description"},{titre:"Actions"}];
		vm.revt_toit_titre = [{titre:"Description"},{titre:"Actions"}];
		vm.revt_sol_titre = [{titre:"Description"},{titre:"Actions"}];
		vm.revt_mur_titre = [{titre:"Description"},{titre:"Actions"}];
		
		/*apiFactory.getTable("enquete_menage/index","eclairage").then(function(result){
			vm.allRecordsSourceeclairage = result.data.response;
			  
		});*/    
		apiFactory.getTable("enquete_menage/index","revetement_mur").then(function(result){
			vm.allRecordsRevetementmur = result.data.response;

		});  
		apiFactory.getTable("enquete_menage/index","revetement_sol").then(function(result){
			vm.allRecordsRevetementsol = result.data.response;

		});    
		apiFactory.getTable("enquete_menage/index","revetement_toit").then(function(result){
			vm.allRecordsRevetementtoit = result.data.response;

		});   
		/*apiFactory.getTable("enquete_menage/index","occupation_logement").then(function(result){
			vm.allRecordsOccupationlogement = result.data.response;

		}); 
		apiFactory.getTable("enquete_menage/index","type_logement").then(function(result){
			vm.allRecordsTypelogement = result.data.response;
		});*/    
		/*apiFactory.getTable("enquete_menage/index","combustible").then(function(result){
			vm.allRecordsCombustible = result.data.response;
		});  */
		apiFactory.getTable("enquete_menage/index","toilette").then(function(result){
			vm.allRecordsToilette = result.data.response;

		});   
		apiFactory.getTable("enquete_menage/index","source_eau").then(function(result){
			vm.allRecordsSourceeau = result.data.response;

		});  
		apiFactory.getTable("enquete_menage/index","bien_equipement").then(function(result){
			vm.allRecordsBienequipement = result.data.response;

		});  
		/*apiFactory.getTable("enquete_menage/index","moyen_production").then(function(result){
			vm.allRecordsMoyenproduction = result.data.response;

		});  */
		/*apiFactory.getTable("enquete_menage/index","source_revenu").then(function(result){
			vm.allRecordsSourcerevenu = result.data.response;

		}); */
		apiFactory.getTable("enquete_menage/index","type_elevage").then(function(result){
			vm.allRecordsElevage = result.data.response;

		});   
		apiFactory.getTable("enquete_menage/index","type_culture").then(function(result){
			vm.allRecordsCulture = result.data.response;

		});    
		/*apiFactory.getTable("enquete_menage/index","type_aliment").then(function(result){
			vm.allRecordsAliment = result.data.response;
		}); */
		/*apiFactory.getTable("enquete_menage/index","strategie_alimentaire").then(function(result){
			vm.allRecordsStrategiealimentaire = result.data.response;

		});  */ 
		/*apiFactory.getTable("enquete_menage/index","type_probleme").then(function(result){
			vm.allRecordsProblememenage = result.data.response;

		}); */
		/*apiFactory.getTable("enquete_menage/index","strategie_revenu").then(function(result){
			vm.allRecordsStrategierevenu = result.data.response;

		});*/ 
		/*apiFactory.getTable("enquete_menage/index","activite_recours_menage").then(function(result){
			vm.allRecordsActiviterecoursmenage = result.data.response;

		}); */  
		/*apiFactory.getTable("enquete_menage/index","service_beneficie").then(function(result){
			vm.allRecordsServicebeneficie = result.data.response;

		});  
		apiFactory.getTable("enquete_menage/index","infrastructure").then(function(result){
			vm.allRecordsInfrastructure = result.data.response;

		});  */  

		vm.download_ddb = function(table)
		{
			var nbr_data_insert = 0 ;
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};

			apiFactory.getAll_serveur_central("enquete_menage/index",table).then(function(result){
				var ddb = result.data.response;

				console.log(ddb);
				var datas_suppr = $.param({
						supprimer:1,
						nom_table: table,
					}); 

				apiFactory.add("delete_ddb/index",datas_suppr, config).success(function (data) {

						//add ddb
							ddb.forEach( function(element, index) {

								var datas = $.param({
									supprimer:0,
									id:element.id,      
									description: element.description,
									nom_table: table,
								});   
								apiFactory.add("delete_ddb/index",datas, config).success(function (data) {
									nbr_data_insert++ ;
									if ((index+1) == ddb.length) //affichage Popup
									{
										vm.showAlert('Information',nbr_data_insert+' enregistrement ajouté avec Succès !');
									}
								}).error(function (data) {
									vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
								});
							});
						//add ddb

					}).error(function (data) {
						vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
					});
				

				

				switch (table) 
				{
					case "revetement_toit":
						vm.allRecordsRevetementtoit = ddb ;
						break;
					case "revetement_sol":
						vm.allRecordsRevetementsol = ddb ;
						break;
					case "revetement_mur":
						vm.allRecordsRevetementmur = ddb ;
						break;
					case "toilette":
						vm.allRecordsToilette = ddb ;
						break;
					case "source_eau":
						vm.allRecordsSourceeau = ddb ;
						break;
					case "bien_equipement":
						vm.allRecordsBienequipement = ddb ;
						break;
					case "type_elevage":
						vm.allRecordsElevage = ddb ;
						break;
					case "type_culture":
						vm.allRecordsCulture = ddb ;
						break;
					default:

						break;
				}

			});  
		}
        vm.Select_table= function (nomdetable) {     
            if(parseInt(nomdetable) >0) {
				var nom_de_table=parseInt(nomdetable);
				switch(nom_de_table) {
					case 1:  {
						vm.nom_table="type_logement";
						vm.cas=1;
						break;
					}
					case 2:  {
						vm.nom_table="occupation_logement";
						vm.cas=2;
						break;
					}
					case 3:  {
						vm.nom_table="revetement_toit";
						vm.cas=3;
						break;
					}
					case 4:  {
						vm.nom_table="revetement_sol";
						vm.cas=4;
						break;
					}
					case 5:  {
						vm.nom_table="revetement_mur";
						vm.cas=5;
						break;
					}
					case 6:  {
						vm.nom_table="eclairage";
						vm.cas=6;
						break;
					}
					case 7:  {
						vm.nom_table="combustible";
						vm.cas=7;
						break;
					}
					case 8:  {
						vm.nom_table="toilette";
						vm.cas=8;
						break;
					}
					case 9:  {
						vm.nom_table="source_eau";
						vm.cas=9;
						break;
					}
					case 10:  {
						vm.nom_table="bien_equipement";
						vm.cas=10;
						break;
					}
					case 11:  {
						vm.nom_table="moyen_production";
						vm.cas=11;
						break;
					}
					case 12:  {
						vm.nom_table="source_revenu";
						vm.cas=12;
						break;
					}
					case 13:  {
						vm.nom_table="type_elevage";
						vm.cas=13;
						break;
					}
					case 14:  {
						vm.nom_table="type_culture";
						vm.cas=14;
						break;
					}
					case 15:  {
						vm.nom_table="type_aliment";
						vm.cas=15;
						break;
					}
					case 16:  {
						vm.nom_table="strategie_alimentaire";
						vm.cas=16;
						break;
					}
					case 17:  {
						vm.nom_table="type_probleme";
						vm.cas=17;
						break;
					}
					case 18:  {
						vm.nom_table="strategie_revenu";
						vm.cas=18;
						break;
					}
					case 19:  {
						vm.nom_table="activite_recours_menage";
						vm.cas=19;
						break;
					}
					case 20:  {
						vm.nom_table="service_beneficie";
						vm.cas=20;
						break;
					}
					case 21:  {
						vm.nom_table="infrastructure";
						vm.cas=21;
						break;
					}
					default: {
						vm.nom_table="type_logement";
						vm.cas=1;
						break;
					}
				}				
			} else {
				vm.nom_table="type_logement";
				vm.cas=1;
			};
        };
		function ajout(possession,suppression) {
            test_existence (possession,suppression);
        }
        function insert_in_base(possession,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItem==false) {
			   getId = possession.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: possession.description,
				nom_table: vm.nom_table,
			});       
			//factory
			apiFactory.add("enquete_menage/index",datas, config).success(function (data) {
				if (NouvelItem == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
						switch(vm.cas) {
							case 1:  {
								vm.selectedItemTypelogement.description = possession.description;
								vm.selectedItemTypelogement.$selected = false;
								vm.selectedItemTypelogement.$edit = false;
								vm.selectedItemTypelogement ={};
								break;
							}
							case 2:  {
								vm.selectedItemOccupationlogement.description = possession.description;
								vm.selectedItemOccupationlogement.$selected = false;
								vm.selectedItemOccupationlogement.$edit = false;
								vm.selectedItemOccupationlogement ={};
								break;
							}
							case 3:  {
								vm.selectedItemRevetementtoit.description = possession.description;
								vm.selectedItemRevetementtoit.$selected = false;
								vm.selectedItemRevetementtoit.$edit = false;
								vm.selectedItemRevetementtoit ={};
								break;
							}
							case 4:  {
								vm.selectedItemRevetementsol.description = possession.description;
								vm.selectedItemRevetementsol.$selected = false;
								vm.selectedItemRevetementsol.$edit = false;
								vm.selectedItemRevetementsol ={};
								break;
							}
							case 5:  {
								vm.selectedItemRevetementmur.description = possession.description;
								vm.selectedItemRevetementmur.$selected = false;
								vm.selectedItemRevetementmur.$edit = false;
								vm.selectedItemRevetementmur ={};
								break;
							}
							case 6:  {
								vm.selectedItemSourceeclairage.description = possession.description;
								vm.selectedItemSourceeclairage.$selected = false;
								vm.selectedItemSourceeclairage.$edit = false;
								vm.selectedItemSourceeclairage ={};
								break;
							}
							case 7:  {
								vm.selectedItemCombustible.description = possession.description;
								vm.selectedItemCombustible.$selected = false;
								vm.selectedItemCombustible.$edit = false;
								vm.selectedItemCombustible ={};
								break;
							}
							case 8:  {
								vm.selectedItemToilette.description = possession.description;
								vm.selectedItemToilette.$selected = false;
								vm.selectedItemToilette.$edit = false;
								vm.selectedItemToilette ={};
								break;
							}
							case 9:  {
								vm.selectedItemSourceeau.description = possession.description;
								vm.selectedItemSourceeau.$selected = false;
								vm.selectedItemSourceeau.$edit = false;
								vm.selectedItemSourceeau ={};
								break;
							}
							case 10:  {
								vm.selectedItemBienequipement.description = possession.description;
								vm.selectedItemBienequipement.$selected = false;
								vm.selectedItemBienequipement.$edit = false;
								vm.selectedItemBienequipement ={};
								break;
							}
							case 11:  {
								vm.selectedItemMoyenproduction.description = possession.description;
								vm.selectedItemMoyenproduction.$selected = false;
								vm.selectedItemMoyenproduction.$edit = false;
								vm.selectedItemMoyenproduction ={};
								break;
							}
							case 12:  {
								vm.selectedItemSourcerevenu.description = possession.description;
								vm.selectedItemSourcerevenu.$selected = false;
								vm.selectedItemSourcerevenu.$edit = false;
								vm.selectedItemSourcerevenu ={};
								break;
							}
							case 13:  {
								vm.selectedItemElevage.description = possession.description;
								vm.selectedItemElevage.$selected = false;
								vm.selectedItemElevage.$edit = false;
								vm.selectedItemElevage ={};
								break;
							}
							case 14:  {
								vm.selectedItemCulture.description = possession.description;
								vm.selectedItemCulture.$selected = false;
								vm.selectedItemCulture.$edit = false;
								vm.selectedItemCulture ={};
								break;
							}
							case 15:  {
								vm.selectedItemAliment.description = possession.description;
								vm.selectedItemAliment.$selected = false;
								vm.selectedItemAliment.$edit = false;
								vm.selectedItemAliment ={};
								break;
							}
							case 16:  {
								vm.selectedItemStrategiealimentaire.description = possession.description;
								vm.selectedItemStrategiealimentaire.$selected = false;
								vm.selectedItemStrategiealimentaire.$edit = false;
								vm.selectedItemStrategiealimentaire ={};
								break;
							}
							case 17:  {
								vm.selectedItemProblememenage.description = possession.description;
								vm.selectedItemProblememenage.$selected = false;
								vm.selectedItemProblememenage.$edit = false;
								vm.selectedItemProblememenage ={};
								break;
							}
							case 18:  {
								vm.selectedItemStrategierevenu.description = possession.description;
								vm.selectedItemStrategierevenu.$selected = false;
								vm.selectedItemStrategierevenu.$edit = false;
								vm.selectedItemStrategierevenu ={};
								break;
							}
							case 19:  {
								vm.selectedItemActiviterecoursmenage.description = possession.description;
								vm.selectedItemActiviterecoursmenage.$selected = false;
								vm.selectedItemActiviterecoursmenage.$edit = false;
								vm.selectedItemActiviterecoursmenage ={};
								break;
							}
							case 20:  {
								vm.selectedItemServicebeneficie.description = possession.description;
								vm.selectedItemServicebeneficie.$selected = false;
								vm.selectedItemServicebeneficie.$edit = false;
								vm.selectedItemServicebeneficie ={};
								break;
							}
							case 21:  {
								vm.selectedItemInfrastructure.description = possession.description;
								vm.selectedItemInfrastructure.$selected = false;
								vm.selectedItemInfrastructure.$edit = false;
								vm.selectedItemInfrastructure ={};
								break;
							}
							default: {
								break;
							}
						}	
					} else {    
						switch(vm.cas) {
							case 1:  {
								vm.allRecordsTypelogement = vm.allRecordsTypelogement.filter(function(obj) {
									return obj.id !== vm.selectedItemTypelogement.id;
								});
								break;
							}
							case 2:  {
								vm.allRecordsOccupationlogement = vm.allRecordsOccupationlogement.filter(function(obj) {
									return obj.id !== vm.selectedItemOccupationlogement.id;
								});
								break;
							}
							case 3:  {
								vm.allRecordsRevetementtoit = vm.allRecordsRevetementtoit.filter(function(obj) {
									return obj.id !== vm.selectedItemRevetementtoit.id;
								});
								break;
							}
							case 4:  {
								vm.allRecordsRevetementsol = vm.allRecordsRevetementsol.filter(function(obj) {
									return obj.id !== vm.selectedItemRevetementsol.id;
								});
								break;
							}
							case 5:  {
								vm.allRecordsRevetementmur = vm.allRecordsRevetementmur.filter(function(obj) {
									return obj.id !== vm.selectedItemRevetementmur.id;
								});
								break;
							}
							case 6:  {
								vm.allRecordsSourceeclairage = vm.allRecordsSourceeclairage.filter(function(obj) {
									return obj.id !== vm.selectedItemSourceeclairage.id;
								});
								break;
							}
							case 7:  {
								vm.allRecordsCombustible = vm.allRecordsCombustible.filter(function(obj) {
									return obj.id !== vm.selectedItemCombustible.id;
								});
								break;
							}
							case 8:  {
								vm.allRecordsToilette = vm.allRecordsToilette.filter(function(obj) {
									return obj.id !== vm.selectedItemToilette.id;
								});
								break;
							}
							case 9:  {
								vm.allRecordsSourceeau = vm.allRecordsSourceeau.filter(function(obj) {
									return obj.id !== vm.selectedItemSourceeau.id;
								});
								break;
							}
							case 10:  {
								vm.allRecordsBienequipement = vm.allRecordsBienequipement.filter(function(obj) {
									return obj.id !== vm.selectedItemBienequipement.id;
								});
								break;
							}
							case 11:  {
								vm.allRecordsMoyenproduction = vm.allRecordsMoyenproduction.filter(function(obj) {
									return obj.id !== vm.selectedItemMoyenproduction.id;
								});
								break;
							}
							case 12:  {
								vm.allRecordsSourcerevenu = vm.allRecordsSourcerevenu.filter(function(obj) {
									return obj.id !== vm.selectedItemSourcerevenu.id;
								});
								break;
							}
							case 13:  {
								vm.allRecordsElevage = vm.allRecordsElevage.filter(function(obj) {
									return obj.id !== vm.selectedItemElevage.id;
								});
								break;
							}
							case 14:  {
								vm.allRecordsCulture = vm.allRecordsCulture.filter(function(obj) {
									return obj.id !== vm.selectedItemCulture.id;
								});
								break;
							}
							case 15:  {
								vm.allRecordsAliment = vm.allRecordsAliment.filter(function(obj) {
									return obj.id !== vm.selectedItemAliment.id;
								});
								break;
							}
							case 16:  {
								vm.allRecordsStrategiealimentaire = vm.allRecordsStrategiealimentaire.filter(function(obj) {
									return obj.id !== vm.selectedItemStrategiealimentaire.id;
								});
								break;
							}
							case 17:  {
								vm.allRecordsProblememenage = vm.allRecordsProblememenage.filter(function(obj) {
									return obj.id !== vm.selectedItemProblememenage.id;
								});
								break;
							}
							case 18:  {
								vm.allRecordsStrategierevenu = vm.allRecordsStrategierevenu.filter(function(obj) {
									return obj.id !== vm.selectedItemStrategierevenu.id;
								});
								break;
							}
							case 19:  {
								vm.allRecordsActiviterecoursmenage = vm.allRecordsActiviterecoursmenage.filter(function(obj) {
									return obj.id !== vm.selectedItemActiviterecoursmenage.id;
								});
								break;
							}
							case 20:  {
								vm.allRecordsServicebeneficie = vm.allRecordsServicebeneficie.filter(function(obj) {
									return obj.id !== vm.selectedItemServicebeneficie.id;
								});
								break;
							}
							case 21:  {
								vm.allRecordsInfrastructure = vm.allRecordsInfrastructure.filter(function(obj) {
									return obj.id !== vm.selectedItemInfrastructure.id;
								});
								break;
							}
							default: {
								break;
							}
						}				
					}
				} else {
					possession.id=data.response;	
					NouvelItem=false;
				}
				possession.$selected=false;
				possession.$edit=false;
				vm.selectedItem={};
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
		vm.showAlert = function(titre,textcontent) {
			// Appending dialog to document.body to cover sidenav in docs app
			// Modal dialogs should fully cover application
			// to prevent interaction outside of dialog
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
		// Type logement
        vm.selectionTypelogement= function (item) {     
            vm.selectedItemTypelogement = item;
        };
        $scope.$watch('vm.selectedItemTypelogement', function() {
			if (!vm.allRecordsTypelogement) return;
			vm.allRecordsTypelogement.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypelogement.$selected = true;
        });
        vm.ajouterTypelogement = function () {
            vm.selectedItemTypelogement.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsTypelogement.push(items);
		    vm.allRecordsTypelogement.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypelogement = it;
				}
			});			
        };
        vm.annulerTypelogement = function(item) {
			if (!item.id) {
				vm.allRecords.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemTypelogement = {} ;
			vm.selectedItemTypelogement.$selected = false;
       };
        vm.modifierTypelogement = function(item) {
			NouvelItem = false ;
			vm.selectedItemTypelogement = item;
			currentItem = angular.copy(vm.selectedItemTypelogement);
			$scope.vm.allRecordsTypelogement.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypelogement.description = vm.selectedItemTypelogement.description;
			vm.selectedItemTypelogement.$edit = true;	
        };
        vm.supprimerTypelogement = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemTypelogement,1);
			}, function() {
			});
        }
		// Type logement
		// Occupation logement
        vm.selectionOccupationlogement= function (item) {     
            vm.selectedItemOccupationlogement = item;
        };
        $scope.$watch('vm.selectedItemOccupationlogement', function() {
			if (!vm.allRecordsOccupationlogement) return;
			vm.allRecordsOccupationlogement.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemOccupationlogement.$selected = true;
        });
        vm.ajouterOccupationlogement = function () {
            vm.selectedItemOccupationlogement.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsOccupationlogement.push(items);
		    vm.allRecordsOccupationlogement.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemOccupationlogement = it;
				}
			});			
        };
        vm.annulerOccupationlogement = function(item) {
			if (!item.id) {
				vm.allRecordsOccupationlogement.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemOccupationlogement = {} ;
			vm.selectedItemOccupationlogement.$selected = false;
       };
        vm.modifierOccupationlogement = function(item) {
			NouvelItem = false ;
			vm.selectedItemOccupationlogement = item;
			currentItem = angular.copy(vm.selectedItemOccupationlogement);
			$scope.vm.allRecordsOccupationlogement.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemOccupationlogement.description = vm.selectedItemOccupationlogement.description;
			vm.selectedItemOccupationlogement.$edit = true;	
        };
        vm.supprimerOccupationlogement = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemOccupationlogement,1);
			}, function() {
			});
        }
		// Occupation logement
		// Revetement toit
        vm.selectionRevetementtoit= function (item) {     
            vm.selectedItemRevetementtoit = item;
        };
        $scope.$watch('vm.selectedItemRevetementtoit', function() {
			if (!vm.allRecordsRevetementtoit) return;
			vm.allRecordsRevetementtoit.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemRevetementtoit.$selected = true;
        });
        vm.ajouterRevetementtoit = function () {
            vm.selectedItemRevetementtoit.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsRevetementtoit.push(items);
		    vm.allRecordsRevetementtoit.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemRevetementtoit = it;
				}
			});			
        };
        vm.annulerRevetementtoit = function(item) {
			if (!item.id) {
				vm.allRecordsRevetementtoit.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemRevetementtoit = {} ;
			vm.selectedItemRevetementtoit.$selected = false;
       };
        vm.modifierRevetementtoit = function(item) {
			NouvelItem = false ;
			vm.selectedItemRevetementtoit = item;
			currentItem = angular.copy(vm.selectedItemRevetementtoit);
			$scope.vm.allRecordsRevetementtoit.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemRevetementtoit.description = vm.selectedItemRevetementtoit.description;
			vm.selectedItemRevetementtoit.$edit = true;	
        };
        vm.supprimerRevetementtoit = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemRevetementtoit,1);
			}, function() {
			});
        }
		// Revetement toit
		// Revetement sol
        vm.selectionRevetementsol= function (item) {     
            vm.selectedItemRevetementsol = item;
        };
        $scope.$watch('vm.selectedItemRevetementsol', function() {
			if (!vm.allRecordsRevetementsol) return;
			vm.allRecordsRevetementsol.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemRevetementsol.$selected = true;
        });
        vm.ajouterRevetementsol = function () {
            vm.selectedItemRevetementsol.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsRevetementsol.push(items);
		    vm.allRecordsRevetementsol.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemRevetementsol = it;
				}
			});			
        };
        vm.annulerRevetementsol = function(item) {
			if (!item.id) {
				vm.allRecordsRevetementsol.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemRevetementsol = {} ;
			vm.selectedItemRevetementsol.$selected = false;
       };
        vm.modifierRevetementsol = function(item) {
			NouvelItem = false ;
			vm.selectedItemRevetementsol = item;
			currentItem = angular.copy(vm.selectedItemRevetementsol);
			$scope.vm.allRecordsRevetementsol.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemRevetementsol.description = vm.selectedItemRevetementsol.description;
			vm.selectedItemRevetementsol.$edit = true;	
        };
        vm.supprimerRevetementsol = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemRevetementsol,1);
			}, function() {
			});
        }
		// Revetement sol
		// Revetement mur     
        vm.selectionRevetementmur= function (item) {     
            vm.selectedItemRevetementmur = item;
        };
        $scope.$watch('vm.selectedItemRevetementmur', function() {
			if (!vm.allRecordsRevetementmur) return;
			vm.allRecordsRevetementmur.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemRevetementmur.$selected = true;
        });
        vm.ajouterRevetementmur = function () {
            vm.selectedItemRevetementmur.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsRevetementmur.push(items);
		    vm.allRecordsRevetementmur.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemRevetementmur = it;
				}
			});			
        };
        vm.annulerRevetementmur = function(item) {
			if (!item.id) {
				vm.allRecordsRevetementmur.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemRevetementmur = {} ;
			vm.selectedItemRevetementmur.$selected = false;
       };
        vm.modifierRevetementmur = function(item) {
			NouvelItem = false ;
			vm.selectedItemRevetementmur = item;
			currentItem = angular.copy(vm.selectedItemRevetementmur);
			$scope.vm.allRecordsRevetementmur.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemRevetementmur.description = vm.selectedItemRevetementmur.description;
			vm.selectedItemRevetementmur.$edit = true;	
        };
        vm.supprimerRevetementmur = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemRevetementmur,1);
			}, function() {
			});
        }
		// Revetement mur     
		// Source eclairage   
        vm.selectionSourceeclairage= function (item) {     
            vm.selectedItemSourceeclairage = item;
        };
        $scope.$watch('vm.selectedItemSourceeclairage', function() {
			if (!vm.allRecordsSourceeclairage) return;
			vm.allRecordsSourceeclairage.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemSourceeclairage.$selected = true;
        });
        vm.ajouterSourceeclairage = function () {
            vm.selectedItemSourceeclairage.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsSourceeclairage.push(items);
		    vm.allRecordsSourceeclairage.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemSourceeclairage = it;
				}
			});			
        };
        vm.annulerSourceeclairage = function(item) {
			if (!item.id) {
				vm.allRecordsSourceeclairage.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemSourceeclairage = {} ;
			vm.selectedItemSourceeclairage.$selected = false;
       };
        vm.modifierSourceeclairage = function(item) {
			NouvelItem = false ;
			vm.selectedItemSourceeclairage = item;
			currentItem = angular.copy(vm.selectedItemSourceeclairage);
			$scope.vm.allRecordsSourceeclairage.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemSourceeclairage.description = vm.selectedItemSourceeclairage.description;
			vm.selectedItemSourceeclairage.$edit = true;	
        };
        vm.supprimerSourceeclairage = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemSourceeclairage,1);
			}, function() {
			});
        }
		// Source eclairage 
		// Combustible  
        vm.selectionCombustible= function (item) {     
            vm.selectedItemCombustible = item;
        };
        $scope.$watch('vm.selectedItemCombustible', function() {
			if (!vm.allRecordsCombustible) return;
			vm.allRecordsCombustible.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemCombustible.$selected = true;
        });
        vm.ajouterCombustible = function () {
            vm.selectedItemCombustible.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsCombustible.push(items);
		    vm.allRecordsCombustible.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemCombustible = it;
				}
			});			
        };
        vm.annuler = function(item) {
			if (!item.id) {
				vm.allRecordsCombustible.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemCombustible = {} ;
			vm.selectedItemCombustible.$selected = false;
       };
        vm.modifierCombustible = function(item) {
			NouvelItem = false ;
			vm.selectedItemCombustible = item;
			currentItem = angular.copy(vm.selectedICombustibletem);
			$scope.vm.allRecordsCombustible.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemCombustible.description = vm.selectedItemCombustible.description;
			vm.selectedItemCombustible.$edit = true;	
        };
        vm.supprimerCombustible = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemCombustible,1);
			}, function() {
			});
        }
		// Combustible  
		// Toilette 
        vm.selectionToilette= function (item) {     
            vm.selectedItemToilette = item;
        };
        $scope.$watch('vm.selectedItemToilette', function() {
			if (!vm.allRecordsToilette) return;
			vm.allRecordsToilette.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemToilette.$selected = true;
        });
        vm.ajouterToilette = function () {
            vm.selectedItemToilette.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsToilette.push(items);
		    vm.allRecordsToilette.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemToilette = it;
				}
			});			
        };
        vm.annulerToilette = function(item) {
			if (!item.id) {
				vm.allRecordsToilette.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemToilette = {} ;
			vm.selectedItemToilette.$selected = false;
       };
        vm.modifierToilette = function(item) {
			NouvelItem = false ;
			vm.selectedItemToilette = item;
			currentItem = angular.copy(vm.selectedItemToilette);
			$scope.vm.allRecordsToilette.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemToilette.description = vm.selectedItemToilette.description;
			vm.selectedItemToilette.$edit = true;	
        };
        vm.supprimerToilette = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemToilette,1);
			}, function() {
			});
        }
		// Toilette    
		// Source d'eau    
        vm.selectionSourceeau= function (item) {     
            vm.selectedItemSourceeau = item;
        };
        $scope.$watch('vm.selectedItemSourceeau', function() {
			if (!vm.allRecordsSourceeau) return;
			vm.allRecordsSourceeau.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemSourceeau.$selected = true;
        });
        vm.ajouterSourceeau = function () {
            vm.selectedItemSourceeau.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsSourceeau.push(items);
		    vm.allRecordsSourceeau.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemSourceeau = it;
				}
			});			
        };
        vm.annulerSourceeau = function(item) {
			if (!item.id) {
				vm.allRecordsSourceeau.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemSourceeau = {} ;
			vm.selectedItemSourceeau.$selected = false;
       };
        vm.modifierSourceeau = function(item) {
			NouvelItem = false ;
			vm.selectedItemSourceeau = item;
			currentItem = angular.copy(vm.selectedItemSourceeau);
			$scope.vm.allRecordsSourceeau.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemSourceeau.description = vm.selectedItemSourceeau.description;
			vm.selectedItemSourceeau.$edit = true;	
        };
        vm.supprimerSourceeau = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemSourceeau,1);
			}, function() {
			});
        }
		// Source d'eau    
		// Bien equipement
        vm.selectionBienequipement= function (item) {     
            vm.selectedItemBienequipement = item;
        };
        $scope.$watch('vm.selectedItemBienequipement', function() {
			if (!vm.allRecordsBienequipement) return;
			vm.allRecordsBienequipement.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemBienequipement.$selected = true;
        });
        vm.ajouterBienequipement = function () {
            vm.selectedItemBienequipement.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsBienequipement.push(items);
		    vm.allRecordsBienequipement.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemBienequipement = it;
				}
			});			
        };
        vm.annulerBienequipement = function(item) {
			if (!item.id) {
				vm.allRecords.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemBienequipement = {} ;
			vm.selectedItemBienequipement.$selected = false;
       };
        vm.modifierBienequipement = function(item) {
			NouvelItem = false ;
			vm.selectedItemBienequipement = item;
			currentItem = angular.copy(vm.selectedItemBienequipement);
			$scope.vm.allRecordsBienequipement.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemBienequipement.description = vm.selectedItemBienequipement.description;
			vm.selectedItemBienequipement.$edit = true;	
        };
        vm.supprimerBienequipement = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemBienequipement,1);
			}, function() {
			});
        }
		// Bien equipement    
		// Moyen production 
        vm.selectionMoyenproduction= function (item) {     
            vm.selectedItemMoyenproduction = item;
        };
        $scope.$watch('vm.selectedItemMoyenproduction', function() {
			if (!vm.allRecordsMoyenproduction) return;
			vm.allRecordsMoyenproduction.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemMoyenproduction.$selected = true;
        });
        vm.ajouterMoyenproduction = function () {
            vm.selectedItemMoyenproduction.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsMoyenproduction.push(items);
		    vm.allRecordsMoyenproduction.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemMoyenproduction = it;
				}
			});			
        };
        vm.annulerMoyenproduction = function(item) {
			if (!item.id) {
				vm.allRecordsMoyenproduction.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemMoyenproduction = {} ;
			vm.selectedItemMoyenproduction.$selected = false;
       };
        vm.modifierMoyenproduction = function(item) {
			NouvelItem = false ;
			vm.selectedItemMoyenproduction = item;
			currentItem = angular.copy(vm.selectedItemMoyenproduction);
			$scope.vm.allRecordsMoyenproduction.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemMoyenproduction.description = vm.selectedItemMoyenproduction.description;
			vm.selectedItemMoyenproduction.$edit = true;	
        };
        vm.supprimerMoyenproduction = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemMoyenproduction,1);
			}, function() {
			});
        }
		// Moyen production   
		// Source revenu   
        vm.selectionSourcerevenu= function (item) {     
            vm.selectedItemSourcerevenu = item;
        };
        $scope.$watch('vm.selectedItemSourcerevenu', function() {
			if (!vm.allRecordsSourcerevenu) return;
			vm.allRecordsSourcerevenu.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemSourcerevenu.$selected = true;
        });
        vm.ajouterSourcerevenu = function () {
            vm.selectedItemSourcerevenu.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsSourcerevenu.push(items);
		    vm.allRecordsSourcerevenu.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemSourcerevenu = it;
				}
			});			
        };
        vm.annulerSourcerevenu = function(item) {
			if (!item.id) {
				vm.allRecordsSourcerevenu.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemSourcerevenu = {} ;
			vm.selectedItemSourcerevenu.$selected = false;
       };
        vm.modifierSourcerevenu = function(item) {
			NouvelItem = false ;
			vm.selectedItemSourcerevenu = item;
			currentItem = angular.copy(vm.selectedItemSourcerevenu);
			$scope.vm.allRecordsSourcerevenu.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemSourcerevenu.description = vm.selectedItemSourcerevenu.description;
			vm.selectedItemSourcerevenu.$edit = true;	
        };
        vm.supprimerSourcerevenu = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemSourcerevenu,1);
			}, function() {
			});
        }
		// Source revenu   
		// Elevage   
        vm.selectionElevage= function (item) {     
            vm.selectedItemElevage = item;
        };
        $scope.$watch('vm.selectedItemElevage', function() {
			if (!vm.allRecordsElevage) return;
			vm.allRecordsElevage.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemElevage.$selected = true;
        });
        vm.ajouterElevage = function () {
            vm.selectedItemElevage.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsElevage.push(items);
		    vm.allRecordsElevage.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemElevage = it;
				}
			});			
        };
        vm.annulerElevage = function(item) {
			if (!item.id) {
				vm.allRecordsElevage.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemElevage = {} ;
			vm.selectedItemElevage.$selected = false;
       };
        vm.modifierElevage = function(item) {
			NouvelItem = false ;
			vm.selectedItemElevage = item;
			currentItem = angular.copy(vm.selectedItemElevage);
			$scope.vm.allRecordsElevage.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemElevage.description = vm.selectedItemElevage.description;
			vm.selectedItemElevage.$edit = true;	
        };
        vm.supprimerElevage = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemElevage,1);
			}, function() {
			});
        }
		// Elevage 
		// Culture  
        vm.selectionCulture= function (item) {     
            vm.selectedItemCulture = item;
        };
        $scope.$watch('vm.selectedItemCulture', function() {
			if (!vm.allRecordsCulture) return;
			vm.allRecordsCulture.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemCulture.$selected = true;
        });
        vm.ajouterCulture = function () {
            vm.selectedItemCulture.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsCulture.push(items);
		    vm.allRecordsCulture.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemCulture = it;
				}
			});			
        };
        vm.annulerCulture = function(item) {
			if (!item.id) {
				vm.allRecordsCulture.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemCulture = {} ;
			vm.selectedItemCulture.$selected = false;
       };
        vm.modifierCulture = function(item) {
			NouvelItem = false ;
			vm.selectedItemCulture = item;
			currentItem = angular.copy(vm.selectedItemCulture);
			$scope.vm.allRecordsCulture.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemCulture.description = vm.selectedItemCulture.description;
			vm.selectedItemCulture.$edit = true;	
        };
        vm.supprimerCulture = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemCulture,1);
			}, function() {
			});
        }
		// Culture
		// Aliment
        vm.selectionAliment= function (item) {     
            vm.selectedItemAliment = item;
        };
        $scope.$watch('vm.selectedItemAliment', function() {
			if (!vm.allRecordsAliment) return;
			vm.allRecordsAliment.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemAliment.$selected = true;
        });
        vm.ajouterAliment = function () {
            vm.selectedItemAliment.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsAliment.push(items);
		    vm.allRecordsAliment.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemAliment = it;
				}
			});			
        };
        vm.annulerAliment = function(item) {
			if (!item.id) {
				vm.allRecordsAliment.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemAliment = {} ;
			vm.selectedItemAliment.$selected = false;
       };
        vm.modifierAliment = function(item) {
			NouvelItem = false ;
			vm.selectedItemAliment = item;
			currentItem = angular.copy(vm.selectedItemAliment);
			$scope.vm.allRecordsAliment.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemAliment.description = vm.selectedItemAliment.description;
			vm.selectedItemAliment.$edit = true;	
        };
        vm.supprimerAliment = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemAliment,1);
			}, function() {
			});
        }
		// Aliment    
		// Strategie alimentaire
        vm.selectionStrategiealimentaire= function (item) {     
            vm.selectedItemStrategiealimentaire = item;
        };
        $scope.$watch('vm.selectedItemStrategiealimentaire', function() {
			if (!vm.allRecordsStrategiealimentaire) return;
			vm.allRecordsStrategiealimentaire.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemStrategiealimentaire.$selected = true;
        });
        vm.ajouterStrategiealimentaire = function () {
            vm.selectedItemStrategiealimentaire.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsStrategiealimentaire.push(items);
		    vm.allRecordsStrategiealimentaire.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemStrategiealimentaire = it;
				}
			});			
        };
        vm.annulerStrategiealimentaire = function(item) {
			if (!item.id) {
				vm.allRecordsStrategiealimentaire.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemStrategiealimentaire = {} ;
			vm.selectedItemStrategiealimentaire.$selected = false;
       };
        vm.modifierStrategiealimentaire = function(item) {
			NouvelItem = false ;
			vm.selectedItemStrategiealimentaire = item;
			currentItem = angular.copy(vm.selectedItemStrategiealimentaire);
			$scope.vm.allRecordsStrategiealimentaire.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemStrategiealimentaire.description = vm.selectedItemStrategiealimentaire.description;
			vm.selectedItemStrategiealimentaire.$edit = true;	
        };
        vm.supprimerStrategiealimentaire = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemStrategiealimentaire,1);
			}, function() {
			});
        }
		// Strategie alimentaire    
		// Proble memenage
        vm.selectionProblememenage= function (item) {     
            vm.selectedItemProblememenage = item;
        };
        $scope.$watch('vm.selectedItemProblememenage', function() {
			if (!vm.allRecordsProblememenage) return;
			vm.allRecordsProblememenage.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemProblememenage.$selected = true;
        });
        vm.ajouterProblememenage = function () {
            vm.selectedItemProblememenage.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsProblememenage.push(items);
		    vm.allRecordsProblememenage.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemProblememenage = it;
				}
			});			
        };
        vm.annulerProblememenage = function(item) {
			if (!item.id) {
				vm.allRecordsProblememenage.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemProblememenage = {} ;
			vm.selectedItemProblememenage.$selected = false;
       };
        vm.modifierProblememenage = function(item) {
			NouvelItem = false ;
			vm.selectedItemProblememenage = item;
			currentItem = angular.copy(vm.selectedItemProblememenage);
			$scope.vm.allRecordsProblememenage.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemProblememenage.description = vm.selectedItemProblememenage.description;
			vm.selectedItemProblememenage.$edit = true;	
        };
        vm.supprimerProblememenage = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemProblememenage,1);
			}, function() {
			});
        }
		// Probleme menage    
		// Strategie revenu
        vm.selectionStrategierevenu= function (item) {     
            vm.selectedItemStrategierevenu = item;
        };
        $scope.$watch('vm.selectedItemStrategierevenu', function() {
			if (!vm.allRecordsStrategierevenu) return;
			vm.allRecordsStrategierevenu.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemStrategierevenu.$selected = true;
        });
        vm.ajouterStrategierevenu = function () {
            vm.selectedItemStrategierevenu.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsStrategierevenu.push(items);
		    vm.allRecordsStrategierevenu.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemStrategierevenu = it;
				}
			});			
        };
        vm.annulerStrategierevenu = function(item) {
			if (!item.id) {
				vm.allRecordsStrategierevenu.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemStrategierevenu = {} ;
			vm.selectedItemStrategierevenu.$selected = false;
       };
        vm.modifierStrategierevenu = function(item) {
			NouvelItem = false ;
			vm.selectedItemStrategierevenu = item;
			currentItem = angular.copy(vm.selectedItemStrategierevenu);
			$scope.vm.allRecordsStrategierevenu.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemStrategierevenu.description = vm.selectedItemStrategierevenu.description;
			vm.selectedItemStrategierevenu.$edit = true;	
        };
        vm.supprimerStrategierevenu = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemStrategierevenu,1);
			}, function() {
			});
        }
		// Strategierevenu    
		// Activite recours menage
        vm.selectionActiviterecoursmenage= function (item) {     
            vm.selectedItemActiviterecoursmenage = item;
        };
        $scope.$watch('vm.selectedItemActiviterecoursmenage', function() {
			if (!vm.allRecordsActiviterecoursmenage) return;
			vm.allRecordsActiviterecoursmenage.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemActiviterecoursmenage.$selected = true;
        });
        vm.ajouterActiviterecoursmenage = function () {
            vm.selectedItemActiviterecoursmenage.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsActiviterecoursmenage.push(items);
		    vm.allRecordsActiviterecoursmenage.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemActiviterecoursmenage = it;
				}
			});			
        };
        vm.annulerActiviterecoursmenage = function(item) {
			if (!item.id) {
				vm.allRecordsActiviterecoursmenage.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemActiviterecoursmenage = {} ;
			vm.selectedItemActiviterecoursmenage.$selected = false;
       };
        vm.modifierActiviterecoursmenage = function(item) {
			NouvelItem = false ;
			vm.selectedItemActiviterecoursmenage = item;
			currentItem = angular.copy(vm.selectedItemActiviterecoursmenage);
			$scope.vm.allRecordsActiviterecoursmenage.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemActiviterecoursmenage.description = vm.selectedItemActiviterecoursmenage.description;
			vm.selectedItemActiviterecoursmenage.$edit = true;	
        };
        vm.supprimerActiviterecoursmenage = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemActiviterecoursmenage,1);
			}, function() {
			});
        }
		// Activite recours menage    
		// Service beneficie
        vm.selectionServicebeneficie= function (item) {     
            vm.selectedItemServicebeneficie = item;
        };
        $scope.$watch('vm.selectedItemServicebeneficie', function() {
			if (!vm.allRecordsServicebeneficie) return;
			vm.allRecordsServicebeneficie.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemServicebeneficie.$selected = true;
        });
        vm.ajouterServicebeneficie = function () {
            vm.selectedItemServicebeneficie.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsServicebeneficie.push(items);
		    vm.allRecordsServicebeneficie.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemServicebeneficie = it;
				}
			});			
        };
        vm.annulerServicebeneficie = function(item) {
			if (!item.id) {
				vm.allRecordsServicebeneficie.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemServicebeneficie = {} ;
			vm.selectedItemServicebeneficie.$selected = false;
       };
        vm.modifierServicebeneficie = function(item) {
			NouvelItem = false ;
			vm.selectedItemServicebeneficie = item;
			currentItem = angular.copy(vm.selectedItemServicebeneficie);
			$scope.vm.allRecordsServicebeneficie.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemServicebeneficie.description = vm.selectedItemServicebeneficie.description;
			vm.selectedItemServicebeneficie.$edit = true;	
        };
        vm.supprimerServicebeneficie = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemServicebeneficie,1);
			}, function() {
			});
        }
		// Service beneficie    
		// Infrastructure
        vm.selectionInfrastructure= function (item) {     
            vm.selectedItemInfrastructure = item;
        };
        $scope.$watch('vm.selectedItemInfrastructure', function() {
			if (!vm.allRecordsInfrastructure) return;
			vm.allRecordsInfrastructure.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemInfrastructure.$selected = true;
        });
        vm.ajouterInfrastructure = function () {
            vm.selectedItemInfrastructure.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsInfrastructure.push(items);
		    vm.allRecordsInfrastructure.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemInfrastructure = it;
				}
			});			
        };
        vm.annulerInfrastructure = function(item) {
			if (!item.id) {
				vm.allRecordsInfrastructure.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemInfrastructure = {} ;
			vm.selectedItemInfrastructure.$selected = false;
       };
        vm.modifierInfrastructure = function(item) {
			NouvelItem = false ;
			vm.selectedItemInfrastructure = item;
			currentItem = angular.copy(vm.selectedItemInfrastructure);
			$scope.vm.allRecordsInfrastructure.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemInfrastructure.description = vm.selectedItemInfrastructure.description;
			vm.selectedItemInfrastructure.$edit = true;	
        };
        vm.supprimerInfrastructure = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemInfrastructure,1);
			}, function() {
			});
        }
		// Infrastructure  
        function test_existence (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					switch(vm.cas) {
						case 1:  {
							vm.allRecordsTypelogement.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 2:  {
							vm.allRecordsOccupationlogement.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 3:  {
							vm.allRecordsRevetementtoit.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 4:  { 
							vm.allRecordsRevetementsol.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 5:  {
							vm.allRecordsRevetementmur.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 6:  {
							vm.allRecordsSourceeclairage.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 7:  {
							vm.allRecordsCombustible.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 8:  {
							vm.allRecordsToilette.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 9:  {
							vm.allRecordsSourceeau.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 10:  {
							vm.allRecordsBienequipement.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 11:  {
							vm.allRecordsMoyenproduction.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 12:  {
							vm.allRecordsSourcerevenu.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 13:  {
							vm.allRecordsElevage.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 14:  {
							vm.allRecordsCulture.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 15:  {
							vm.allRecordsAliment.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 16:  {
							vm.allRecordsStrategiealimentaire.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 17:  {
							vm.allRecordsProblememenage.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 18:  {
							vm.allRecordsStrategierevenu.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 19:  {
							vm.allRecordsActiviterecoursmenage.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 20:  {
							vm.allRecordsServicebeneficie.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						case 21:  {
							vm.allRecordsInfrastructure.forEach(function(dispo) {   
								if((dispo.description==item.description) && dispo.id!=item.id) {
									doublon=1;	
								} 
							});
							break;
						}
						default: {
							break;
						}
					}				
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Description déjà utilisé')
					} else {
						insert_in_base(item,0);
					}
				} else {
				  insert_in_base(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir la description !");
			}		
        }
    }
})();
