(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb.localisation', [   
            'app.comores.ddb.localisation.fokontany',     
            'app.comores.ddb.localisation.commune',
            'app.comores.ddb.localisation.district',
            'app.comores.ddb.localisation.region'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('comores.administration.ddb.localisation', {
            title : "Zone d'intervention",
            icon  : 'icon-map-marker-multiple',
            weight: 8
        });
    }

})();
