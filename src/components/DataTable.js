import React, { useState, useMemo, useEffect } from "react";
import { SERVER } from "../utils/constants";
import { motion } from "framer-motion";
import { Pencil, RefreshCw, Search } from "lucide-react";
import { useNavigate } from "react-router";
import {
  addeditServicingVehicle,
  removeeditServicingVehicle,
} from "../store/slices/editServicingVehicleSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const DataTable = ({ data, rowsPerPageOptions = [5, 10, 20] }) => {
  useEffect(() => {
    dispatch(removeeditServicingVehicle());
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // 🔍 Filter data based on search query
  /*const filteredData = useMemo(() => {
    return data?.filter((row) =>
      Object.values(row).join("").toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);*/
  const filteredData = data?.filter(
    (x) =>
      x?.fkVehicleDataId?.vehicleNumber
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      x?.fkVehicleDataId?.fkTwoWheelerDataId?.variantName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      x?.fkVehicleDataId?.fkCustomerDataId?.customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      x?.fkVehicleDataId?.fkCustomerDataId?.customerMobileNumber
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const paginatedData = filteredData?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const handleEditClick = async (row) => {
    const result = await axios.get(
      SERVER + "/twogms/servicing-vehicle/" + row?._id,
      { withCredentials: true }
    );
    dispatch(addeditServicingVehicle(result?.data?.data));
    console.log(row?._id);
    navigate("/twogms/edit-service/" + row?._id);
  };
  return (
    <div className="space-y-4 w-full">
      {/* 🔍 Search + Rows per page */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-8 pr-3 py-2 border rounded-xl focus:ring focus:ring-blue-200 focus:outline-none text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 mr-2">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📊 Table (Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <motion.table
          className="min-w-full border border-gray-200 shadow-md rounded-2xl overflow-hidden text-sm"
          transition={{ duration: 0.4 }}
        >
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Vehicle Number</th>
              <th className="px-4 py-3 text-left">Brand/Model</th>
              <th className="px-4 py-3 text-left">Customer Name</th>
              <th className="px-4 py-3 text-left">Mobile</th>
              <th className="px-4 py-3 text-left">Service Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData?.length > 0 ? (
              paginatedData?.map((row, index) => (
                <motion.tr
                  key={row._id}
                  className="hover:bg-gray-50 transition-colors"
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">
                    {row?.fkVehicleDataId?.vehicleNumber}
                  </td>
                  <td className="px-4 py-3">
                    {row?.fkVehicleDataId?.fkTwoWheelerDataId?.variantName}
                  </td>
                  <td className="px-4 py-3">
                    {row?.fkVehicleDataId?.fkCustomerDataId?.customerName}
                  </td>
                  <td className="px-4 py-3">
                    +91
                    {
                      row?.fkVehicleDataId?.fkCustomerDataId
                        ?.customerMobileNumber
                    }
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        row?.serviceStatus === false
                          ? "bg-green-100 text-green-700"
                          : row.serviceStatus === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row?.serviceStatus ? "In Progress" : "Completed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-gray-200 rounded-xl transition font-bold  cursor-pointer"
                      onClick={() => {
                        handleEditClick(row);
                      }}
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>

      {/* 📱 Mobile Card View */}
      <div className="md:hidden space-y-3">
        {paginatedData?.length > 0 ? (
          paginatedData.map((row, index) => (
            <motion.div
              key={row._id}
              className="border rounded-xl p-4 shadow-sm bg-white space-y-2"
              transition={{ delay: index * 0.05 }}
            >
              <div className="text-sm flex justify-between">
                <span className="font-semibold">ID:</span> {index + 1}
              </div>
              <div className="text-sm flex justify-between">
                <span className="font-semibold">Vehicle:</span>{" "}
                {row?.fkVehicleDataId?.vehicleNumber}
              </div>
              <div className="text-sm flex justify-between">
                <span className="font-semibold">Brand/Model:</span>{" "}
                {row?.fkVehicleDataId?.fkTwoWheelerDataId?.variantName}
              </div>
              <div className="text-sm flex justify-between">
                <span className="font-semibold">Customer:</span>{" "}
                {row?.fkVehicleDataId?.fkCustomerDataId?.customerName}
              </div>
              <div className="text-sm flex justify-between">
                <span className="font-semibold">Mobile:</span> +91
                {row?.fkVehicleDataId?.fkCustomerDataId?.customerMobileNumber}
              </div>
              <div className="text-sm flex justify-between">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    row.serviceStatus === "Completed"
                      ? "bg-green-100 text-green-700"
                      : row.serviceStatus === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {row.serviceStatus}In Progress
                </span>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500  rounded-xl hover:bg-gray-200 transition font-bold cursor-pointer"
                  onClick={() => {
                    handleEditClick(row);
                  }}
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500 text-sm">
            No results found
          </p>
        )}
      </div>

      {/* 📌 Pagination Controls */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
