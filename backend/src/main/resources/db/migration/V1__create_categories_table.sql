-- V1__create_categories_table.sql
-- Creación de la tabla categories

CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Índices
CREATE INDEX idx_categories_name ON categories(name);

-- Comentarios
COMMENT ON TABLE categories IS 'Tabla que almacena las categorías de productos';
COMMENT ON COLUMN categories.id IS 'Identificador único de la categoría';
COMMENT ON COLUMN categories.name IS 'Nombre de la categoría';
