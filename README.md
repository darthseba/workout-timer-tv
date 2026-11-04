# Workout Timer — Pantalla para televisión

Componente web de Workout Timer que funciona como receptor personalizado de Google Cast. Su finalidad es mostrar en el televisor el reloj y los textos del entrenamiento enviado por la aplicación del teléfono, y reproducir sus avisos sonoros.

Forma parte del mismo proyecto que [Workout Timer](https://github.com/darthseba/workout-timer). Los archivos del receptor se mantienen por separado para permitir su alojamiento público sin publicar el código privado de la app.

## Funciones

- Recibir el reloj, etiquetas y logotipo opcionales desde el teléfono.
- Mostrar el entrenamiento en la televisión.
- Reproducir los eventos de audio enviados por el temporizador.
- Mostrar desconexión cuando transcurren cinco segundos sin actualizaciones.
- Evitar la repetición de avisos al reconectar o recibir mensajes repetidos.

El teléfono controla el entrenamiento; el receptor presenta los datos recibidos.

## Componentes

| Archivo | Función |
|---|---|
| index.html | Pantalla y recepción de datos |
| audio.js | Gestión del audio |
| sounds.js | Definición de sonidos |
| audio/ | Recursos de sonido |
| AUDIO_LICENSE.txt | Licencia de los recursos |
| .nojekyll | Archivo que debe conservarse al alojar el contenido |

## Comunicación

Utiliza el canal personalizado `urn:x-cast:cl.sebastianvega.workouttimer` y carga el SDK de Google Cast desde gstatic.com.

Los valores del entrenamiento llegan durante la sesión y permanecen en memoria. Los textos se muestran mediante `textContent`. El receptor no contiene credenciales de Spotify, información de pagos, base de datos ni configuración de cuentas de usuario.

## Audio sincronizado

Cada evento incluye identificador de sesión, secuencia creciente, marca temporal del emisor, volumen y estado del reloj correspondiente. El receptor precarga las 15 opciones de sonido configuradas.

`audioBaseline` evita reproducir el historial al conectar o reconectar. Los eventos pausados o atrasados más de 1.500 ms se consumen sin sonido. Los mensajes periódicos repetidos no vuelven a disparar avisos.

El receptor muestra el reloj asociado al aviso e inicia el audio localmente. Esto permite recepción directa sin duplicar toda la pantalla, aunque no garantiza latencia cero. `audioReport` informa el inicio o fallo de reproducción. Los sonidos del teléfono permanecen activos durante la validación inicial.

## Alojamiento e integración

Publicar juntos `index.html`, `audio.js`, `sounds.js`, `audio/`, `AUDIO_LICENSE.txt`, `.nojekyll` y este README en un sitio estático HTTPS. La URL del receptor se registra en Google Cast Developer Console.

Estas son tareas de preparación del componente, no pasos que deba ejecutar quien usa la app. El repositorio no necesita contener el código Flutter ni datos de dispositivos o sesiones.

## Estado y validación

El historial contiene una publicación inicial del receptor el 23 de octubre de 2026 y audio sincronizado el 25 de octubre de 2026.

La documentación exige validación con Chromecast físico antes de su disponibilidad general. Deben comprobarse sonido audible, alineación entre reloj y audio, conexión y reconexión.

El README de la app principal todavía describe duplicación mediante Google Home. Por eso, debe confirmarse la integración en la versión de la app usada antes de anunciar Cast directo como función disponible.

La documentación técnica cita pruebas de audio y TV en el proyecto principal. Esas rutas no pertenecen necesariamente a este repositorio estático.

## Licencia de audio

Los sonidos proceden del paquete local `background_hiit_timer`, con licencia MIT. Conservar [AUDIO_LICENSE.txt](AUDIO_LICENSE.txt) al distribuirlos.
