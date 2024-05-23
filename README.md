# Music Album Frontend

## Descripción

Este es el frontend del proyecto de gestión de álbumes de música. Proporciona una interfaz de usuario para subir nuevos álbumes, ver detalles de álbumes y reproducir canciones.

## Tecnologías Utilizadas

- React
- TypeScript
- Tailwind CSS
- React Router
- H5AudioPlayer

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/YaelAguilar/project-ws-polling-frontend.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd project-ws-polling-frontend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

1. Inicia la aplicación:
   ```bash
   npm run dev
   ```
2. La aplicación debería estar corriendo en `http://localhost:5173`.

## Estructura del Proyecto

El proyecto sigue la metodología Atomic Design para la organización de los componentes:

- **Atoms**: Componentes básicos e indivisibles.
- **Molecules**: Combinaciones de átomos que forman bloques funcionales.
- **Organisms**: Secciones completas de la interfaz formadas por moléculas.
- **Pages**: Páginas completas de la aplicación que utilizan organismos.

## Funcionalidades

- Subir un nuevo álbum con imagen de portada y canciones.
- Ver la lista de álbumes disponibles.
- Ver los detalles de un álbum específico.
- Reproducir canciones de un álbum.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
