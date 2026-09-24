import { useEffect, useState } from 'react';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Product[];
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get<ApiResponse>('/test');

        console.log('API RESPONSE:', response.data);

        setProducts(response.data.data);
      } catch (error) {
        console.error('API ERROR:', error);
        setError('Failed to load data from API');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;