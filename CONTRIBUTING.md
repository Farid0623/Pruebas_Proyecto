# Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Gestión de Inventario! 

## 🤝 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor abre un issue con la siguiente información:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs comportamiento actual
- Capturas de pantalla (si aplica)
- Versión del sistema operativo y navegador

### Sugerir Mejoras

Las sugerencias de mejoras son bienvenidas. Abre un issue con:
- Descripción detallada de la mejora
- Justificación de por qué sería útil
- Ejemplos de uso (si aplica)

### Pull Requests

1. **Fork** el repositorio
2. **Crea una rama** desde `develop`:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```
3. **Realiza tus cambios** siguiendo los estándares de código
4. **Ejecuta todas las pruebas**:
   ```bash
   ./run-all-tests.sh
   ```
5. **Commit** tus cambios con mensajes descriptivos:
   ```bash
   git commit -m "feat: agregar funcionalidad X"
   ```
6. **Push** a tu fork:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```
7. **Abre un Pull Request** desde tu rama hacia `develop`

## 📝 Estándares de Código

### Backend (Java)

- Seguir convenciones de Java estándar
- Usar Lombok para reducir boilerplate
- Documentar métodos públicos con Javadoc
- Escribir pruebas unitarias para nueva lógica
- Pasar Checkstyle y PMD sin errores

Ejemplo:
```java
/**
 * Crea un nuevo producto en el sistema.
 *
 * @param product El producto a crear
 * @return El producto creado con su ID
 * @throws IllegalArgumentException si la categoría no existe
 */
public Product createProduct(Product product) {
    // implementación
}
```

### Frontend (React)

- Usar componentes funcionales con hooks
- Mantener componentes pequeños y enfocados
- Extraer lógica compleja a custom hooks
- Usar nombres descriptivos para variables y funciones
- Pasar ESLint sin errores

Ejemplo:
```javascript
// Componente funcional
function ProductList({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // ... lógica
  
  return (
    // ... JSX
  );
}
```

### Mensajes de Commit

Usar [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin cambio de código)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar pruebas
- `chore:` Tareas de mantenimiento

Ejemplos:
```
feat: agregar endpoint de búsqueda de productos
fix: corregir validación de stock negativo
docs: actualizar README con instrucciones de Docker
test: agregar pruebas para ProductService
```

## 🧪 Pruebas

Toda nueva funcionalidad debe incluir:
- **Pruebas unitarias** para lógica de negocio
- **Pruebas de integración** para endpoints de API
- **Pruebas E2E** si afecta el flujo del usuario

Verificar que todas las pruebas pasen antes de hacer PR:
```bash
./run-all-tests.sh
```

## 📚 Documentación

- Actualizar README.md si cambias funcionalidad
- Actualizar PLAN_DE_PRUEBAS.md si agregas pruebas
- Agregar comentarios en código complejo
- Documentar nuevos endpoints en el README

## 🔍 Proceso de Revisión

Los Pull Requests serán revisados considerando:
- ✅ Todas las pruebas pasan
- ✅ El código sigue los estándares establecidos
- ✅ Hay documentación adecuada
- ✅ No hay conflictos con la rama base
- ✅ El análisis estático pasa sin errores críticos

## ❓ Preguntas

Si tienes preguntas sobre cómo contribuir, abre un issue con la etiqueta `question`.

## 📜 Código de Conducta

- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Ayuda a otros contribuyentes

---

¡Gracias por contribuir! 🎉
