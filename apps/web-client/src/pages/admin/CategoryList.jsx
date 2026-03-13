import { useState, useEffect } from 'react';
import { categoriesAPI } from '../../services/api';
import toast from 'react-hot-toast';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', gstRate: 5, isActive: true });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, gstRate: Number(formData.gstRate) };
      
      if (editingId) {
        await categoriesAPI.update(editingId, data);
        toast.success('Category updated!');
      } else {
        await categoriesAPI.create(data);
        toast.success('Category created!');
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({ name: '', description: '', gstRate: 5, isActive: true });
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      gstRate: category.gstRate,
      isActive: category.isActive
    });
    setEditingId(category._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoriesAPI.delete(id);
        toast.success('Category deleted!');
        fetchCategories();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  const toggleActive = async (category) => {
    try {
      await categoriesAPI.update(category._id, { isActive: !category.isActive });
      toast.success(`Category ${category.isActive ? 'deactivated' : 'activated'}!`);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Categories</h2>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', description: '', gstRate: 5, isActive: true }); }}
          className="btn-primary px-5 py-2.5"
        >
          {showForm ? 'Cancel' : '+ Add Category'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit' : 'Add New'} Category</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
                <input
                  type="number"
                  value={formData.gstRate}
                  onChange={(e) => setFormData({ ...formData, gstRate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="categoryActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-primary rounded"
              />
              <label htmlFor="categoryActive" className="text-sm text-gray-600">Category is active</label>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary px-5 py-2.5">
                {editingId ? 'Update' : 'Create'} Category
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">GST Rate</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Products</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{category.description || '-'}</td>
                <td className="px-6 py-4">{category.gstRate}%</td>
                <td className="px-6 py-4">{category.productsCount || 0}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(category)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${category.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {category.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(category)} className="text-sm text-primary hover:text-primary/80 font-medium">Edit</button>
                    <button onClick={() => handleDelete(category._id)} className="text-sm text-red-600 hover:text-red-700 font-medium">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
