import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the Product interface with all required fields
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  createdAt: string;
  status: string;
  image?: string; // Base64 string or URL
  nameAmharic: string;
  descriptionAmharic: string;
  percentageDiscount?: number;
  discountedPrice?: number;
}

interface ProductsState {
  items: Product[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: null,
  status: 'idle',
  error: null,
};

// Define API response types
interface ProductsResponse {
  data: Product[];
}

interface ImageResponse {
  data: string; // Assuming base64 string is returned directly under data
}

// Async thunk to fetch products and their images
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch available products
      const response = await axios.get<ProductsResponse>(
        'http://localhost:5122/api/Product/GetAvailableProducts'
      );
      const products = response.data.data; // Adjust based on actual API response structure

      // Fetch images for each product
      const productsWithImages = await Promise.all(
        products.map(async (product) => {
          try {
            const imageResponse = await axios.post<ImageResponse>(
              'http://localhost:5122/api/Product/GetProductImage',
              { id: product.id },
              { headers: { 'Content-Type': 'application/json' } }
            );
            return {
              ...product,
              image: `data:image/jpeg;base64,${imageResponse.data.data}`, // Adjust format if needed (e.g., png)
              createdAt: new Date(product.createdAt).toISOString(),
            };
          } catch (imageError) {
            console.error(`Failed to fetch image for product ${product.id}:`, imageError);
            return { ...product, image: null }; // Fallback to no image
          }
        })
      );

      return productsWithImages;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;