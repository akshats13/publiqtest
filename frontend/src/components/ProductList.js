import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.shopify_id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-xl"
              />
            )}
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-gray-700 text-sm">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-green-600">${product.price}</p>
                <p className="text-sm text-gray-500">{product.inventory} in stock</p>
              </div>
              <button
                onClick={() => handleDelete(product.shopify_id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
