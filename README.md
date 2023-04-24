# video-quiz-app

Esta APP permite contestar preguntas por medio de video y simular el envio de datos a un servidor.
 
## Requisitos previos

Es necesario que tener instalado NodeJS, tener acceso a un navegador compatible con WebRTC, una terminal y un editor de código.

## Configuración

No es necesario hacer una configuración, sin embargo si desea modificar la configuración puede cambiarla en el archivo `config/constants.js`:

- Con la constante `VIDEO_QUIZZES_INITIAL_STATE` puede añadir, eliminar o modificar los video cuestionarios.
- Con la constante `RECORDING_LIMIT_MINUTES` puede modificar el limite de grabación en minutos para contestar las preguntas.

## Inicialización

Para empezar a usar la APP es necesaria la ejecución del siguiente comando en una terminal ubicada en la raíz del proyecto:

```bash
npm install
```

## Ejecución

Ejecutar el siguiente comando en la misma terminal:

```bash
npm run dev
```

Su aplicación se iniciará en la url `http://localhost:5173/`.
