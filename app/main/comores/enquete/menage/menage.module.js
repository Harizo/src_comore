(function ()
{
    'use strict';

    angular
        .module('app.comores.enquete.menage', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_enquete_menage', {
            url      : '/enquete/menage',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/enquete/menage/menage.html',
                    controller : 'MenageController as vm'
                }
            },
            bodyClass: 'menage',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "menage"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.enquete.menage', {
            title: 'Ménage',
            icon  : 'icon-swap-horizontal',
            state: 'app.comores_enquete_menage',
			weight: 1
        });
    }

})();
