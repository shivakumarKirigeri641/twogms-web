import React from "react";
import { useSelector } from "react-redux";

const ServicingVehicles = () => {
  const servicingvehicles = useSelector((store) => store.servicingVehicles);
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Vehicle Servicing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicingvehicles?.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={item.photoUrl}
                alt={item.vehicleNumber}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.vehicleNumber}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.customerName} &bull; {item.customerContact}
                </p>

                <div className="mt-3 border-t pt-3">
                  <p className="text-sm text-gray-500">Latest Service:</p>
                  <p className="text-sm font-medium text-gray-700">
                    {item.latestService.date} — {item.latestService.details}
                  </p>
                  <span
                    className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      item.latestService.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.latestService.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicingVehicles;
