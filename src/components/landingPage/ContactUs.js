import Lottie from "lottie-react";
import ContactAnimation from "../../images/ContactAnimation.json";

function ContactUs() {
  return (
    <section className="text-gray-600 body-font relative sm:px-20">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 flex items-end justify-start relative">
          <Lottie animationData={ContactAnimation} />
        </div>
        <form
          action="mailto:pp7nothing2001@gmail.com"
          method="post"
          encType="text/plain"
          className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg mb-1 text-3xl font-bold title-font">
            Feedback
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Share your feedback or you can contact us directly.
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <input
            type="submit"
            className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:opacity-80 rounded text-lg"
            placeholder="Submit"
          />
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
