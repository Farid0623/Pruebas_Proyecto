# Plan de Pruebas - Sistema de Gestión de Inventario

## Información General
- **Proyecto**: Sistema de Gestión de Inventario
- **Versión**: 1.0.0
- **Fecha**: 30 de Noviembre de 2025
- **Responsable**: Equipo de Desarrollo

---

## 1. PRUEBAS UNITARIAS

### 1.1 Pruebas de CategoryService

| ID | Tipo | Descripción | Prerrequisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|-------------------|-------------------|
| UT-CAT-01 | Unitaria | Obtener todas las categorías | Mock del repositorio configurado | 1. Llamar a getAllCategories()<br>2. Verificar respuesta | Retorna lista con todas las categorías | ✅ PASS |
| UT-CAT-02 | Unitaria | Obtener categoría por ID existente | Categoría con ID=1 mockeada | 1. Llamar a getCategoryById(1)<br>2. Verificar Optional presente | Retorna Optional con la categoría | ✅ PASS |
| UT-CAT-03 | Unitaria | Obtener categoría por ID inexistente | Repositorio retorna Optional.empty() | 1. Llamar a getCategoryById(999)<br>2. Verificar Optional vacío | Retorna Optional.empty() | ✅ PASS |
| UT-CAT-04 | Unitaria | Crear categoría con nombre único | Nombre no existe en BD | 1. Crear categoría "Electrónicos"<br>2. Verificar guardado | Categoría creada exitosamente | ✅ PASS |
| UT-CAT-05 | Unitaria | Crear categoría con nombre duplicado | Nombre ya existe en BD | 1. Intentar crear categoría existente<br>2. Capturar excepción | Lanza IllegalArgumentException | ✅ PASS |
| UT-CAT-06 | Unitaria | Actualizar categoría existente | Categoría ID=1 existe | 1. Actualizar nombre de categoría<br>2. Verificar guardado | Categoría actualizada correctamente | ✅ PASS |
| UT-CAT-07 | Unitaria | Actualizar categoría inexistente | Categoría ID=999 no existe | 1. Intentar actualizar categoría<br>2. Capturar excepción | Lanza IllegalArgumentException | ✅ PASS |
| UT-CAT-08 | Unitaria | Eliminar categoría existente | Categoría ID=1 existe | 1. Llamar a deleteCategory(1)<br>2. Verificar llamada a repo | Categoría eliminada correctamente | ✅ PASS |
| UT-CAT-09 | Unitaria | Eliminar categoría inexistente | Categoría ID=999 no existe | 1. Intentar eliminar categoría<br>2. Capturar excepción | Lanza IllegalArgumentException | ✅ PASS |
| UT-CAT-10 | Unitaria | Buscar categoría por nombre | Categoría "Electrónicos" existe | 1. Llamar a findByName("Electrónicos")<br>2. Verificar resultado | Retorna Optional con la categoría | ✅ PASS |

### 1.2 Pruebas de ProductService

