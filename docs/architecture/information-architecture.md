# Information Architecture

## 1. Discovery / Public

The public area allows users to discover, search,
explore and view published content.

- Discover
- Search
- Explore
- Book detail

## 2. Creation / Authoring

The authoring area allows authenticated users to
create and manage content they own.

- My books
- Create book
- Edit book
- Manage images
- Manage chapters
- Submit for publication

## 3. Administration / Moderation

The administration area is restricted to privileged
users and is responsible for platform management and
content moderation.

- Content management
- User management
- Moderation
- Reports
- Catalog configuration

## 4. Book Content

Book content is composed of:

- Information
- Images
- Alternative names
- Chapters
- Authors
- Categories / genres
- Tags
- ...

## 5. Reading / Playback

The reading experience allows users to consume
published content.

- Chapter reader
- Image viewer
- Chapter navigation
- Progress / history

----------------------------

Book list
Book detail
Book reader
Admin book editor
Image management
Chapter management

----------------------------
--------------------------------------------------------------------
# Arquitectura de información

## Navegación principal

El Header representa las áreas principales de la aplicación:

Kurum → Home / Explorar
Mi biblioteca → Contenido y actividad personal como lector
Buscar → Búsqueda avanzada de libros
Gestión → Creación y administración de libros
🔍 → Búsqueda rápida
Cuenta → Perfil, configuración y sesión

## Explorar

Es la entrada principal de la plataforma y está orientada al descubrimiento:

- Libros recomendados
- Populares
- Nuevos
- Tendencias
- Categorías

## Mi biblioteca

Espacio personal del usuario como lector:

- Biblioteca
- Historial
- Me gusta
- Guardados
- Deseados

## Buscar

Página dedicada a búsqueda avanzada.

Permite combinar criterios como:

- Título
- Autor
- Categoría
- Tipo
- Estado
- Idioma
- Longitud/extensión
- Fecha
- Otros filtros futuros

Está orientada a encontrar libros mediante criterios específicos.

## Búsqueda rápida

El icono de búsqueda del Header proporciona una búsqueda rápida.

Su objetivo es encontrar inmediatamente libros mediante coincidencias de texto, principalmente por título y coincidencias similares.

No reemplaza la búsqueda avanzada.

## Gestión

Espacio dedicado a los usuarios que crean y administran libros.

Incluye:

- Panel de gestión
- Mis libros
- Crear libro
- Editar libros
- Borradores
- Publicados
- Archivados (futuro)

El CRUD de libros pertenece principalmente a esta sección.

## Cuenta

Área relacionada exclusivamente con la identidad y configuración del usuario:

- Mi perfil
- Configuración
- Seguridad
- Cerrar sesión

## Principio de organización

La navegación separa cuatro intenciones principales:

- Explorar → descubrir libros.
- Mi biblioteca → gestionar la experiencia personal como lector.
- Buscar → encontrar libros mediante criterios.
- Gestión → crear y administrar contenido.
- Cuenta → administrar la identidad del usuario.