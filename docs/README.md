## Avance


### Usuario normal
registrarse
iniciar sesión
ver libros
buscar libros
ver detalle
pedir préstamo
devolver libro
ver historial
### Administrador
gestionar usuarios
añadir libros
editar libros
eliminar libros
ver préstamos
gestionar devoluciones

# Endpoints faltantes
#[get("/me")] fn get_user(req: HttpRequest) // Validamos y mostramos la información del usuario usando un token, salida data

#[get("/user/{username_link}")] fn get_user_page(name:<String>) // Página publica del usuario.


#[get("/user/{username}/libros")] fn get_libros_publicos_x_user(username:<String>) // todos los libros públicos de un usuario

#[get("/me/libros")] fn get_all_books_user(req: HttpRequest) // Validamos token, y mostramos todos los libros de 1 usuario

#[post("/me/libros")] fn post_books_x_user(param:<NuevoLibroUsuario>) // Registrar la relación entre un libro y usuario. Tabla relacional, salida id

#[get("/me/sufle_libro")] fn get_books_x_user(id: Path<i32>) // Obtener varias tablas sql, de libros, relacionadas sobre 1 user


# Register
## Descripción
Permite a un usuario crear una cuenta en la plataforma.

### Comportamiento actual

- El usuario envía email y contraseña y los demás datos necesarios.
- El backend crea el usuario en la base de datos.
- Se recibe un token de autenticación y se guarda, si el usuario fue creado correctamente.
- Actualmente el usuario permanece en la misma página después del registro.(END)

### Pendiente

- Redirigir automáticamente a la página principal después del registro.
- Guardar el token en el cliente (localStorage o cookie).
- Actualizar el estado de autenticación en React.
### Endpoint (Link)
/register  (luego de /auth/? debería?)

# Login
## Descripción
Permite a un usuario ingresar a la plataforma con su usuario y contraseña

### Comportamiento actual

| Carpeta      | Frecuencia de cambios |
| ------------ | --------------------- |
| domains      | Muy alta              |
| ui           | Media                 |
| architecture | Baja                  |






# Posible estructuración de archivos:
feature-based architecture
domain-driven frontend structure
---------------------------------------
src/

├── features/

│   └── books/

│       ├── api/

│       │   └── booksApi.js

│       │

│       ├── components/

│       │   ├── BookCard.jsx

│       │   └── BookForm.jsx

│       │

│       ├── pages/

│       │   ├── CreateBook.jsx

│       │   └── EditBook.jsx

│       │

│       ├── hooks/

│       │   └── useBooks.js

│       │

│       └── utils/

│           └── validators.js

│

├── layouts/

├── shared/

├── routes/

└── main.jsx

----------------------------------------

src/

├── features/

│   ├── auth/

│   │   ├── api/

│   │   ├── components/

│   │   ├── hooks/

│   │   └── pages/

│   │

│   ├── books/

│   │   ├── api/

│   │   ├── components/

│   │   ├── hooks/

│   │   ├── pages/

│   │   └── utils/

│   │

│   └── users/

│

├── layouts/

├── routes/

├── shared/

└── main.jsx
----------------------------------------------------

R2/
 └── tts/
      └── book123/
           └── chapter03/
                └── kokoro-voice-x/
                     ├── 001.opus
                     ├── 002.opus
                     └── 003.opus