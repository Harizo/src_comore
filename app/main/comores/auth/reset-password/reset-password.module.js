(function ()
{
    'use strict';

    angular
        .module('app.comores.auth.reset-password', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.comores_auth_reset-password', {
            url      : '/auth/reset-password?token',
            views    : {
                'main@'                                : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.comores_auth_reset-password': {
                    templateUrl: 'app/main/comores/auth/reset-password/reset-password.html',
                    controller : 'ResetPasswordController as vm'
                }
            },
            bodyClass: 'reset-password',
            data : {
              authorizer : false,
              permitted : ["USER"],
              page: "Réinitialisation mot de passe"
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/comores/auth/reset-password');
    }

})();
