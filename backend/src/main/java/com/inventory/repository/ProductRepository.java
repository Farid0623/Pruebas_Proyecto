package com.inventory.repository;

import com.inventory.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio para operaciones de base de datos de productos.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    /**
     * Busca productos por categoría.
     *
     * @param categoryId ID de la categoría
     * @return lista de productos de esa categoría
     */
    List<Product> findByCategoryId(Long categoryId);
    
    /**
     * Busca productos cuyo nombre contenga el texto dado.
     *
     * @param name texto a buscar en el nombre
     * @return lista de productos que coinciden
     */
    List<Product> findByNameContainingIgnoreCase(String name);
}
