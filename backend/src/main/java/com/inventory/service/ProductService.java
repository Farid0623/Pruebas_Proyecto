package com.inventory.service;

import com.inventory.model.Category;
import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Servicio para la gestión de productos.
 */
@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    /**
     * Obtiene todos los productos.
     *
     * @return lista de todos los productos
     */
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Obtiene un producto por su ID.
     *
     * @param id ID del producto
     * @return el producto encontrado
     * @throws RuntimeException si no se encuentra el producto
     */
    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + id));
    }

    /**
     * Busca productos por categoría.
     *
     * @param categoryId ID de la categoría
     * @return lista de productos de esa categoría
     */
    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    /**
     * Busca productos por nombre.
     *
     * @param name texto a buscar en el nombre del producto
     * @return lista de productos que coinciden
     */
    @Transactional(readOnly = true)
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    /**
     * Crea un nuevo producto.
     *
     * @param product producto a crear
     * @return el producto creado
     * @throws RuntimeException si no se encuentra la categoría
     */
    public Product createProduct(Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + product.getCategory().getId()));
            product.setCategory(category);
        }
        return productRepository.save(product);
    }

    /**
     * Actualiza un producto existente.
     *
     * @param id ID del producto a actualizar
     * @param productDetails detalles actualizados del producto
     * @return el producto actualizado
     * @throws RuntimeException si no se encuentra el producto o la categoría
     */
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStock(productDetails.getStock());
        
        if (productDetails.getCategory() != null && productDetails.getCategory().getId() != null) {
            Category category = categoryRepository.findById(productDetails.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + productDetails.getCategory().getId()));
            product.setCategory(category);
        }
        
        return productRepository.save(product);
    }

    /**
     * Actualiza el stock de un producto.
     *
     * @param id ID del producto
     * @param stock nuevo valor de stock
     * @return el producto actualizado
     * @throws RuntimeException si no se encuentra el producto
     */
    public Product updateStock(Long id, Integer stock) {
        Product product = getProductById(id);
        product.setStock(stock);
        return productRepository.save(product);
    }

    /**
     * Elimina un producto por su ID.
     *
     * @param id ID del producto a eliminar
     * @throws RuntimeException si no se encuentra el producto
     */
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
