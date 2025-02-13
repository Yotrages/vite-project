import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { FaSpinner} from "react-icons/fa";
import { contactSchema } from "../Schema/ContactSchema";
import { contact } from "../assets";

type ContactForm = z.infer<typeof contactSchema>;
const Contact = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState(String);

  const URL = "https://ecommerce-9wqc.onrender.com/api/contact";
  const submission = (Contactdata: ContactForm) => {
    const loginUser = async () => {
      setLoading(true);
      try {
        console.log("Sending data:", Contactdata);
        const res = await axios.post(URL, Contactdata);

        if (res.status === 200) {
          console.log("Response:", res);
          setLoading(false);
          setSucess("Message delivered successfully");
          reset();
         setTimeout(() => setSucess(""), 3000)
         clearTimeout(3000)
        } else {
          setLoading(false)
        }
      } catch (error: any) {
        console.error("Error details:", error);
        if (error.response) {
          setError(error.response.data.message || "An error occurred");
        } else if (error.request) {
          setError("No response from server, check your connection and try again");
        } else {
          setError(error.message || "An error occurred");
        }
        setLoading(false);
        setTimeout(() => setError(""), 3000)
        clearTimeout(3000)
      }
    };
    loginUser();
  };

  return (
    <div className="w-full justify-between items-center xs:px-10 xl:px-28 gap-20 flex-col mt-20 sm:flex-row flex py-10">
        {error && (
          <div className="bg-red-600 rounded-lg text-white fixed top-5 z-10 m-auto justify-center text-center px-4 py-3">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600 rounded-lg text-white w-full fixed top-5 z-10 justify-center flex items-center text-center px-4 py-3">
            {success}
          </div>
        )}
     <div className="sm:w-1/2"><img src={contact} className="w-fit" alt="" /></div>
      <form
        className="w-full  px-5 qy:w-1/2 qy:px-0"
        onSubmit={handleSubmit(submission)}
      >
        <div className="flex flex-col gap-8 px-2">
          <div className="flex flex-col gap-4 items-start text-black text-base font-semibold">
            <label
              htmlFor="email"
              id="email"
              className="text-[18px] font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              {...register("email", { required: true })}
              className="px-3 py-3 w-full text-black rounded-lg border-[2px] border-green-300 focus:outline-yellow-300"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4 items-start text-black text-base font-semibold">
            <label
              htmlFor="name"
              id="name"
              className="text-[18px] font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              required
              {...register("name", { required: true })}
              className="px-3 py-3 w-full text-black rounded-lg border-[2px] border-green-300 focus:outline-yellow-300"
              placeholder="Enter your Username"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4 items-start text-black text-base font-semibold">
            <label
              htmlFor="password"
              id="email"
              className="text-[18px] font-semibold"
            >
              Subject
            </label>
              <input
                type='text'
                id="Subject"
                {...register("subject", { required: true })}
                required
                placeholder="Enter the subject of your message"
                className="px-3 py-3 w-full text-black rounded-lg border-[2px] border-green-300 focus:outline-yellow-300"
              />
            {errors.subject && (
              <p className="text-red-600">{errors.subject.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-4 items-start text-black text-base font-semibold">
            <label
              htmlFor="password"
              id="email"
              className="text-[18px] font-semibold"
            >
              Message
            </label>
              <textarea
            id="Subject"
                {...register("message", { required: true })}
                required
                placeholder="Enter your message"
                className="px-3 py-3 w-full border-[2px] border-green-300 focus:outline-yellow-300 text-black rounded-lg"
              />
            {errors.message && (
              <p className="text-red-600">{errors.message.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg  gap-4 py-3 px-7 bg-black-gradient bg-shadow text-white font-semibold text-[18px] tracking-widest"
          >
            {loading ? (
              <p className="flex items-center justify-center gap-3">
                <FaSpinner className="animate-spin" />
                Send message
              </p>
            ) : (
              <p>Send message</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
