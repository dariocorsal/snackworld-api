# SNACKWORLD - API

Este archivo contiene instrucciones para instalar y ejecutar el backend del proyecto SnackWorld, desarrollado con Node.js, Express y MongoDB.

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- Node.js (versión 16 o superior)
- npm (gestor de paquetes de Node.js)
- Una cuenta de MongoDB (se usó MongoDB Atlas en el desarrollo)
- (Opcional) Postman o Insomnia para probar la API

## Instalación de Dependencias

1. Clona el repositorio o descarga los archivos:
   https://github.com/dariocorsal/snackworld-api

2. Instala las dependencias con npm:
   npm install

3. Crea un archivo `.env` en la raíz del proyecto y agrega tus variables de entorno:
   MONGODB_URI
   JWT_SECRET

## Pasos para Ejecutar el Proyecto

1. Una vez instaladas las dependencias y configurado `.env`, ejecuta el servidor:

   npm run dev

Esto levantará el servidor en `http://localhost:3000` (o el puerto que definas).

2. Puedes probar los endpoints utilizando Postman, Insomnia o desde tu frontend.

## Notas Adicionales

- El backend está preparado para despliegue en **Vercel** mediante funciones serverless. Puedes consultar el archivo `vercel.json` para ver la configuración.
- Los archivos de rutas se encuentran en `src/routes/` y toda la lógica en `src/controllers/`.

## Estructura Básica del Proyecto

SNACKWORLD-API/
   src/
      controllers/
         models/
         routes/
         server.js
   .env
   package.json
   vercel.json

## Contacto

Para dudas técnicas o contribuciones, contactar a: dariocs@cetys.edu.mx
