# Troubleshooting y FAQ

## 🔧 Problemas Comunes y Soluciones

### Backend

#### Error: "Could not connect to PostgreSQL"

**Síntomas**: El backend no puede conectarse a la base de datos.

**Soluciones**:
1. Verificar que PostgreSQL está ejecutándose:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Verificar que la base de datos existe:
   ```bash
   psql -U postgres -l
   ```

3. Crear la base de datos si no existe:
   ```bash
   createdb inventory_db
   ```

4. Verificar credenciales en `application.properties`:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=tu_password
   ```

---

#### Error: "Port 8080 is already in use"

**Soluciones**:
1. Identificar el proceso usando el puerto:
   ```bash
   # macOS/Linux
   lsof -i :8080
   
   # Windows
   netstat -ano | findstr :8080
   ```

2. Matar el proceso o cambiar el puerto en `application.properties`:
   ```properties
   server.port=8081
   ```

---

#### Error: "Flyway validation failed"

**Soluciones**:
1. Limpiar la base de datos y permitir que Flyway la recree:
   ```bash
   dropdb inventory_db
   createdb inventory_db
   ```

2. O ejecutar:
   ```bash
   mvn flyway:clean flyway:migrate
   ```

---

#### Error: Pruebas fallan con "Table not found"

**Solución**: Verificar que H2 está configurado correctamente en `application-test.properties`:
```properties
spring.jpa.hibernate.ddl-auto=create-drop
spring.flyway.enabled=false
```

---

### Frontend

#### Error: "npm ERR! ERESOLVE unable to resolve dependency tree"

**Soluciones**:
1. Limpiar caché de npm:
   ```bash
   npm cache clean --force
   ```

2. Eliminar `node_modules` y reinstalar:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Usar `--legacy-peer-deps`:
   ```bash
   npm install --legacy-peer-deps
   ```

---

#### Error: "Network Error" al hacer llamadas a la API

**Soluciones**:
1. Verificar que el backend está ejecutándose:
   ```bash
   curl http://localhost:8080/api/categories
   ```

2. Verificar la URL en `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```

3. Verificar CORS en el backend (debe permitir `http://localhost:3000`)

---

#### Error: "React-scripts: command not found"

**Solución**: Reinstalar dependencias:
```bash
npm install react-scripts --save
```

---

### Pruebas E2E

#### Error: "Playwright browser not found"

**Solución**: Instalar navegadores de Playwright:
```bash
cd e2e-tests
npx playwright install
```

---

#### Error: "Timeout waiting for http://localhost:3000"

**Soluciones**:
1. Verificar que frontend y backend están ejecutándose
2. Aumentar el timeout en `playwright.config.js`:
   ```javascript
   webServer: {
     timeout: 180000, // 3 minutos
   }
   ```

---

### Docker

#### Error: "Cannot connect to Docker daemon"

**Soluciones**:
1. Verificar que Docker está ejecutándose:
   ```bash
   docker ps
   ```

2. Iniciar Docker Desktop (macOS/Windows)

3. Iniciar el servicio Docker (Linux):
   ```bash
   sudo systemctl start docker
   ```

---

#### Error: "Port is already allocated"

**Solución**: Detener contenedores que usan el mismo puerto:
```bash
docker-compose down
docker ps -a
docker stop <container_id>
```

---

#### Error: "No space left on device"

**Solución**: Limpiar imágenes y contenedores no usados:
```bash
docker system prune -a
docker volume prune
```

---

### CI/CD (GitHub Actions)

#### Error: Pipeline falla en pruebas E2E

**Soluciones**:
1. Verificar que los servicios inician correctamente
2. Aumentar timeouts en el workflow
3. Revisar logs del pipeline en GitHub

---

## ❓ FAQ (Preguntas Frecuentes)

### General

**P: ¿Qué versión de Java necesito?**  
R: Java 17 o superior. Verificar con `java -version`

**P: ¿Qué versión de Node.js necesito?**  
R: Node.js 18 o superior. Verificar con `node --version`

**P: ¿Puedo usar MySQL en lugar de PostgreSQL?**  
R: Sí, pero necesitas:
1. Cambiar dependencia en `pom.xml`
2. Actualizar `application.properties`
3. Ajustar el dialecto de Hibernate

**P: ¿Cómo cambio el puerto del backend?**  
R: En `application.properties`, modificar:
```properties
server.port=8081
```

