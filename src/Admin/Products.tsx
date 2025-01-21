import axios from "axios";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, Tooltip } from "recharts";
import { PieChart } from "recharts";
import { ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

interface ProductApiResponse {
  responseStatus: number;
  systemMessage: null;
  isFailed: boolean;
  message: string;
  data: Product[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  // Add other product properties here if needed
}

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Products
        const productsResponse = await axios.get<ProductApiResponse>(
          "http://localhost:5122/api/Product/GetAllProducts",
          {
            headers: {
              accept: "text/plain",
            },
          }
        );
        if (productsResponse.data.isFailed) {
          throw new Error(
            productsResponse.data.message || "Failed to fetch products"
          );
        }
        setProducts(productsResponse.data.data);
      } catch (err: any) {
        setError(`Error fetching data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Data for Product Category Pie Chart
  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCount).map(
    ([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length],
    })
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-3xl text-gray-600">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-600 text-center mt-8 text-2xl">
        Error: {error}
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Product Categories Pie Chart */}
      <div className="bg-gray-200 rounded-lg shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Product Categories Distribution
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              fill="#82ca9d"
              paddingAngle={1}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.8)",
                border: "none",
                borderRadius: "4px",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => navigate('/low-stock')}>Check Low Stock Products</button>
    </div>
  );
};

const COLORS = ['#4CAF50', '#FF0707', '#eb9100', '#113837', '#9C27B0', '#00BCD4', '#FF4081', '#8BC34A', '#795548', '#2196F3'];

export default Products;
