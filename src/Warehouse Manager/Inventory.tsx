import React, { useState } from "react";

// Define Product type
interface Product {
  name: string;
  description: string;
  quantity: number;
  price: number;
}

const Inventory: React.FC = () => {
  // State to store product details
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);

  // Handle form submission to add a product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new product object
    const newProduct: Product = {
      name: productName,
      description: productDescription,
      quantity: productQuantity,
      price: productPrice,
    };

    // Add new product to the list of products
    setProducts([...products, newProduct]);

    // Clear the form fields after submission
    setProductName("");
    setProductDescription("");
    setProductQuantity(0);
    setProductPrice(0);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">Warehouse Manager - Add Product</h1>

      {/* Form to add a new product */}
      <form onSubmit={handleAddProduct} className="space-y-6 mb-8">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold">Product Name:</label>
          <input
            id="name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold">Product Description:</label>
          <input
            id="description"
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-lg font-semibold">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(Number(e.target.value))}
            required
            min={1}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-semibold">Price ($):</label>
          <input
            id="price"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
            required
            min={0.01}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Product
        </button>
      </form>

      {/* Inventory Table: Display added products */}
      <h2 className="text-2xl font-semibold mb-4">Inventory in Warehouse</h2>
      {products.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.description}</td>
                <td className="px-4 py-3">{product.quantity}</td>
                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-600">No products added yet.</p>
      )}
    </div>
  );
};

export default Inventory;
