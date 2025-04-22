import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then(res => {
        setBrands(res.data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Brands</h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#10B981" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map(brand => (
            <div key={brand._id} className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
              <img src={brand.image} alt={brand.name} className="w-full h-32 object-contain mb-3" />
              <h2 className="text-center text-lg font-semibold text-gray-800">{brand.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}