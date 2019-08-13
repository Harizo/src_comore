(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.ddbprojet', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_ddbprojet', {
            url      : '/donnees-de-base/projet',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/ddbprojet/ddbprojet.html',
                    controller : 'DdbprojetController as vm'
                }
            },
            bodyClass: 'ddbprojet',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "DDB-Projet"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.ddb.ddbprojet', {
            title: 'Projet',
            icon  : 'icon-swap-horizontal',
            state: 'app.comores_ddb_ddbprojet',
			weight: 3
        });
    }

})();
