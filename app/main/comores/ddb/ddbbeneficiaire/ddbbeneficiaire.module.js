(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.ddbbeneficiaire', [   
            'app.comores.ddb.ddbbeneficiaire.possession',     
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('comores.ddb.ddbbeneficiaire', {
            title : 'Bénéficiaire',
            icon  : 'icon-map-marker-multiple',
            weight: 3
        });
    }

})();
