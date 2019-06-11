(function ()
{
    'use strict';
    angular
        .module('app.comores.ddb.acteurs')
        .controller('ActeursController', ActeursController);

    /** @ngInject */
    function ActeursController(apiFactory, $state, $mdDialog, $scope) {
		var vm = this;
		vm.titrepage ="Ajout Tutelle";
		vm.ajout = ajout ;
		vm.ajoutActeur = ajoutActeur ;
		vm.ajoutActeurregional = ajoutActeurregional ;
		var NouvelItem=false;
		var NouvelItemActeur=false;
		var NouvelItemActeurregional=false;
		var currentItem;
		vm.selectedItemTypeacteur = {} ;
		vm.selectedItemActeur = {} ;
		vm.selectedItemActeurregional = {} ;
		vm.allregion =[];
		vm.allRecordsTypeacteur = [] ;
		vm.allRecordsActeur = [] ;
		vm.allRecordsActeurregional = [] ;
		vm.nom_table="type_acteur";
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
		vm.typeacteur_column = [{titre:"Description"},{titre:"Actions"}];
		vm.acteur_column = [{titre:"Type Act"},{titre:"Nom"},{titre:"Représentant"},{titre:"Contact"},{titre:"Adresse"},{titre:"Actions"}];
		vm.acteurregional_column = [{titre:"Type Act"},{titre:"Nom"},{titre:"Région"},{titre:"Représentant"},{titre:"Contact"},{titre:"Adresse"},{titre:"Actions"}];
		apiFactory.getAll("type_acteur/index").then(function(result){
			vm.allRecordsTypeacteur = result.data.response;
			apiFactory.getAll("acteur/index").then(function(result){
				vm.allRecordsActeur = result.data.response;
				apiFactory.getAll("acteur_regional/index").then(function(result){
					vm.allRecordsActeurregional = result.data.response;
					apiFactory.getAll("region/index").then(function(result){
						vm.allregion = result.data.response;
					});    
				});    
			});    
		});    
		function ajout(typeact,suppression) {
            test_existence (typeact,suppression);
        }
        function insert_in_base(typeact,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItem==false) {
			   getId = vm.selectedItem.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: typeact.description,
			});       
			//factory
			apiFactory.add("type_acteur/index",datas, config).success(function (data) {
				if (NouvelItem == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItem.description = typeact.description;
					  vm.selectedItem.$selected = false;
					  vm.selectedItem.$edit = false;
					  vm.selectedItem ={};
					} else {    
						vm.allRecordsTypeacteur = vm.allRecordsTypeacteur.filter(function(obj) {
							return obj.id !== vm.selectedItem.id;
						});
					}
				} else {
					typeact.id=data.response;	
					NouvelItem=false;
				}
				typeact.$selected=false;
				typeact.$edit=false;
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
        vm.selectionTypeacteur= function (item) {     
            vm.selectedItemTypeacteur = item;
        };
        $scope.$watch('vm.selectedItemTypeacteur', function() {
			if (!vm.allRecordsTypeacteur) return;
			vm.allRecordsTypeacteur.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemTypeacteur.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterTypeacteur = function () {
            vm.selectedItemTypeacteur.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecordsTypeacteur.push(items);
		    vm.allRecordsTypeacteur.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemTypeacteur = it;
				}
			});			
        };
        vm.annulerTypeacteur = function(item) {
			if (!item.id) {
				vm.allRecordsTypeacteur.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			vm.selectedItemTypeacteur = {} ;
			vm.selectedItemTypeacteur.$selected = false;
       };
        vm.modifierTypeacteur = function(item) {
			NouvelItem = false ;
			vm.selectedItemTypeacteur = item;
			currentItem = angular.copy(vm.selectedItemTypeacteur);
			$scope.vm.allRecordsTypeacteur.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemTypeacteur.description = vm.selectedItemTypeacteur.description;
			vm.selectedItemTypeacteur.$edit = true;	
        };
        vm.supprimerTypeacteur = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItemTypeacteur,1);
			}, function() {
			});
        }
        function test_existence (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsTypeacteur.forEach(function(dispo) {   
						if((dispo.description==item.description) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
					} else {
						insert_in_base(item,0);
					}
				} else {
				  insert_in_base(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir l'intitulé du type de financement !");
			}		
        }
		
	// ACTEURS	
		function ajoutActeur(entite,suppression) {
            test_existenceActeur (entite,suppression);
        }
        function insert_in_baseActeur(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemActeur==false) {
			   getId = vm.selectedItemActeur.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				nom: entite.nom,
				representant: entite.representant,
				contact: entite.contact,
				adresse: entite.adresse,
				id_type_acteur: entite.id_type_acteur,
			});       
			//factory
			apiFactory.add("acteur/index",datas, config).success(function (data) {
				if (NouvelItemActeur == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemActeur.nom = entite.nom;
					  vm.selectedItemActeur.representant = entite.representant;
					  vm.selectedItemActeur.contact = entite.contact;
					  vm.selectedItemActeur.adresse = entite.adresse;
					  vm.selectedItemActeurregional.id_type_acteur = entite.id_type_acteur;
					  vm.selectedItemActeurregional.typeacteur = entite.typeacteur;
					  vm.selectedItemActeur.$selected = false;
					  vm.selectedItemActeur.$edit = false;
					  vm.selectedItemActeur ={};
					} else {    
						vm.allRecordsActeur = vm.allRecordsActeur.filter(function(obj) {
							return obj.id !== vm.selectedItemActeur.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemActeur=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionActeur= function (item) {     
            vm.selectedItemActeur = item;
        };
        $scope.$watch('vm.selectedItemActeur', function() {
			if (!vm.allRecordsActeur) return;
			vm.allRecordsActeur.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemActeur.$selected = true;
        });
        vm.ajouterActeur = function () {
            vm.selectedItemActeur.$selected = false;
            NouvelItemActeur = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                nom: '',
                representant: '',
                contact: '',
                adresse: '',
			};
			vm.allRecordsActeur.push(items);
		    vm.allRecordsActeur.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemActeur = it;
				}
			});			
        };
        vm.annulerActeur = function(item) {
			if (!item.id) {
				vm.allRecordsActeur.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemActeur = false;
			 item.nom = currentItem.nom;
			 item.representant = currentItem.representant;
			 item.contact = currentItem.contact;
			 item.adresse = currentItem.adresse;
			 item.id_type_acteur = currentItem.id_type_acteur;
			 item.typeacteur = currentItem.typeacteur;
			vm.selectedItemActeur = {} ;
			vm.selectedItemActeur.$selected = false;
       };
        vm.modifierActeur = function(item) {
			NouvelItemActeur = false ;
			vm.selectedItemActeur = item;
			currentItem = angular.copy(vm.selectedItemActeur);
			$scope.vm.allRecordsActeur.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			item.nom = vm.selectedItemActeur.nom;
			item.representant = vm.selectedItemActeur.representant;
			item.contact = vm.selectedItemActeur.contact;
			item.adresse = vm.selectedItemActeur.adresse;
			if(vm.selectedItemActeur.id_type_acteur) {
				item.id_type_acteur = parseInt(vm.selectedItemActeur.id_type_acteur);
			}
			item.typeacteur = parseInt(vm.selectedItemActeur.typeacteur);
			vm.selectedItemActeur.$edit = true;	
        };
        vm.supprimerActeur = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutActeur(vm.selectedItemActeur,1);
			}, function() {
			});
        }
        function test_existenceActeur (item,suppression) {    
			if(item.nom.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsActeur.forEach(function(dispo) {   
						if((dispo.nom==item.nom) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Nom déjà utilisé')
					} else {
						insert_in_baseActeur(item,0);
					}
				} else {
				  insert_in_baseActeur(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir le nom de l'AGEX !");
			}		
        }		
	// ACTEURS REGIONAL	
		function ajoutActeurregional(entite,suppression) {
            test_existenceActeurregional (entite,suppression); 
        }
        function insert_in_baseActeurregional(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemActeurregional==false) {
			   getId = vm.selectedItemActeurregional.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				nom: entite.nom,
				representant: entite.representant,
				contact: entite.contact,
				adresse: entite.adresse,
				id_type_acteur: entite.id_type_acteur,
				id_region: entite.id_region,
			});       
			//factory
			apiFactory.add("acteur_regional/index",datas, config).success(function (data) {
				if (NouvelItemActeurregional == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemActeurregional.nom = entite.nom;
					  vm.selectedItemActeurregional.representant = entite.representant;
					  vm.selectedItemActeurregional.contact = entite.contact;
					  vm.selectedItemActeurregional.adresse = entite.adresse;
					  vm.selectedItemActeurregional.id_region = entite.id_region;
					  vm.selectedItemActeurregional.region = entite.region;
					  vm.selectedItemActeurregional.id_type_acteur = entite.id_type_acteur;
					  vm.selectedItemActeurregional.typeacteur = entite.typeacteur;
					  vm.selectedItemActeurregional.$selected = false;
					  vm.selectedItemActeurregional.$edit = false;
					  vm.selectedItemActeurregional ={};
					} else {    
						vm.allRecordsActeurregional = vm.allRecordsActeurregional.filter(function(obj) {
							return obj.id !== vm.selectedItemActeurregional.id;
						});
					}
				} else {
					entite.id=data.response;	
					NouvelItemActeurregional=false;
				}
				entite.$selected=false;
				entite.$edit=false;
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionActeurregional= function (item) {     
            vm.selectedItemActeurregional = item;
        };
        $scope.$watch('vm.selectedItemActeurregional', function() {
			if (!vm.allRecordsActeurregional) return;
			vm.allRecordsActeurregional.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemActeurregional.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterActeurregional = function () {
            vm.selectedItemActeurregional.$selected = false;
            NouvelItemActeurregional = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                nom: '',
                representant: '',
                contact: '',
                adresse: '',
			};
			vm.allRecordsActeurregional.push(items);
		    vm.allRecordsActeurregional.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemActeurregional = it;
				}
			});			
        };
        vm.annulerActeurregional = function(item) {
			if (!item.id) {
				vm.allRecordsActeurregional.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemActeurregional = false;
			 item.nom = currentItem.nom;
			 item.representant = currentItem.representant;
			 item.contact = currentItem.contact;
			 item.adresse = currentItem.adresse;
			 item.id_type_acteur = currentItem.id_type_acteur;
			 item.typeacteur = currentItem.typeacteur;
			 item.region = currentItem.region;
			 item.id_region = currentItem.id_region;
			vm.selectedItemActeurregional = {} ;
			vm.selectedItemActeurregional.$selected = false;
       };
        vm.modifierActeurregional = function(item) {
			NouvelItemActeurregional = false ;
			vm.selectedItemActeurregional = item;
			currentItem = angular.copy(vm.selectedItemActeurregional);
			$scope.vm.allRecordsActeurregional.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			item.nom = vm.selectedItemActeurregional.nom;
			item.representant = vm.selectedItemActeurregional.representant;
			item.contact = vm.selectedItemActeurregional.contact;
			item.adresse = vm.selectedItemActeurregional.adresse;
			if(vm.selectedItemActeur.id_type_acteur) {
				item.id_type_acteur = parseInt(vm.selectedItemActeur.id_type_acteur);
			}
			item.typeacteur = vm.selectedItemActeurregional.typeacteur;
			if(vm.selectedItemActeur.id_region) {
				item.id_region = parseInt(vm.selectedItemActeur.id_region);
			}
			item.region = parseInt(vm.selectedItemActeur.region);
			vm.selectedItemActeurregional.$edit = true;	
        };
        vm.supprimerActeurregional = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutActeurregional(vm.selectedItemActeurregional,1);
			}, function() {
			});
        }
        function test_existenceActeurregional (item,suppression) {    
			if(item.nom.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsActeurregional.forEach(function(dispo) {   
						if((dispo.nom==item.nom) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Nom déjà utilisé')
					} else {
						insert_in_baseActeurregional(item,0);
					}
				} else {
				  insert_in_baseActeurregional(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir le nom de l'AGEX !");
			}		
        }
        vm.modifierRegion = function (item) { 
			vm.allregion.forEach(function(prg) {
				if(prg.id==item.id_region) {
					item.region=[];
					var itemss = {
						id: prg.id,
						code: prg.code,
						nom: prg.nom,
					};
					item.region.push(itemss);
				}
			});
		}	
        vm.modifierTypeacteur = function (item) { 
			vm.allRecordsTypeacteur.forEach(function(prg) {
				if(prg.id==item.id_type_acteur) {
					item.typeacteur=[];
					var itemss = {
						id: prg.id,
						description: prg.description,
					};
					item.typeacteur.push(itemss);
				}
			});
			console.log(item.typeacteur);
		}	
    }
  })();
