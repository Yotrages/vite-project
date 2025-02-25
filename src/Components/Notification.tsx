import { FaSpinner } from "react-icons/fa";
import ConnectToBe from "../Api/NotificationValidator";
import { MessageRight } from "./Message";

const Notification = () => {
  const { errors, error, Notify, handleSubmit, success, register, loading } = ConnectToBe()
  return (
    <section className="pb-10 pt-7 md:pt-10 mt-20 w-full">
      <MessageRight error={error} success={success}/>
      <h1 className="sm:text-5xl text-2xl font-poppins text-primary tracking-wider font-extrabold text-center mb-9">
        Notify all users
      </h1>
      <form
        onSubmit={handleSubmit(Notify)}
        className="flex items-center gap-8 flex-col w-full px-5 sm:w-3/6 qy:w-2/3 xl:w-2/5 m-auto"
      >
        <div className="flex flex-col w-full items-start gap-5">
          <label className="text-xl font-bold" htmlFor="subject" id="subject">
            Subject
          </label>
          <input
            type="text"
            {...register("subject")}
            id="subject"
            className="w-full py-2 focus:outline-none px-3 rounded-lg flex border ring-primary ring hover:border-yellow-400"
          />
          {errors.subject && (
            <p className="text-red-700">{errors.subject.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full items-start gap-5">
          <label className="text-xl font-bold" htmlFor="message" id="message">
            Message
          </label>
          <textarea
            {...register("message")}
            id="subject"
            className="w-full px-3 focus:outline-none py-3 rounded-lg flex border ring ring-primary hover:border-yellow-400"
          />
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}
        </div>
        <button
          className="bg-white rounded-full transition-all duration-500 hover:scale-110 bg-shadow orange_gradient px-4 py-3 text-center items-center justify-center flex gap-4"
          type="submit"
        >
          {loading ? (
            <span className="flex flex-row items-center gap-3 justify-center">
              <FaSpinner className="text-lg text-black animate-spin" />
              Send Message
            </span>
          ) : (
            <span>Send Message</span>
          )}
        </button>
      </form>
    </section>
  );
};

export default Notification;
