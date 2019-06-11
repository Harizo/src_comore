(function ()
{
    'use strict';

    angular
        .module('app.comores', [
            'app.comores.accueil',
           'app.comores.auth.login',
            'app.comores.auth.register',
            'app.comores.auth.forgot-password',
            'app.comores.auth.reset-password',
            'app.comores.auth.lock',
            'app.comores.administration',
            'app.comores.ddb',
            'app.comores.registresocial',
            'app.comores.recommandation',
            'app.comores.beneficiaire'
       ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider, $mdDateLocaleProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('comores', {
            title : 'Menu Principale',
            group : true,
            weight: 1
        });

         $mdDateLocaleProvider.formatDate = function(date) {
            return date ? moment(date).format('DD/MM/YYYY') : new Date(NaN);
        };
  
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    }
})();
