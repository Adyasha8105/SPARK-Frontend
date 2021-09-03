function Reviews() {
  return (
    <section className="relative text-gray-600 body-font sm:px-20">
      <div className="absolute w-60 h-60 rounded-xl bg-light -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="absolute w-48 h-48 rounded-xl bg-light -bottom-20 right-5 z-0 transform rotate-12 hidden md:block"></div>
      <div className="relative container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            We're an organization that connects over <br />
            1000 patients with doctors and laboratories
          </h1>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="text-primary w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                1.3K
              </h2>
              <p className="leading-relaxed">Happy Patients</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-primary w-12 h-12 mb-3 inline-block"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16.0312 21.9995V15.9961" />
                <path d="M6.99556 13.4356L1 7.00342V1H4M7.91796 13.4356L13.4523 7.00342V5.28815V1H10" />
                <path d="M7.45703 13.4355V21.9951C7.45703 21.9951 12.5166 21.9951 15.7586 21.9951" />
                <path
                  fill="currentColor"
                  d="M16 13C17.1046 13 18 13.8954 18 15C18 16.1046 17.1046 17 16 17C14.8954 17 14 16.1046 14 15C14 13.8954 14.8954 13 16 13Z"
                />
              </svg>

              <h2 className="title-font font-medium text-3xl text-gray-900">
                1K
              </h2>
              <p className="leading-relaxed">Verified Doctors</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-thermometer text-primary w-12 h-12 mb-3 inline-block"
              >
                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                300+
              </h2>
              <p className="leading-relaxed">Laboratories</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <svg
                className="feather feather-map-pin text-primary w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h2 className="title-font font-medium text-3xl text-gray-900">
                46
              </h2>
              <p className="leading-relaxed">Places</p>
            </div>
          </div>
        </div>
        <div className="w-20 h-40 absolute bg-light rounded-full -bottom-80 -left-20 transform rotate-45 hidden md:block"></div>
      </div>
    </section>
  );
}

export default Reviews;
