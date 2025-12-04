import React, { useState, useEffect } from 'react';
import { categoryService } from '../services/api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAll();
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las categorías: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.id, formData);
        setSuccess('Categoría actualizada correctamente');
      } else {
        await categoryService.create(formData);
        setSuccess('Categoría creada correctamente');
      }
      setShowModal(false);
      setFormData({ name: '' });
      setEditingCategory(null);
      loadCategories();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data || 'Error al guardar la categoría');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
      try {
        await categoryService.delete(id);
        setSuccess('Categoría eliminada correctamente');
        loadCategories();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.response?.data || 'Error al eliminar la categoría');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Gestión de Categorías</h2>
          <button className="btn btn-success" onClick={openCreateModal}>
            Nueva Categoría
          </button>
        </div>

        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        {categories.length === 0 ? (
          <div className="empty-state">
            <p>No hay categorías registradas</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-warning" onClick={() => handleEdit(category)}>
                          Editar
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
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
            <h2>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre de la Categoría</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  required
                  placeholder="Ingrese el nombre de la categoría"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
