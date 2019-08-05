(function ()
{
    'use strict';

    angular
        .module('app.comores.ddb', [			
           'app.comores.ddb.enquetesurmenage',
            'app.comores.ddb.enquetesurindividu',
            'app.comores.ddb.acteurs',
            'app.comores.ddb.ddbprojet',
            'app.comores.ddb.localisation',
            'app.comores.ddb.programme'
            ])
        .run(testPermission)
        .config(config);
        var vs ;

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('comores.ddb', {
            title : 'Données de Bases',
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
                var permissions = ["DDB"];
                var x =  loginService.gestionMenu(permissions,permission);        
                vs = x ;

            });
        }
     
    }

})();
