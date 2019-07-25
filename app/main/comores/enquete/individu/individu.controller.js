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
		vm.Enregistrer_suivi_menage	=Enregistrer_suivi_menage;	
		vm.Enregistrer_suivi_individu	=Enregistrer_suivi_individu;	
		var NouvelItemSuiviMenage=false; 
		var NouvelItemSuiviIndividu=false; 
		var currentItemSuiviMenage={};
		var currentItemSuiviIndividu={};
		vm.allRecordsSourcefinancement = [];
		vm.allRecordsTypedetransfert = [];
		vm.allRecordsAgencepaiement = [];
		vm.allRecordsSituationMatrimoniale = [];
		vm.allRecordsTypeMariage = [];
		vm.allRecordsTypeViolence = [];
		vm.tab_beneficiaire = [] ;
		vm.all_menage_programme=[];
		vm.all_individu_programme=[];
		vm.allDetailSuiviMenage = [] ;
		vm.allDetailSuiviIndividu = [] ;
		vm.all_programme=[];
		vm.all_programme_temp=[];
        vm.selectedItemMenage = {} ;
        vm.selectedItemIndividu = {} ;
        vm.selectedItemDetailSuiviMenage = {} ;
        vm.selectedItemDetailSuiviIndividu = {} ;
        vm.affichageMasque = 0 ;
        vm.affichageMasqueIndividu = 0 ;
		vm.afficherboutonModifSupr = 0 ;
		vm.afficherboutonModifSuprIndividu = 0 ;
		vm.afficherboutonnouveau = 1 ;
		vm.afficherboutonnouveauIndividu = 1 ;
		vm.suivimenage={};
		vm.suiviindividu={};
		vm.affichesuiviindividupardefaut =1;
		vm.affichesuiviindividunutrition =0;
		vm.affichesuiviindividugenre =0;
		vm.affichesuiviindividumariageprecoce =0;
		vm.mariage_precode_ou_promotion_genre ="1";
		vm.selectedItemIndividu.mariage_precoce = [];
		vm.selectedItemIndividu.nutrition = [];
		vm.selectedItemIndividu.transfert_argent = [];
		vm.selectedItemIndividu.promotion_genre = [];
		vm.menage_column = [{titre:"Numero d'enregistrement"},{titre:"Chef Ménage"},{titre:"Personne inscrire"},{titre:"Age"},{titre:"Addresse"}];
		vm.individu_column = [{titre:"N° d'enregistrement"},{titre:"Chef Ménage"},{titre:"Nom"},{titre:"Date Naissance"},{titre:"Addresse"}];
		vm.suivi_menage_column = [{titre:"Nom"},{titre:"Date"},{titre:"Partenaire"},{titre:"Acteur"},{titre:"Type-Transf"},{titre:"Montant"}];
		vm.suivi_individu_transfert_column = [{titre:"Nom"},{titre:"Date"},{titre:"Partenaire"},{titre:"Acteur"},{titre:"Type-Transf"},{titre:"Montant"}];
		vm.suivi_nutrition_menage_column = [{titre:"Nom"},{titre:"Poids"},{titre:"Périm-Bra"},{titre:"Age:mois"},{titre:"Taille"},{titre:"Z-score"},{titre:"Mois-grossesse"}];
		vm.suivi_promotion_genre_column = [{titre:"Nom"},{titre:"Sexe"},{titre:"Age"},{titre:"Date/Infr"},{titre:"Infraction"},{titre:"Lieu"},{titre:"T-Violence"}];
		vm.suivi_mariage_precode_column = [{titre:"Nom"},{titre:"Sexe"},{titre:"Age"},{titre:"Date"},{titre:"Type-mariage"},{titre:"Cause"}];
		vm.dtOptions =
		{
			dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
			pagingType: 'simple',
			autoWidth: false,
			responsive: true
		};
	     //DDB , CLE ETRANGERE
        apiFactory.getAll("ile/index").then(function(result)
        { 
          vm.all_ile = result.data.response;    
          
        });
		apiFactory.getAll("programme/index").then(function(result)
		{ 
			vm.all_programme_temp = result.data.response;           
			vm.all_programme = vm.all_programme_temp.filter(function(obj) {
				return (obj.id != 5 && obj.id !=3);
			});				
		});
		apiFactory.getAll("source_financement/index").then(function(result){
			vm.allRecordsSourcefinancement = result.data.response;
		});  
		apiFactory.getAll("type_transfert/index").then(function(result){
			vm.allRecordsTypedetransfert = result.data.response;
		});    
		apiFactory.getAll("Agence_p/index").then(function(result){
			vm.allRecordsAgencepaiement = result.data.response;
		});    
		apiFactory.getTable("enquete_menage/index","situation_matrimoniale").then(function(result){
			vm.allRecordsSituationMatrimoniale = result.data.response;
		});    
		apiFactory.getTable("enquete_menage/index","type_mariage").then(function(result){
			vm.allRecordsTypeMariage = result.data.response;
		});    
		apiFactory.getTable("enquete_menage/index","type_violence").then(function(result){
			vm.allRecordsTypeViolence = result.data.response;
		});    
		//FIN DDB , CLE ETRANGERE	
		vm.filtre_region = function() {
			apiFactory.getAPIgeneraliserREST("region/index","cle_etrangere",vm.filtre.id_ile).then(function(result) { 
				vm.all_region = result.data.response;
			});
		}
		vm.filtre_commune = function() {
			apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",vm.filtre.id_region).then(function(result) { 
				vm.all_commune = result.data.response;              
			});
		}
		vm.filtre_village = function() {
			apiFactory.getAPIgeneraliserREST("village/index","cle_etrangere",vm.filtre.id_commune).then(function(result) { 
				vm.all_village = result.data.response;              
			});
		}
		vm.filtrer = function() {
			apiFactory.getAPIgeneraliserREST("menage_programme/index","id_programme",vm.id_programme,"id_village",vm.filtre.id_village).then(function(result) { 
				if(result.data.response.length >0) {
					vm.all_menage_programme = result.data.response;   
				} else {
					vm.all_menage_programme = []; 
					vm.showAlert("INFORMATION","Aucun enregistrement trouvé !")	
				}			
			});
		}
		vm.filtrer_DataTable_et_masque_saisie_individu = function() {
			if(parseInt(vm.id_programme)==3) {
				// Nutrition n'oubliez pas de faire une copie coller vers vm.ajouterSuiviIndividu et vm.modifierSuiviIndividu
				vm.affichesuiviindividupardefaut =0;
				vm.affichesuiviindividunutrition =1;				
				vm.affichesuiviindividugenre =0;	
				vm.affichesuiviindividumariageprecoce=0;
			} else if (parseInt(vm.id_programme)==1) {
				// Transfert monétaire
				vm.affichesuiviindividupardefaut =1;
				vm.affichesuiviindividunutrition =0;				
				vm.affichesuiviindividugenre =0;	
				vm.affichesuiviindividumariageprecoce=0;
			} else if (parseInt(vm.id_programme)==5){
				// Promotion du genre et mariage précoce
				if(parseInt(vm.mariage_precode_ou_promotion_genre)==1) { 
					vm.affichesuiviindividupardefaut =2;
					vm.affichesuiviindividunutrition =0;				
					vm.affichesuiviindividugenre =1;
					vm.affichesuiviindividumariageprecoce=0;
				} else {
					vm.affichesuiviindividupardefaut =2;
					vm.affichesuiviindividunutrition =0;				
					vm.affichesuiviindividugenre =0;
					vm.affichesuiviindividumariageprecoce=1;					
				}
			}			
		}
		vm.filtrer_Individu = function() {
			apiFactory.getAPIgeneraliserREST("individu_programme/index","id_programme",vm.id_programme,"id_village",vm.filtre.id_village).then(function(result) { 
				if(result.data.response.length >0) {
					vm.all_individu_programme = result.data.response;   
				} else {
					vm.all_individu_programme = []; 
					vm.showAlert("INFORMATION","Aucun enregistrement trouvé !")	
				}	
				vm.filtrer_DataTable_et_masque_saisie_individu();
				// 5 lignes Dangereux : toujours à réinitialiser sinon bonjour le dégat lors du réaffichage du datatable
				vm.selectedItemIndividu.mariage_precoce = [];
				vm.selectedItemIndividu.nutrition = [];
				vm.selectedItemIndividu.transfert_argent = [];
				vm.selectedItemIndividu.promotion_genre = [];
				vm.mariage_precode_ou_promotion_genre ="1"; // Affichage par défaut : promotion du genre
			});
		}
		vm.Filtrer_Item_Promotion_Genre_et_Nutrition= function(value) {
			// Rétirer de la liste du programme la promotion du genre pour le ménage : disponible seulement pour les individus
			if(parseInt(value)==1) {
				vm.all_programme = vm.all_programme_temp.filter(function(obj) {
					return (obj.id != 5 && obj.id != 3);
				});				
			} else {
				vm.all_programme=vm.all_programme_temp;
			}
		}
        function formatDate(date) {
            if (date) {
                var mois = date.getMonth()+1;
                var dateSQL = (date.getFullYear()+"/"+mois+"/"+date.getDate());
                return dateSQL;
            };
        }
		vm.ChangerPromotiongenre_Mariageprecoce = function (value) {
			if(parseInt(value)==1) {
				if(vm.selectedItemDetailSuiviIndividu) {
					vm.selectedItemDetailSuiviIndividu.$selected=false;
					vm.selectedItemDetailSuiviIndividu={};
					vm.afficherboutonModifSuprIndividu = 0 ;
				} 
			} else if(parseInt(value)==2){
				if(vm.selectedItemDetailSuiviIndividu) {
					vm.selectedItemDetailSuiviIndividu.$selected=false;
					vm.selectedItemDetailSuiviIndividu={};
					vm.afficherboutonModifSuprIndividu = 0 ;
				}			
			}
		}
		// DEBUT FONCTION CONCERNANT MENAGE
		vm.selection= function (item) {
			vm.selectedItemMenage = item;
			if(parseInt(vm.selectedItemMenage.detail_charge)==0) {
				apiFactory.getAPIgeneraliserREST("suivi_menage/index","id_programme",vm.id_programme,"id_menage",vm.selectedItemMenage.id_menage).then(function(result)
				{ 
					if(result.data.response.length >0) {
						item.detail_suivi_menage = result.data.response; 
						vm.selectedItemMenage.detail_suivi_menage = result.data.response; 	
					} else {
						item.detail_suivi_menage = []; 
						vm.selectedItemMenage.detail_suivi_menage = [];
						vm.showAlert("INFORMATION","Aucun détail d'enregistrement trouvé !")	
					}			
					item.detail_charge=1;
				});
			}	
		}
		$scope.$watch('vm.selectedItemMenage', function() {
			if (!vm.all_menage_programme) return;
			vm.all_menage_programme.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemMenage.$selected = true;
		});
		// FIN FONCTION CONCERNANT MENAGE
		// DEBUT SUIVI MENAGE
		vm.selectionDetailSuiviMenage= function (item) {
			vm.selectedItemDetailSuiviMenage = item;
            currentItemSuiviMenage = angular.copy(vm.selectedItemDetailSuiviMenage);       
            vm.afficherboutonModifSupr = 1 ;
            vm.affichageMasque = 0 ;
            vm.afficherboutonnouveau = 1 ;
		}
		$scope.$watch('vm.selectedItemDetailSuiviMenage', function() {
			if (!vm.selectedItemMenage.detail_suivi_menage) return;
			vm.selectedItemMenage.detail_suivi_menage.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemDetailSuiviMenage.$selected = true;
		});
        vm.ajouterSuiviMenage = function () {
			vm.affichageMasque = 1 ;
			NouvelItemSuiviMenage = true ;
			vm.suivimenage.id=0;
			vm.suivimenage.id_menage=vm.selectedItemMenage.id_menage;
			vm.suivimenage.date_suivi=null;
			vm.suivimenage.montant=null;
		}      
        vm.annulerSuiviMenage = function() {
			vm.selectedItemDetailSuiviMenage = {} ;
			vm.selectedItemDetailSuiviMenage.$selected = false;
			vm.affichageMasque = 0 ;
			vm.afficherboutonnouveau = 1 ;
			vm.afficherboutonModifSupr = 0 ;
			NouvelItemSuiviMenage = false;
        };
		vm.modifierSuiviMenage = function() {
			NouvelItemSuiviMenage = false ;
			vm.suivimenage.id=vm.selectedItemDetailSuiviMenage.id;
			vm.suivimenage.id_menage=vm.selectedItemMenage.id_menage;
			if(vm.selectedItemDetailSuiviMenage.date_suivi) {
				vm.suivimenage.date_suivi=new Date(vm.selectedItemDetailSuiviMenage.date_suivi);
			}
			if(vm.selectedItemDetailSuiviMenage.montant) {
				vm.suivimenage.montant=parseFloat(vm.selectedItemDetailSuiviMenage.montant);
			}
			vm.suivimenage.id_partenaire=parseInt(vm.selectedItemDetailSuiviMenage.id_partenaire);
			vm.suivimenage.id_acteur=parseInt(vm.selectedItemDetailSuiviMenage.id_acteur);
			vm.suivimenage.id_type_transfert=parseInt(vm.selectedItemDetailSuiviMenage.id_type_transfert);
			vm.affichageMasque = 1 ;
			vm.afficherboutonModifSupr = 0;
			vm.afficherboutonnouveau = 0;  
        };
		vm.supprimerSuiviMenage = function() {
			NouvelItemSuiviMenage = false ;
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
				Enregistrer_suivi_menage(vm.selectedItemDetailSuiviMenage,1);
			}, function() {
            //alert('rien');
			});
        };	  
        function Enregistrer_suivi_menage(suivimenage,suppression) {
            //add
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var getId = 0;
            if (NouvelItemSuiviMenage==false) {
               getId = vm.selectedItemDetailSuiviMenage.id; 
            } 
            var datas = $.param({
                    id:getId,
                    supprimer:suppression,
                    id_menage: vm.selectedItemMenage.id_menage,
                    id_programme: vm.selectedItemMenage.id_programme,
                    id_partenaire: suivimenage.id_partenaire,
                    id_acteur: suivimenage.id_acteur,
                    id_type_transfert: suivimenage.id_type_transfert,
                    date_suivi: formatDate(suivimenage.date_suivi),
                    montant: suivimenage.montant,
            });  
            //factory
            apiFactory.add("suivi_menage/index",datas, config).success(function (data) {
				if (NouvelItemSuiviMenage == false) {                 
                   // Update or delete: id exclu                    
                    if(suppression==0) { 
						vm.selectedItemDetailSuiviMenage.id_partenaire=suivimenage.id_partenaire;
						vm.selectedItemDetailSuiviMenage.partenaire=suivimenage.partenaire;
						vm.selectedItemDetailSuiviMenage.id_acteur=suivimenage.id_acteur;                 
						vm.selectedItemDetailSuiviMenage.acteur=suivimenage.acteur;                 
						vm.selectedItemDetailSuiviMenage.id_type_transfert=suivimenage.id_type_transfert;                 
						vm.selectedItemDetailSuiviMenage.typetransfert=suivimenage.typetransfert;                 
						vm.selectedItemDetailSuiviMenage.date_suivi=suivimenage.date_suivi; 
						vm.selectedItemDetailSuiviMenage.montant=suivimenage.montant;
						vm.afficherboutonModifSupr = 0 ;
						vm.afficherboutonnouveau = 1 ;
						vm.selectedItemDetailSuiviMenage.$selected = false;
						vm.selectedItemDetailSuiviMenage ={};
                    } else {                      
						vm.allsuivimenage = vm.allsuivimenage.filter(function(obj) {
							return obj.id !== currentItem.id;
						});
                    }
				} else {                               
                    var item = {
						id_menage: vm.selectedItemMenage.id_menage,
						nomchefmenage: vm.selectedItemMenage.nomchefmenage,
						id_programme: vm.selectedItemMenage.id_programme,
						id_partenaire: suivimenage.id_partenaire,
						partenaire: suivimenage.partenaire,
						id_acteur:suivimenage.id_acteur,
						acteur:suivimenage.acteur,
						id_type_transfert: suivimenage.id_type_transfert,
						typetransfert: suivimenage.typetransfert,
						date_suivi: (suivimenage.date_suivi),
						montant: suivimenage.montant,
						id:String(data.response) ,
					};
					vm.selectedItemMenage.detail_suivi_menage.push(item); 
                    NouvelItemSuiviMenage=false;
				}
                  vm.affichageMasque = 0 ;
			})
        }
		// FIN SUIVI MENAGE
		// DEBUT FONCTION CONCERNANT INDIVIDU
		vm.selectionIndividu= function (item) {
			vm.selectedItemIndividu = item;
			if(parseInt(vm.selectedItemIndividu.detail_charge)==0) {
				apiFactory.getAPIgeneraliserREST("suivi_individu/index","id_programme",vm.id_programme,"id_individu",vm.selectedItemIndividu.id_individu).then(function(result)
				{ 
					item.detail_suivi_individu = []; 
					item.mariage_precoce = [];
					item.nutrition = [];
					item.transfert_argent = [];
					item.promotion_genre = [];
					vm.selectedItemIndividu.detail_suivi_individu = [];
					vm.selectedItemIndividu.mariage_precoce = [];
					vm.selectedItemIndividu.nutrition = [];
					vm.selectedItemIndividu.transfert_argent = [];
					vm.selectedItemIndividu.promotion_genre = [];
					if(result.data.response.length >0) {
						item.detail_suivi_individu = result.data.response; 
						item.mariage_precoce = result.data.response[0].mariage_precoce; 
						item.nutrition = result.data.response[0].nutrition; 	
						item.transfert_argent = result.data.response[0].transfert_argent; 	
						item.promotion_genre = result.data.response[0].promotion_genre; 	
						vm.selectedItemIndividu.detail_suivi_individu = result.data.response; 	
						vm.selectedItemIndividu.mariage_precoce = result.data.response[0].mariage_precoce; 
						vm.selectedItemIndividu.nutrition = result.data.response[0].nutrition; 	
						vm.selectedItemIndividu.transfert_argent = result.data.response[0].transfert_argent; 	
						vm.selectedItemIndividu.promotion_genre = result.data.response[0].promotion_genre; 	
					} else {
						vm.showAlert("INFORMATION","Aucun détail d'enregistrement trouvé !")	
					}			
					item.detail_charge=1;
					vm.selectedItemIndividu.detail_charge=1;
				});
			}	
		}
		$scope.$watch('vm.selectedItemIndividu', function() {
			if (!vm.all_individu_programme) return;
			vm.all_individu_programme.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemIndividu.$selected = true;
		});
		// FIN FONCTION CONCERNANT INDIVIDU
		// DEBUT SUIVI INDIVIDU
		vm.selectionDetailSuiviIndividu= function (item) {
			vm.selectedItemDetailSuiviIndividu = item;
			// vm.selectedItemDetailSuiviIndividu.$selected = true;
            currentItemSuiviIndividu = angular.copy(vm.selectedItemDetailSuiviIndividu);       
            vm.afficherboutonModifSuprIndividu = 1 ;
            vm.affichageMasqueIndividu = 0 ;
            vm.afficherboutonnouveauIndividu = 1 ;
		}
		$scope.$watch('vm.selectedItemDetailSuiviIndividu', function() {
			if(parseInt(vm.id_programme)==1) {
				if (!vm.selectedItemIndividu.transfert_argent) return;
				vm.selectedItemIndividu.transfert_argent.forEach(function(item) {
					item.$selected = false;
				});				
				vm.selectedItemDetailSuiviIndividu.$selected = true;
			} else if(parseInt(vm.id_programme)==3) {
				if (!vm.selectedItemIndividu.nutrition) return;
				vm.selectedItemIndividu.nutrition.forEach(function(item) {
					item.$selected = false;
				});				
				vm.selectedItemDetailSuiviIndividu.$selected = true;
			} else if(parseInt(vm.id_programme)==5) {
				vm.selectedItemIndividu.promotion_genre.forEach(function(item) {
					item.$selected = false;
				});				
				vm.selectedItemIndividu.mariage_precoce.forEach(function(item) {
					item.$selected = false;
				});				
				vm.selectedItemDetailSuiviIndividu.$selected = true;
			}			
		});
        vm.ajouterSuiviIndividu = function () {
			vm.affichageMasqueIndividu = 1 ;
			vm.disable_radiobutton_promotiongenre_marriage_precoce=1;
			vm.filtrer_DataTable_et_masque_saisie_individu();
			NouvelItemSuiviIndividu = true ;

			vm.suiviindividu.Nom= vm.selectedItemIndividu.Nom; 
			
			vm.suiviindividu.id=0;
			vm.suiviindividu.id_individu=vm.selectedItemIndividu.id_individu;
			vm.suiviindividu.id_acteur=null;
			vm.suiviindividu.id_partenaire=null;
			vm.suiviindividu.id_type_transfert=null;
			vm.suiviindividu.date_suivi=null;
			vm.suiviindividu.montant=null;
			vm.suiviindividu.poids=null;
			vm.suiviindividu.taille=null;
			vm.suiviindividu.perimetre_bracial=null;
			vm.suiviindividu.age_mois=null;
			vm.suiviindividu.zscore=null;
			vm.suiviindividu.mois_grossesse=null;
			vm.suiviindividu.cause_mariage=null;
			vm.suiviindividu.age=null;
			vm.suiviindividu.infraction=null;
			vm.suiviindividu.lieu_infraction=null;
			vm.suiviindividu.id_situation_matrimoniale=null;
			vm.suiviindividu.id_type_mariage=null;
			vm.suiviindividu.id_type_violence=null;
			vm.suiviindividu.type_formation_recue=null;
		}      
        vm.annulerSuiviIndividu = function() {
			vm.selectedItemDetailSuiviIndividu = {} ;
			vm.selectedItemDetailSuiviIndividu.$selected = false;
			vm.affichageMasqueIndividu = 0 ;
			vm.afficherboutonnouveauIndividu = 1 ;
			vm.afficherboutonModifSuprIndividu = 0 ;
			NouvelItemSuiviIndividu = false;
			vm.disable_radiobutton_promotiongenre_marriage_precoce=0;
        };
		vm.modifierSuiviIndividu = function() {
			vm.disable_radiobutton_promotiongenre_marriage_precoce=1;
			vm.filtrer_DataTable_et_masque_saisie_individu();
			NouvelItemSuiviIndividu = false ;
			vm.suiviindividu.Nom= vm.selectedItemIndividu.Nom; 
			
			vm.suiviindividu.id=vm.selectedItemDetailSuiviIndividu.id;
			vm.suiviindividu.id_individu=vm.selectedItemIndividu.id_individu;
			if(vm.selectedItemDetailSuiviIndividu.date_suivi) {
				vm.suiviindividu.date_suivi=new Date(vm.selectedItemDetailSuiviIndividu.date_suivi);
			} else {
				vm.suiviindividu.date_suivi=null;
			}
			if(vm.selectedItemDetailSuiviIndividu.montant) {
				vm.suiviindividu.montant=parseFloat(vm.selectedItemDetailSuiviIndividu.montant);
			} else {
				vm.suiviindividu.montant=null;
			}
			if(vm.selectedItemDetailSuiviIndividu.id_partenaire) {
				vm.suiviindividu.id_partenaire=parseFloat(vm.selectedItemDetailSuiviIndividu.id_partenaire);
			} else {
				vm.suiviindividu.id_partenaire=null;
			}
			if(vm.selectedItemDetailSuiviIndividu.id_acteur) {
				vm.suiviindividu.id_acteur=parseFloat(vm.selectedItemDetailSuiviIndividu.id_acteur);
			} else {
				vm.suiviindividu.id_acteur=null;
			}
			if(vm.selectedItemDetailSuiviIndividu.id_type_transfert) {
				vm.suiviindividu.id_type_transfert=parseFloat(vm.selectedItemDetailSuiviIndividu.id_type_transfert);
			} else {
				vm.suiviindividu.id_type_transfert=null;
			}
			if(vm.selectedItemDetailSuiviIndividu.perimetre_bracial) {
				vm.suiviindividu.perimetre_bracial=parseFloat(vm.selectedItemDetailSuiviIndividu.perimetre_bracial);
			} else {
				vm.suiviindividu.perimetre_bracial=null;
			}			
			if(vm.selectedItemDetailSuiviIndividu.taille) {
				vm.suiviindividu.taille=parseInt(vm.selectedItemDetailSuiviIndividu.taille);
			} else {
				vm.suiviindividu.taille=null;
			}	
			if(vm.selectedItemDetailSuiviIndividu.poids) {
				vm.suiviindividu.poids=parseFloat(vm.selectedItemDetailSuiviIndividu.poids);
			} else {
				vm.suiviindividu.poids=null;
			}	
			if(vm.selectedItemDetailSuiviIndividu.zscore) {
				vm.suiviindividu.zscore=parseFloat(vm.selectedItemDetailSuiviIndividu.zscore);
			} else {
				vm.suiviindividu.zscore=null;
			}	
			if(vm.selectedItemDetailSuiviIndividu.age_mois) {
				vm.suiviindividu.age_mois=parseInt(vm.selectedItemDetailSuiviIndividu.age_mois);
			} else {
				vm.suiviindividu.age_mois=null;
			}	
			if(vm.selectedItemDetailSuiviIndividu.mois_grossesse) {
				vm.suiviindividu.mois_grossesse=parseInt(vm.selectedItemDetailSuiviIndividu.mois_grossesse);
			} else {
				vm.suiviindividu.mois_grossesse=null;
			}	
			vm.suiviindividu.cause_mariage=vm.selectedItemDetailSuiviIndividu.cause_mariage;
			vm.suiviindividu.infraction=vm.selectedItemDetailSuiviIndividu.infraction;
			vm.suiviindividu.lieu_infraction=vm.selectedItemDetailSuiviIndividu.lieu_infraction;
			vm.suiviindividu.type_formation_recue=vm.selectedItemDetailSuiviIndividu.type_formation_recue;
			if(vm.selectedItemDetailSuiviIndividu.age) {
				vm.suiviindividu.age=parseInt(vm.selectedItemDetailSuiviIndividu.age);
			}	else {
				vm.suiviindividu.age=null;
			}
			if(vm.selectedItemDetailSuiviIndividu.id_situation_matrimoniale) {
				vm.suiviindividu.id_situation_matrimoniale=parseInt(vm.selectedItemDetailSuiviIndividu.id_situation_matrimoniale);
			}	else {
				vm.suiviindividu.id_situation_matrimoniale=null;
			}
			if(vm.selectedItemDetailSuiviIndividu.id_type_mariage) {
				vm.suiviindividu.id_type_mariage=parseInt(vm.selectedItemDetailSuiviIndividu.id_type_mariage);
			} else {
				vm.suiviindividu.id_type_mariage=null;
			}	
			if(vm.selectedItemDetailSuiviIndividu.id_type_violence) {
				vm.suiviindividu.id_type_violence=parseInt(vm.selectedItemDetailSuiviIndividu.id_type_violence);
			} else {
				vm.suiviindividu.id_type_violence=null;
			}	
			vm.suiviindividu.acteur=vm.selectedItemDetailSuiviIndividu.acteur;
			vm.suiviindividu.partenaire=vm.selectedItemDetailSuiviIndividu.partenaire;
			vm.suiviindividu.typetransfert=vm.selectedItemDetailSuiviIndividu.typetransfert;
			vm.suiviindividu.situation_matrimoniale=vm.selectedItemDetailSuiviIndividu.situation_matrimoniale;
			vm.suiviindividu.type_mariage=vm.selectedItemDetailSuiviIndividu.type_mariage;
			vm.suiviindividu.type_violence=vm.selectedItemDetailSuiviIndividu.type_violence;
			vm.affichageMasqueIndividu = 1 ;
			vm.afficherboutonModifSuprIndividu = 0;
			vm.afficherboutonnouveauIndividu = 0;  
        };
		vm.supprimerSuiviIndividu = function() {
			NouvelItemSuiviIndividu = false ;
			vm.affichageMasqueIndividu = 0 ;
			vm.afficherboutonModifSuprIndividu = 0 ;
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('ok')
                .cancel('annuler');

			$mdDialog.show(confirm).then(function() {           
				Enregistrer_suivi_individu(vm.selectedItemDetailSuiviIndividu,1);
			}, function() {
            //alert('rien');
			});
        };	  
        function Enregistrer_suivi_individu(suiviindividu,suppression) {
            //add
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
			if(parseInt(suppression)==0) {
				var daty = formatDate(suiviindividu.date_suivi);
			} else {
				// ignorer formatDate lors de la suppression
				var daty = suiviindividu.date_suivi;
			}
            var getId = 0;
            if (NouvelItemSuiviIndividu==false) {
               getId = vm.selectedItemDetailSuiviIndividu.id; 
            } 
            var datas = $.param({
                    id:getId,
                    supprimer:suppression,
                    id_individu: vm.selectedItemIndividu.id_individu,
                    id_programme: vm.selectedItemIndividu.id_programme,
                    id_partenaire: suiviindividu.id_partenaire,
                    id_acteur: suiviindividu.id_acteur,
                    id_type_transfert: suiviindividu.id_type_transfert,
                    date_suivi: daty,
                    montant: suiviindividu.montant,
                    poids: suiviindividu.poids,
                    perimetre_bracial: suiviindividu.perimetre_bracial,
                    age_mois: suiviindividu.age_mois,
                    taille: suiviindividu.taille,
                    zscore: suiviindividu.zscore,
                    mois_grossesse: suiviindividu.mois_grossesse,
                    cause_mariage: suiviindividu.cause_mariage,
                    age: suiviindividu.age,
                    infraction: suiviindividu.infraction,
                    lieu_infraction: suiviindividu.lieu_infraction,
                    type_formation_recue: suiviindividu.type_formation_recue,
                    id_situation_matrimoniale: suiviindividu.id_situation_matrimoniale,
                    id_type_mariage: suiviindividu.id_type_mariage,
                    id_type_violence: suiviindividu.id_type_violence,
            });  
            //factory
            apiFactory.add("suivi_individu/index",datas, config).success(function (data) {
				if (NouvelItemSuiviIndividu == false) {                 
                   // Update or delete: id exclu                    
                    if(suppression==0) { 
						if(parseInt(vm.id_programme)==1) {
							for (var i = 0; i < vm.selectedItemIndividu.transfert_argent.length; i++) {
								if(parseInt(vm.selectedItemIndividu.transfert_argent[i].id)==parseInt(suiviindividu.id)) {
									vm.selectedItemIndividu.transfert_argent[i]=suiviindividu;
									vm.selectedItemDetailSuiviIndividu=suiviindividu;
								}          
							}							
						} else if(parseInt(vm.id_programme)==3) {
							for (var i = 0; i < vm.selectedItemIndividu.nutrition.length; i++) {
								if(parseInt(vm.selectedItemIndividu.nutrition[i].id)==parseInt(suiviindividu.id)) {
									vm.selectedItemIndividu.nutrition[i]=suiviindividu;
									vm.selectedItemDetailSuiviIndividu=suiviindividu;
								}          
							}							
						} else if(parseInt(vm.id_programme)==5 && parseInt(suiviindividu.id_type_violence) >0) {
							for (var i = 0; i < vm.selectedItemIndividu.promotion_genre.length; i++) {
								if(parseInt(vm.selectedItemIndividu.promotion_genre[i].id)==parseInt(suiviindividu.id)) {
									vm.selectedItemIndividu.promotion_genre[i]=suiviindividu;
									vm.selectedItemDetailSuiviIndividu=suiviindividu;
								}          
							}							
						} else if(parseInt(vm.id_programme)==5 && parseInt(suiviindividu.id_type_mariage) >0) {
							for (var i = 0; i < vm.selectedItemIndividu.mariage_precoce.length; i++) {
								if(parseInt(vm.selectedItemIndividu.mariage_precoce[i].id)==parseInt(suiviindividu.id)) {
									vm.selectedItemIndividu.mariage_precoce[i]=suiviindividu;
									vm.selectedItemDetailSuiviIndividu=suiviindividu;
								}          
							}							
						}	
						vm.afficherboutonModifSuprIndividu = 0 ;
						vm.afficherboutonnouveauIndividu = 1 ;
						 vm.selectedItemDetailSuiviIndividu.$selected = false;
						vm.selectedItemDetailSuiviIndividu ={};
                    } else {                      
						if(parseInt(vm.id_programme)==1) {
							vm.selectedItemIndividu.transfert_argent = vm.selectedItemIndividu.transfert_argent.filter(function(obj) {
								return obj.id !== currentItemSuiviIndividu.id;
							});
						} else if(parseInt(vm.id_programme)==3) {
							vm.selectedItemIndividu.nutrition = vm.selectedItemIndividu.nutrition.filter(function(obj) {
								return obj.id !== currentItemSuiviIndividu.id;
							});
						} else if(parseInt(vm.id_programme)==5 && parseInt(suiviindividu.id_type_violence) >0) {
							vm.selectedItemIndividu.promotion_genre = vm.selectedItemIndividu.promotion_genre.filter(function(obj) {
								return obj.id !== currentItemSuiviIndividu.id;
							});
						} else if(parseInt(vm.id_programme)==5 && parseInt(suiviindividu.id_type_mariage) >0) {
							vm.selectedItemIndividu.mariage_precoce = vm.selectedItemIndividu.mariage_precoce.filter(function(obj) {
								return obj.id !== currentItemSuiviIndividu.id;
							});
						}	
                    }
				} else {                               
                    var item = {
						id_individu: vm.selectedItemIndividu.id_individu,
						nomchefmenage: vm.selectedItemIndividu.nomchefmenage,
						Nom: vm.selectedItemIndividu.Nom,
						id_programme: vm.selectedItemIndividu.id_programme,
						id_partenaire: suiviindividu.id_partenaire,
						partenaire: suiviindividu.partenaire,
						id_acteur:suiviindividu.id_acteur,
						acteur:suiviindividu.acteur,
						id_type_transfert: suiviindividu.id_type_transfert,
						typetransfert: suiviindividu.typetransfert,
						date_suivi: (suiviindividu.date_suivi),
						montant: suiviindividu.montant,
						id:String(data.response) ,
						poids: suiviindividu.poids,
						perimetre_bracial: suiviindividu.perimetre_bracial,
						age_mois: suiviindividu.age_mois,
						taille: suiviindividu.taille,
						zscore: suiviindividu.zscore,
						mois_grossesse: suiviindividu.mois_grossesse,
						cause_mariage: suiviindividu.cause_mariage,
						age: suiviindividu.age,
						infraction: suiviindividu.infraction,
						lieu_infraction: suiviindividu.lieu_infraction,
						type_formation_recue: suiviindividu.type_formation_recue,
						id_situation_matrimoniale: suiviindividu.id_situation_matrimoniale,
						situation_matrimoniale: suiviindividu.situation_matrimoniale,
						id_type_mariage: suiviindividu.id_type_mariage,
						type_mariage: suiviindividu.type_mariage,
						id_type_violence: suiviindividu.id_type_violence,
						type_violence: suiviindividu.type_violence,
					};
					if(parseInt(vm.id_programme)==1) {
						vm.selectedItemIndividu.transfert_argent.push(item); 
					} else if(parseInt(vm.id_programme)==3) {
						vm.selectedItemIndividu.nutrition.push(item); 
					} else if(parseInt(vm.id_programme)==5 && parseInt(suiviindividu.id_type_violence) >0) {
						vm.selectedItemIndividu.promotion_genre.push(item); 
					} else if(parseInt(vm.id_programme)==5 && parseInt(suiviindividu.id_type_mariage) >0) {
						vm.selectedItemIndividu.mariage_precoce.push(item); 
					}	
                    NouvelItemSuiviIndividu=false;
				}
					vm.affichageMasqueIndividu = 0 ;
					vm.disable_radiobutton_promotiongenre_marriage_precoce=0;
			})
        }
		// FIN SUIVI INDIVIDU
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
        vm.modifierPartenaireSuiviMenage = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsSourcefinancement.forEach(function(srcf) {
				if(srcf.id==item.id_partenaire) {
					vm.suivimenage.id_partenaire = srcf.id; 
					vm.suivimenage.partenaire=[];
					var itemss = {
						id: srcf.id,
						nom: srcf.nom,
					};
					vm.suivimenage.partenaire.push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suivimenage.id_partenaire = ''; 
					vm.suivimenage.partenaire=[];
			}
		}
        vm.modifierTypeTransfertSuiviMenage = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypedetransfert.forEach(function(srcf) {
				if(srcf.id==item.id_type_transfert) {
					vm.suivimenage.id_type_transfert = srcf.id; 
					vm.suivimenage.typetransfert=[];
					var itemss = {
						id: srcf.id,
						description: srcf.description,
					};
					vm.suivimenage.typetransfert.push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suivimenage.id_type_transfert = ''; 
					vm.suivimenage.typetransfert=[];
			}
		}
        vm.modifierAgencePaiementSuiviMenage = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsAgencepaiement.forEach(function(srcf) {
				if(srcf.id==item.id_acteur) {
					vm.suivimenage.id_acteur = srcf.id; 
					vm.suivimenage.acteur=[];
					var itemss = {
						id: srcf.id,
						Nom: srcf.Nom,
						Contact: srcf.Contact,
						Code: srcf.Code,
						Representant: srcf.Representant,
					};
					vm.suivimenage.acteur.push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suivimenage.id_acteur = ''; 
					vm.suivimenage.acteur=[];
			}
		}
        vm.modifierPartenaireSuiviIndividu = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsSourcefinancement.forEach(function(srcf) {
				if(srcf.id==item.id_partenaire) {
					vm.suiviindividu.id_partenaire = srcf.id; 
					vm.suiviindividu.partenaire=[];
					var itemss = {
						id: srcf.id,
						nom: srcf.nom,
					};
					vm.suiviindividu.partenaire.push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suiviindividu.id_partenaire = ''; 
					vm.suiviindividu.partenaire=[];
			}
		}
        vm.modifierTypeTransfertSuiviIndividu = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypedetransfert.forEach(function(srcf) {
				if(srcf.id==item.id_type_transfert) {
					vm.suiviindividu.id_type_transfert = srcf.id; 
					vm.suiviindividu.typetransfert=[];
					var itemss = {
						id: srcf.id,
						description: srcf.description,
					};
					vm.suiviindividu.typetransfert.push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suiviindividu.id_type_transfert = ''; 
					vm.suiviindividu.typetransfert=[];
			}
		}
		vm.modifierAgencePaiementSuiviIndividu = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsAgencepaiement.forEach(function(srcf) {
				if(srcf.id==item.id_acteur) {
					vm.suiviindividu.id_acteur = srcf.id; 
					vm.suiviindividu.acteur=[];
					var itemss = {
						id: srcf.id,
						Nom: srcf.Nom,
						Contact: srcf.Contact,
						Code: srcf.Code,
						Representant: srcf.Representant,
					};
					vm.suiviindividu.acteur.push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suiviindividu.id_acteur = ''; 
					vm.suiviindividu.acteur=[];
			}
		}
		vm.modifierSituationMatrimonialeSuiviIndividu = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsSituationMatrimoniale.forEach(function(srcf) {
				if(srcf.id==item.id_situation_matrimoniale) {
					vm.suiviindividu.id_situation_matrimoniale = srcf.id; 
					vm.suiviindividu.situation_matrimoniale =[];
					var itemss = {
						id: srcf.id,
						description: srcf.description,
					};
					vm.suiviindividu.situation_matrimoniale .push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suiviindividu.id_situation_matrimoniale = null; 
					vm.suiviindividu.situation_matrimoniale =[];
			}
		}
		vm.modifierTypeMariageSuiviIndividu = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypeMariage.forEach(function(srcf) {
				if(srcf.id==item.id_type_mariage) {
					vm.suiviindividu.id_type_mariage = srcf.id; 
					vm.suiviindividu.type_mariage =[];
					var itemss = {
						id: srcf.id,
						description: srcf.description,
					};
					vm.suiviindividu.type_mariage .push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suiviindividu.id_type_mariage = null; 
					vm.suiviindividu.type_mariage =[];
			}
		}
		vm.modifierTypeViolenceSuiviIndividu = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypeViolence.forEach(function(srcf) {
				if(srcf.id==item.id_type_violence) {
					vm.suiviindividu.id_type_violence = srcf.id; 
					vm.suiviindividu.type_violence =[];
					var itemss = {
						id: srcf.id,
						description: srcf.description,
					};
					vm.suiviindividu.type_violence .push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.suiviindividu.id_type_violence = null; 
					vm.suiviindividu.type_violence =[];
			}
		}
     }
  })();