| ID | Tipo | Descripción | Prerrequisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|-------------------|-------------------|
| UT-PROD-01 | Unitaria | Obtener todos los productos | Mock del repositorio configurado | 1. Llamar a getAllProducts()<br>2. Verificar respuesta | Retorna lista con todos los productos | ✅ PASS |
| UT-PROD-02 | Unitaria | Obtener producto por ID existente | Producto con ID=1 mockeado | 1. Llamar a getProductById(1)<br>2. Verificar Optional presente | Retorna Optional con el producto | ✅ PASS |
| UT-PROD-03 | Unitaria | Obtener producto por ID inexistente | Repositorio retorna Optional.empty() | 1. Llamar a getProductById(999)<br>2. Verificar Optional vacío | Retorna Optional.empty() | ✅ PASS |
| UT-PROD-04 | Unitaria | Obtener productos por categoría | Categoría ID=1 tiene productos | 1. Llamar a getProductsByCategory(1)<br>2. Verificar lista | Retorna productos de la categoría | ✅ PASS |
| UT-PROD-05 | Unitaria | Crear producto con categoría válida | Categoría ID=1 existe | 1. Crear producto<br>2. Verificar guardado | Producto creado exitosamente | ✅ PASS |
| UT-PROD-06 | Unitaria | Crear producto con categoría inexistente | Categoría ID=999 no existe | 1. Intentar crear producto<br>2. Capturar excepción | Lanza IllegalArgumentException | ✅ PASS |
| UT-PROD-07 | Unitaria | Crear producto sin categoría | category = null | 1. Intentar crear producto<br>2. Capturar excepción | Lanza IllegalArgumentException | ✅ PASS |
| UT-PROD-08 | Unitaria | Actualizar producto existente | Producto ID=1 existe | 1. Actualizar datos del producto<br>2. Verificar guardado | Producto actualizado correctamente | ✅ PASS |
| UT-PROD-09 | Unitaria | Actualizar producto inexistente | Producto ID=999 no existe | 1. Intentar actualizar producto<br>2. Capturar excepción | Lanza IllegalArgumentException | ✅ PASS |
| UT-PROD-10 | Unitaria | Eliminar producto existente | Producto ID=1 existe | 1. Llamar a deleteProduct(1)<br>2. Verificar llamada a repo | Producto eliminado correctamente | ✅ PASS |
| UT-PROD-11 | Unitaria | Eliminar producto inexistente | Producto ID=999 no existe | 1. Intentar eliminar producto<br>2. Capturar excepción | Lanza IllegalArgumentException | ✅ PASS |
| UT-PROD-12 | Unitaria | Actualizar stock válido | Producto ID=1 existe | 1. Actualizar stock a 20<br>2. Verificar guardado | Stock actualizado a 20 | ✅ PASS |
| UT-PROD-13 | Unitaria | Actualizar stock negativo | Producto ID=1 existe | 1. Intentar stock -5<br>2. Capturar excepción | Lanza IllegalArgumentException | ✅ PASS |
| UT-PROD-14 | Unitaria | Buscar productos por nombre | Productos con "Laptop" existen | 1. Llamar a searchProductsByName("Laptop")<br>2. Verificar resultados | Retorna productos que contienen "Laptop" | ✅ PASS |

---

## 2. PRUEBAS DE INTEGRACIÓN

### 2.1 Pruebas de Integración de Categories API

| ID | Tipo | Descripción | Prerrequisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|-------------------|-------------------|
| IT-CAT-01 | Integración | GET /api/categories sin datos | BD vacía | 1. GET /api/categories<br>2. Verificar respuesta | Status 200, lista vacía [] | ✅ PASS |
| IT-CAT-02 | Integración | GET /api/categories con datos | 2 categorías en BD | 1. GET /api/categories<br>2. Verificar cantidad | Status 200, 2 categorías retornadas | ✅ PASS |
| IT-CAT-03 | Integración | GET /api/categories/{id} existente | Categoría ID=1 existe | 1. GET /api/categories/1<br>2. Verificar datos | Status 200, retorna categoría correcta | ✅ PASS |
| IT-CAT-04 | Integración | GET /api/categories/{id} inexistente | Categoría ID=999 no existe | 1. GET /api/categories/999<br>2. Verificar status | Status 404 Not Found | ✅ PASS |
| IT-CAT-05 | Integración | POST /api/categories válido | Datos válidos de categoría | 1. POST con {"name":"Libros"}<br>2. Verificar creación | Status 201, categoría creada con ID | ✅ PASS |
| IT-CAT-06 | Integración | POST /api/categories con nombre vacío | name = "" | 1. POST con nombre vacío<br>2. Verificar error | Status 400 Bad Request | ✅ PASS |
| IT-CAT-07 | Integración | POST /api/categories nombre duplicado | Categoría "Electrónicos" existe | 1. POST con nombre existente<br>2. Verificar error | Status 400 Bad Request | ✅ PASS |
| IT-CAT-08 | Integración | PUT /api/categories/{id} válido | Categoría ID=1 existe | 1. PUT con nuevo nombre<br>2. Verificar actualización | Status 200, categoría actualizada | ✅ PASS |
| IT-CAT-09 | Integración | PUT /api/categories/{id} inexistente | Categoría ID=999 no existe | 1. PUT a categoría inexistente<br>2. Verificar error | Status 400 Bad Request | ✅ PASS |
| IT-CAT-10 | Integración | DELETE /api/categories/{id} existente | Categoría ID=1 existe | 1. DELETE categoría<br>2. Verificar eliminación | Status 204, categoría eliminada | ✅ PASS |
| IT-CAT-11 | Integración | DELETE /api/categories/{id} inexistente | Categoría ID=999 no existe | 1. DELETE categoría inexistente<br>2. Verificar error | Status 400 Bad Request | ✅ PASS |

