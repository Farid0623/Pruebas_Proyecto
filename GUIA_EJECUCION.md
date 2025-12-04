# 🚀 Guía Rápida de Ejecución - Sistema de Gestión de Inventario

Esta guía te ayudará a ejecutar y validar todas las pruebas del sistema.

---

## 📋 Pre-requisitos

✅ Java 17 instalado  
✅ Maven instalado  
✅ Node.js 18+ instalado  
✅ PostgreSQL instalado (para ejecución completa)  
✅ Docker y Docker Compose (opcional)

---

## 🧪 Ejecutar Todas las Pruebas

### Opción 1: Script Automático (Recomendado)
```bash
./run-all-tests.sh
```

Este script ejecutará:
- ✅ Análisis estático (Checkstyle, PMD, ESLint)
- ✅ Pruebas unitarias del backend
- ✅ Pruebas de integración del backend
- ✅ Pruebas del frontend
- ✅ Pruebas E2E

---

## 🔬 Ejecutar Pruebas por Categoría

### 1️⃣ Pruebas Unitarias del Backend
```bash
cd backend
mvn test
```

**Resultado esperado:**
```
Tests run: 19, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

**Pruebas incluidas:**
- 7 pruebas de CategoryService
- 6 pruebas de ProductService
- 3 pruebas de CategoryController (integración)
- 3 pruebas de ProductController (integración)

---

### 2️⃣ Pruebas de Integración
```bash
cd backend
mvn verify
```

**Qué validan:**
- ✅ Endpoints REST completos
- ✅ Integración con base de datos H2
- ✅ Serialización/deserialización JSON
- ✅ Status codes HTTP correctos

---

### 3️⃣ Análisis Estático del Backend
```bash
cd backend

# Checkstyle
mvn checkstyle:check

# PMD
mvn pmd:check
```

---

### 4️⃣ Pruebas del Frontend
```bash
cd frontend

# Instalar dependencias (primera vez)
npm install

# Ejecutar pruebas
npm test -- --watchAll=false

# Análisis estático (ESLint)
npm run lint
```

---

### 5️⃣ Pruebas E2E (End-to-End)

**Preparación:**
```bash
# 1. Iniciar PostgreSQL
# Verificar que PostgreSQL esté corriendo en puerto 5432

# 2. Iniciar el backend
cd backend
mvn spring-boot:run
# Esperar a que esté listo en http://localhost:8080

# 3. En otra terminal, iniciar el frontend
cd frontend
npm start
# Esperar a que esté listo en http://localhost:3000
```

**Ejecutar Pruebas E2E:**
```bash
cd e2e-tests

# Instalar dependencias (primera vez)
npm install
npx playwright install chromium

# Ejecutar pruebas
npm test
```

**Flujo E2E Principal (Requisito Mínimo):**
✅ Crear categoría → Crear producto → Visualizar en listado

---

## 🐳 Ejecución con Docker

### Opción Completa (Más Fácil)
```bash
# Iniciar todos los servicios
docker-compose up -d

# Verificar que todo esté funcionando
curl http://localhost:8080/api/categories
curl http://localhost:3000

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

### Servicios Incluidos:
- 🐘 PostgreSQL en puerto 5432
- ☕ Backend API en puerto 8080
- ⚛️ Frontend React en puerto 3000

---

## 📊 Ver Plan de Pruebas Completo

El plan detallado de todas las pruebas está en:
```
PLAN_DE_PRUEBAS.md
```

Incluye:
- ✅ 13 pruebas unitarias
- ✅ 6 pruebas de integración  
- ✅ 5 pruebas E2E
- ✅ Descripción de cada caso
- ✅ Prerrequisitos y pasos
- ✅ Resultados esperados y obtenidos

---

## 🔄 Pipeline CI/CD

El pipeline de GitHub Actions se ejecuta automáticamente en:
- Push a `main` o `develop`
- Pull requests a `main`

