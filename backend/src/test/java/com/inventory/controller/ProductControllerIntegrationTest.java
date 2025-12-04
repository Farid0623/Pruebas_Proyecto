package com.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.model.Category;
import com.inventory.model.Product;
import com.inventory.service.CategoryService;
import com.inventory.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Pruebas de integración para ProductController.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
@DisplayName("ProductController - Pruebas de Integración")
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    private Category testCategory;

    @BeforeEach
    void setUp() {
        testCategory = categoryService.createCategory(new Category("Electronics"));
    }

    @Test
    @DisplayName("Debe crear y obtener un producto")
    void testCreateAndGetProduct() throws Exception {
        Product product = new Product("Laptop", "Gaming laptop", 
                new BigDecimal("1299.99"), 5, testCategory);

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Laptop"));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("Debe actualizar el stock de un producto")
    void testUpdateStock() throws Exception {
        Product product = productService.createProduct(
                new Product("Mouse", "Wireless mouse", new BigDecimal("29.99"), 10, testCategory));

        mockMvc.perform(patch("/api/products/" + product.getId() + "/stock")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"stock\": 25}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.stock").value(25));
    }

    @Test
    @DisplayName("Debe buscar productos por nombre")
    void testSearchProducts() throws Exception {
        productService.createProduct(
                new Product("Laptop HP", "HP Gaming", new BigDecimal("999.99"), 3, testCategory));

        mockMvc.perform(get("/api/products/search")
                .param("name", "laptop"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].name").value("Laptop HP"));
    }
}
