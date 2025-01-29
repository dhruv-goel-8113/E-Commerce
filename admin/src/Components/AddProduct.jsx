import upload_area from '../assets/upload_area.svg';
import { MdAdd } from 'react-icons/md';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify styles

export const AddProduct = () => {
  const [image, setImage] = useState(null); // Default to null instead of false
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const imageHandler = (e) => {
    setImage(e.target.files[0]); // Set the image file to state
    setFormErrors({ ...formErrors, image: '' }); // Clear the image error when a file is selected
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' }); // Clear error when the user starts typing
  };

  const validateFields = () => {
    let errors = {};

    if (!productDetails.name) errors.name = 'This field is required';
    if (!productDetails.old_price) errors.old_price = 'This field is required';
    if (!productDetails.new_price) errors.new_price = 'This field is required';
    if (!image) errors.image = 'This field is required'; // Validate only if no image is selected

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const Add_product = async () => {
    if (!validateFields()) return;

    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            toast.success('Product Added Successfully!');
          } else {
            toast.error('Upload Failed');
          }
        });
    } else {
      toast.error('Image Upload Failed');
    }
  };

  return (
    <>
      <div className="p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7">
        <div className="mb-3">
          <h4 className="bold-18 pb-2">Product title:</h4>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here.."
            className={`bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md ${
              formErrors.name ? 'border border-red-500' : ''
            }`}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>
        <div className="mb-3">
          <h4 className="bold-18 pb-2">Old Price:</h4>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here.."
            className={`bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md ${
              formErrors.old_price ? 'border border-red-500' : ''
            }`}
          />
          {formErrors.old_price && (
            <p className="text-red-500 text-sm mt-1">{formErrors.old_price}</p>
          )}
        </div>
        <div className="mb-3">
          <h4 className="bold-18 pb-2">New Price:</h4>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here.."
            className={`bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md ${
              formErrors.new_price ? 'border border-red-500' : ''
            }`}
          />
          {formErrors.new_price && (
            <p className="text-red-500 text-sm mt-1">{formErrors.new_price}</p>
          )}
        </div>
        <div className="mb-3 flex items-center gap-x-4">
          <h4 className="bold-18 pb-2">Product Category:</h4>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div>
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt=""
              className="w-20 rounded-sm inline-block"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
            className="bg-primary max-w-80 w-full py-3 px-4"
          />
          {formErrors.image && (
            <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>
          )}
        </div>
        <button
          onClick={() => Add_product()}
          className="btn_dark_rounded mt-4 flexCenter gap-x-1"
        >
          <MdAdd />
          Add Product
        </button>
      </div>
      {/* ToastContainer for displaying toast messages */}
      <ToastContainer />
    </>
  );
};
