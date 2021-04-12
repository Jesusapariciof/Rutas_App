# Rutas v1.0

![Rutas logo](Poner logotipo)

Proyecto "Rutas" es una App que nos sirve para conocer las diferentes zonas turísticas que pueden ser visitadas en Extremadura. En ella podemos encontrar los principales museos, monasterios, piscinas naturales... de la zona. Además, si estás registrado, tendrás la opción de crear y modificar aquellos lugares que consideres que pueden ser de interés para los demás usuarios.
 ## Descripción Funcional

Las características principales de la app son las siguientes:

- Visualización las diferentes zonas turísticas de Extremadura.

- Visualización de los principales espacios naturales, museos y otros lugares de principal interés en Extremadura.

- Ampliación de información personalizada de cada lugar seleccionado.


### Casos de uso

Aquí añadimos nuestro diagramas de casos de uso, con su actor y las elipses que simbolizan los casos:

![Casos de uso](img/rutas.jpg)


## Descripción Técnica

A continuación se muestran una serie de descripciones técnicas llevadas a cabo durante el proyecto:

- post /newplace 

Ruta que nos permite crear un lugar nuevo. Para poder hacerlo, necesitamos haber iniciado sesión, de no ser así, nos dará un error indicándonos que para poder crear un lugar, es necesario hacer log in.

- get /allplaces

Ruta que nos permite ver todos los lugares creados por los usuarios. No es necesario iniciar sesión.

- delete /places/user/:id/delete

Ruta privada que nos permite eliminar un lugar creado por nosotros. Si el lugar es creado por otro usuario, obtendremos un mensaje en el cual nos dirá que no estamos autorizados para elimnarlo.

- put /places/user/:id/modificar

Ruta privada que nos permite modificar un lugar creado por nosotros. Si el lugar es creado por otro usuario, obtendremos un mensaje en el cual nos dirá que no estamos autorizados para modificarlo.

 ## Tecnologías

 - HTML
 - CSS (Bootstrap)
 - Vanilla JS
 - Bootstrap
 - GitHub
 - Mongo DB

 ## Versiones
- V.1.0 (12/04/21)
 

 ## TO-DO

  - Añadir la parte de favoritos

  - Añadir mapa con ubicación

  