**P: ¿Cómo cambio el puerto del frontend?**  
R: Crear archivo `.env` en `frontend/`:
```
PORT=3001
```

---

### Desarrollo

**P: ¿Cómo habilito el modo debug en Spring Boot?**  
R: Ejecutar con:
```bash
mvn spring-boot:run -Dspring-boot.run.arguments=--debug
```

**P: ¿Cómo veo las consultas SQL que ejecuta Hibernate?**  
R: En `application.properties`:
```properties
spring.jpa.show-sql=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

**P: ¿Cómo recargo automáticamente el backend al cambiar código?**  
R: Agregar dependencia de Spring Boot DevTools en `pom.xml`

**P: ¿Cómo abro React DevTools?**  
R: Instalar la extensión de React DevTools en tu navegador

---

### Testing

**P: ¿Cómo ejecuto solo una prueba específica?**  
R: Backend:
```bash
mvn test -Dtest=CategoryServiceTest#testMethodName
```

Frontend:
```bash
npm test -- --testNamePattern="test name"
```

E2E:
```bash
npx playwright test --grep "test name"
```

**P: ¿Cómo genero reporte de cobertura?**  
R: Backend:
```bash
mvn jacoco:report
# Ver en target/site/jacoco/index.html
```

Frontend:
```bash
npm test -- --coverage
```

**P: ¿Cómo ejecuto pruebas E2E en modo debug?**  
R:
```bash
cd e2e-tests
npx playwright test --debug
```

---

### Despliegue

**P: ¿Cómo creo un build de producción?**  
R: Backend:
```bash
mvn clean package -Pprod
```

Frontend:
```bash
npm run build
```

**P: ¿Dónde está el archivo JAR generado?**  
R: `backend/target/inventory-management-1.0.0.jar`

**P: ¿Cómo ejecuto el JAR?**  
R:
```bash
java -jar target/inventory-management-1.0.0.jar
```

**P: ¿Cómo configuro variables de entorno en producción?**  
R: Usar variables de entorno del sistema:
```bash
export DATABASE_URL=jdbc:postgresql://prod-server:5432/inventory_db
export DATABASE_USER=prod_user
export DATABASE_PASSWORD=secret_password
```

---

### Docker

**P: ¿Cómo reconstruyo las imágenes Docker?**  
R:
```bash
docker-compose build --no-cache
docker-compose up -d
```

**P: ¿Cómo veo los logs de un contenedor?**  
R:
```bash
docker-compose logs backend
docker-compose logs -f frontend  # Follow mode
```

**P: ¿Cómo accedo a la base de datos en Docker?**  
R:
```bash
docker-compose exec postgres psql -U postgres -d inventory_db
```

**P: ¿Cómo hago backup de la base de datos?**  
R:
```bash
docker-compose exec postgres pg_dump -U postgres inventory_db > backup.sql
```

**P: ¿Cómo restauro un backup?**  
R:
```bash
docker-compose exec -T postgres psql -U postgres inventory_db < backup.sql
```

---

## 🆘 Obtener Ayuda Adicional

Si tu problema no está listado aquí:

1. **Revisar los logs**:
   - Backend: Consola de Spring Boot
   - Frontend: Consola del navegador (F12)
   - Docker: `docker-compose logs`

2. **Verificar la documentación**:
   - README.md
   - API_DOCS.md
   - PLAN_DE_PRUEBAS.md

3. **Buscar en Issues de GitHub**:
   - https://github.com/Farid0623/PracticaCDI/issues

4. **Crear un nuevo Issue**:
   - Incluir: descripción del problema, pasos para reproducir, logs relevantes, versión de OS/Java/Node

---

## 📝 Tips y Mejores Prácticas

### Desarrollo

✅ Ejecutar pruebas antes de hacer commit  
✅ Usar branches para nuevas features  
✅ Mantener dependencias actualizadas  
✅ Revisar logs regularmente  
✅ Usar variables de entorno para configuración sensible  

### Testing

✅ Escribir pruebas para nueva funcionalidad  
✅ Mantener cobertura > 80%  
✅ Ejecutar suite completa antes de PR  
✅ No commitear código comentado  

### Git

✅ Commits pequeños y frecuentes  
✅ Mensajes de commit descriptivos  
✅ Seguir Conventional Commits  
✅ No commitear archivos de configuración local  

---

¿Necesitas más ayuda? Abre un issue en el repositorio! 🚀
