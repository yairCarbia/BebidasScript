# Proyecto final , BebidasScript!
- [Proyecto final , BebidasScript!](#proyecto-final--bebidasscript)
- [Resúmen](#resúmen)
  - [A. Instalación del proyecto y dependencias](#a-instalación-del-proyecto-y-dependencias)
  - [B Ejecución en localhost](#b-ejecución-en-localhost)
- [2. Dependencias utilizadas:](#2-dependencias-utilizadas)
- [3. AUTH Endpoints](#3-auth-endpoints)
- [4. API Endpoints](#4-api-endpoints)
  - [A. Productos:](#a-productos)
  - [B. Carritos:](#b-carritos)
  - [C. Ordenes:](#c-ordenes)
  - [D. Usuario:](#d-usuario)
  - [Railway link](#railway-link)
# Resúmen

Esta es una API RESTful desarrollada con NodeJS y ExpressJS que cuenta con una capa básica de frontend 
servida en espacio público del servidor.

Las funcionalidades principales son:

1. Autenticación: Registro de usuario e Inicio de sesión mediante PassportJS (Local Strategy)
2. CRUD de productos (Agregado, lectura, edición y eliminación).
3. Agregado de productos al carrito.
4. Generación de pedido (orden de compra).
5. Visualización de historial de ordenes generadas.
6. Envio de alertas de email con detalle de orden de
    compra generada y creacion de nuevo usuario (nodemailer/gmail).
7. La capa de persistencia de datos se encuentra implementada en MongoDb.
   - mongoDB (local o mongo atlas).
8. Canal de chat basado en websockets

## A. Instalación del proyecto y dependencias

- Clonar repositorio.

  ```
  git clone https://github.com/yairCarbia/BebidasScript.git
  ```


- Luego de clonar el proyecto, es necesario instalar todas las dependencias.

 ```
  npm i | npm install
  ```

- Usuario administrador.
  ```
  Usuario:zarpa
  Pass:123
  ```
## B Ejecución en localhost
  - En el archivo `.env.example` se pueden ver las variables de entorno para correr el proyecto. 
    - El servidor Express puede ser ejecutado mediante el script:
      - `npm run dev` .
      - Luego de poner en en marcha el proyecto, es posible acceder a la siguiente dirección:
    ```localhost:8080/```

# 2. Dependencias utilizadas:

  - Backend:
    bcryptjs,
    connect-mongo,
    cookie-parser,
    dotenv,
    ejs,
    express,
    express-session,
    minimist,
    mongoose,
    multer,
    nodemailer,
    normalizr,
    passport,
    passport-local,
    socket.io,
    uuid,
    winston
  

# 3. AUTH Endpoints
 
  - **Post de registro de usuario:**
    ```localhost:8080/auth/signup```
  
  - **Post de inicio de sesión de usuario:**
    ```localhost:8080/auth/login```
  
  - **Post de cierre de sesión de usuario:**
    ```localhost:8080/auth/logout```

# 4. API Endpoints

## A. Productos:
  - **Get de todos los productos:** 
    ```localhost:8080/api/product```

  - **Get de producto por id:**
    ```localhost:8080/api/product/:id```

   - **Post de producto :**
    ```localhost:8080/api/product```

  - **Put de producto (solo para administradores):**
    ```localhost:8080/api/product/:id```

  - **Delete de producto (solo para administradores):**
    ```localhost:8080/api/product/:id```





## B. Carritos:
  - **Get de todos los productos en carrito:**
      ```localhost:8080/api/cart```
  - **Get de todos los productos en carrito por id:**
      ```localhost:8080/api/cart/:id/product```

  - **Post de creación de carrito vacío con id de cliente:** 
    ```localhost:8080/api/cart```

  - **Delete de carrito por id de carrito del mismo:** 
    ```localhost:8080/api/cart/:id```

 - **Post de agregado de producto nuevos a la tienda(solo para administradores):** 
    ```localhost:8080/api/cart/add-product```

  - **Post de carrito para eliminar un producto:** 
    ```localhost:8080/api/cart/delete-product```

## C. Ordenes:
  - **Get de todas las ordenes:** 
    ```localhost:8080/api/order```

  - **Post de la creacion de la orden:** 
    ```localhost:8080/api/order```



## D. Usuario:
  - **Get de usuario que se encuentra actualmente autenticado:**
    ```localhost:8080/profile```


## [Railway link]((https://bebidasscript-production.up.railway.app/))