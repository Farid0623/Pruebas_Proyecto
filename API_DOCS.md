# API Documentation - Sistema de Inventario

Base URL: `http://localhost:8080/api`

## 📦 Categories API

### GET /categories
Obtiene todas las categorías.

**Response 200 OK**
```json
[
  {
    "id": 1,
    "name": "Electrónicos",
    "createdAt": "2025-11-30T10:00:00",
    "updatedAt": "2025-11-30T10:00:00"
  }
]
```

---

### GET /categories/{id}
Obtiene una categoría por ID.

**Parameters**
- `id` (path): ID de la categoría

**Response 200 OK**
```json
{
  "id": 1,
  "name": "Electrónicos",
  "createdAt": "2025-11-30T10:00:00",
  "updatedAt": "2025-11-30T10:00:00"
}
```

**Response 404 Not Found**
```
Category not found
```

---

### POST /categories
Crea una nueva categoría.

**Request Body**
```json
{
  "name": "Libros"
}
```

**Response 201 Created**
```json
{
  "id": 5,
  "name": "Libros",
  "createdAt": "2025-11-30T11:00:00",
  "updatedAt": "2025-11-30T11:00:00"
}
```

**Response 400 Bad Request**
- Nombre vacío
- Nombre ya existe

---

### PUT /categories/{id}
Actualiza una categoría existente.

**Parameters**
- `id` (path): ID de la categoría

**Request Body**
```json
{
  "name": "Electrónicos y Computación"
}
```

**Response 200 OK**
```json
{
  "id": 1,
  "name": "Electrónicos y Computación",
  "createdAt": "2025-11-30T10:00:00",
  "updatedAt": "2025-11-30T12:00:00"
}
```

**Response 400 Bad Request**
- Categoría no existe
- Nombre ya existe en otra categoría

---

### DELETE /categories/{id}
Elimina una categoría.

**Parameters**
- `id` (path): ID de la categoría

**Response 204 No Content**

**Response 400 Bad Request**
- Categoría no existe

---

## 🛒 Products API

### GET /products
Obtiene todos los productos.

**Response 200 OK**
```json
[
  {
    "id": 1,
    "name": "Laptop HP",
    "description": "Laptop HP 15.6 pulgadas Intel Core i5",
    "price": 899.99,
    "stock": 10,
    "category": {
      "id": 1,
      "name": "Electrónicos"
    },
    "createdAt": "2025-11-30T10:00:00",
    "updatedAt": "2025-11-30T10:00:00"
  }
]
```

---

### GET /products/{id}
Obtiene un producto por ID.

**Parameters**
- `id` (path): ID del producto

**Response 200 OK**
```json
{
  "id": 1,
  "name": "Laptop HP",
  "description": "Laptop HP 15.6 pulgadas Intel Core i5",
  "price": 899.99,
  "stock": 10,
  "category": {
    "id": 1,
    "name": "Electrónicos"
  },
  "createdAt": "2025-11-30T10:00:00",
  "updatedAt": "2025-11-30T10:00:00"
}
```

**Response 404 Not Found**

---

### GET /products/category/{categoryId}
Obtiene todos los productos de una categoría.

**Parameters**
- `categoryId` (path): ID de la categoría

**Response 200 OK**
```json
[
  {
    "id": 1,
    "name": "Laptop HP",
    "price": 899.99,
    "stock": 10,
    "category": {
      "id": 1,
      "name": "Electrónicos"
    }
  }
]
```

---

### GET /products/search?name={name}
Busca productos por nombre (case-insensitive).

**Query Parameters**
- `name` (query): Texto a buscar en el nombre

**Response 200 OK**
```json
[
  {
    "id": 1,
    "name": "Laptop HP",
    "price": 899.99,
    "stock": 10
  },
  {
    "id": 5,
    "name": "Laptop Dell",
    "price": 999.99,
    "stock": 5
  }
]
```

---

### POST /products
Crea un nuevo producto.

**Request Body**
```json
{
  "name": "Mouse Logitech",
  "description": "Mouse inalámbrico ergonómico",
  "price": 29.99,
  "stock": 50,
  "category": {
    "id": 1
  }
}
```

**Response 201 Created**
```json
{
  "id": 10,
  "name": "Mouse Logitech",
  "description": "Mouse inalámbrico ergonómico",
  "price": 29.99,
  "stock": 50,
  "category": {
    "id": 1,
    "name": "Electrónicos"
  },
  "createdAt": "2025-11-30T11:00:00",
  "updatedAt": "2025-11-30T11:00:00"
}
```

**Response 400 Bad Request**
- Campos requeridos vacíos
- Categoría no existe
- Precio o stock negativos

---

### PUT /products/{id}
Actualiza un producto existente.

**Parameters**
- `id` (path): ID del producto

**Request Body**
```json
{
  "name": "Laptop HP Pavilion",
  "description": "Laptop HP 15.6 pulgadas Intel Core i7",
  "price": 1099.99,
  "stock": 8,
  "category": {
    "id": 1
  }
}
```

**Response 200 OK**
```json
{
  "id": 1,
  "name": "Laptop HP Pavilion",
  "description": "Laptop HP 15.6 pulgadas Intel Core i7",
  "price": 1099.99,
  "stock": 8,
  "category": {
    "id": 1,
    "name": "Electrónicos"
  },
  "createdAt": "2025-11-30T10:00:00",
  "updatedAt": "2025-11-30T13:00:00"
}
```

**Response 400 Bad Request**
- Producto no existe
- Categoría no existe
- Validaciones fallidas

---

### PATCH /products/{id}/stock?stock={newStock}
Actualiza solo el stock de un producto.

**Parameters**
- `id` (path): ID del producto
- `stock` (query): Nuevo valor de stock

**Response 200 OK**
```json
{
  "id": 1,
  "name": "Laptop HP",
  "price": 899.99,
  "stock": 25,
  "category": {
    "id": 1,
    "name": "Electrónicos"
  }
}
```

**Response 400 Bad Request**
- Producto no existe
- Stock negativo

---

### DELETE /products/{id}
Elimina un producto.

**Parameters**
- `id` (path): ID del producto

**Response 204 No Content**

**Response 400 Bad Request**
- Producto no existe

---

## 🔧 Ejemplos con cURL

### Crear categoría
```bash
curl -X POST http://localhost:8080/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Deportes"}'
```

### Listar todas las categorías
```bash
curl http://localhost:8080/api/categories
```

### Crear producto
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Balón de Fútbol",
    "description":"Balón profesional talla 5",
    "price":39.99,
    "stock":30,
    "category":{"id":1}
  }'
```

### Actualizar stock
```bash
curl -X PATCH "http://localhost:8080/api/products/1/stock?stock=50" \
  -H "Content-Type: application/json"
```

### Buscar productos
```bash
curl "http://localhost:8080/api/products/search?name=laptop"
```

### Eliminar producto
```bash
curl -X DELETE http://localhost:8080/api/products/1
```

---

## 📊 Códigos de Estado HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Operación exitosa (GET, PUT, PATCH) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 204 | No Content | Eliminación exitosa (DELETE) |
| 400 | Bad Request | Validación fallida o error en la solicitud |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

## 🔐 CORS

El backend permite peticiones desde:
- `http://localhost:3000` (Frontend en desarrollo)

Para producción, configurar en `application.properties`:
```properties
spring.web.cors.allowed-origins=https://tu-dominio.com
```
