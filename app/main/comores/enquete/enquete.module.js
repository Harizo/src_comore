(function ()
{
    'use strict';

    angular
        .module('app.comores.enquete', [			
           'app.comores.enquete.menage',
           'app.comores.enquete.individu'
            ])
        .run(testPermission)
        .config(config);
        var vs ;

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('comores.enquete', {
            title : 'Traitement',
            icon  : 'icon-data',
            weight: 2,
            hidden: function()
            {
                    return vs;
            }
        });


    }

    function testPermission(loginService,$cookieStore,apiFactory)
    {
        var id_user = $cookieStore.get('id');
       
        var permission = [];
        if (id_user > 0) 
        {
            apiFactory.getOne("utilisateurs/index", id_user).then(function(result) 
            {
                var user = result.data.response;
               

                var permission = user.roles;
                var permissions = ["TTM"];
                var x =  loginService.gestionMenu(permissions,permission);        
                vs = x ;

            });
        }
     
    }

})();
