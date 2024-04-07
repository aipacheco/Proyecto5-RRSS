# Proyecto Api Backend para una red social.

<img src="./assets/h8ter.png" alt="">

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#creación-del-proyecto">Creación del proyecto</a></li>
    <li><a href="#contacto">Contacto</a></li>

  </ol>
</details>

## Sobre el proyecto

Los usuarios podrán registrarse en la aplicación, iniciar sesión y acceder a su área
personal. Dentro de su área, podrán postear sus ideas. También podrán ver los posts de usuarios y darles o quitarles like a los mismos.
El backend de esta API está desplegado en [Enlace a Zeabur](https://h8ter.zeabur.app/hello)

## Objetivo

Este proyecto requería una API funcional conectada a una base de datos con dos Documentos MongoDB llamados User y Post

<img src="./assets/diagramaMongo.png" alt="">


## Instalación en local

1. Clonar el repositorio
2. Instalamos las dependencias `$ npm install`
3. Creamos una conexión con MongoAtlas
3. Conectamos nuestro repositorio en Mongo Compass con la base de datos de MongoAtlas
4. Ejecutamos los seeders `$ npm run seeder`
5. Ponemos en funcionamiento el servidor `$ npm run dev`

## Endpoints

<details>
<summary>Endpoints</summary>

- AUTH

  - REGISTER

            POST https://h8ter.zeabur.app/api/auth/register

    body:

    ```js
        {
            "username": "example",
            "email": "example@gmail.com",
            "password": "princess"
        }
    ```

  - LOGIN

          POST https://h8ter.zeabur.app/api/auth/login

    body:

    ```js
        {
            "email": "example@gmail.com",
            "password": "princess"
        }
    ```

- USERS

  - GET

            GET https://h8ter.zeabur.app/api/users

    El usuario tiene que ser super_admin para ver todos los usuarios {"email":"superadmin@superadmin.com", "password":"123456789"}


  - GET BY EMAIL

            GET https://h8ter.zeabur.app/api/users?email=example@email.com

    El usuario tiene que ser super_admin para ver todos los usuarios y la búsqueda le devolverá el usuario por email

   	 ```js
     	 {
	        "success": true,
	        "message": "User by email",
	        "data": {
		        "_id": "65f31eefc610f2eeb5d2f151",
		        "username": "superadmin",
		        "email": "superadmin@superadmin.com",
		        "role": "super_admin",
		        "createdAt": "2024-03-14T15:59:43.223Z",
		        "updatedAt": "2024-03-15T11:37:10.701Z"
	        }
      	  }
   	 ```
  - GET PROFILE

        GET https://h8ter.zeabur.app/api/users/profile

    El usuario podrá ver su propio perfil
    
  - UPDATE PROFILE

        PUT https://h8ter.zeabur.app/api/users/profile

    El usuario podrá modificar su propio perfil, cambiando su nombre de usuario
    
     ```js
        {
        "username":"example2",
        }
    ```
- POSTS

  - GET

            GET https://h8ter.zeabur.app/api/posts

    Se muestran todos los posts de los usuarios públicos
    

  - CREAR POST

            POST https://h8ter.zeabur.app/api/posts

    El usuario tiene que estar logado para crear posts

    body:
    ```js
    { "content": "un post asqueroso"  }
    ```

  - GET MY POSTS

            GET https://h8ter.zeabur.app/api/posts/own

    El usuario puede ver todos sus posts


  - GET SINGLE POST

          GET https://h8ter.zeabur.app/api/posts/id

    El usuario puede ver un post en concreto

  - UPDATE POST

          PUT https://h8ter.zeabur.app/api/posts/id

    El usuario puede modificar uno de sus posts

    body:

    ```js
        
      { "content": "un post precioso" }
        
    ```
  - DELETE POST

          PUT https://h8ter.zeabur.app/api/posts/id

    El usuario puede borrar uno de sus posts

  - GET USER POST

          GET https://h8ter.zeabur.app/api/users/posts/user_id

    Trae todos los posts de un usuario   

  - LIKE/DISLIKE POST

          PUT https://h8ter.zeabur.app/api/posts/like/post_id

    Un usuario puede darle like o quitárselo a un post  

  </details>

## Stack

Tecnologías utilizadas:

<div align="center">
<a href="https://www.mongodb.com/es">
<img src= "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/en/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://www.typescriptlang.org/">
    <img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</a>
<a href="https://typeorm.io/">
    <img src= "https://img.shields.io/badge/mongoose-234ea94b?style=for-the-badge&logo=typeorm&logoColor=white"
    />
</a>

 </div>

## Creación del proyecto

### Pasos para la Instalación y Configuración

#### Para configurar un proyecto de Express con TypeScript, sigue estos pasos:

- Crea una carpeta para tu proyecto.

- Inicializa el archivo package.json con

` npm init`

- Instala Express con

`npm install express --save`

- Instala TypeScript como dependencia de desarrollo con

`npm install typescript -D`

- Instala los tipos de Express y Node con

`npm install @types/express @types/node -D`

- Configura el archivo tsconfig.json con

` npx tsc --init`

- Instalar librería de nodemon

` npm install --save-dev nodemon`

## Script de compilación

En el apartado de scripts de package.json:

    "dev": "nodemon ./src/server.ts"

## Contacto

<a href = "mailto:aipachecogarcia@gmail.com
"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/anapachecogarcia/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

</p>
