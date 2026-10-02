/*******************************************/
/*             PERSONA.JS                  */
/*     Datos para PERSONA TEMPLATE         */   
/*          [DIU] UX Toolkit v1.0 2019     */                        
/*          ver 1.2 26/Feb/2022            */
/*******************************************/
    
/****  README:       */
/****  Modifica los datos para las Personas      */
/****  v.1.1 Incluye nombre de tu grupo de prácticas (Grupo.ID), curso académico y enlace a github ***/
/****  Las imagenes para  'Photo'  están en carpeta ./photos **/
/****  Si se usan nuevas imágenes se deben añadir a esa carpeta **/
/****  Los valores de rating están entre 1..5 **/
/****  recursos de imágenes:  https://www.vectorstock.com/royalty-free-vectors/vectors-by_zdeneksasek ***/



angular.module("angular", [])
	.controller("controller", ["$scope", function($scope) { 
        $scope.Grupo_ID ="DIU1.ABCDEF";
        $scope.Curso ="2021/22";
        $scope.Github_ID ="https://github.com/mgea/UX-DIU-Toolkit";
        
		$scope.PersonaIndex = 0;
		$scope.Personas = [
			{		
                
                
                /*************************************/
                /**** PRIMERA PERSONA          *******/
                /*** Cambiar datos             *******/
                /*************************************/
                
                
				Id: 0,
				Name: "Álex Duran",
				Photo: "AlexDuran (2).png",
				Quote: "Yo también fui aventurero como tú, hasta que recibí un flechazo en la rodilla",
				Age: 25,
				Occupation: "Artista 3D",
				Family: "Vive en pareja y con 1 perro",
				Location: "Granada (Armilla)",
				Character: "Tranquilo, sociable y muy aficionado a los videojuegos.",
				PersonalityTraits: [
					{ Name: "Introvertido/reservado Vs  Extrov/activo ", Value: 3 },
					{ Name: "Realista/práctico  Vs    Intuición/imaginativo", Value: 4 },
					{ Name: "Racional/analitico  Vs   Emocional/impulsivo", Value: 1 },
					{ Name: "Flemático/apático  Vs   Colérico/visceral", Value: 2 }
				], 
				Goals: ["Crea guias y reseñas de los juegos que le apasionan", "Un ascenso en el trabajo"],
				Frustrations: ["Le molestan las aplicaciones complicadas para hacer tareas sencillas", "No poder comprar una Grafica en pleno 2026"],
				Bio: "Es de Granada estudio 3D y su principal afición son los videojuegos, tanto por entretenimiento como por su interés en el diseño y el apartado visual. En su tiempo libre suele jugar, especialmente a RPG y juegos de aventura. No es muy organizado en otras secciones aunque le gustaria poder organizarse.",
				Tech: [
					{ Name: "TIC/Internet", Value: 4 },
					{ Name: "Movil", Value: 4 },
					{ Name: "RRSS", Value: 3 },
					{ Name: "Software", Value: 5 }
					
				], 
                Contextos: "Álex acaba de terminar una película que le ha gustado mucho y quiere guardarla para recordarla. Mientras lo hace, recuerda un manga y un anime que le recomendó un amigo y decide añadirlo también a pendientes. No necesita organizar todo lo que consume, simplemente quiere poder guardar rápidamente aquello que le interesa.", 
				PreferredChannels: [
					{ Name: "Publicidad Tradicional", Value: 1 },
					{ Name: "Online & Social Media", Value: 3 },
					{ Name: "Recomendaciones & sugerencias", Value: 4 },
					{ Name: "Persona confianza (amigos, boca a boca)", Value: 5 }
				]
			},
			{	
                
                /*************************************/
                /**** SEGUNDA PERSONA          *******/
                /*** Cambiar datos             *******/
                /*************************************/
                
                
				Id: 1,
				Name: "Carmen Fernández",
				Photo: "CarmenF (1).png",
				Quote: "Medio pan y un libro",
				Age: 67,
				Occupation: "Jubilada",
				Family: "Casada, con dos hijos independizados y 4 nietos",
				Location: "Granada",
				Character: "Tranquila, curiosa y sociable. Ahora que dispone de más tiempo quiere recuperar algunas aficiones",
				PersonalityTraits: [
					{ Name: "Introvertido/reservado Vs  Extrov/activo ", Value: 3 },
					{ Name: "Realista/práctico  Vs    Intuición/imaginativo", Value: 2 },
					{ Name: "Racional/analitico  Vs   Emocional/impulsivo", Value: 3 },
					{ Name: "Flemático/apático  Vs   Colérico/visceral", Value: 3 }
				], 
				Goals: ["Aprovechar su jubilación para leer más y descubrir nuevas películas y series", "Guardar lo que quiere ver o leer para no olvidar las recomendaciones"],
				Frustrations: ["Le abruman las aplicaciones con demasiadas opciones o una interfaz complicada", "A veces olvida los títulos de libros o películas que le han recomendado"],
				Bio: "Carmen se jubiló y ahora dispone de mucho más tiempo libre. Mientras trabajaba veía pocas películas y leía de forma ocasional, por lo que nunca había sentido la necesidad de registrar lo que consumía. Ahora ha recuperado el hábito de la lectura, ver películas y series. Sus familiares y amigos también suelen recomendarle nuevos contenidos que quiere recordar.",
				Tech: [
					{ Name: "TIC/Internet", Value: 2 },
					{ Name: "Mobile", Value: 3 },
					{ Name: "RRSS", Value: 2 },
					{ Name: "Software", Value: 2 }
					
				], 
                Contextos:   "Desde que se jubiló, Carmen dedica más tiempo a leer y ver películas y series. Sus hijos y amigas suelen recomendarle nuevos títulos y empieza a acumular cosas que quiere descubrir. Busca una forma sencilla de guardar estas recomendaciones y llevar un pequeño registro de lo que ya ha visto o leído.",
				PreferredChannels: [
					{ Name: "Publicidad Tradicional (Ads)", Value: 2 },
					{ Name: "Online & Social Media", Value: 3 },
					{ Name: "Recomendaciones & sugerencias", Value: 4 },
					{ Name: "Persona confianza (amigos, boca a boca)", Value: 5 }
				]
			}
		];
		$scope.model = $scope.Personas[0];

	}])