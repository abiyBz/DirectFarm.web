import React, { useState } from "react";

// Define Product type
interface Product {
  name: string;
  description: string;
  quantity: number;
  price: number;
}

const WarehouseManagerPage: React.FC = () => {
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
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Warehouse Manager - Add Product</h1>

      {/* Form to add a new product */}
      <form onSubmit={handleAddProduct} className="space-y-6">
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

      {/* Display added products */}
      <h2 className="text-2xl font-semibold mt-8">Products in Warehouse</h2>
      {products.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {products.map((product, index) => (
            <li
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 mt-2">
                <strong>Quantity:</strong> {product.quantity}
              </p>
              <p className="text-gray-800">
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-600">No products added yet.</p>
      )}
    </div>
  );
};

export default WarehouseManagerPage;
