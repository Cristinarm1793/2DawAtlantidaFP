/*******************************************/
/*             JOURNEY.JS                  */
/*     Datos para USER JOURNEY MAP         */   
/*          [DIU] UX Toolkit v1.0 2019     */                        
/*          ver 1.1 26/Feb/2022            */
/*******************************************/
    
/****  README:       */
/****  v.1.1 Incluye nombre de tu grupo de prácticas (Grupo.ID), curso académico y enlace a github ***/
/****  Modifica los datos para los Journey Map (uno para cada Persona)  */
/****  Usa los 6 pasos y sigue las instrucciones */   
/****  Las imagenes para  'Photo', 'feelX', 'imaX' están en carpeta ./photos **/
/****  Si se usan nuevas imágenes se deben añadir a esa carpeta **/
/****  Los valores de rating están entre 1..5 **/
/****  recursos de imágenes:  https://www.vectorstock.com/royalty-free-vectors/vectors-by_zdeneksasek ***/




angular.module("angular", [])
	.controller("controller", ["$scope", function($scope) { 
		$scope.Grupo_ID ="DIU1.ABCDEF";
        $scope.Curso ="2021/22";
        $scope.Github_ID ="https://github.com/mgea/UX-DIU-Toolkit";
        
		$scope.JourneyIndex = 0;
        
        $scope.Journeys = [
			{		
                
                /*************************************/
                /**** PRIMER USER JOURNEY MAP  *******/
                /*** Cambiar datos             *******/
                /*************************************/
                
				Id: 0,
				Name: "Álex Duran",
                Photo: "AlexDuran (1).png",
    
                /*** PASO #1: INSPIRACION ***/ 
                goal1: "Quiere organizar todos sus hobbies multimedia en una sola página",
                touch1: "ordenador",
                feel1: "3",
                con1: "Tiene sus videojuegos, películas, series y otros contenidos repartidos entre diferentes aplicaciones",
                ima1: "cartoon-planning.png",
				
                /*** PASO #2: DECICION ***/ 
                goal2: "Busca una plataforma donde pueda registrar distintos tipos de contenido",
                touch2: "ordenador",
                feel2: "2",
                con2: "Encuentra aplicaciones especializadas en un solo tipo de contenido y tendría que utilizar varias para organizarlo todo",
                ima2: "cartoon-PCangry.png",
                
                /*** PASO #3: ACTUA ***/ 
                
                goal3: "Encuentra nuestra web y entra para comprobar si puede organizar todos sus hobbies",
                touch3: "móvil (el tiempo)",
                feel3: "4",
                con3: "Quiere comprobar que puede registrar diferentes tipos de contenido desde un mismo sitio",
                ima3: "cartoon-phone.png",
                
                /*** PASO #4: OBSERVA ***/ 
                
                goal4: "Explora las categorías y empieza a añadir contenido a su biblioteca",
                touch4: "ordenador",
                feel4: "4",
                con4: "Tiene bastante contenido acumulado, necesita encontrarlo y clasificarlo fácilmente",
                ima4: "cartoon-PCtyping.png",
                
                 /*** PASO #5: ANALIZA ***/ 
                
                goal5: "En otro momento accede desde el móvil para consultar sus listas y añadir un contenido que acaba de descubrir",
                touch5: "móvil",
                feel5: "5",
                con5: "Quiere poder consultar y actualizar su biblioteca sin depender del ordenador",
                ima5: "cartoon-phoning.png",
                
                
                /*** PASO #6: CONCLUSION ***/ 
                
                goal6: "Decide utilizar nuestra web habitualmente para registrar y organizar sus hobbies",
                touch6: "navegador web (móvil y ordenador)",
                feel6: "5",
                con6: "Necesita mantener su biblioteca actualizada a medida que descubre y consume nuevo contenido",
                ima6: "cartoon-resting.png",
			},
			{	
                /*************************************/
                /**** SEGUNDO USER JOURNEY MAP *******/
                /***      Cambiar datos        *******/
                /*************************************/
                
				Id: 1,
				Name: "Carmen Fernández",
                Photo: "CarmenF (1).png",
                
				 /*** PASO #1: INSPIRACION ***/ 
                goal1: "Ahora que tiene más tiempo libre recibe recomendaciones de libros, películas y series que quiere recordar",
                touch1: "móvil y conversaciones",
                feel1: "4",
                con1: "Recibe recomendaciones de familiares y amigos pero termina olvidando algunos títulos",
                ima1: "cartoon-going.png",
                
                /*** PASO #2: DECICION ***/ 
                goal2: "Busca una forma sencilla de guardar y organizar todas las recomendaciones que recibe",
                touch2: "navegador web (móvil)",
                feel2: "3",
                con2: "No quiere utilizar varias aplicaciones ni encontrarse con una plataforma difícil de entender",
                ima2: "cartoon-teamthinking.png",
                
                /*** PASO #3: ACTUA ***/ 
                
                goal3: "Encuentra nuestra web y accede desde el navegador de su móvil",
                touch3: "móvil ",
                feel3: "3",
                con3: "Es la primera vez que utiliza la plataforma y necesita entender fácilmente cómo funciona",
                ima3: "cartoon-phoningangry.png",
                
                /*** PASO #4: OBSERVA ***/ 
                
                goal4: "Busca un libro que le han recomendado y consulta su ficha",
                touch4: "Móvil (webapp)",
                feel4: "4",
                con4: "Necesita identificar rápidamente qué opción debe utilizar para guardarlo como pendiente",
                ima4: "cartoon-phone-street.png",
                
                 /*** PASO #5: ANALIZA ***/ 
                
                goal5: "Añade el libro a pendientes y consulta su biblioteca para comprobar que se ha guardado",
                touch5: "móvil",
                feel5: "5",
                con5: "Quiere poder encontrar fácilmente los contenidos que ha guardado cuando vuelva a entrar",
                ima5: "cartoon-phone-sitting.png",

                
                /*** PASO #6: CONCLUSION ***/ 
                
                goal6: "Decide utilizar nuestra web para guardar las nuevas recomendaciones que vaya recibiendo",
                touch6: "móvil",
                feel6: "5",
                con6: "Necesita una forma sencilla de mantener organizados sus libros, películas y series pendientes",
                ima6: "cartoon-PChard.png",
                
			}
		];
        
		$scope.model = $scope.Journeys[0];

	}])



