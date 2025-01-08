import React, { useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: File | null;
};

const initialProducts: Product[] = [
  { id: 1, name: "Tomatoes", category: "Vegetables", price: 2.5, description: "", image: null },
  { id: 2, name: "Milk", category: "Dairy", price: 1.5, description: "", image: null },
  { id: 3, name: "Apples", category: "Fruits", price: 3.0, description: "", image: null },
];

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    description: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const product = { ...newProduct, id: Date.now() }; // Generate unique ID
    setProducts([...products, product]);
    setNewProduct({ id: 0, name: "", category: "", price: 0, description: "", image: null });
  };

  const handleEditProduct = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setNewProduct(product);
      setIsEditing(true);
      setEditId(id);
    }
  };

  const handleUpdateProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const updatedProducts = products.map((product) =>
      product.id === editId ? { ...newProduct, id: editId } : product
    );
    setProducts(updatedProducts);
    setNewProduct({ id: 0, name: "", category: "", price: 0, description: "", image: null });
    setIsEditing(false);
    setEditId(null);
  };

  const handleDeleteProduct = (id: number) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Product Listings</h2>

      {/* Product Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Product Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Poultry">Poultry</option>
            <option value="Meats">Meats</option>
            <option value="Grains">Grains</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price (ETB)</label>
          <div className="flex items-center space-x-2">
            <input
              id="price"
              type="number"
              placeholder="Enter product price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-lg font-medium text-gray-700">ETB</span>
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Product Image</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files ? e.target.files[0] : null })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Product Description</label>
          <textarea
            id="description"
            placeholder="Enter product description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={isEditing ? handleUpdateProduct : handleAddProduct}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price (ETB)</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{product.id}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.price} ETB</td>
                <td className="px-4 py-3">{product.description}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
