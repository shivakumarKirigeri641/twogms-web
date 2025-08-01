import axios from "axios";
import { addservicingVehicles } from "../../store/slices/servicingVehiclesSlice";
import Skeleton from "../customcomponents/Skeleton";
import { SERVER } from "../../utils/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ServicingVehicleDetails = () => {
  const dispatch = useDispatch();
  const servicingVehicles = useSelector((store) => store.servicingVehicles);
  useEffect(() => {
    try {
      const fetchServicingVehicles = async () => {
        const result = await axios.get(
          SERVER + "/twogms/feed/servicingvehicles",
          {
            withCredentials: true,
          }
        );
        dispatch(addservicingVehicles(result?.data?.data));
        console.log(servicingVehicles);
      };
      fetchServicingVehicles();
    } catch (err) {
      <ErrorToast message={message} />;
      navigate("/");
    }
  }, []);
  return (
    <div>
      {0 === servicingVehicles?.length ? (
        <Skeleton />
      ) : (
        <div className="w-full">
          <p>Servicing vehicle details</p>
          <ul>
            {servicingVehicles?.map((x, index) => (
              <li key={x?.vehicleNumber}>
                <div>{x?.vehicleNumber}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServicingVehicleDetails;
