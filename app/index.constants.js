(function ()
{
    "use strict";

    angular
        .module("fuse")

		//localhost        
		.constant("apiUrl", "http://localhost/2019/comores/api/index.php/api/")
		.constant("apiUrlbase", "http://localhost/2019/comores/")
		.constant("apiUrlexcel", "http://localhost/2019/comores/assets/excel/")
		//localhost

		//serveur centrale
		.constant("apiUrl_serve_central", "http://192.168.88.200/2019/comores/api/index.php/api/")//ip serveur cantrale si dans les ile pour l'envoi des données
		//fin serveur centrale
		.constant("apiUrlrecommandation", "recommandation/")
		.constant("serveur_central", false);

		/*

		serveur moroni = serverdnsps:81

		*/

		
})();
