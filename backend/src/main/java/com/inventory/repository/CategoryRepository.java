package com.inventory.repository;

import com.inventory.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio para operaciones de base de datos de categorías.
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    /**
     * Busca una categoría por su nombre.
     *
     * @param name nombre de la categoría
     * @return Optional con la categoría si existe
     */
    Optional<Category> findByName(String name);
    
    /**
     * Verifica si existe una categoría con el nombre dado.
     *
     * @param name nombre de la categoría
     * @return true si existe, false en caso contrario
     */
    boolean existsByName(String name);
}
