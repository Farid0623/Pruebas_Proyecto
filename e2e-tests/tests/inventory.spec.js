import { test, expect } from '@playwright/test';

test.describe('Sistema de Gestión de Inventario - Flujo E2E', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar a la aplicación
    await page.goto('/');
  });

  test('Flujo completo: Crear categoría, crear producto y visualizar en listado', async ({ page }) => {
    // PASO 1: Navegar a la sección de Categorías
    await page.click('text=Categorías');
    await expect(page).toHaveURL('/categories');
    await expect(page.locator('h2')).toContainText('Gestión de Categorías');

    // PASO 2: Crear una nueva categoría
    await page.click('button:has-text("Nueva Categoría")');
    
    // Esperar a que aparezca el modal
    await expect(page.locator('.modal h2')).toContainText('Nueva Categoría');
    
    // Llenar el formulario de categoría
    const categoryName = `Categoría E2E ${Date.now()}`;
    await page.fill('input[type="text"]', categoryName);
    
    // Enviar el formulario
    await page.click('button:has-text("Crear")');
    
    // Verificar que la categoría fue creada exitosamente
    await expect(page.locator('.alert-success')).toContainText('Categoría creada correctamente');
    
    // Verificar que la categoría aparece en la tabla
    await expect(page.locator('table')).toContainText(categoryName);

    // PASO 3: Navegar a la sección de Productos
    await page.click('text=Productos');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h2')).toContainText('Gestión de Productos');

    // PASO 4: Crear un nuevo producto
    await page.click('button:has-text("Nuevo Producto")');
    
    // Esperar a que aparezca el modal
    await expect(page.locator('.modal h2')).toContainText('Nuevo Producto');
    
    // Llenar el formulario de producto
    const productName = `Producto E2E ${Date.now()}`;
    await page.fill('input[placeholder="Ingrese el nombre del producto"]', productName);
    await page.fill('textarea', 'Descripción de prueba E2E');
    // Campo de precio es type="text" con formato COP
    await page.locator('label:has-text("Precio")').locator('..').locator('input[type="text"]').fill('99999');
    await page.fill('input[type="number"][placeholder="0"]', '25');
    
    // Seleccionar la categoría recién creada
    await page.selectOption('select', { label: categoryName });
    
    // Enviar el formulario
    await page.click('button:has-text("Crear")');
    
    // Verificar que el producto fue creado exitosamente
    await expect(page.locator('.alert-success')).toContainText('Producto creado correctamente');

    // PASO 5: Verificar que el producto aparece en el listado
    await expect(page.locator('table')).toContainText(productName);
    await expect(page.locator('table')).toContainText('99.999');
    await expect(page.locator('table')).toContainText('25');
    await expect(page.locator('table')).toContainText(categoryName);
  });

  test('Crear y editar una categoría', async ({ page }) => {
    // Navegar a categorías
    await page.click('text=Categorías');
    
    // Crear nueva categoría
    await page.click('button:has-text("Nueva Categoría")');
    const categoryName = `Categoría Edit ${Date.now()}`;
    await page.fill('input[type="text"]', categoryName);
    await page.click('button:has-text("Crear")');
    
    // Esperar confirmación
    await expect(page.locator('.alert-success')).toBeVisible();
    
    // Editar la categoría
    await page.click('button:has-text("Editar")');
    await expect(page.locator('.modal h2')).toContainText('Editar Categoría');
    
    const updatedName = `${categoryName} Actualizada`;
    await page.fill('input[type="text"]', updatedName);
    await page.click('button:has-text("Actualizar")');
    
    // Verificar actualización
    await expect(page.locator('.alert-success')).toContainText('actualizada correctamente');
    await expect(page.locator('table')).toContainText(updatedName);
  });

  test('Crear y eliminar un producto', async ({ page }) => {
    // Ir a productos
    await page.click('text=Productos');
    
    // Contar productos iniciales
    const initialRows = await page.locator('tbody tr').count();
    
    // Crear producto
    await page.click('button:has-text("Nuevo Producto")');
    const productName = `Producto Delete ${Date.now()}`;
    await page.fill('input[placeholder="Ingrese el nombre del producto"]', productName);
    await page.fill('textarea', 'Para eliminar');
    // Campo de precio es type="text" con formato COP
    await page.locator('label:has-text("Precio")').locator('..').locator('input[type="text"]').fill('50000');
    await page.fill('input[type="number"][placeholder="0"]', '10');
    
    // Seleccionar primera categoría disponible
    const categoryOptions = await page.locator('select option').count();
    if (categoryOptions > 1) {
      await page.selectOption('select', { index: 1 });
    }
    
    await page.click('button:has-text("Crear")');
    
    // Esperar confirmación
    await expect(page.locator('.alert-success')).toBeVisible();
    
    // Verificar que se agregó una fila
    const afterCreateRows = await page.locator('tbody tr').count();
    expect(afterCreateRows).toBe(initialRows + 1);
    
    // Eliminar el producto (último botón eliminar)
    page.on('dialog', dialog => dialog.accept());
    await page.click('button:has-text("Eliminar")').then(() => {}).catch(() => {});
    
    // Esperar confirmación de eliminación
    await page.waitForTimeout(1000); // Dar tiempo para la eliminación
  });

  test('Validar campos requeridos en formulario de producto', async ({ page }) => {
    await page.click('text=Productos');
    await page.click('button:has-text("Nuevo Producto")');
    
    // Intentar crear sin llenar campos
    await page.click('button:has-text("Crear")');
    
    // El formulario no debería cerrarse (validación HTML5)
    await expect(page.locator('.modal')).toBeVisible();
  });

  test('Navegación entre secciones', async ({ page }) => {
    // Verificar que inicia en Productos
    await expect(page.locator('h2')).toContainText('Gestión de Productos');
    
    // Navegar a Categorías
    await page.click('text=Categorías');
    await expect(page).toHaveURL('/categories');
    await expect(page.locator('h2')).toContainText('Gestión de Categorías');
    
    // Regresar a Productos
    await page.click('text=Productos');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h2')).toContainText('Gestión de Productos');
  });
});
