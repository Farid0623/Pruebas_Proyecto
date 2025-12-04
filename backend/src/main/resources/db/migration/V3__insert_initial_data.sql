-- V3__insert_initial_data.sql
-- Datos iniciales para pruebas

-- Insertar categorías de ejemplo
INSERT INTO categories (name) VALUES 
    ('Electrónica'),
    ('Ropa'),
    ('Alimentos'),
    ('Libros'),
    ('Hogar')
ON CONFLICT (name) DO NOTHING;

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, stock, category_id) VALUES
    ('Laptop HP', 'Laptop HP 15 pulgadas, 8GB RAM, 256GB SSD', 899.99, 10, 
        (SELECT id FROM categories WHERE name = 'Electrónica')),
    ('Mouse Logitech', 'Mouse inalámbrico Logitech M185', 19.99, 50, 
        (SELECT id FROM categories WHERE name = 'Electrónica')),
    ('Camiseta Nike', 'Camiseta deportiva Nike talla M', 29.99, 30, 
        (SELECT id FROM categories WHERE name = 'Ropa')),
    ('Pantalón Levi''s', 'Pantalón jean Levi''s 501', 59.99, 20, 
        (SELECT id FROM categories WHERE name = 'Ropa')),
    ('Arroz Premium', 'Arroz blanco premium 1kg', 2.99, 100, 
        (SELECT id FROM categories WHERE name = 'Alimentos'))
ON CONFLICT DO NOTHING;
