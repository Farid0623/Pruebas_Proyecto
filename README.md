# Sistema de Gestión de Inventario

![CI/CD Status](https://github.com/Farid0623/PracticaCDI/workflows/CI%2FCD%20Pipeline%20-%20Sistema%20de%20Inventario/badge.svg)

Sistema completo de gestión de inventario de productos con API REST, interfaz web, base de datos PostgreSQL y suite completa de pruebas automatizadas.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Base de Datos](#base-de-datos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Pruebas](#pruebas)
- [Pipeline CI/CD](#pipeline-cicd)
- [API Documentation](#api-documentation)
- [Docker](#docker)
- [Decisiones Técnicas](#decisiones-técnicas)

---

## 🎯 Descripción

Sistema de gestión de inventario que permite:
- ✅ Crear, listar, actualizar y eliminar categorías
- ✅ Crear, listar, actualizar y eliminar productos
- ✅ Asociar productos a categorías
- ✅ Buscar productos por nombre
- ✅ Actualizar stock de productos
- ✅ Interfaz web intuitiva y responsive

## 🏗️ Arquitectura

El sistema implementa una **arquitectura por capas** (Layered Architecture):

```
┌─────────────────────────────────────────────┐
│          FRONTEND (React)                   │
│  - Componentes                              │
│  - Servicios API                            │
└─────────────────┬───────────────────────────┘
                  │ HTTP/REST
┌─────────────────▼───────────────────────────┐
│       BACKEND (Spring Boot)                 │
│  ┌─────────────────────────────────────┐   │
│  │  Controllers (API REST)             │   │
│  └──────────────┬──────────────────────┘   │
│  ┌──────────────▼──────────────────────┐   │
│  │  Services (Lógica de Negocio)      │   │
│  └──────────────┬──────────────────────┘   │
│  ┌──────────────▼──────────────────────┐   │
│  │  Repositories (Acceso a Datos)     │   │
│  └──────────────┬──────────────────────┘   │
│  ┌──────────────▼──────────────────────┐   │
│  │  Models (Entidades JPA)            │   │
│  └────────────────────────────────────┘   │
└─────────────────┬───────────────────────────┘
                  │ JDBC
┌─────────────────▼───────────────────────────┐
│      BASE DE DATOS (PostgreSQL)             │
│  - Tabla categories                         │
│  - Tabla products                           │
└─────────────────────────────────────────────┘
```

### Capas del Backend:

1. **Controllers**: Exponen endpoints REST y manejan peticiones HTTP
2. **Services**: Contienen la lógica de negocio y validaciones
3. **Repositories**: Interfaces JPA para acceso a datos
4. **Models**: Entidades que mapean las tablas de la base de datos

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17**: Lenguaje de programación
- **Spring Boot 3.2.0**: Framework principal
- **Spring Data JPA**: ORM para acceso a datos
- **Spring Web**: API REST
- **PostgreSQL**: Base de datos en producción
- **H2**: Base de datos en memoria para pruebas
- **Flyway**: Migraciones de base de datos
- **Lombok**: Reducción de código boilerplate
- **Maven**: Gestión de dependencias y build

### Frontend
- **React 18**: Librería UI
- **React Router DOM**: Navegación
- **Axios**: Cliente HTTP
- **CSS3**: Estilos

### Pruebas
- **JUnit 5**: Pruebas unitarias
- **Mockito**: Mocking para pruebas
- **Spring Boot Test**: Pruebas de integración
- **MockMvc**: Pruebas de controladores
- **Playwright**: Pruebas E2E
- **Checkstyle & PMD**: Análisis estático (Java)
- **ESLint**: Análisis estático (JavaScript)

### DevOps
- **GitHub Actions**: CI/CD
- **Docker & Docker Compose**: Containerización
- **Git**: Control de versiones

## 📁 Estructura del Proyecto

```
Proyecto_final_pruebas/
├── backend/                       # API REST en Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/inventory/
│   │   │   │   ├── controller/    # Controladores REST
│   │   │   │   ├── service/       # Lógica de negocio
│   │   │   │   ├── repository/    # Repositorios JPA
│   │   │   │   ├── model/         # Entidades
│   │   │   │   └── InventoryManagementApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/migration/  # Scripts SQL de Flyway
│   │   └── test/
│   │       └── java/com/inventory/
│   │           ├── service/       # Pruebas unitarias
│   │           └── integration/   # Pruebas de integración
│   ├── pom.xml
│   └── checkstyle.xml
├── frontend/                      # Interfaz web en React
│   ├── public/
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── services/             # Servicios API
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .eslintrc.js
├── e2e-tests/                     # Pruebas End-to-End
│   ├── tests/
│   │   └── inventory.spec.js
│   ├── playwright.config.js
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # Pipeline CI/CD
├── docker-compose.yml             # Orquestación de contenedores
├── PLAN_DE_PRUEBAS.md            # Documentación de pruebas
└── README.md                      # Este archivo
```

## 🗄️ Base de Datos

### Esquema de Base de Datos

```sql
┌─────────────────────┐
│    categories       │
├─────────────────────┤
│ id (PK)            │
│ name (UNIQUE)      │
│ created_at         │
│ updated_at         │
└──────────┬──────────┘
           │
           │ 1:N
           │
┌──────────▼──────────┐
│    products         │
├─────────────────────┤
│ id (PK)            │
│ name               │
│ description        │
│ price              │
│ stock              │
│ category_id (FK)   │
│ created_at         │
│ updated_at         │
└─────────────────────┘
```

### Migraciones con Flyway

Las migraciones se encuentran en `backend/src/main/resources/db/migration/`:
- `V1__init_schema.sql`: Crea tablas e inserta datos iniciales

## 📦 Instalación

### Prerrequisitos

- Java 17 o superior
- Maven 3.8 o superior
- Node.js 18 o superior
- PostgreSQL 13 o superior
- Docker y Docker Compose (opcional)

### Instalación Manual

#### 1. Clonar el repositorio

```bash
git clone https://github.com/Farid0623/PracticaCDI.git
cd Proyecto_final_pruebas
```

#### 2. Configurar PostgreSQL

```bash
# Crear base de datos
createdb inventory_db

# O usando psql
psql -U postgres
CREATE DATABASE inventory_db;
\q
```

#### 3. Configurar el backend

```bash
cd backend

# Editar application.properties si es necesario
# spring.datasource.url=jdbc:postgresql://localhost:5432/inventory_db
# spring.datasource.username=postgres
# spring.datasource.password=tu_password

# Instalar dependencias
mvn clean install
```

#### 4. Configurar el frontend

```bash
cd ../frontend

# Instalar dependencias
npm install
```

## 🚀 Ejecución

### Opción 1: Ejecución Manual

#### Iniciar Backend

```bash
cd backend
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

#### Iniciar Frontend

```bash
cd frontend
npm start
```

El frontend estará disponible en `http://localhost:3000`

### Opción 2: Usando Docker

```bash
# Construir y ejecutar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

Servicios disponibles:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

## 🧪 Pruebas

### Pruebas Unitarias (Backend)

```bash
cd backend
mvn test
```

Ejecuta:
- 14 pruebas de ProductService
- 10 pruebas de CategoryService
- Total: **24 pruebas unitarias**

### Pruebas de Integración (Backend)

```bash
cd backend
mvn verify
```

Ejecuta:
- 14 pruebas de integración de Products API
- 11 pruebas de integración de Categories API
- Total: **25 pruebas de integración**

### Pruebas E2E

```bash
cd e2e-tests

# Instalar dependencias (primera vez)
npm install
npx playwright install

# Asegurarse de que backend y frontend estén ejecutándose
# Luego ejecutar las pruebas
npm test
```

Ejecuta:
- Flujo completo (crear categoría → crear producto → visualizar)
- CRUD de categorías
- CRUD de productos
- Validaciones de formularios
- Navegación entre secciones
- Total: **5 escenarios E2E**

### Análisis Estático de Código

#### Backend (Checkstyle y PMD)

```bash
cd backend

# Checkstyle
mvn checkstyle:check

# PMD
mvn pmd:check
```

#### Frontend (ESLint)

```bash
cd frontend
npm run lint
```

### Ejecutar Todas las Pruebas

```bash
# Desde la raíz del proyecto
./run-all-tests.sh
```

## 🔄 Pipeline CI/CD

El proyecto incluye un pipeline completo en GitHub Actions (`.github/workflows/ci-cd.yml`) que ejecuta:

1. **Backend Tests**
   - Instalación de dependencias
   - Análisis estático (Checkstyle, PMD)
   - Pruebas unitarias
   - Pruebas de integración
   - Reporte de cobertura

2. **Frontend Tests**
   - Instalación de dependencias
   - Análisis estático (ESLint)
   - Pruebas unitarias
   - Build del frontend

3. **E2E Tests**
   - Inicio de servicios (backend + frontend + PostgreSQL)
   - Ejecución de pruebas Playwright
   - Generación de reportes

4. **Final Status**
   - Si todas las etapas pasan: imprime "OK"
   - Si alguna falla: el pipeline falla

### Triggers

- Push a `main` o `develop`
- Pull requests a `main`

### Visualización

Los resultados están disponibles en la pestaña "Actions" del repositorio de GitHub.

## 📚 API Documentation

### Endpoints de Categories

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categories` | Obtener todas las categorías |
| GET | `/api/categories/{id}` | Obtener categoría por ID |
| POST | `/api/categories` | Crear nueva categoría |
| PUT | `/api/categories/{id}` | Actualizar categoría |
| DELETE | `/api/categories/{id}` | Eliminar categoría |

### Endpoints de Products

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/{id}` | Obtener producto por ID |
| GET | `/api/products/category/{id}` | Obtener productos por categoría |
| GET | `/api/products/search?name=...` | Buscar productos por nombre |
| POST | `/api/products` | Crear nuevo producto |
| PUT | `/api/products/{id}` | Actualizar producto |
| PATCH | `/api/products/{id}/stock?stock=...` | Actualizar stock |
| DELETE | `/api/products/{id}` | Eliminar producto |

### Ejemplos de Uso

#### Crear Categoría

```bash
curl -X POST http://localhost:8080/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Electrónicos"}'
```

#### Crear Producto

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Laptop HP",
    "description":"Laptop HP 15.6 pulgadas",
    "price":899.99,
    "stock":10,
    "category":{"id":1}
  }'
```

## 🐳 Docker

### Dockerfile del Backend

```dockerfile
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

### Dockerfile del Frontend

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

El archivo `docker-compose.yml` orquesta:
- PostgreSQL (puerto 5432)
- Backend (puerto 8080)
- Frontend (puerto 3000)

```bash
# Iniciar todo el stack
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reconstruir imágenes
docker-compose up -d --build
```

## 💡 Decisiones Técnicas

### ¿Por qué Java y Spring Boot?

- **Robustez**: Spring Boot es una solución madura y ampliamente adoptada
- **Productividad**: Reduce configuración boilerplate
- **Ecosistema**: Gran cantidad de librerías y herramientas
- **Testabilidad**: Excelente soporte para pruebas
- **Escalabilidad**: Preparado para crecer

### ¿Por qué React?

- **Componentes Reutilizables**: Facilita el mantenimiento
- **Virtual DOM**: Alto rendimiento
- **Ecosistema Rico**: Gran cantidad de librerías
- **Curva de Aprendizaje**: Relativamente suave

### ¿Por qué PostgreSQL?

- **ACID Compliance**: Transacciones confiables
- **Open Source**: Sin costos de licencia
- **Rendimiento**: Excelente para aplicaciones CRUD
- **Extensibilidad**: Soporta tipos de datos avanzados

### ¿Por qué Playwright para E2E?

- **Multi-navegador**: Soporta Chrome, Firefox, Safari
- **Auto-wait**: Espera automática de elementos
- **Debugging**: Excelentes herramientas de debugging
- **Rapidez**: Más rápido que Selenium

### Arquitectura por Capas

Elegida por:
- **Separación de Responsabilidades**: Cada capa tiene un propósito claro
- **Mantenibilidad**: Cambios localizados
- **Testabilidad**: Fácil de probar cada capa aisladamente
- **Escalabilidad**: Permite escalar componentes individualmente

### Flyway para Migraciones

- **Versionamiento**: Control de cambios en la BD
- **Automatización**: Migraciones automáticas al iniciar
- **Reproducibilidad**: Mismo esquema en todos los entornos

## 📄 Documentación Adicional

- [Plan de Pruebas Completo](./PLAN_DE_PRUEBAS.md)
- [Documentación API Endpoints](./API_DOCS.md) *(generar si es necesario)*

## 🤝 Contribución

1. Fork del proyecto
2. Crear branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## ✨ Autor

**Farid** - [Farid0623](https://github.com/Farid0623)

---

## 🎯 Checklist de Completitud del Proyecto

- ✅ API REST con arquitectura por capas
- ✅ Base de datos PostgreSQL con 2 tablas relacionadas
- ✅ Interfaz gráfica (React) que consume la API
- ✅ CRUD completo de categorías y productos
- ✅ Pruebas unitarias (24 casos)
- ✅ Pruebas de integración (25 casos)
- ✅ Pruebas E2E con Playwright (5 escenarios)
- ✅ Análisis estático (Checkstyle, PMD, ESLint)
- ✅ Plan de pruebas documentado
- ✅ Pipeline CI/CD en GitHub Actions
- ✅ README completo y detallado
- ✅ Docker y Docker Compose configurados
- ✅ Migraciones de base de datos con Flyway

**Estado del proyecto: ✅ COMPLETO Y LISTO PARA ENTREGA**
