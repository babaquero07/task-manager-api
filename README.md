# Task Manager API

Una API RESTful para gestión de tareas desarrollada con Node.js, Express, TypeScript y Prisma ORM.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Arquitectura](#arquitectura)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Documentation](#api-documentation)
- [Base de Datos](#base-de-datos)
- [Validaciones](#validaciones)
- [Scripts Disponibles](#scripts-disponibles)
- [Variables de Entorno](#variables-de-entorno)
- [Desarrollo](#desarrollo)

## 🎯 Descripción del Proyecto

Task Manager API es una aplicación backend que proporciona endpoints RESTful para la gestión completa de tareas. Permite crear, leer, actualizar y eliminar tareas con funcionalidades avanzadas como filtrado por estado, paginación y validación de datos.

### Características Principales

- ✅ CRUD completo de tareas
- 🔍 Filtrado por estado de tareas
- 📄 Paginación de resultados
- ✅ Validación de datos con express-validator
- 🗄️ Base de datos PostgreSQL con Prisma ORM
- 🔒 CORS configurado para seguridad
- 📝 Logging con Morgan
- 🏗️ Arquitectura modular y escalable

## 🏗️ Arquitectura

El proyecto sigue una arquitectura modular basada en capas:

```
src/
├── app/                    # Capa de aplicación
│   ├── app.ts             # Configuración de Express
│   ├── index.ts           # Punto de entrada del servidor
│   ├── routes.ts          # Enrutador principal
│   └── task/              # Módulo de tareas
│       ├── task.controller.ts  # Controladores (Rutas)
│       ├── task.service.ts     # Lógica de negocio
│       └── task.interface.ts   # Interfaces TypeScript
├── lib/                   # Configuraciones
│   └── prisma.ts          # Cliente de Prisma
└── utils/                 # Utilidades
    └── validators.ts      # Validaciones de datos
```

### Patrón de Diseño

- **MVC (Model-View-Controller)**: Separación clara entre controladores, servicios y modelos
- **Repository Pattern**: Prisma actúa como capa de abstracción de la base de datos
- **Middleware Pattern**: Validaciones y middleware de Express

## 🛠️ Tecnologías Utilizadas

### Backend

- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web para Node.js
- **TypeScript**: Superset de JavaScript con tipado estático
- **Prisma**: ORM moderno para Node.js y TypeScript

### Base de Datos

- **PostgreSQL**: Sistema de gestión de base de datos relacional
- **Docker**: Contenedorización de la base de datos

### Herramientas de Desarrollo

- **Nodemon**: Reinicio automático del servidor en desarrollo
- **Morgan**: Middleware de logging HTTP
- **Express-validator**: Validación de datos de entrada
- **CORS**: Middleware para Cross-Origin Resource Sharing

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- Docker y Docker Compose
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd task-manager-api
   ```

2. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

3. **Instalar dependencias**

   ```bash
   npm install
   ```

4. **Iniciar la base de datos**

   ```bash
   docker compose up -d
   ```

5. **Ejecutar migraciones de Prisma**

   ```bash
   npx prisma migrate dev
   ```

6. **Compilar el proyecto**

   ```bash
   npm run build
   ```

7. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000/api/v1`

## 📁 Estructura del Proyecto

```
task-manager-api/
├── src/
│   ├── app/
│   │   ├── app.ts                 # Configuración de Express
│   │   ├── index.ts               # Punto de entrada
│   │   ├── routes.ts              # Enrutador principal
│   │   └── task/
│   │       ├── task.controller.ts # Controladores de tareas
│   │       ├── task.service.ts    # Lógica de negocio
│   │       └── task.interface.ts  # Interfaces TypeScript
│   ├── lib/
│   │   └── prisma.ts              # Cliente de Prisma
│   └── utils/
│       └── validators.ts          # Validaciones
├── prisma/
│   ├── schema.prisma              # Esquema de base de datos
│   └── migrations/                # Migraciones de Prisma
├── generated/                     # Código generado por Prisma
├── docker-compose.yml             # Configuración de Docker
├── package.json                   # Dependencias y scripts
└── tsconfig.json                  # Configuración de TypeScript
```

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Endpoints

#### 1. Crear Tarea

```http
POST /tasks
```

**Body:**

```json
{
  "title": "Completar documentación",
  "description": "Generar documentación completa del proyecto",
  "status": "pendiente",
  "priority": 2,
  "dueDate": "2024-01-15T10:00:00Z"
}
```

**Respuesta:**

```json
{
  "ok": true,
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Completar documentación",
    "description": "Generar documentación completa del proyecto",
    "status": "pendiente",
    "priority": 2,
    "dueDate": "2024-01-15T10:00:00.000Z",
    "createdAt": "2024-01-10T15:30:00.000Z",
    "updatedAt": "2024-01-10T15:30:00.000Z"
  }
}
```

#### 2. Obtener Tareas (con paginación y filtros)

```http
GET /tasks?limit=10&offset=0&status=pendiente
```

**Parámetros de consulta:**

- `limit` (opcional): Número de tareas por página (1-100, default: 5)
- `offset` (opcional): Número de tareas a omitir (default: 0)
- `status` (opcional): Filtrar por estado ("pendiente", "en_progreso", "completada")

**Respuesta:**

```json
{
  "ok": true,
  "message": "Tasks fetched successfully",
  "count": 25,
  "pages": 3,
  "tasks": [...]
}
```

#### 3. Obtener Tarea por ID

```http
GET /tasks/:id
```

**Respuesta:**

```json
{
  "ok": true,
  "message": "Task fetched successfully",
  "task": {
    "id": 1,
    "title": "Completar documentación",
    "description": "Generar documentación completa del proyecto",
    "status": "pendiente",
    "priority": 2,
    "dueDate": "2024-01-15T10:00:00.000Z",
    "createdAt": "2024-01-10T15:30:00.000Z",
    "updatedAt": "2024-01-10T15:30:00.000Z"
  }
}
```

#### 4. Actualizar Tarea

```http
PATCH /tasks/:id
```

**Body:**

```json
{
  "status": "en_progreso",
  "priority": 1
}
```

**Respuesta:**

```json
{
  "ok": true,
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "title": "Completar documentación",
    "description": "Generar documentación completa del proyecto",
    "status": "en_progreso",
    "priority": 1,
    "dueDate": "2024-01-15T10:00:00.000Z",
    "createdAt": "2024-01-10T15:30:00.000Z",
    "updatedAt": "2024-01-10T16:00:00.000Z"
  }
}
```

#### 5. Eliminar Tarea

```http
DELETE /tasks/:id
```

**Respuesta:**

```json
{
  "ok": true,
  "message": "Task deleted successfully"
}
```

### Códigos de Estado HTTP

- `200`: Operación exitosa
- `201`: Recurso creado exitosamente
- `404`: Recurso no encontrado
- `422`: Error de validación
- `500`: Error interno del servidor

## 🗄️ Base de Datos

### Esquema de la Tabla `Task`

```sql
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pendiente'
        CHECK (status IN ('pendiente', 'en_progreso', 'completada')),
    priority SMALLINT NOT NULL DEFAULT 3
        CHECK (priority BETWEEN 1 AND 3),
    due_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Estados de Tarea

- `pendiente`: Tarea pendiente de realizar
- `en_progreso`: Tarea en proceso de realización
- `completada`: Tarea finalizada

### Niveles de Prioridad

- `1`: Alta prioridad
- `2`: Prioridad media
- `3`: Baja prioridad (default)

## ✅ Validaciones

### Validaciones de Entrada

#### Crear Tarea

- `title`: Requerido, string no vacío
- `description`: Opcional, string
- `status`: Opcional, debe ser uno de: "pendiente", "en_progreso", "completada"
- `priority`: Opcional, entero entre 1 y 3
- `dueDate`: Opcional, fecha ISO 8601 válida

#### Obtener Tareas

- `limit`: Opcional, entero entre 1 y 100
- `offset`: Opcional, entero mayor o igual a 0
- `status`: Opcional, debe ser uno de los estados válidos

#### Actualizar Tarea

- `id`: Requerido, entero válido
- Todos los campos del body son opcionales pero deben cumplir las mismas validaciones

## 📜 Scripts Disponibles

```json
{
  "dev": "concurrently \"npx tsc --watch\" \"nodemon --env-file=.env -q dist/app/index.js\"",
  "start": "node --env-file=.env dist/app/index.js",
  "build": "npm i && tsc"
}
```

- `npm run dev`: Inicia el servidor en modo desarrollo con hot reload
- `npm run start`: Inicia el servidor en modo producción
- `npm run build`: Compila el proyecto TypeScript

## 🔧 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=3000

# Configuración de la base de datos
DATABASE_URL="postgresql://username:password@localhost:5432/task_manager"
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=task_manager
```

## 🚀 Desarrollo

### Comandos Útiles

```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Ver base de datos con Prisma Studio
npx prisma studio

# Resetear base de datos
npx prisma migrate reset
```

### Estructura de Desarrollo

1. **Nuevas funcionalidades**: Crear nuevos módulos siguiendo la estructura existente
2. **Validaciones**: Agregar validaciones en `src/utils/validators.ts`
3. **Interfaces**: Definir tipos TypeScript en archivos `.interface.ts`
4. **Servicios**: Implementar lógica de negocio en archivos `.service.ts`
5. **Controladores**: Manejar rutas y respuestas HTTP en archivos `.controller.ts`

### Convenciones de Código

- Usar camelCase para variables y funciones
- Usar PascalCase para clases e interfaces
- Usar kebab-case para archivos
- Comentar funciones complejas
- Manejar errores apropiadamente

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**babaquero07**

---

**Nota**: Asegúrate de tener Docker ejecutándose antes de iniciar el proyecto, ya que la base de datos PostgreSQL se ejecuta en un contenedor.
