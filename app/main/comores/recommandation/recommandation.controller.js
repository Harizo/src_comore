(function ()
{
    'use strict';
    angular
        .module('app.comores.recommandation')
        .directive('customOnChange', function() {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var onChangeHandler = scope.$eval(attrs.customOnChange);
					element.bind('change', onChangeHandler);
				}
			};
		})
        .directive('fileModel', ['$parse', function ($parse) {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					var model = $parse(attrs.fileModel);
					var modelSetter = model.assign;        
					element.bind('change', function(){
						scope.$apply(function(){
							modelSetter(scope, element[0].files[0]);
							console.log(element[0].files[0]);
						});
					});
				}
			};
		}])
		.service('fileUpload', ['$http', function ($http) {
			this.uploadFileToUrl = function(file, uploadUrl){
				var fd = new FormData();
				var rep='test';
				fd.append('file', file);
				console.log(file);
				$http.post(uploadUrl, fd,{
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).success(function(){
					console.log('tafa');
				}).error(function(){
					console.log('Rivotra');
				});
			}
		}])
        .controller('RecommandationController', RecommandationController);
    /** @ngInject */
    function RecommandationController(apiFactory, $state, $scope,$cookieStore, $mdDialog,DTOptionsBuilder,apiUrl,$http,fileUpload,apiUrlbase,apiUrlrecommandation)  {
        var vm = this;
        var NouvelItem=false;
        var currentItem;
        var typeact="";
        var NouveldepenseItem=false;
        var  currentdepenseItem;
        vm.selecteddepenseItem={};
        vm.myFile={};
        vm.parent_courant={};
        vm.etat="";
        vm.fichier="";
		vm.directoryName='';
        vm.typeact={};
        vm.selectedItem = {} ;
        vm.selectedcourant={};
        vm.ajout = ajout ;
        //variale affichage bouton nouveau
        vm.afficherboutonnouveau = 1 ;
        //variable cache masque de saisie
        vm.affichageMasque = 0 ;
        //pour les sous tâches
        vm.affichageMasquestache = 0 ;
        //fin pour les sous tâches
        vm.allActivite = [] ;
        vm.allRecommandation = [] ;
        vm.allParent = [] ;
        vm.ListeParent = [] ;
        // Data
        vm.dtOptions = {
        dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        autoWidth : false,
        responsive: true
        };
        // vm.activite_col = [{"titre":"Type de document"}];
        vm.tdr_coldetail = [{"titre":"Resumé"},{"titre":"Url"},{"titre":"Fichier"},{"titre":"Date"},{"titre":"Validation"},{"titre":"Fait"},{"titre":"Action"}];           
        var id_user = $cookieStore.get('id');
		vm.utilisateur_id = id_user;
		console.log(vm.utilisateur_id);
        apiFactory.getOne("utilisateurs/index", id_user).then(function(result) {
			vm.nomutilisateur = result.data.response.prenom + ' ' + result.data.response.nom;
			apiFactory.getAll("listerecommandation/index").then(function(result) {
				vm.allRecommandation = result.data.response;
			});               
        });     
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
        function ajout(activite,suppression) {
            if (NouvelItem==false) {
               // test_existance (activite,suppression);
                insert_in_base(activite,suppression); 
            } else {
                insert_in_base(activite,suppression);
            }
        }
		vm.changerdepense = function (item) {
            vm.depenses.forEach(function(lig) {
                if(lig.id==item.lignebudgetaire) {
                    item.lignebudgetaire = lig.id; 
                    item.lignebudgetaire_id = lig.id; 
                    item.libelledepense = lig.libelle ;
                }
            });
        }
        function insert_in_base(activite,suppression) {         
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
                resume: activite.resume,
                url: activite.url,            
                nom_fichier: activite.nom_fichier,
                date_upload: activite.date_upload,
                repertoire: activite.repertoire,
                site_id:vm.site_id,
                utilisateur_id:id_user,
            });
            //factory
            apiFactory.add("listerecommandation/index",datas, config).success(function (data) {
                if (NouvelItem == false) {
                    // Update or delete: id exclu                  
                    if(suppression==0) {
                        vm.afficherboutonModifSupr = 0 ;
                        vm.afficherboutonnouveau = 1 ;
                } else {
                    var item = {
                        num_tdr: activite.num_tdr,
                        projet: activite.projet,
                        objectif: activite.objectif,
                        id:String(data.response) ,
                        date_tdr:activite.date_tdr,
                        site_id:vm.site_id 
                    };     
                    vm.allActivite.push(item);
                    vm.activite.num_tdr='';
                    vm.activite.projet='';
                    vm.activite.objectif='';
                    vm.activite.date_tdr='';                    
                }
                  vm.affichageMasque = 0 ;
              }
            }).error(function (data) {                  
                vm.showAlert('Erreur de saisie','Veuillez saisir les champs manquants !');
            });              
        }  
      //*****************************************************************     
        vm.selection= function (item) {             
            vm.selectedItem = item;
            currentItem = JSON.parse(JSON.stringify(vm.selectedItem));
            vm.afficherboutonModifSupr = 1;
            vm.afficherboutonnouveau = 1; 
        };
        $scope.$watch('vm.selectedItem', function() {
            if (!vm.allActivite) return;
            vm.allActivite.forEach(function(item) {
                item.$selected = false;
            });
            vm.selectedItem.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouter = function () {
            vm.affichageMasque = 0 ;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected:true,
				supprimer:0,
				id:0,
				libelle: '',
				utilisateur_id:id_user
			};
			vm.allActivite.push(items);
        };
        vm.annuler = function() {            
			vm.selectedItem.$selected = false;
			vm.affichageMasque = 0 ;
			vm.afficherboutonnouveau = 1 ;
			vm.afficherboutonModifSupr = 0 ;
			if (!item.id) {
				vm.selectedItem.depense.pop();
				return;
			}          
			item.$selected=false; 
			item.$edit=false; 
			NouvelItem = false;            
			// Restaurer les valeurs
			item.libelle = currentItem.libelle;
        };
        vm.modifier = function(item) {                    
                NouvelItem = false ;
				item.$selected=true,
				item.$edit=true;
        };
        vm.supprimer = function() {
            // Attention : suppression tache  nom de fonction à revoir ???
            vm.afficherboutonModifSupr = 0 ;
            vm.affichageMasque = 0 ;
			var rep = response.data;                
			var confirm = $mdDialog.confirm()
				.title('Confirmation de suppression')
				.textContent(vm.qui)
				.ariaLabel('Lucky day')
				.clickOutsideToClose(false)
				.parent(angular.element(document.body))
				.ok('supprimer')
				.cancel('annuler');
			$mdDialog.show(confirm).then(function() {
				   ajout(vm.selectedItem,1);
			}, function() {
			});
        };          
        vm.selectionDocument= function (item) {
            vm.selecteddepenseItem = item;
            currentdepenseItem = JSON.parse(JSON.stringify(vm.selecteddepenseItem));
        };
        $scope.$watch('vm.selecteddepenseItem', function() {
			if (!vm.selectedItem.document) return;
			vm.allRecommandation.forEach(function(item) {
				item.$selected = false;
			});
			vm.selecteddepenseItem.$selected = true;
        });
		$scope.uploadFile = function(event){
			var files = event.target.files;
			vm.myFile=files;               
		};
        vm.ajouterDocument = function () {
            vm.selecteddepenseItem.$selected = false;
            NouveldepenseItem = true ;
			var items = {
				$edit: true,
				$selected:true,
				supprimer:0,
				resume:'',
				url:'',
				validation:0,
				fait:0,
				date_upload:new Date(),
				nom_fichier:'',
                site:vm.site,
                site_id:vm.site_id,
                utilisateur_id:id_user,
				nomutilisateur:vm.nomutilisateur		
			};
			vm.allRecommandation.push(items);
		}
		vm.annulerDocument = function(item) {
			if (!item.id) {
				vm.allRecommandation.pop();
				return;
			}          
			vm.selecteddepenseItem.resume=vm.resume;
			vm.selecteddepenseItem.url=vm.url;
			vm.selecteddepenseItem.validation=vm.validation;
			vm.selecteddepenseItem.nom_fichier=vm.fichier;
			vm.selecteddepenseItem.date_upload=vm.date_upload;
			vm.selecteddepenseItem.fait=vm.fait;
			vm.selecteddepenseItem.$selected = false;
			NouveldepenseItem = false;
			item.$edit=false; 
			vm.disable=false;
        };
		vm.supprimerDocument = function(item) {
            if(id_user!=item.utilisateur_id && parseInt(id_user)!=1) {
                vm.showAlert("Information","Vous n'avez pas le droit de supprimer ce document !. Merci");
                return;
            }
            vm.selectedptaItem=item;
            var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('ok')
                .cancel('annuler');
            $mdDialog.show(confirm).then(function() {
				vm.sauverDocument(vm.selecteddepenseItem,1);
            }, function() {
             //alert('rien');
            });
        };
		vm.modifierDocument = function(item) {
            if(id_user!=item.utilisateur_id && parseInt(id_user)!=1) {
                vm.showAlert("Information","Vous n'avez pas le droit de modifier ce document !. Merci");
                return;
            }   
            vm.resume=item.resume;
            vm.url=item.url;
            vm.validation=item.validation;
            vm.fichier=item.nom_fichier;
            vm.date_upload=item.date_upload;
            vm.fait=item.fait;
			currentdepenseItem = JSON.parse(JSON.stringify(vm.selecteddepenseItem));
			item.date_upload = new Date(item.date_upload);
			vm.allRecommandation.forEach(function(it) {
				it.$selected = false;
				it.$edit = false;
			});
            NouveldepenseItem = false ;
			vm.selecteddepenseItem.$selected = true;             
            item.$edit = true;  
			item.$selected = true; 
			vm.selecteddepenseItem = item;     
			vm.selecteddepenseItem.$edit = true;                  
        };
		vm.sauverDocument = function (item,suppression) {
			console.log(JSON.stringify(vm.selecteddepenseItem));
			var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var getId = 0;
            if (NouveldepenseItem==false) {
               getId = vm.selecteddepenseItem.id; 
            } 
			
			// var rep = apiUrlbase + apiUrlrecommandation + vm.site.toLowerCase()  ;
			var rep = apiUrlbase + apiUrlrecommandation ;
			vm.directoryName=rep;
            var datas = $.param({
                supprimer:suppression,
                id:getId,
                resume: vm.selecteddepenseItem.resume,
                url: vm.selecteddepenseItem.url,            
                validation: vm.selecteddepenseItem.validation,            
                fait: vm.selecteddepenseItem.fait,            
                nom_fichier: vm.fichier,
                date_upload: vm.selecteddepenseItem.date_upload,
                repertoire: rep,
                site_id:null,
                utilisateur_id:id_user
            });
            apiFactory.add("listerecommandation/index",datas, config).success(function (data) {
                if (NouveldepenseItem == false) {
                    console.log('modifier');
                    console.log(vm.selecteddepenseItem.date_upoload);
                    vm.selecteddepenseItem.nom_fichier=vm.fichier;
                    if(suppression==0) {
                      vm.selecteddepenseItem.$selected = false;
					  vm.selecteddepenseItem.$edit=false;
					  // repertoire : à écraser chaque fois au cas où l'utilisateur change le nom du type de document dans DDB type document
					  vm.selecteddepenseItem.repertoire=vm.directoryName;
                      vm.selecteddepenseItem ={};
                    } else {    
						vm.allRecommandation = vm.allRecommandation.filter(function(obj) {
							return obj.id !== currentdepenseItem.id;
						});         
                    }
                } else {
                    NouveldepenseItem=false;
					vm.selecteddepenseItem.id=data.response;
					vm.selecteddepenseItem.nom_fichier=vm.fichier;
                }
				// vm.item.$selected=false;
				// vm.item.$edit=false;
				vm.selecteddepenseItem.$edit=false;
				vm.selecteddepenseItem.$selected=false;
				vm.disable=false;
            }).error(function (data) {
                alert('Erreur');
            }); 
        }      
        function test_existance (item,suppression) {          
            if (suppression!=1) {
                insert_in_base(item,suppression);                                   
            } else {
              insert_in_base(item,suppression);
            }  
        } 
 		vm.uploadFile = function (item,suppression) {
			console.log(JSON.stringify(item));
			var file =vm.myFile[0];
			console.log('file is ' );
			console.dir(file);
			var repertoire = apiUrlrecommandation;
			// var bt = vm.site.toLowerCase() + '/';
			var uploadUrl = apiUrl + "uploadfichier/save_recommandation";
			var name = $scope.name;
			console.log(name);
			var fd = new FormData();
			fd.append('file', file);
			fd.append('repertoire',repertoire);
			// fd.append('site',bt);
			if(file) { 
				var upl=   $http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).success(function(data){
					console.log('upload success');
					console.log(data);
					vm.fichier=data[1];
					vm.sauverDocument(item,0);
				}).error(function(){
					console.log("Rivotra");
				});
			} else {
				vm.sauverDocument(item,0);
			}
		}
		vm.exportfichier = function(item) {
			var bla = $.post(apiUrl + "Uploadfichier/prendre_fichier",{
						nom_fichier : item.nom_fichier,
						repertoire: item.repertoire
					},function(data) {   
						console.log('Repertoire=' + data);
						window.location = data;
					});
		}
    }
})();