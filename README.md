# Proyecto de Administración de Usuarios con Angular y Laravel

Este proyecto es una aplicación web desarrollada con Angular para el frontend y Laravel para el backend. Permite la administración de usuarios con funcionalidades de CRUD, paginación y filtros.

## Funcionalidades

- **CRUD de Usuarios:** Permite crear, leer, actualizar, Filtrar y eliminar usuarios.
- **Paginación:** Muestra los usuarios en una lista paginada.
- **Filtros:** Permite filtrar la lista de usuarios por departamento y cargo.

## Tecnologías Utilizadas

- **Frontend:** Angular, Bootstrap, HTML, CSS.
- **Backend:** Laravel, PHP, PostgreSQL.
 

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

```bash
# Clonar el repositorio
git clone https://github.com/siglotecnologico/CRUD-Laravel-Angular-GO.git

# Instalar las dependencias del frontend
cd CRUD-Laravel-Angular-GO/frontend
npm install

# Instalar las dependencias del backend
cd ../backend
composer install

# Configurar la base de datos
# - Copia el archivo `.env.example` y renómbralo a `.env`.
# - Configura las variables de entorno para la conexión a la base de datos en el archivo `.env`, incluyendo el nombre de la base de datos, el usuario y la contraseña.

# Ejecutar las migraciones del backend
php artisan migrate:fresh --seed

# Iniciar el servidor de desarrollo del frontend
cd ../frontend
ng serve

# Iniciar el servidor de desarrollo del backend
cd ../backend
php artisan serve