### 2.2 Pruebas de Integración de Products API

| ID | Tipo | Descripción | Prerrequisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|-------------------|-------------------|
| IT-PROD-01 | Integración | GET /api/products sin datos | BD vacía | 1. GET /api/products<br>2. Verificar respuesta | Status 200, lista vacía [] | ✅ PASS |
| IT-PROD-02 | Integración | GET /api/products con datos | 2 productos en BD | 1. GET /api/products<br>2. Verificar cantidad | Status 200, 2 productos retornados | ✅ PASS |
| IT-PROD-03 | Integración | GET /api/products/{id} existente | Producto ID=1 existe | 1. GET /api/products/1<br>2. Verificar datos | Status 200, retorna producto correcto | ✅ PASS |
| IT-PROD-04 | Integración | GET /api/products/{id} inexistente | Producto ID=999 no existe | 1. GET /api/products/999<br>2. Verificar status | Status 404 Not Found | ✅ PASS |
| IT-PROD-05 | Integración | POST /api/products válido | Categoría existe, datos válidos | 1. POST con datos completos<br>2. Verificar creación | Status 201, producto creado con ID | ✅ PASS |
| IT-PROD-06 | Integración | POST /api/products categoría inexistente | Categoría ID=999 no existe | 1. POST con categoría inválida<br>2. Verificar error | Status 400 Bad Request | ✅ PASS |
| IT-PROD-07 | Integración | POST /api/products nombre vacío | name = "" | 1. POST con nombre vacío<br>2. Verificar error | Status 400 Bad Request | ✅ PASS |
| IT-PROD-08 | Integración | PUT /api/products/{id} válido | Producto ID=1 existe | 1. PUT con nuevos datos<br>2. Verificar actualización | Status 200, producto actualizado | ✅ PASS |
| IT-PROD-09 | Integración | PUT /api/products/{id} inexistente | Producto ID=999 no existe | 1. PUT a producto inexistente<br>2. Verificar error | Status 400 Bad Request | ✅ PASS |
| IT-PROD-10 | Integración | DELETE /api/products/{id} existente | Producto ID=1 existe | 1. DELETE producto<br>2. Verificar eliminación | Status 204, producto eliminado | ✅ PASS |
| IT-PROD-11 | Integración | DELETE /api/products/{id} inexistente | Producto ID=999 no existe | 1. DELETE producto inexistente<br>2. Verificar error | Status 400 Bad Request | ✅ PASS |
| IT-PROD-12 | Integración | GET /api/products/category/{id} | Categoría tiene productos | 1. GET productos por categoría<br>2. Verificar filtrado | Status 200, productos de esa categoría | ✅ PASS |
| IT-PROD-13 | Integración | GET /api/products/search | Productos con "Laptop" existen | 1. GET /api/products/search?name=Laptop<br>2. Verificar resultados | Status 200, productos filtrados | ✅ PASS |
| IT-PROD-14 | Integración | PATCH /api/products/{id}/stock | Producto ID=1 existe | 1. PATCH stock a 25<br>2. Verificar actualización | Status 200, stock actualizado a 25 | ✅ PASS |

---

## 3. PRUEBAS END-TO-END (E2E)

### 3.1 Flujos Completos del Sistema

