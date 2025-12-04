package com.inventory.service;

import com.inventory.model.Category;
import com.inventory.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Pruebas unitarias para CategoryService.
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("CategoryService - Pruebas Unitarias")
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;

    private Category category;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setName("Electrónica");
    }

    @Test
    @DisplayName("Debe obtener todas las categorías")
    void testGetAllCategories() {
        Category category2 = new Category();
        category2.setId(2L);
        category2.setName("Ropa");
        List<Category> categories = Arrays.asList(category, category2);
        when(categoryRepository.findAll()).thenReturn(categories);

        List<Category> result = categoryService.getAllCategories();

        assertEquals(2, result.size());
        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Debe obtener una categoría por ID")
    void testGetCategoryById() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));

        Category result = categoryService.getCategoryById(1L);

        assertNotNull(result);
        assertEquals("Electrónica", result.getName());
        verify(categoryRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Debe lanzar excepción si no encuentra la categoría")
    void testGetCategoryByIdNotFound() {
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> categoryService.getCategoryById(99L));

        assertTrue(exception.getMessage().contains("no encontrada"));
        verify(categoryRepository, times(1)).findById(99L);
    }

    @Test
    @DisplayName("Debe crear una nueva categoría")
    void testCreateCategory() {
        when(categoryRepository.existsByName("Electrónica")).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        Category result = categoryService.createCategory(category);

        assertNotNull(result);
        assertEquals("Electrónica", result.getName());
        verify(categoryRepository, times(1)).existsByName("Electrónica");
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    @DisplayName("Debe lanzar excepción si la categoría ya existe")
    void testCreateCategoryAlreadyExists() {
        when(categoryRepository.existsByName("Electrónica")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> categoryService.createCategory(category));

        assertTrue(exception.getMessage().contains("Ya existe"));
        verify(categoryRepository, times(1)).existsByName("Electrónica");
        verify(categoryRepository, never()).save(any(Category.class));
    }

    @Test
    @DisplayName("Debe actualizar una categoría existente")
    void testUpdateCategory() {
        Category updatedCategory = new Category();
        updatedCategory.setId(1L);
        updatedCategory.setName("Electrónica Actualizada");
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(categoryRepository.existsByName("Electrónica Actualizada")).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenReturn(updatedCategory);

        Category result = categoryService.updateCategory(1L, updatedCategory);

        assertNotNull(result);
        assertEquals("Electrónica Actualizada", result.getName());
        verify(categoryRepository, times(1)).findById(1L);
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    @DisplayName("Debe eliminar una categoría")
    void testDeleteCategory() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        doNothing().when(categoryRepository).delete(category);

        categoryService.deleteCategory(1L);

        verify(categoryRepository, times(1)).findById(1L);
        verify(categoryRepository, times(1)).delete(category);
    }
}
