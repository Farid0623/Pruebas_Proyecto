-- V2__create_products_table.sql
-- Creación de la tabla products

CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    category_id BIGINT NOT NULL,
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) 
        REFERENCES categories(id) ON DELETE CASCADE
);

-- Índices
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_category_id ON products(category_id);

-- Comentarios
COMMENT ON TABLE products IS 'Tabla que almacena los productos del inventario';
COMMENT ON COLUMN products.id IS 'Identificador único del producto';
COMMENT ON COLUMN products.name IS 'Nombre del producto';
COMMENT ON COLUMN products.description IS 'Descripción del producto';
COMMENT ON COLUMN products.price IS 'Precio del producto';
COMMENT ON COLUMN products.stock IS 'Cantidad disponible en inventario';
COMMENT ON COLUMN products.category_id IS 'Referencia a la categoría del producto';
