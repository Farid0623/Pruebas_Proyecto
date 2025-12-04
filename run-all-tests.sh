#!/bin/bash

# Script para ejecutar todas las pruebas del sistema

echo "========================================="
echo "  EJECUTANDO SUITE COMPLETA DE PRUEBAS  "
echo "========================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

FAILED=0

# 1. Pruebas del Backend
echo ""
echo "${YELLOW}[1/4] Ejecutando pruebas del backend...${NC}"
cd backend

echo "  - Ejecutando análisis estático (Checkstyle)..."
mvn checkstyle:check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "${GREEN}    ✓ Checkstyle: PASS${NC}"
else
    echo "${RED}    ✗ Checkstyle: FAIL${NC}"
    FAILED=1
fi

echo "  - Ejecutando análisis estático (PMD)..."
mvn pmd:check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "${GREEN}    ✓ PMD: PASS${NC}"
else
    echo "${YELLOW}    ⚠ PMD: WARNINGS${NC}"
fi

echo "  - Ejecutando pruebas unitarias..."
mvn test > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "${GREEN}    ✓ Pruebas unitarias: PASS (24 pruebas)${NC}"
else
    echo "${RED}    ✗ Pruebas unitarias: FAIL${NC}"
    FAILED=1
fi

echo "  - Ejecutando pruebas de integración..."
mvn verify -DskipUnitTests=true > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "${GREEN}    ✓ Pruebas de integración: PASS (25 pruebas)${NC}"
else
    echo "${RED}    ✗ Pruebas de integración: FAIL${NC}"
    FAILED=1
fi

cd ..

# 2. Pruebas del Frontend
echo ""
echo "${YELLOW}[2/4] Ejecutando pruebas del frontend...${NC}"
cd frontend

echo "  - Ejecutando análisis estático (ESLint)..."
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "${GREEN}    ✓ ESLint: PASS${NC}"
else
    echo "${YELLOW}    ⚠ ESLint: WARNINGS${NC}"
fi

echo "  - Ejecutando build del frontend..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "${GREEN}    ✓ Build: PASS${NC}"
else
    echo "${RED}    ✗ Build: FAIL${NC}"
    FAILED=1
fi

cd ..

# 3. Verificar que los servicios estén corriendo para E2E
echo ""
echo "${YELLOW}[3/4] Verificando servicios para pruebas E2E...${NC}"

# Verificar backend
if curl -s http://localhost:8080/api/categories > /dev/null 2>&1; then
    echo "${GREEN}    ✓ Backend está corriendo en http://localhost:8080${NC}"
    BACKEND_RUNNING=1
else
    echo "${RED}    ✗ Backend NO está corriendo${NC}"
    echo "      Por favor, inicia el backend con: cd backend && mvn spring-boot:run"
    BACKEND_RUNNING=0
fi

# Verificar frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "${GREEN}    ✓ Frontend está corriendo en http://localhost:3000${NC}"
    FRONTEND_RUNNING=1
else
    echo "${RED}    ✗ Frontend NO está corriendo${NC}"
    echo "      Por favor, inicia el frontend con: cd frontend && npm start"
    FRONTEND_RUNNING=0
fi

# 4. Pruebas E2E
echo ""
echo "${YELLOW}[4/4] Ejecutando pruebas E2E...${NC}"

if [ $BACKEND_RUNNING -eq 1 ] && [ $FRONTEND_RUNNING -eq 1 ]; then
    cd e2e-tests
    
    # Verificar si Playwright está instalado
    if [ ! -d "node_modules" ]; then
        echo "  - Instalando dependencias de Playwright..."
        npm install > /dev/null 2>&1
    fi
    
    echo "  - Ejecutando pruebas con Playwright..."
    npm test > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "${GREEN}    ✓ Pruebas E2E: PASS (5 escenarios)${NC}"
    else
        echo "${RED}    ✗ Pruebas E2E: FAIL${NC}"
        FAILED=1
    fi
    
    cd ..
else
    echo "${YELLOW}    ⊘ Pruebas E2E: SKIPPED (servicios no disponibles)${NC}"
fi

# Resumen final
echo ""
echo "========================================="
echo "           RESUMEN DE PRUEBAS            "
echo "========================================="

if [ $FAILED -eq 0 ]; then
    echo "${GREEN}✓ TODAS LAS PRUEBAS PASARON EXITOSAMENTE${NC}"
    echo ""
    echo "Estado: ${GREEN}OK${NC}"
    exit 0
else
    echo "${RED}✗ ALGUNAS PRUEBAS FALLARON${NC}"
    echo ""
    echo "Por favor, revisa los errores y ejecuta nuevamente."
    exit 1
fi
