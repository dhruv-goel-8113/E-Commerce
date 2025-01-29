import { useState, useEffect } from 'react';
import { TbTrash } from 'react-icons/tb';

export const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllproducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const remove_product = async () => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productToDelete.id }),
    });
    setShowModal(false);
    await fetchInfo();
  };

  return (
    <div className="p-2 box-border bg-white mb-0 rounded-sm w-full mt-4 sm:p-4 sm:m-7">
      <h4 className="bold-22 p-5 uppercase">Products List</h4>
      <div className="max-h-[77vh] overflow-auto px-4 text-center">
        <table className="w-full mx-auto">
          <thead>
            <tr className="bg-primary bold-14 sm:regular-22 text-start py-12">
              <th className="p-2">Products</th>
              <th className="p-2">Title</th>
              <th className="p-2">Old Price</th>
              <th className="p-2">New Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allproducts.map((product, i) => (
              <tr key={i} className="border-b border-slate-900/20 text-gray-20 p-6 medium-14">
                <td className="flexStart sm:flexCenter">
                  <img
                    src={product.image}
                    alt=""
                    height={43}
                    width={43}
                    className="rounded-lg ring-1 ring-slate-900/5 my-1"
                  />
                </td>
                <td>
                  <div className="line-clamp-3">{product.name}</div>
                </td>
                <td>₹{product.old_price}</td>
                <td>₹{product.new_price}</td>
                <td>{product.category}</td>
                <td>
                  <div className="bold-22 pl-6 sm:pl-14">
                    <TbTrash onClick={() => confirmDelete(product)} className="cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p>Do you really want to delete <strong>{productToDelete.name}</strong>? This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={remove_product}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
