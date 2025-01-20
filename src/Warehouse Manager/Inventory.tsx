import React, { useEffect, useState } from "react";

// Define the interfaces as per your structure
interface Warehouse {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
}

interface Farmer {
  id: string;
  name: string;
}

interface FarmerProductInfo {
  id: string; // Main ID
  farmer: Farmer; // Use the Farmer interface
  product: Product; // Use the Product interface
  quantityAvailable: number; // Quantity available for sale or stock
  warehouse: Warehouse; // Use the Warehouse interface
  addedAt: string; // ISO date string for when it was added
}

const Inventory: React.FC = () => {
  // State to store product details
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse[]>([]);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer[]>([]);

  // State for error messages
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5122/api/Farmer/GetAllFarmers",
          {
            method: "POST", // Set the method to POST
            headers: {
              "Content-Type": "application/json", // Specify the content type
            },
            body: JSON.stringify({
              /* Any required payload can go here */
            }), // Add payload if needed
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFarmers(data.data); // Update state with fetched data
      } catch (err) {
        setError("Failed"); // Update error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFarmers(); // Call the fetch function
  }, []);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch(
          "http://localhost:5122/api/Warehouse/GetAllWarehouses",
          {
            method: "POST", // Set the method to POST
            headers: {
              "Content-Type": "application/json", // Specify the content type
            },
            body: JSON.stringify({
              /* Any required payload can go here */
            }), // Add payload if needed
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setWarehouses(data.data); // Update state with fetched data
      } catch (err) {
        setError("Failed"); // Update error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchWarehouses(); // Call the fetch function
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5122/api/Product/GetAllProducts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.data); // Update state with fetched data
      } catch (err) {
        setError("Failed"); // Update error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts(); // Call the fetch function
  }, []);

  // Handle form submission to add a product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create new product object based on the FarmerProductInfo interface
    const newProduct: FarmerProductInfo = {
      id: "00000000-0000-0000-0000-000000000000", // Placeholder ID; adjust as needed
      farmer: {
        id: selectedFarmer.length > 0 ? selectedFarmer[0].id : "", // Use selected farmer ID
        name: "", // Use selected farmer name
      },
      product: {
        id:
          selectedProduct.length > 0
            ? selectedProduct[0].id
            : "019465f6-e2bf-748f-96df-33b359a5dd92", // Use selected product ID or placeholder
        name: "", // Use selected product name
      },
      quantityAvailable: productQuantity,
      warehouse: {
        id:
          selectedWarehouse.length > 0
            ? selectedWarehouse[0].id
            : "21ea1744-e06c-4185-bd87-48f9e06b5b49", // Use selected warehouse ID or placeholder
        name: "", // Use selected warehouse name
      },
      addedAt: new Date().toISOString(), // Current date in ISO format
    };

    try {
      const response = await fetch(
        "http://localhost:5122/api/Warehouse/RegisterFarmersProduct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();

      if (data.isFailed) {
        setError(data.message || "Registration failed.");
        return;
      }

      alert("Product added successfully!");

      // Clear the form fields after submission
      setSelectedFarmer([]);
      setSelectedProduct([]);
      setSelectedWarehouse([]);
      setProductQuantity(0);
    } catch (error) {}
  };

  const handleCategoryChange = () => {
    console.log(selectedProduct);
  };

  const handleSelectedProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value; // Get the selected product ID as a number
    const product = products.find((p) => p.id === selectedId); // Find the selected product

    if (product) {
      setSelectedProduct([product]); // Update state with the selected product in an array
      console.log(product); // Log the selected product
    }
  };

  const handleSelectedFarmer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value; // Get the selected farmer ID as a number
    const farmer = farmers.find((f) => f.id === selectedId); // Find the selected farmer

    if (farmer) {
      setSelectedFarmer([farmer]); // Update state with the selected farmer in an array
      console.log(farmer); // Log the selected farmer
    }
  };

  const handleSelectedWarehouse = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value; // Get the selected warehouse ID as a number
    const warehouse = warehouses.find((w) => w.id === selectedId); // Find the selected warehouse

    if (warehouse) {
      setSelectedWarehouse([warehouse]); // Update state with the selected warehouse in an array
      console.log(warehouse); // Log the selected warehouse
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 text-black">
      <h1 className="text-3xl font-bold mb-6">
        Warehouse Manager - Add Product
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Form to add a new product */}
      <form onSubmit={handleAddProduct} className="space-y-6 mb-8">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold">
            Select a product
          </label>
          <select
            id="products"
            onChange={handleSelectedProduct}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled>
              Select a product
            </option>{" "}
            {/* Placeholder option */}
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {" "}
                {/* Use product.id as value */}
                {product.name} {/* Display product name */}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold">
            Select Farmer
          </label>
          <select
            id="farmers"
            onChange={handleSelectedFarmer}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled>
              Select a Farmer
            </option>{" "}
            {/* Placeholder option */}
            {farmers.map((farmer) => (
              <option key={farmer.id} value={farmer.id}>
                {" "}
                {/* Use farmer.id as value */}
                {farmer.name} {/* Display farmer name */}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-lg font-semibold">
            Quantity:
          </label>
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
          <label htmlFor="price" className="block text-lg font-semibold">
            Select a warehouse
          </label>
          <select
            id="warehouses"
            onChange={handleSelectedWarehouse}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="" disabled>
              Select a Warehouse
            </option>{" "}
            {/* Placeholder option */}
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {" "}
                {/* Use warehouse.id as value */}
                {warehouse.name} {/* Display warehouse name */}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCategoryChange}
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Product
        </button>
      </form>

      {/* Inventory Table: Display added products */}
      <h2 className="text-2xl font-semibold mb-4">Inventory in Warehouse</h2>

      {/* Here you can implement a table or list to display added products */}
    </div>
  );
};

export default Inventory;