| ID | Tipo | Descripción | Prerrequisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|-------------------|-------------------|
| E2E-01 | E2E | Flujo completo: Crear categoría → Crear producto → Visualizar | Backend y Frontend ejecutándose | 1. Navegar a Categorías<br>2. Crear categoría "Test"<br>3. Navegar a Productos<br>4. Crear producto en categoría "Test"<br>5. Verificar producto en listado | Producto visible con categoría correcta | ✅ PASS |
| E2E-02 | E2E | Crear y editar categoría | Sistema ejecutándose | 1. Crear categoría<br>2. Click en Editar<br>3. Cambiar nombre<br>4. Guardar<br>5. Verificar cambios | Categoría actualizada en tabla | ✅ PASS |
| E2E-03 | E2E | Crear y eliminar producto | Sistema ejecutándose, categoría existe | 1. Crear producto<br>2. Verificar en tabla<br>3. Click en Eliminar<br>4. Confirmar eliminación<br>5. Verificar ausencia | Producto eliminado de la tabla | ✅ PASS |
| E2E-04 | E2E | Validación de campos requeridos | Frontend ejecutándose | 1. Click "Nuevo Producto"<br>2. Click "Crear" sin llenar<br>3. Verificar validación | Formulario muestra errores de validación | ✅ PASS |
| E2E-05 | E2E | Navegación entre secciones | Frontend ejecutándose | 1. Inicio en Productos<br>2. Click Categorías<br>3. Verificar URL /categories<br>4. Click Productos<br>5. Verificar URL / | Navegación correcta entre secciones | ✅ PASS |

---

## 4. PRUEBAS DE ANÁLISIS ESTÁTICO

### 4.1 Backend (Java - Checkstyle & PMD)

| ID | Tipo | Descripción | Prerrequisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|-------------------|-------------------|
| SA-BE-01 | Análisis Estático | Checkstyle - Estándares de código | Código Java implementado | 1. Ejecutar mvn checkstyle:check<br>2. Revisar reporte | Sin violaciones de estándares | ✅ PASS |
| SA-BE-02 | Análisis Estático | PMD - Detección de problemas | Código Java implementado | 1. Ejecutar mvn pmd:check<br>2. Revisar reporte | Sin problemas críticos detectados | ✅ PASS |

### 4.2 Frontend (JavaScript - ESLint)

| ID | Tipo | Descripción | Prerrequisitos | Pasos | Resultado Esperado | Resultado Obtenido |
|----|------|-------------|----------------|-------|-------------------|-------------------|
| SA-FE-01 | Análisis Estático | ESLint - Calidad de código JS/React | Código React implementado | 1. Ejecutar npm run lint<br>2. Revisar warnings | Código cumple estándares ESLint | ✅ PASS |

---

## 5. RESUMEN DE COBERTURA

| Categoría | Total de Casos | Exitosos | Fallidos | % Éxito |
|-----------|----------------|----------|----------|---------|
| Pruebas Unitarias | 24 | 24 | 0 | 100% |
| Pruebas de Integración | 25 | 25 | 0 | 100% |
| Pruebas E2E | 5 | 5 | 0 | 100% |
| Análisis Estático | 3 | 3 | 0 | 100% |
| **TOTAL** | **57** | **57** | **0** | **100%** |

---

## 6. NOTAS Y OBSERVACIONES

### Herramientas Utilizadas
- **Pruebas Unitarias**: JUnit 5, Mockito
- **Pruebas de Integración**: Spring Boot Test, MockMvc, H2 Database
- **Pruebas E2E**: Playwright
- **Análisis Estático**: Checkstyle, PMD (Backend), ESLint (Frontend)

### Entornos de Prueba
- **Backend**: Java 17, Spring Boot 3.2.0, PostgreSQL (producción), H2 (pruebas)
- **Frontend**: React 18, Node.js
- **Navegador E2E**: Chromium (Playwright)

### Criterios de Aceptación
✅ Todas las pruebas unitarias deben pasar  
✅ Todas las pruebas de integración deben pasar  
✅ El flujo E2E principal debe completarse sin errores  
✅ El análisis estático no debe reportar errores críticos  
✅ Cobertura de código superior al 80%

### Comentarios Finales
- Todas las pruebas han sido ejecutadas exitosamente
- El sistema cumple con todos los requisitos funcionales
- El código cumple con los estándares de calidad establecidos
- El sistema está listo para despliegue
