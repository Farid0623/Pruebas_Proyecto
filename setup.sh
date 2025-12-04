#!/bin/bash

echo "================================================"
echo "  CONFIGURACIÓN INICIAL DEL PROYECTO"
echo "================================================"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Configurar permisos de scripts
echo "${YELLOW}[1/5] Configurando permisos de scripts...${NC}"
chmod +x run-all-tests.sh
chmod +x backend/mvnw 2>/dev/null || true
echo "${GREEN}✓ Permisos configurados${NC}"

# 2. Instalar dependencias del backend
echo ""
echo "${YELLOW}[2/5] Instalando dependencias del backend...${NC}"
cd backend
./mvnw clean install -DskipTests || mvn clean install -DskipTests
echo "${GREEN}✓ Dependencias del backend instaladas${NC}"
cd ..

# 3. Instalar dependencias del frontend
echo ""
echo "${YELLOW}[3/5] Instalando dependencias del frontend...${NC}"
cd frontend
npm install
echo "${GREEN}✓ Dependencias del frontend instaladas${NC}"
cd ..

# 4. Instalar dependencias de E2E
echo ""
echo "${YELLOW}[4/5] Instalando dependencias de pruebas E2E...${NC}"
cd e2e-tests
npm install
npx playwright install chromium
echo "${GREEN}✓ Dependencias de E2E instaladas${NC}"
cd ..

# 5. Verificar PostgreSQL
echo ""
echo "${YELLOW}[5/5] Verificando PostgreSQL...${NC}"
if command -v psql &> /dev/null; then
    echo "${GREEN}✓ PostgreSQL está instalado${NC}"
    echo ""
    echo "Por favor, crea la base de datos ejecutando:"
    echo "  createdb inventory_db"
    echo ""
    echo "O desde psql:"
    echo "  psql -U postgres"
    echo "  CREATE DATABASE inventory_db;"
else
    echo "${YELLOW}⚠ PostgreSQL no está instalado o no está en el PATH${NC}"
    echo ""
    echo "Opciones:"
    echo "1. Instalar PostgreSQL: https://www.postgresql.org/download/"
    echo "2. Usar Docker: docker-compose up -d postgres"
fi

echo ""
echo "================================================"
echo "${GREEN}  ✓ CONFIGURACIÓN COMPLETADA${NC}"
echo "================================================"
echo ""
echo "Próximos pasos:"
echo "1. Configurar PostgreSQL (si no usas Docker)"
echo "2. Iniciar backend: cd backend && mvn spring-boot:run"
echo "3. Iniciar frontend: cd frontend && npm start"
echo "4. Ejecutar pruebas: ./run-all-tests.sh"
echo ""
echo "O usar Docker:"
echo "  docker-compose up -d"
echo ""
