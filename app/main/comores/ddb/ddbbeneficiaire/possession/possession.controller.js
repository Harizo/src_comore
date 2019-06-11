(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.ddbbeneficiaire.possession')
        .controller('PossessionController', PossessionController);
    /** @ngInject */
    function PossessionController($mdDialog, $scope, apiFactory, $state)  {
		var vm = this;
		vm.titrepage ="Ajout Tutelle";
		vm.ajout = ajout ;
		var NouvelItem=false;
		var currentItem;
		vm.selectedItem = {} ;
		vm.allRecords = [] ;
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
		vm.donnateur_column = [{titre:"Description"},{titre:"Valeur"},{titre:"Actions"}];
		apiFactory.getAll("possession/index").then(function(result){
			vm.allRecords = result.data.response;
		});    
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
			   getId = vm.selectedItem.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				description: possession.description,
				valeur: possession.valeur,
			});       
			//factory
			apiFactory.add("possession/index",datas, config).success(function (data) {
				if (NouvelItem == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItem.description = possession.description;
					  vm.selectedItem.valeur = possession.valeur;
					  vm.selectedItem.$selected = false;
					  vm.selectedItem.$edit = false;
					  vm.selectedItem ={};
					} else {    
						vm.allRecords = vm.allRecords.filter(function(obj) {
							return obj.id !== vm.selectedItem.id;
						});
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
        vm.selection= function (item) {     
            vm.selectedItem = item;
        };
        $scope.$watch('vm.selectedItem', function() {
			if (!vm.allRecords) return;
			vm.allRecords.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItem.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouter = function () {
            vm.selectedItem.$selected = false;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                description: '',
			};
			vm.allRecords.push(items);
		    vm.allRecords.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItem = it;
				}
			});			
        };
        vm.annuler = function(item) {
			if (!item.id) {
				vm.allRecords.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItem = false;
			 item.description = currentItem.description;
			 item.valeur = currentItem.valeur;
			vm.selectedItem = {} ;
			vm.selectedItem.$selected = false;
       };
        vm.modifier = function(item) {
			NouvelItem = false ;
			vm.selectedItem = item;
			currentItem = angular.copy(vm.selectedItem);
			$scope.vm.allRecords.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItem.description = vm.selectedItem.description;
			if(vm.selectedItem.valeur) {
				vm.selectedItem.valeur = parseFloat(vm.selectedItem.valeur);
			}
			vm.selectedItem.$edit = true;	
        };
        vm.supprimer = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajout(vm.selectedItem,1);
			}, function() {
			});
        }
        function test_existence (item,suppression) {    
			if(item.description.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecords.forEach(function(dispo) {   
						if((dispo.description==item.description) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Description déjà utilisé')
					} else {
						insert_in_base(item,0);
					}
				} else {
				  insert_in_base(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir la description de la possession !");
			}		
        }
    }
})();
