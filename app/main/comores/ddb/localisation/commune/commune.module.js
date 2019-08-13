(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation.commune', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_localisation_commune', {
            url      : '/donnees-de-base/localisation/commune',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/localisation/commune/commune.html',
                    controller : 'CommuneController as vm'
                }
            },
            bodyClass: 'commune',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Commune"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.ddb.localisation.commune', {
            title: 'Commune',
            icon  : 'icon-tile-four',
            state: 'app.comores_ddb_localisation_commune',
			weight: 3
        });
    }

})();
