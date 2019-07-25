(function ()
{
    'use strict';

    angular
        .module('app.comores.auth.tableau_bord', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_auth_tableau_bord', {
            url      : '/auth/tableau_bord',
            views    : {
                'main@'                                 : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.comores_auth_tableau_bord': {
                    templateUrl: 'app/main/comores/auth/tableau_bord/tableau_bord.html',
                    controller : 'Tableau_bord_Controller as vm'
                }
            },
            bodyClass: 'tableau_bord',
            data : {
              authorizer : false,
              permitted : ["USER"],
              page: "Tableau de bord"
            }
        });

        // Translation
       // $translatePartialLoaderProvider.addPart('app/main/comores/auth/tableau_bord');
    }

})();
