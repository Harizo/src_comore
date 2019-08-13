(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.enquetesurmenage', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_ddb_enquetesurmenage', {
            url      : '/donnees-de-base/enquete-sur-menage',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/comores/ddb/enquetesurmenage/enquetesurmenage.html',
                    controller : 'EnquetesurmenageController as vm'
                }
            },
            bodyClass: 'enquetesurmenage',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Enquête/Ménage"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('comores.administration.ddb.enquetesurmenage', {
            title: 'Enquête/Ménage',
            icon  : 'icon-tile-four',
            state: 'app.comores_ddb_enquetesurmenage',
			weight: 1
        });
    }

})();
