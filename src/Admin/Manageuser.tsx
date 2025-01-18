import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Farmer = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  location: string;
  status: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  createdAt: string;
  status: string;
  nameAmharic: string;
  descriptionAmharic: string;
};

type ApiResponse<T> = {
  responseStatus: number;
  systemMessage: {
    culture: string;
    messageType: number;
    type: string;
    message: string;
    messageCode: string;
    systemMessageCode: string;
    hasDetail: boolean;
    moduleCode: string;
    exceptionMessage: string;
  } | null;
  isFailed: boolean;
  message: string;
  data: T;
};

const FarmersList: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFarmerId, setExpandedFarmerId] = useState<string | null>(null);
  const [products, setProducts] = useState<{ [key: string]: Product[] }>({});

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.post<ApiResponse<Farmer[]>>('http://localhost:5122/api/Farmer/GetAllFarmers', null, {
          headers: {
            'accept': 'text/plain',
          }
        });
        if (response.data.isFailed) {
          throw new Error(response.data.message || 'Failed to fetch farmers');
        }
        setFarmers(response.data.data);
      } catch (err: any) {
        setError(`Error fetching farmers: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const fetchFarmerProducts = async (farmerId: string) => {
    try {
      const response = await axios.post<ApiResponse<Product[]>>('http://localhost:5122/api/Warehouse/GetFarmersProduct', {
        id: farmerId
      }, {
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json'
        }
      });
      if (response.data.isFailed) {
        throw new Error(response.data.message || 'Failed to fetch products');
      }
      setProducts(prev => ({ ...prev, [farmerId]: response.data.data }));
    } catch (err: any) {
      console.error('Error fetching products:', err.message);
    }
  };

  const toggleProducts = (farmerId: string) => {
    if (expandedFarmerId === farmerId) {
      setExpandedFarmerId(null);
    } else {
      setExpandedFarmerId(farmerId);
      if (!products[farmerId]) {
        fetchFarmerProducts(farmerId); // Fetch products if not already fetched
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (

    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
    <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Registered Farmers</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {farmers.map((farmer) => (
        <div key={farmer.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
          <div 
            onClick={() => toggleProducts(farmer.id)} 
            className={`p-6 cursor-pointer relative hover:bg-green-50 ${farmer.status === 'active' ? 'border-4 border-green-500' : 'border-4 border-red-500'}`}
          >
            <h2 className="text-2xl font-semibold mb-2 text-black">{farmer.name}</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Email:</span> {farmer.email || 'N/A'}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Location:</span> {farmer.location}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Status:</span> 
              <span className={farmer.status === 'active' ? 'text-green-600' : 'text-red-600'}>{farmer.status}</span>
            </p>
            <span className="absolute bottom-4 right-4 text-blue-500 hover:underline">
              {expandedFarmerId === farmer.id ? 'Hide Products' : 'Show Products'}
            </span>
          </div>
          {expandedFarmerId === farmer.id && products[farmer.id] && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <ul className="space-y-2">
                {products[farmer.id].map(product => (
                  <li key={product.id} className="p-2 bg-white rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                      <strong className="text-lg">{product.name}</strong>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <span className="text-gray-700">{product.pricePerUnit} {product.unit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
}

export default FarmersList;