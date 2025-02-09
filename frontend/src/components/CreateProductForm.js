import React, { useState } from "react";
import axios from "axios";

const CreateProductForm = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    inventory: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        inventory: parseInt(formData.inventory, 10),
      };

      await axios.post("http://localhost:8000/products/", productData);
      onProductCreated();
      setFormData({ name: "", description: "", price: "", inventory: "" });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inventory
            </label>
            <input
              type="number"
              name="inventory"
              placeholder="Enter inventory quantity"
              value={formData.inventory}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
