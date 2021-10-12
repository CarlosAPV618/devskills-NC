# Challenge Técnico NC

La aplicación consta de un formulario que envia los datos a un servidor y los consume para mostrarlos en una tabla.

El formulario cuenta con una validación sencilla para evitar enviar información con un formato erróneo
al servidor.

# Endpoints del servidor 

- GET http://localhost:8081/api/members - para obtener los miembros
- POST http://localhost:8081/api/members - para añadir un nuevo miembro

### De la misma forma cuenta con el siguente endpoint de autenticación

- POST http://localhost:8081/auth

Este endpoint devuelve un token que nos permitirá dar acceso a los componentes principales de la aplicación.