import React, { useState } from "react";
import ProductList from "./components/ProductList";
import CreateProductForm from "./components/CreateProductForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductCreated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <CreateProductForm onProductCreated={handleProductCreated} />
        <ProductList key={refreshKey} />
      </div>
    </div>
  );
}

export default App;
