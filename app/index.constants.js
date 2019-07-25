(function ()
{
    "use strict";

    angular
        .module("fuse")

		//localhost        
		.constant("apiUrl", "http://localhost/2019/comores/api/index.php/api/")
		.constant("apiUrlbase", "http://localhost/2019/comores/")
		//localhost

		.constant("apiUrl_serve_central", "http://192.168.88.200/2019/comores/api/index.php/api/")//ip serveur cantrale si dans les ile pour l'envoi des données

		.constant("apiUrlrecommandation", "recommandation/")
		.constant("serveur_central", false);

		/*.constant("apiUrl", "http://serverdnsps:81/2019/comores/api/index.php/api/")
		.constant("apiUrl_serve_central", "http://serverdnsps:81/2019/comores/api/index.php/api/")//ip serveur cantrale si dans les ile pour l'envoi des données
		.constant("apiUrlbase", "http://serverdnsps:81/2019/comores/")*/

		
})();
