import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { z } from "zod";
import { productSchema } from "../Schema/AdminSchema";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

type postProduct = z.infer<typeof productSchema>;
const Admin = ({ type }: { type: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [show, setShow] = useState(false)
  const okay = 'yes'
  const navigate = useNavigate()
  
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm<postProduct>({ resolver: zodResolver(productSchema) });
  const URL = "https://ecommerce-9wqc.onrender.com/api/products/post";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  };


  const products = (product: postProduct) => {
    const sendProduct = async () => {
      const formData = new FormData();
      formData.append("image", product.image[0]); 
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("quantity", product.quantity.toString());
      console.log(product.image[0]);
  
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("You are not authenticated, please login");
        setTimeout(() => setError(""), 3000)
        return;
      }
  
      setLoading(true);
      try {
        const res = await axios.post(URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 201) {
          setLoading(false)
          setSuccess("Product posted successfully");
        await setTimeout(() => setSuccess(""), 3000)
          reset();
          setImagePreview(null)
          setShow(true)     
        }
      } catch (error: any) {
        console.error(error.message);
          if(error.response) {
            setError(error.response.data.message)
          } else if (error.request) {
            setError(`Can't connect to the server, check your connection`)
          } else {
            setError('An unknown error occurred')
          }
          setTimeout(() => setError(""), 3000)
          clearTimeout(3000)
          setLoading(false)
      }
    };
    sendProduct();
  };
  
  

  return (
    <div className="w-full flex flex-col justify-center items-center py-12 px-4">
      {error && (
        <div className="bg-red-600 text-white py-2 rounded-md px-4 fixed top-5 right-4 z-10">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-600 text-white py-2 px-4 rounded-md top-5 right-4 fixed justify-center z-10">
          {success}
        </div>
      )}
      {show && (
        <div className={`bg-primary text-white fixed top-7 right-3 flex items-center ${show ? 'w-[200px] opacity-25' : 'w-0 opacity-0'} py-2 px-3`}>
          <Button onSmash={() => console.log('stay')} styles="hover:bg-green-400 bg-shadow" router="" buttonText={okay} />
          <Button onSmash={() => navigate('/')} styles="hover:bg-green-400 bg-shadow" router="" buttonText='no' />
        </div>
      )}
      <h4 className="text-center tracking-wider text-3xl font-bold xs:text-[45px] sm:text-[60px]">
        {type} post
      </h4>
      <form onSubmit={handleSubmit(products)}>
        <div className="flex flex-col items-center gap-9 w-full sm:max-w-[500px] mt-9 sm:mt-20 px-3 mx-auto">
          <div className="flex flex-col items-center w-full gap-3">
            <label
              htmlFor="image"
              id="image"
              className="font-semibold text-[24px] orange_gradient"
            >
              Image
            </label>
            <span className="relative flex rounded-lg">
              <div className="sm:size-[350px] size-52 border-red-300 flex items-center justify-center bg-gray-200 rounded-lg">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No image selected</span>
                )}
              </div>
              <input
                type="file"
                placeholder="Drop your image"
                {...register("image", { required: true })}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  handleImageChange(e);
                  // Ensure the file is registered in the form
                  register("image").onChange(e);
                }}
              />
            </span>
           
          </div>

          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="name"
              id="product"
              className="font-semibold text-[20px] orange_gradient"
            >
              Product name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter product name"
              className="w-full px-3 py-3 rounded-lg border border-[#ebebeb] bg-[#f2f2f2] focus:outline-red-300"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="name"
              id="description"
              className="font-semibold text-[20px] orange_gradient"
            >
              Product description
            </label>
            <input
              type="text"
              {...register("description", { required: true })}
              placeholder="Enter product description"
              className="w-full px-3 py-3 rounded-lg border border-[#ebebeb] bg-[#f2f2f2] focus:outline-red-300"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="price"
              id="price"
              className="font-semibold text-[20px] orange_gradient"
            >
              Price
            </label>
            <input
              type="text"
              placeholder="Enter product price"
              {...register("price", { required: true, valueAsNumber: true })}
              className="w-full px-3 py-3 rounded-lg border border-[#ebebeb] bg-[#f2f2f2] focus:outline-red-300"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-2">
            <label
              htmlFor="quantity"
              id="quantity"
              className="font-semibold text-[20px] orange_gradient"
            >
              Available quantity
            </label>
            <input
              type="number"
              placeholder="Enter number of available product quantity"
              {...register("quantity", { required: true, valueAsNumber: true })}
              className="w-full px-3 py-3 rounded-lg border border-[#ebebeb] bg-[#f2f2f2] focus:outline-red-300"
            />
            {errors.quantity && (
              <p className="text-red-500">{errors.quantity.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg py-3 px-7 bg-white bg-shadow orange_gradient"
          >
            {" "}
            {loading ? (
              <p className="flex items-center gap-2 justify-center">
                <FaSpinner className="text-black animate-spin" />
                Create post
              </p>
            ) : (
              <p>Create post</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
