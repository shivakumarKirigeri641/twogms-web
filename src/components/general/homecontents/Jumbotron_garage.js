import React from "react";
import getGaragePoints from "../../../utils/getGaragePoints";

const Jumbotron_garage = () => {
  return (
    <div>
      <section className="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1636761358757-0a616eb9e17e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW90b3JjeWNsZSUyMGdhcmFnZXxlbnwwfHwwfHx8MA%3D%3D')] bg-gray-300 bg-blend-multiply">
        <div className="text-left px-4 mx-auto max-w-screen-xl py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Garage Owners
          </h1>
          <ul className="text-white">
            {getGaragePoints().map((x, index) => (
              <li className="p-1 text-left my-4" key={index}>
                {x}
              </li>
            ))}
          </ul>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jumbotron_garage;
