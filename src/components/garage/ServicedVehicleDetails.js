import axios from "axios";
import Skeleton from "../customcomponents/Skeleton";
import { SERVER } from "../../utils/constants";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ServicedVehicleDetails = () => {
  const servicedVehicles = useSelector((store) => store.servicedVehicles);
  useEffect(() => {
    try {
      const fetchservicedVehicles = async () => {
        const result = await axios.get(
          SERVER + "/twogms/feed/servicedvehicles",
          {
            withCredentials: true,
          }
        );
        console.log(result?.data?.data);
      };
      fetchservicedVehicles();
    } catch (err) {
      <ErrorToast message={message} />;
      navigate("/");
    }
  }, []);
  return (
    <div>
      {0 === servicedVehicles?.length ? (
        <Skeleton />
      ) : (
        <div>
          <p>test</p>
        </div>
      )}
    </div>
  );
};

export default ServicedVehicleDetails;
