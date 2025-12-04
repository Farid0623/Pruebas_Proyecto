import React, { useState, useEffect } from 'react';
import { productService, categoryService } from '../services/api';

function Products() {
  // Función para formatear precios en COP
  const formatCOP = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Función para formatear el input con separadores de miles
  const formatInputCOP = (value) => {
    if (!value) return '';
    const number = value.toString().replace(/\D/g, '');
    return new Intl.NumberFormat('es-CO').format(number);
  };

  // Función para limpiar el formato y obtener el número
  const parseInputCOP = (value) => {
    if (!value) return '';
    return value.toString().replace(/\D/g, '');
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: { id: '' }
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(parseInputCOP(formData.price)),
        stock: parseInt(formData.stock),
        category: { id: parseInt(formData.category.id) }
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, productData);
        setSuccess('Producto actualizado correctamente');
      } else {
        await productService.create(productData);
        setSuccess('Producto creado correctamente');
      }
      setShowModal(false);
      resetForm();
      loadProducts();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data || 'Error al guardar el producto');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: formatInputCOP(product.price),
      stock: product.stock,
      category: { id: product.category.id }
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      try {
        await productService.delete(id);
        setSuccess('Producto eliminado correctamente');
        loadProducts();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.response?.data || 'Error al eliminar el producto');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: { id: '' }
    });
    setEditingProduct(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Gestión de Productos</h2>
          <button className="btn btn-success" onClick={openCreateModal}>
            Nuevo Producto
          </button>
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {products.length === 0 ? (
          <div className="empty-state">
            <p>No hay productos registrados</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{formatCOP(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>{product.category.name}</td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-warning" onClick={() => handleEdit(product)}>
                          Editar
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre del Producto *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Ingrese el nombre del producto"
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ingrese la descripción del producto"
                />
              </div>

              <div className="form-group">
                <label>Precio (COP) *</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => {
                    const formatted = formatInputCOP(e.target.value);
                    setFormData({ ...formData, price: formatted });
                  }}
                  required
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Categoría *</label>
                <select
                  value={formData.category.id}
                  onChange={(e) => setFormData({ ...formData, category: { id: e.target.value } })}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
