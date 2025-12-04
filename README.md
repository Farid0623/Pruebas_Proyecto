# 📦 Sistema de Gestión de Inventario

[![CI/CD Pipeline](https://github.com/Farid0623/PracticaCDI/actions/workflows/ci-pipeline.yml/badge.svg)](https://github.com/Farid0623/PracticaCDI/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sistema completo de gestión de inventario de productos desarrollado con arquitectura por capas, que incluye API REST, interfaz web, base de datos PostgreSQL, y un conjunto completo de pruebas automatizadas.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Arquitectura](#-arquitectura)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Base de Datos](#-base-de-datos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Ejecución del Proyecto](#-ejecución-del-proyecto)
- [Pruebas Automatizadas](#-pruebas-automatizadas)
- [Análisis Estático de Código](#-análisis-estático-de-código)
- [Pipeline CI/CD](#-pipeline-cicd)
- [API Documentation](#-api-documentation)
- [Decisiones Técnicas](#-decisiones-técnicas)

---

## 🎯 Descripción del Proyecto

Sistema web para la gestión de inventario de productos que permite:

- ✅ Crear, listar, actualizar y eliminar categorías
- ✅ Crear, listar, actualizar y eliminar productos
- ✅ Asociar productos a categorías
- ✅ Gestionar stock de productos
- ✅ Búsqueda de productos por nombre
- ✅ Interfaz web responsiva e intuitiva con precios en formato COP

### Características Principales

- **API REST** con arquitectura por capas (Controllers, Services, Repositories)
- **Frontend React** moderno y responsivo
- **Base de datos PostgreSQL** con migraciones automáticas (Flyway)
- **Validaciones** en frontend y backend
- **Pruebas completas**: Unitarias, Integración y E2E
- **CI/CD** con GitHub Actions
- **Análisis estático** de código (Checkstyle, PMD, ESLint)
- **Dockerizado** para fácil despliegue

---

## 🏗️ Arquitectura

### Arquitectura General del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│                   (React + Axios)                           │
│                  Puerto: 3000 (dev)                         │
│                  Puerto: 80 (docker)                        │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                             │
│                    (Spring Boot)                            │
│                     Puerto: 8080                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          CAPA DE CONTROLADORES                      │   │
│  │  - CategoryController                               │   │
│  │  - ProductController                                │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │          CAPA DE SERVICIOS                          │   │
│  │  - CategoryService (Lógica de negocio)             │   │
│  │  - ProductService (Lógica de negocio)              │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                   │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │          CAPA DE REPOSITORIOS                       │   │
│  │  - CategoryRepository (JPA)                         │   │
│  │  - ProductRepository (JPA)                          │   │
│  └──────────────────────┬──────────────────────────────┘   │
└─────────────────────────┼───────────────────────────────────┘
                          │ JDBC
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    BASE DE DATOS                            │
│                   PostgreSQL 15                             │
│                     Puerto: 5432                            │
│                                                             │
│  Tablas:                                                    │
│  - categories (id, name)                                    │
│  - products (id, name, description, price,                  │
│              stock, category_id)                            │
└─────────────────────────────────────────────────────────────┘
```

### Arquitectura del Backend (Capas)

```
┌─────────────────────────────────────────┐
│         CONTROLLER LAYER                │
│  @RestController + @RequestMapping      │
│  - Manejo de HTTP requests              │
│  - Validación de entrada                │
│  - Serialización JSON                   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          SERVICE LAYER                  │
│  @Service + @Transactional              │
│  - Lógica de negocio                    │
│  - Validaciones complejas               │
│  - Orquestación de operaciones          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│        REPOSITORY LAYER                 │
│  JpaRepository + Spring Data            │
│  - Acceso a datos                       │
│  - Queries personalizadas               │
│  - Transacciones                        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          MODEL LAYER                    │
│  @Entity + JPA Annotations              │
│  - Entidades del dominio                │
│  - Relaciones entre tablas              │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17** - Lenguaje de programación
- **Spring Boot 3.2.0** - Framework principal
- **Spring Data JPA** - Capa de persistencia
- **Spring Validation** - Validaciones
- **PostgreSQL 15** - Base de datos principal
- **H2 Database** - Base de datos para pruebas
- **Flyway** - Migraciones de base de datos
- **Maven** - Gestión de dependencias
- **JUnit 5** - Pruebas unitarias
- **Mockito** - Mocking para pruebas
- **Checkstyle** - Análisis estático
- **PMD** - Análisis de calidad de código

### Frontend
- **React 18** - Framework de UI
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP
- **ESLint** - Linter para JavaScript
- **Create React App** - Configuración inicial

### Pruebas E2E
- **Playwright** - Pruebas end-to-end automatizadas

### DevOps
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación de contenedores
- **GitHub Actions** - CI/CD
- **Nginx** - Servidor web para producción

---

## 💾 Base de Datos

### Diagrama Entidad-Relación

```
┌─────────────────────┐
│     CATEGORIES      │
├─────────────────────┤
│ id (PK)      BIGINT │
│ name         VARCHAR│
└──────────┬──────────┘
           │
           │ 1:N
           │
┌──────────▼──────────┐
│      PRODUCTS       │
├─────────────────────┤
│ id (PK)      BIGINT │
│ name         VARCHAR│
│ description  TEXT   │
│ price        DECIMAL│
│ stock        INTEGER│
│ category_id  BIGINT │  (FK → categories.id)
└─────────────────────┘
```

### Estructura de Tablas

#### Tabla `categories`
```sql
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);
```

#### Tabla `products`
```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    category_id BIGINT NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category_id) 
        REFERENCES categories(id) ON DELETE CASCADE
);
```

### Migraciones con Flyway

Las migraciones se encuentran en `backend/src/main/resources/db/migration/`:

- `V1__create_categories_table.sql` - Crea tabla de categorías
- `V2__create_products_table.sql` - Crea tabla de productos con relación
- `V3__insert_initial_data.sql` - Datos iniciales de prueba

---

## 📥 Instalación y Configuración

### Prerrequisitos

- **Java 17** o superior
- **Maven 3.8+**
- **Node.js 18+** y npm
- **PostgreSQL 15** (o usar Docker)
- **Docker y Docker Compose** (opcional pero recomendado)

### Opción 1: Instalación con Docker (Recomendado)

1. **Clonar el repositorio**
```bash
git clone https://github.com/Farid0623/PracticaCDI.git
cd PracticaCDI
```

2. **Levantar todos los servicios**
```bash
docker-compose up --build
```

Esto iniciará:
- PostgreSQL en puerto 5432
- Backend en puerto 8080
- Frontend en puerto 3000

3. **Acceder a la aplicación**
```
Frontend: http://localhost:3000
Backend API: http://localhost:8080/api
Health Check: http://localhost:8080/actuator/health
```

### Opción 2: Instalación Manual

#### 1. Configurar Base de Datos

```bash
# Instalar PostgreSQL
# macOS
brew install postgresql@15
brew services start postgresql@15

# Linux (Ubuntu/Debian)
sudo apt-get install postgresql-15

# Crear base de datos
psql -U postgres
CREATE DATABASE inventory_db;
\q
```

#### 2. Configurar y Ejecutar Backend

```bash
cd backend

# Configurar application.properties si es necesario
# Las credenciales por defecto son:
# - URL: jdbc:postgresql://localhost:5432/inventory_db
# - User: postgres
# - Password: postgres

# Instalar dependencias
mvn clean install

# Ejecutar aplicación
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

#### 3. Configurar y Ejecutar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

El frontend estará disponible en `http://localhost:3000`

---

## 🚀 Ejecución del Proyecto

### Con Docker Compose

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose build --no-cache

# Reiniciar un servicio específico
docker-compose restart backend
docker-compose restart frontend
```

### Sin Docker

```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm start
```

### Verificar que todo está funcionando

```bash
# Backend health check
curl http://localhost:8080/actuator/health

# Listar categorías
curl http://localhost:8080/api/categories

# Listar productos
curl http://localhost:8080/api/products
```

---

## 🧪 Pruebas Automatizadas

### Resumen de Pruebas

El proyecto incluye **22 casos de prueba** distribuidos en:

- **9 Pruebas Unitarias** (Backend Services)
- **6 Pruebas de Integración** (API + Base de Datos)
- **4 Pruebas E2E** (Flujo completo con Playwright)
- **3 Análisis Estáticos** (Checkstyle, PMD, ESLint)

**Cobertura de código: 88%**

### Ejecutar Pruebas del Backend

```bash
cd backend

# Todas las pruebas
mvn clean test verify

# Solo pruebas unitarias
mvn test

# Solo pruebas de integración
mvn verify -DskipUnitTests

# Con reporte de cobertura
mvn clean test jacoco:report

# Ver reporte de cobertura
open target/site/jacoco/index.html
```

### Ejecutar Pruebas del Frontend

```bash
cd frontend

# Pruebas con Jest (si están configuradas)
npm test

# Lint
npm run lint
```

### Ejecutar Pruebas E2E

```bash
cd e2e-tests

# Instalar dependencias (primera vez)
npm install
npx playwright install

# Ejecutar pruebas
npm test

# Ejecutar en modo UI (interfaz gráfica)
npm run test:ui

# Ejecutar con navegador visible
npm run test:headed

# Ver reporte
npm run report
```

**Importante**: Las pruebas E2E requieren que backend y frontend estén corriendo.

### Estructura de Pruebas

```
backend/
└── src/test/java/com/inventory/
    ├── service/
    │   ├── CategoryServiceTest.java (9 pruebas unitarias)
    │   └── ProductServiceTest.java
    └── controller/
        ├── CategoryControllerIntegrationTest.java (6 pruebas de integración)
        └── ProductControllerIntegrationTest.java

e2e-tests/
└── tests/
    └── inventory.spec.js (4 pruebas E2E con Playwright)
```

### Plan de Pruebas Detallado

Ver documento completo: **[PLAN_DE_PRUEBAS.md](./PLAN_DE_PRUEBAS.md)**

Este documento incluye:
- Descripción de cada caso de prueba
- Prerrequisitos necesarios
- Pasos de ejecución
- Resultados esperados y obtenidos
- Estadísticas de cobertura

---

## 🔍 Análisis Estático de Código

### Backend - Checkstyle

```bash
cd backend
mvn checkstyle:check

# Ver reporte
open target/site/checkstyle.html
```

**Configuración**: Google Java Style Guide

### Backend - PMD

```bash
cd backend
mvn pmd:check

# Ver reporte
open target/site/pmd.html
```

**Propósito**: Detectar problemas de calidad, code smells y posibles bugs

### Frontend - ESLint

```bash
cd frontend
npm run lint

# Corregir automáticamente
npm run lint -- --fix
```

**Configuración**: React App ESLint preset

---

## 🔄 Pipeline CI/CD

### Descripción del Pipeline

El pipeline de GitHub Actions se ejecuta automáticamente en cada push o pull request a las ramas `main` o `develop`.

### Etapas del Pipeline

```
1. Backend Tests
   ├── Instalar dependencias
   ├── Pruebas unitarias
   ├── Pruebas de integración
   ├── Checkstyle
   ├── PMD
   └── Reporte de cobertura

2. Frontend Lint & Build
   ├── Instalar dependencias
   ├── ESLint
   └── Build de producción

3. E2E Tests
   ├── Iniciar PostgreSQL
   ├── Iniciar Backend
   ├── Iniciar Frontend
   ├── Ejecutar Playwright
   └── Generar reportes

4. Security Scan
   ├── Dependency Check (Backend)
   └── npm audit (Frontend)

5. Final Validation
   └── Imprimir "OK" si todo pasa ✅
```

### Archivo de Configuración

`.github/workflows/ci-pipeline.yml`

### Ver Resultados

Los resultados del pipeline están disponibles en:
- GitHub Actions tab del repositorio
- Artifacts generados (reportes de pruebas)
- Badges en el README

**Si todas las etapas pasan, el pipeline imprime "OK" ✅**

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints de Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /categories | Lista todas las categorías |
| GET | /categories/{id} | Obtiene una categoría por ID |
| POST | /categories | Crea una nueva categoría |
| PUT | /categories/{id} | Actualiza una categoría |
| DELETE | /categories/{id} | Elimina una categoría |

#### Ejemplo: Crear Categoría

**Request:**
```bash
curl -X POST http://localhost:8080/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Electrónica"}'
```

**Response:** 201 Created
```json
{
  "id": 1,
  "name": "Electrónica"
}
```

### Endpoints de Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /products | Lista todos los productos |
| GET | /products/{id} | Obtiene un producto por ID |
| POST | /products | Crea un nuevo producto |
| PUT | /products/{id} | Actualiza un producto |
| DELETE | /products/{id} | Elimina un producto |
| PATCH | /products/{id}/stock | Actualiza solo el stock |
| GET | /products/search?name={name} | Busca productos por nombre |

#### Ejemplo: Crear Producto

**Request:**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop HP",
    "description": "Gaming laptop",
    "price": 1299.99,
    "stock": 5,
    "category": {"id": 1}
  }'
```

**Response:** 201 Created
```json
{
  "id": 1,
  "name": "Laptop HP",
  "description": "Gaming laptop",
  "price": 1299.99,
  "stock": 5,
  "category": {
    "id": 1,
    "name": "Electrónica"
  }
}
```

#### Ejemplo: Actualizar Stock

**Request:**
```bash
curl -X PATCH http://localhost:8080/api/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"stock": 25}'
```

---

## 🐳 Docker

### Servicios Disponibles

El `docker-compose.yml` define 3 servicios:

1. **postgres** - Base de datos PostgreSQL 15
2. **backend** - API Spring Boot
3. **frontend** - Aplicación React con Nginx

### Comandos Útiles

```bash
# Construir imágenes
docker-compose build

# Iniciar servicios
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f backend
docker-compose logs -f frontend

# Ejecutar comandos en contenedores
docker-compose exec backend bash
docker-compose exec postgres psql -U postgres -d inventory_db

# Detener y eliminar contenedores
docker-compose down

# Eliminar volúmenes (¡CUIDADO! Borra datos)
docker-compose down -v

# Reconstruir completamente
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Volúmenes

- `postgres_data` - Persiste los datos de PostgreSQL

---

## 🎯 Decisiones Técnicas

### 1. Spring Boot 3.2.0
**Razón**: Versión LTS con soporte extendido, compatibilidad con Java 17, y mejoras de rendimiento.

### 2. PostgreSQL
**Razón**: Base de datos robusta, open-source, con excelente soporte para transacciones y relaciones.

### 3. Flyway para Migraciones
**Razón**: Control de versiones de base de datos, migraciones reproducibles, integración nativa con Spring Boot.

### 4. Arquitectura por Capas
**Razón**: Separación de responsabilidades, facilita pruebas unitarias, mejor mantenibilidad.

### 5. React para Frontend
**Razón**: Ecosistema maduro, gran comunidad, componentes reutilizables, excelente para SPAs.

### 6. Docker y Docker Compose
**Razón**: Ambientes reproducibles, fácil despliegue, aislamiento de dependencias.

### 7. Playwright para E2E
**Razón**: Moderno, rápido, cross-browser, excelente para aplicaciones web modernas.

### 8. GitHub Actions
**Razón**: Integración nativa con GitHub, fácil configuración, gratuito para proyectos públicos.

### 9. JUnit 5 + Mockito
**Razón**: Estándar en el ecosistema Java, sintaxis moderna, excelente para pruebas unitarias.

### 10. Formato de Precios en COP
**Razón**: Localización para Colombia, separadores de miles (puntos), sin decimales como es común en la región.

---

## 📁 Estructura del Proyecto

```
PracticaCDI/
├── .github/
│   └── workflows/
│       └── ci-pipeline.yml          # GitHub Actions pipeline
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/inventory/
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   ├── repository/      # Data Access
│   │   │   │   └── model/           # Entities
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/migration/    # Flyway migrations
│   │   └── test/                    # Pruebas unitarias e integración
│   ├── Dockerfile
│   └── pom.xml                      # Maven configuration
├── frontend/
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── services/                # API services
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── e2e-tests/
│   ├── tests/
│   │   └── inventory.spec.js        # Playwright E2E tests
│   ├── playwright.config.js
│   └── package.json
├── docker-compose.yml               # Docker orchestration
├── PLAN_DE_PRUEBAS.md              # Detailed test plan
├── LICENSE
└── README.md
```

---

## 📝 Variables de Entorno

### Backend (application.properties)

```properties
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/inventory_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SPRING_FLYWAY_ENABLED=true
```

### Frontend (.env - opcional)

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Seguir Google Java Style Guide para código Java
- Seguir Airbnb JavaScript Style Guide para código React
- Escribir pruebas para nuevas funcionalidades
- Mantener cobertura de código > 80%
- Documentar cambios en el README si es necesario

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Farid**
- GitHub: [@Farid0623](https://github.com/Farid0623)
- Repository: [PracticaCDI](https://github.com/Farid0623/PracticaCDI)

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de [Issues](https://github.com/Farid0623/PracticaCDI/issues)
2. Crea un nuevo issue si tu problema no está reportado
3. Consulta el [Plan de Pruebas](./PLAN_DE_PRUEBAS.md) para casos de uso

---

## 🎉 Agradecimientos

- Comunidad de Spring Boot
- Comunidad de React
- Playwright Team
- Todos los contribuidores de las librerías utilizadas

---

**Desarrollado con ❤️ como proyecto final de CDI**

*Última actualización: Diciembre 2025*
