(function ()
{
    'use strict';

    angular
        .module('app.comores.administration.profil', [])  
        .config(config);
        var vs = {};
           
    
    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_admin_profil', {
            url      : '/administration/profil',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/administration/profil/profil.html',
                    controller : 'ProfilController as vm'
                }
            },
            bodyClass: 'profil',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "profil"
            }
        });

        // Translation
     //   $translatePartialLoaderProvider.addPart('app/main/comores/ddb/activite');

        /*Navigation
        msNavigationServiceProvider.saveItem('comores.administration.utilisateurs.profil', {
            title: 'Profil',
            icon  : 'icon-account-key',
            state: 'app.comores_admin_profil'
        });*/
   
    }



})();
