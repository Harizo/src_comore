(function ()
{
    'use strict';

    angular
        .module('app.comores.accueil', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_accueil', {
            url      : '/accueil',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/accueil/accueil.html',
                    controller : 'AccueilController as vm'
                }
            },
            bodyClass: 'accueil',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Acceuil"
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/comores/accueil');

        // Navigation
        msNavigationServiceProvider.saveItem('comores.accueil', {
            title : 'Acceuil',
            icon  : 'icon-alarm-check',
            state : 'app.comores_accueil',
            translate: 'accueil.menu.titre',
            weight: 1,
            hidden: function ()
            {
              //var permissions = ["ALLp"];
              //var x =  loginService.isPermitted(permissions);
            }
        });
    }

})();