### Ver Pipeline:
1. Ve a: `https://github.com/Farid0623/PracticaCDI/actions`
2. Selecciona el workflow más reciente
3. Revisa los 4 jobs:
   - `backend-tests`
   - `frontend-tests`
   - `e2e-tests`
   - `final-status`

### Resultado Exitoso:
Si todas las etapas pasan, verás:
```
╔═══════════════════════════════════════╗
║                                       ║
║              ✓  OK  ✓                 ║
║                                       ║
╚═══════════════════════════════════════╝
```

---

## 📝 Estructura de Pruebas

```
backend/
├── src/test/java/com/inventory/
│   ├── service/
│   │   ├── CategoryServiceTest.java      (7 pruebas unitarias)
│   │   └── ProductServiceTest.java       (6 pruebas unitarias)
│   └── controller/
│       ├── CategoryControllerIntegrationTest.java  (3 pruebas)
│       └── ProductControllerIntegrationTest.java   (3 pruebas)

frontend/
├── src/
│   └── (pruebas de componentes React)

e2e-tests/
└── tests/
    └── inventory.spec.js                 (5 pruebas E2E)
```

---

## 🎯 Flujo E2E Mínimo Requerido

**Archivo:** `e2e-tests/tests/inventory.spec.js`

**Test:** `Flujo completo: Crear categoría, crear producto y visualizar en listado`

**Pasos Automatizados:**
1. ✅ Navegar a /categories
2. ✅ Crear nueva categoría "Categoría E2E [timestamp]"
3. ✅ Verificar categoría en tabla
4. ✅ Navegar a / (productos)
5. ✅ Crear producto con la categoría creada
6. ✅ Verificar producto aparece en listado con:
   - Nombre del producto
   - Precio correcto (99.99)
   - Stock correcto (25)
   - Categoría correcta

---

## ✅ Validación Rápida

Para validar que todo está funcionando:

```bash
# 1. Compilar backend
cd backend && mvn clean compile

# 2. Ejecutar pruebas backend
mvn test

# 3. Compilar frontend  
cd ../frontend && npm install && npm run build

# 4. Ejecutar script completo
cd .. && ./run-all-tests.sh
```

Si ves **"OK"** al final, ¡todo está perfecto! ✅

---

## 🆘 Solución de Problemas

### Backend no compila
```bash
cd backend
mvn clean install -DskipTests
```

### Frontend tiene errores
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Base de datos no conecta
```bash
# Verificar PostgreSQL
psql -U postgres -l

# Crear base de datos si no existe
createdb -U postgres inventory_db
```

### Puerto ocupado
```bash
# Verificar puertos en uso
lsof -i :8080  # Backend
lsof -i :3000  # Frontend
lsof -i :5432  # PostgreSQL

# Matar proceso si es necesario
kill -9 [PID]
```

---

## 📚 Documentación Adicional

- **README.md** - Información general del proyecto
- **PLAN_DE_PRUEBAS.md** - Plan completo de pruebas (53 casos)
- **VALIDACION_REQUISITOS.md** - Validación de requisitos cumplidos
- **API_DOCS.md** - Documentación de la API REST
- **TROUBLESHOOTING.md** - Guía de solución de problemas
- **CONTRIBUTING.md** - Guía para contribuidores

---

## 🎓 Resumen de Comandos

```bash
# Backend
cd backend
mvn clean test                # Pruebas unitarias
mvn checkstyle:check          # Análisis estático
mvn pmd:check                 # Análisis estático
mvn spring-boot:run           # Ejecutar aplicación

# Frontend
cd frontend
npm test                      # Pruebas
npm run lint                  # Análisis estático
npm start                     # Ejecutar aplicación
npm run build                 # Build producción

# E2E
cd e2e-tests
npm test                      # Ejecutar pruebas E2E

# Docker
docker-compose up -d          # Iniciar todo
docker-compose down           # Detener todo
docker-compose logs -f        # Ver logs

# Script completo
./run-all-tests.sh            # Ejecutar todas las pruebas
```

---

**¡Listo para ejecutar! 🚀**
