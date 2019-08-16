(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.acteurs', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_acteurs', {
            url      : '/donnees-de-base/acteurs',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/acteurs/acteurs.html',
                    controller : 'ActeursController as vm'
                }
            },
            bodyClass: 'acteurs',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Acteurs"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.ddb.acteurs', {
            title: 'Acteurs',
            icon  : 'icon-swap-horizontal',
            state: 'app.comores_ddb_acteurs',
			weight: 3
        });
    }

})();
