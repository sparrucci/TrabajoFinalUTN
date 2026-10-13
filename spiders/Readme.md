# Spiders

Aplicación frontend en React para gestionar personajes de Spider-Man mediante un CRUD completo, con autenticación básica de usuarios, navegación por rutas y cambio de tema claro/oscuro.

## 1. Descripción general

Este proyecto es una SPA (Single Page Application) creada con Vite + React. Su objetivo es permitir:

- ver una lista de personajes de Spider-Man
- crear nuevos personajes de Spider-Man
- editar registros existentes
- eliminar personajes de Spider-Man
- ver el detalle de cada personaje de Spider-Man
- iniciar sesión o registrarse
- cambiar entre tema claro y oscuro

La información no se guarda en una base de datos local ni en un backend propio: la app consume una API pública de prueba de mockAPI.io, definida en `src/utils/api.js`.

## 2. Stack tecnológico

Se utilizan estas tecnologías principales:

- React 19
- React DOM
- React Router DOM
- Vite 8
- JavaScript (sin TypeScript)
- CSS puro
- ESLint
- mockAPI.io como fuente de datos remota

## 3. Requisitos previos

Antes de correr el proyecto, asegurate de tener instalado:

- Node.js 18 o superior
- npm 9 o superior
- Git
- Un navegador moderno

Verificá la versión instalada con:

```bash
node -v
npm -v
```

## 4. Instalación

Desde la raíz del proyecto:

```bash
npm install
```

Esto instala todas las dependencias del proyecto definidas en `package.json`.

## 5. Cómo ejecutarlo

### Modo desarrollo

```bash
npm run dev
```

Esto levanta el servidor de Vite y normalmente abre la aplicación en:

```text
http://localhost:5173
```

### Build de producción

```bash
npm run build
```

Esto genera la carpeta `dist` con la versión lista para producción.

### Vista previa del build

```bash
npm run preview
```

Sirve el contenido compilado para validar la versión final antes de desplegar.

### Linting

```bash
npm run lint
```

Ejecuta ESLint para revisar la calidad del código.

## 6. Estructura del proyecto

```text
spiders/
├── dist/                  # build compilado
├── node_modules/          # dependencias instaladas
├── public/                # archivos públicos estáticos
├── src/
│   ├── assets/            # imágenes o recursos gráficos del proyecto
│   ├── components/        # componentes reutilizables
│   │   └── FormularioSpider.jsx
│   ├── context/           # Context API para autenticación y tema
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/             # custom hooks para API y CRUD
│   │   ├── useCrearSpider.jsx
│   │   ├── useFetchSpiders.jsx
│   │   ├── useFetchSpider.jsx
│   │   ├── useActualizarSpider.jsx
│   │   └── useEliminarSpider.jsx
│   ├── pages/             # vistas de la aplicación
│   │   ├── Index.jsx
│   │   ├── Layout.jsx
│   │   ├── Spiders.jsx
│   │   ├── DetalleSpider.jsx
│   │   ├── Login.jsx
│   │   ├── Registro.jsx
│   │   ├── PaginaError.jsx
│   │   └── ...
│   ├── utils/
│   │   └── api.js         # URLs de la API
│   ├── App.css            # estilos principales
│   ├── index.css          # estilos base globales
│   ├── main.jsx           # entrada principal de la app y rutas
│   └── ...
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README original.md
├── Readme.md
├── vite.config.js
└── ...
```

## 7. Rutas de la aplicación

La navegación está configurada con `react-router-dom` en `src/main.jsx`.

| Ruta | Descripción |
|------|-------------|
| `/` | Página de bienvenida / landing |
| `/spiders` | Listado de spiders y formulario para crear |
| `/spiders/:id` | Detalle del spider y edición |
| `/login` | Inicio de sesión |
| `/registro` | Registro de usuario |
| `*` | Página 404 |

## 8. Cómo funciona la app

### Autenticación

La sesión del usuario se guarda en `localStorage` mediante `AuthContext`.

- `login()` valida al usuario contra la API de usuarios.
- `registrar()` crea un usuario nuevo si no existe.
- `logout()` borra la sesión activa.

Los endpoints usados están definidos en `src/utils/api.js`:

```js
export const URL_SPIDERS = "https://6ac6d756bea0e72cf5c94399.mockapi.io/api/v1/characters";
export const URL_USUARIOS = "https://6ac6d756bea0e72cf5c94399.mockapi.io/api/v1/usuarios";
```

### CRUD de spiders

Los custom hooks en `src/hooks/` encapsulan las operaciones con la API:

- `useFetchSpiders`: trae todos los spiders
- `useFetchSpider`: trae un spider por id
- `useCrearSpider`: crea un spider
- `useActualizarSpider`: actualiza un spider
- `useEliminarSpider`: elimina un spider

### Tema oscuro / claro

`ThemeContext` maneja el estado del tema y lo persiste en `localStorage` para que se recuerde al recargar la página.

### Layout y navegación

`Layout.jsx` define el encabezado compartido de la aplicación y renderiza el contenido según la ruta actual con `Outlet`.

## 9. Datos y API

Este proyecto no tiene backend propio ni base de datos local. Utiliza una API mock creada en mockAPI.io.

Esto significa que:

- la app necesita acceso a internet
- los datos se actualizan según la API remota
- si el servicio de mockAPI falla o cambia, la app puede quedar sin datos

Es recomendable revisar la API y sus campos antes de hacer cambios en los formularios o en la lógica del CRUD.

## 10. Flujo recomendado para navegar el proyecto

1. Abrí `src/main.jsx` para ver en qué rutas se renderizan las páginas.
2. Revisá `src/pages/Layout.jsx` para entender la estructura visual común.
3. Entrá a `src/pages/Spiders.jsx` para ver el listado y la lógica del CRUD.
4. Mirá `src/components/FormularioSpider.jsx` para entender cómo se crean y editan registros.
5. Revisá `src/context/AuthContext.jsx` para entender la sesión de usuario.
6. Revisá `src/hooks/` para ver cómo se comunican con la API.
7. Ajustá estilos en `src/App.css` y `src/index.css`.

## 11. Comandos útiles

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## 12. Consideraciones extra

- La app está desarrollada en español.
- El diseño es bastante simple y centrado en funcionalidad.
- La autenticación es una simulación basada en mockAPI, no un sistema de seguridad real.
- Si querés agregar un backend real o persistencia segura, conviene migrar la lógica de usuarios y CRUD a una API REST propia.

## 13. Recomendación final

Para trabajar sobre el proyecto, lo ideal es arrancar con:

```bash
npm install
npm run dev
```

y luego recorrer la estructura en este orden:

- `src/main.jsx`
- `src/pages/`
- `src/components/`
- `src/hooks/`
- `src/context/`
- `src/utils/api.js`

Con ese recorrido, podés entender rápidamente cómo está construida la app y dónde modificar cada funcionalidad.
