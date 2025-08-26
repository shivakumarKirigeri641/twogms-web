import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  CastIcon,
  CatIcon,
  SaveAllIcon,
  SaveIcon,
  SunIcon,
} from "lucide-react";

// --- Mock APIs ---
const fetchStaff = () =>
  Promise.resolve([
    { id: "st01", name: "Ramesh Kumar" },
    { id: "st02", name: "Suresh Patel" },
    { id: "st03", name: "Anita Sharma" },
  ]);
const fetchStandardServices = () =>
  Promise.resolve([
    { id: "svc1", name: "Oil Change", amount: 500 },
    { id: "svc2", name: "Engine Tune-up", amount: 1200 },
  ]);
const fetchLabourCharges = () => Promise.resolve(800);
const fetchWashingCharges = () => Promise.resolve(100);

// --- Autosuggestion brand/model list (could be fetched from API) ---
let brandModelsList = [
  "Honda City",
  "Honda Accord",
  "Honda CR-V",
  "Toyota Innova",
  "Toyota Fortuner",
  "Toyota Camry",
  "Maruti Swift",
  "Maruti Baleno",
  "Hyundai Creta",
  "Hyundai Verna",
  "Mahindra Scorpio",
  "Mahindra Thar",
  "Ford EcoSport",
  "Ford Endeavour",
];

export default function EditService({ mode = "add", vehicleData = null }) {
  const { serviceid } = useParams();
  vehicleData = useSelector((store) => store.editServicingVehicle);
  console.log(vehicleData);
  const navigate = useNavigate();
  const loginCredentials = useSelector((store) => store.loginCredentials);
  const allStaffsDetails = useSelector((store) => store.allStaffsDetails);
  const allVehicles = useSelector((store) => store.allVehicles);
  brandModelsList = allVehicles?.map((x) => x.fkTwoWheelerDataId?.variantName);
  //console.log("brandlist", allVehicles);
  const serviceChargeDetails = useSelector(
    (store) => store.serviceChargeDetails
  );
  //console.log(serviceChargeDetails?.standardServiceChargesData);
  useEffect(() => {
    if (!loginCredentials) {
      navigate("/twogms/login");
    }
    setStaffList(allStaffsDetails);
    setStandardServices(serviceChargeDetails?.standardServiceChargesData?.list);
  }, []);
  // mode = 'add' or 'edit'
  // vehicleData for 'edit' mode, nullable for 'add'

  // --- Dates ---
  const todayISO = new Date().toISOString().slice(0, 10);

  // --- States ---

  // Vehicle Details
  const [vehicleNumber, setVehicleNumber] = useState(
    vehicleData?.fkVehicleDataId?.vehicleNumber || ""
  );
  const [brandModel, setBrandModel] = useState(vehicleData?.brandModel || "");
  const [brandInputFocused, setBrandInputFocused] = useState(false);
  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [fuelAtService, setFuelAtService] = useState(
    vehicleData?.fuelAtService ?? 0
  );
  const [kmDriven, setKmDriven] = useState(vehicleData?.kmDriven ?? "");
  const [vehicleInDate, setVehicleInDate] = useState(
    vehicleData?.vehicleInDate?.slice(0, 10) || todayISO
  );
  const [vehicleNextServiceDate, setvehicleNextServiceDate] = useState(
    vehicleData?.vehicleNextServiceDate || todayISO
  );

  // Customer Details
  const [customerName, setCustomerName] = useState(
    vehicleData?.fkVehicleDataId?.fkCustomerDataId?.customerName || ""
  );
  const [mobileNumber, setMobileNumber] = useState(
    vehicleData?.fkVehicleDataId?.fkCustomerDataId?.customerMobileNumber || ""
  );
  const [email, setEmail] = useState(vehicleData?.email || "");
  const [address, setAddress] = useState(vehicleData?.address || "");
  const [altMobileNumber, setAltMobileNumber] = useState(
    vehicleData?.fkVehicleDataId?.fkCustomerDataId?.customerAltMobileNumber ||
      ""
  );

  // Customer Complaints
  const [complaints, setComplaints] = useState(
    vehicleData?.fkCustomerComplaintsDataId?.list || []
  );
  const [complaintEdit, setComplaintEdit] = useState(null); // index or null
  const [complaintTitle, setComplaintTitle] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");

  // Mechanic Observations
  const [observations, setObservations] = useState(
    vehicleData?.fkMechanicObservationsDataId?.list || []
  );
  const [observationEdit, setObservationEdit] = useState(null);
  const [observationTitle, setObservationTitle] = useState("");
  const [observationDescription, setObservationDescription] = useState("");

  // Parts & Accessories
  const [parts, setParts] = useState(
    vehicleData?.fkPartsAndAccessoriesDataId?.list || []
  );
  const [partEdit, setPartEdit] = useState(null);
  const [partTitle, setPartTitle] = useState("");
  const [partDescription, setPartDescription] = useState("");
  const [partAmount, setPartAmount] = useState("");
  const [partCGST, setPartCGST] = useState("");
  const [partSGST, setPartSGST] = useState("");

  // Staff Assignments (fetched from API)
  const [staffList, setStaffList] = useState(
    allStaffsDetails.map((x) => x.staffName)
  );
  console.log("staffs assigned:", vehicleData?.fkAssignedStaffsDataId?.staffs);
  const [staffAssignments, setStaffAssignments] = useState(
    serviceid
      ? vehicleData?.fkAssignedStaffsDataId?.staffs?.map(
          (x) => x?.fkStaffDataId?._id
        )
      : []
  );

  // Billing details (fetched and composed)
  const [labourCharges, setLabourCharges] = useState(
    vehicleData?.labourCharges || 0
  );
  const [pickupCharges, setpickupCharges] = useState(
    serviceChargeDetails?.pickupServiceChargesData?.amountSummary[
      serviceChargeDetails?.pickupServiceChargesData?.amountSummary?.length - 1
    ].amount +
      (serviceChargeDetails?.pickupServiceChargesData?.amountSummary[
        serviceChargeDetails?.pickupServiceChargesData?.amountSummary?.length -
          1
      ].amount *
        (serviceChargeDetails?.pickupServiceChargesData?.amountSummary[
          serviceChargeDetails?.pickupServiceChargesData?.amountSummary
            ?.length - 1
        ].cGST +
          serviceChargeDetails?.pickupServiceChargesData?.amountSummary[
            serviceChargeDetails?.pickupServiceChargesData?.amountSummary
              ?.length - 1
          ].sGST)) /
        100
  );
  const [dropCharges, setdropCharges] = useState(
    serviceChargeDetails?.dropServiceChargesData?.amountSummary[
      serviceChargeDetails?.dropServiceChargesData?.amountSummary?.length - 1
    ].amount +
      (serviceChargeDetails?.dropServiceChargesData?.amountSummary[
        serviceChargeDetails?.dropServiceChargesData?.amountSummary?.length - 1
      ].amount *
        (serviceChargeDetails?.dropServiceChargesData?.amountSummary[
          serviceChargeDetails?.dropServiceChargesData?.amountSummary?.length -
            1
        ].cGST +
          serviceChargeDetails?.dropServiceChargesData?.amountSummary[
            serviceChargeDetails?.dropServiceChargesData?.amountSummary
              ?.length - 1
          ].sGST)) /
        100
  );
  const [washingCharges, setWashingCharges] = useState(
    serviceChargeDetails?.washingServiceChargesData?.amountSummary[
      serviceChargeDetails?.washingServiceChargesData?.amountSummary?.length - 1
    ].amount +
      (serviceChargeDetails?.washingServiceChargesData?.amountSummary[
        serviceChargeDetails?.washingServiceChargesData?.amountSummary?.length -
          1
      ].amount *
        (serviceChargeDetails?.washingServiceChargesData?.amountSummary[
          serviceChargeDetails?.washingServiceChargesData?.amountSummary
            ?.length - 1
        ].cGST +
          serviceChargeDetails?.washingServiceChargesData?.amountSummary[
            serviceChargeDetails?.washingServiceChargesData?.amountSummary
              ?.length - 1
          ].sGST)) /
        100
  );

  // Delivery & Next Service
  const [deliveryDate, setDeliveryDate] = useState(
    vehicleData?.deliveryDate || vehicleInDate
  );
  const [nextServiceDate, setNextServiceDate] = useState(
    vehicleData?.nextServiceDate || vehicleNextServiceDate
  );

  // Error states
  const [errors, setErrors] = useState({});

  // Animation states for popover errors (using simple fade)
  const [showErrorPopOver, setShowErrorPopOver] = useState({});

  // Refs for outside click handler
  const brandBoxRef = useRef(null);

  // --- Effects ---
  const [standardServices, setStandardServices] = useState([]);
  const [selectedStdServices, setSelectedStdServices] = useState([]);
  // Autosuggest for brand model input
  useEffect(() => {
    if (brandInputFocused && brandModel?.trim().length > 0) {
      const filtered = brandModelsList?.filter((bm) =>
        bm?.toLowerCase().includes(brandModel?.trim().toLowerCase())
      );
      setBrandSuggestions(filtered);
    } else {
      setBrandSuggestions([]);
    }
  }, [brandModel, brandInputFocused]);

  // Close brand model suggestions popup when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (brandBoxRef.current && !brandBoxRef.current.contains(event.target)) {
        setBrandSuggestions([]);
        if (!brandModelsList?.includes(brandModel)) setBrandModel(""); // clear as requested
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [brandModel]);

  // --- Validators ---

  function validateVehicleNumber(num) {
    if (!num.trim()) return "Vehicle number is required";

    // BH number validation - example Indian format
    // Let's do a simplified Indian number plate validation:
    // Format: Two letters (state code), two digits (RTO code), optional letter, 4 digits
    // Examples: MH12AB1234, DL4C1234, KA05M1234
    const indianNumPlateRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]?[0-9]{4}$/i;
    if (!indianNumPlateRegex.test(num.replace(/\s+/g, "").toUpperCase()))
      return "Invalid Indian vehicle number format";
    return "";
  }

  function validateBrandModel(bm) {
    if (!bm.trim()) return "Brand/model is required";
    if (!brandModelsList?.includes(bm))
      return "Select valid brand/model from suggestions";
    return "";
  }

  function validateFuel(value) {
    if (!(value >= 1 && value <= 100))
      return "Fuel at service must be between 1% and 100%";
    return "";
  }

  function validateKmDriven(value) {
    if (!value.toString().trim()) return "KM driven is required";
    if (!/^\d+$/.test(value.toString())) return "KM driven must be numeric";
    if (value < 0 || value > 99999)
      return "KM driven must be between 0 and 99999";
    return "";
  }

  function validateVehicleInDate(date) {
    if (!date) return "Vehicle-in date is required";
    if (date < todayISO) return "Vehicle-in date cannot be earlier than today";
    return "";
  }

  function validateCustomerName(name) {
    if (!name.trim()) return "Customer name is required";
    return "";
  }

  function validateMobileNumber(num) {
    if (!num.trim()) return "Mobile number is required";
    if (!/^\d{10}$/.test(num)) return "Mobile number must be exactly 10 digits";
    return "";
  }

  function validateAltMobileNumber(num) {
    if (!num) return "";
    if (!/^\d{10}$/.test(num))
      return "Alt mobile number must be exactly 10 digits";
    return "";
  }

  function validateEmail(mail) {
    if (!mail) return "";
    // Simple email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(mail)) return "Invalid email format";
    return "";
  }

  function validateDeliveryDate(date) {
    if (!date) return "Delivery date is required";
    if (date < vehicleInDate)
      return "Delivery date cannot be earlier than vehicle-in date";
    return "";
  }

  // Validate the entire form on submit
  function validateAll() {
    const newErrors = {};

    // Vehicle details
    let err = validateVehicleNumber(vehicleNumber);
    if (err) newErrors.vehicleNumber = err;

    err = validateBrandModel(brandModel);
    if (err) newErrors.brandModel = err;

    err = validateFuel(fuelAtService);
    if (err) newErrors.fuelAtService = err;

    err = validateKmDriven(kmDriven);
    if (err) newErrors.kmDriven = err;

    err = validateVehicleInDate(vehicleInDate);
    if (err) newErrors.vehicleInDate = err;

    // Customer details
    err = validateCustomerName(customerName);
    if (err) newErrors.customerName = err;

    err = validateMobileNumber(mobileNumber);
    if (err) newErrors.mobileNumber = err;

    err = validateAltMobileNumber(altMobileNumber);
    if (err) newErrors.altMobileNumber = err;

    // Delivery details
    err = validateDeliveryDate(deliveryDate);
    if (err) newErrors.deliveryDate = err;

    setErrors(newErrors);
    setShowErrorPopOver(
      Object.fromEntries(Object.keys(newErrors).map((k) => [k, true]))
    );

    return Object.keys(newErrors).length === 0;
  }

  // --- Handlers for add/edit list items (complaints, observations, parts) ---

  // Complaints
  function onAddComplaint() {
    /*if (!complaintTitle.trim()) {
      alert("Complaint title is required");
      return;
    }*/
    if (complaintEdit !== null) {
      // Edit mode
      setComplaints(
        complaints.map((c, idx) =>
          idx === complaintEdit
            ? { title: complaintTitle, description: complaintDescription }
            : c
        )
      );
      setComplaintEdit(null);
    } else {
      setComplaints([
        ...complaints,
        { title: complaintTitle, description: complaintDescription },
      ]);
    }
    setComplaintTitle("");
    setComplaintDescription("");
  }
  function onEditComplaint(idx) {
    const c = complaints[idx];
    //setComplaintTitle(c.title);
    setComplaintDescription(c?.description);
    setComplaintEdit(idx);
  }
  function onDeleteComplaint(idx) {
    setComplaints(complaints.filter((_, i) => i !== idx));
    if (complaintEdit === idx) {
      setComplaintEdit(null);
      setComplaintTitle("");
      setComplaintDescription("");
    }
  }

  // Observations
  function onAddObservation() {
    /*if (!observationTitle.trim()) {
      alert("Observation title is required");
      return;
    }*/
    if (observationEdit !== null) {
      setObservations(
        observations.map((o, idx) =>
          idx === observationEdit
            ? { title: observationTitle, description: observationDescription }
            : o
        )
      );
      setObservationEdit(null);
    } else {
      setObservations([
        ...observations,
        { title: observationTitle, description: observationDescription },
      ]);
    }
    setObservationTitle("");
    setObservationDescription("");
  }
  function onEditObservation(idx) {
    const o = observations[idx];
    setObservationTitle(o?.title);
    setObservationDescription(o?.description);
    setObservationEdit(idx);
  }
  function onDeleteObservation(idx) {
    setObservations(observations.filter((_, i) => i !== idx));
    if (observationEdit === idx) {
      setObservationEdit(null);
      setObservationTitle("");
      setObservationDescription("");
    }
  }

  // Parts and accessories
  function onAddPart() {
    if (!partTitle?.trim()) {
      alert("Part title is required");
      return;
    }
    const amt = parseFloat(partAmount);
    const cgst = parseFloat(partCGST);
    const sgst = parseFloat(partSGST);
    if (Number.isNaN(amt) || amt < 0) {
      alert("Enter valid amount ≥ 0");
      return;
    }
    if (Number.isNaN(cgst) || cgst < 0) {
      alert("Enter valid cGST ≥ 0");
      return;
    }
    if (Number.isNaN(sgst) || sgst < 0) {
      alert("Enter valid sGST ≥ 0");
      return;
    }
    if (partEdit !== null) {
      setParts(
        parts.map((p, idx) =>
          idx === partEdit
            ? {
                title: partTitle,
                description: partDescription,
                amount: amt,
                cGST: cgst,
                sGST: sgst,
              }
            : p
        )
      );
      setPartEdit(null);
    } else {
      setParts([
        ...parts,
        {
          title: partTitle,
          description: partDescription,
          amount: amt,
          cGST: cgst,
          sGST: sgst,
        },
      ]);
    }
    setPartTitle("");
    setPartDescription("");
    setPartAmount("");
    setPartCGST("");
    setPartSGST("");
  }
  function onEditPart(idx) {
    const p = parts[idx];
    setPartTitle(p?.title);
    setPartDescription(p?.description);
    setPartAmount(p.amount);
    setPartCGST(p.cGST);
    setPartSGST(p.sGST);
    setPartEdit(idx);
  }
  function onDeletePart(idx) {
    setParts(parts.filter((_, i) => i !== idx));
    if (partEdit === idx) {
      setPartEdit(null);
      setPartTitle("");
      setPartDescription("");
      setPartAmount("");
      setPartCGST("");
      setPartSGST("");
    }
  }

  // Staff assignments selection handler (multiselect by checkboxes)
  function onToggleStaff(_id) {
    const updated = staffList?.map((service, myindex) =>
      myindex === index
        ? { ...service, isChecked: !service.isChecked }
        : service
    );
    setStaffAssignments(updated);
  }
  const onToggleStdService = (id, index) => {
    const updated = standardServices?.map((service, myindex) =>
      myindex === index
        ? { ...service, isChecked: !service.isChecked }
        : service
    );
    setStandardServices(updated);
  };
  // Calculations for billing summary
  const partsTotalAmount = parts.reduce(
    (sum, p) => sum + p.amount + (p.amount * (p.cGST + p.sGST)) / 100,
    0
  );
  const partsTotalCGST = parts.reduce((sum, p) => sum + p.cGST, 0);
  const partsTotalSGST = parts.reduce((sum, p) => sum + p.sGST, 0);
  const stdServiceAmount =
    false === standardServices?.isBaseLineService
      ? standardServices
          .filter((svc) => svc?.isChecked === true)
          .reduce(
            (sum, svc) =>
              sum +
              (svc?.amountSummary[svc?.amountSummary.length - 1].amount +
                (svc?.amountSummary[svc?.amountSummary.length - 1].amount *
                  (svc?.amountSummary[svc?.amountSummary.length - 1].cGST +
                    svc?.amountSummary[svc?.amountSummary.length - 1].sGST)) /
                  100),
            0
          )
      : standardServices
          ?.filter((svc) => svc?.isChecked === true)
          .reduce((sum, svc) => sum + svc?.amount, 0);

  const billingTotal =
    partsTotalAmount +
    partsTotalCGST +
    partsTotalSGST +
    stdServiceAmount +
    labourCharges +
    pickupCharges +
    dropCharges +
    washingCharges;

  // Animate showing/hiding errors (simple fade)
  useEffect(() => {
    if (Object.keys(showErrorPopOver).length === 0) return;
    const timers = Object.entries(showErrorPopOver).map(([key, show]) =>
      show
        ? setTimeout(
            () => setShowErrorPopOver((prev) => ({ ...prev, [key]: false })),
            3000
          )
        : null
    );
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [showErrorPopOver]);

  // --- Button handlers ---
  const handleSaveService = () => {
    console.log("handle save");
  };
  function handleSubmit() {
    if (staffAssignments?.length === 0) {
      alert("Please assign the staff to work on vehicle!");
      return;
    }
    if (!validateAll()) return;

    // Compose final data payload
    const payload = {
      vehicleNumber,
      brandModel,
      fuelAtService,
      kmDriven: Number(kmDriven),
      vehicleInDate,
      customerName,
      mobileNumber,
      altMobileNumber,
      complaints,
      observations,
      parts,
      staffAssignments,
      pickupCharges,
      dropCharges,
      standardServices,
      labourCharges,
      washingCharges,
      deliveryDate,
      nextServiceDate,
      staffAssignments,
    };
    console.log("data is good/1", payload);
    navigate(-1);
  }
  const onClose = () => {
    navigate(-1);
  };
  const CheckAndFillCustomerDetails = async (e) => {
    setCustomerName("");
    setMobileNumber("");
    setAltMobileNumber("");
    if (7 <= vehicleNumber.length) {
      try {
        const result = await axios.get(SERVER + "/twogms/search-vehicle/" + e, {
          withCredentials: true,
        });
        console.log(result?.data?.data);
        if (result?.data?.data) {
          setCustomerName(result?.data?.data?.fkCustomerDataId?.customerName);
          setAltMobileNumber(
            result?.data?.data?.fkCustomerDataId?.customerAltMobileNumber
              ? result?.data?.data?.fkCustomerDataId?.customerAltMobileNumber
              : result?.data?.data?.fkCustomerDataId?.customerMobileNumber
          );
          setMobileNumber(
            result?.data?.data?.fkCustomerDataId?.customerMobileNumber
          );
        }
      } catch (err) {}
    }
  };

  //toggles
  const [washingChargesCheck, setwashingChargesCheck] = useState(
    vehicleData?.fkBillingDataId?.washingServiceChargesData?.isChecked
  );
  const toggleWashingCharges = () => {
    setwashingChargesCheck(!washingChargesCheck);
  };
  //pickuip
  const [pickupChargesCheck, setpickupChargesCheck] = useState(
    vehicleData?.fkBillingDataId?.pickupServiceChargesData?.isChecked
  );
  const togglepickupCharges = () => {
    setpickupChargesCheck(!pickupChargesCheck);
  };
  //drop
  const [dropChargesCheck, setdropChargesCheck] = useState(
    vehicleData?.fkBillingDataId?.dropServiceChargesData?.isChecked
  );
  const toggleDropCharges = () => {
    setdropChargesCheck(!dropChargesCheck);
  };
  // --- Render ---
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed px-4 text-black"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/08/63/30/05/360_F_863300589_NojEYK8ktAoHEbIQEpTv8VUFAlMR49xx.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-md shadow-lg font-sans text-gray-800 selection:bg-indigo-400 selection:text-white">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Edit Vehicle Service ({serviceid})
          </h1>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-300"
            aria-label="Close Vehicle Entry Form"
          >
            Close ✕
          </button>
        </header>

        {/* Vehicle Details */}
        <section className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Vehicle Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vehicle Number */}
            <div className="relative">
              <label htmlFor="vehicleNumber" className="block font-medium mb-1">
                Vehicle Number <span className="text-red-600">*</span>
              </label>
              <input
                id="vehicleNumber"
                type="text"
                value={vehicleNumber}
                onChange={(e) => {
                  setVehicleNumber(e.target.value.toUpperCase());
                  CheckAndFillCustomerDetails(e.target.value.toUpperCase());
                }}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                  errors.vehicleNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. MH12AB1234"
                maxLength={15}
                aria-describedby="error-vehicleNumber"
              />
              {errors.vehicleNumber && showErrorPopOver.vehicleNumber && (
                <div
                  id="error-vehicleNumber"
                  className="absolute top-full left-0 mt-1 text-sm bg-red-100 text-red-700 p-1 rounded shadow animate-fadeIn"
                  role="alert"
                >
                  {errors.vehicleNumber}
                </div>
              )}
            </div>

            {/* Brand/Model with autosuggestion */}
            <div className="relative" ref={brandBoxRef}>
              <label htmlFor="brandModel" className="block font-medium mb-1">
                Brand / Model <span className="text-red-600">*</span>
              </label>
              <input
                id="brandModel"
                type="text"
                value={brandModel}
                onChange={(e) => setBrandModel(e.target.value)}
                onFocus={() => setBrandInputFocused(true)}
                onBlur={() => {
                  // Delay clearing so onClick suggestions is possible
                  setTimeout(() => {
                    setBrandInputFocused(false);
                    if (!brandModelsList?.includes(brandModel))
                      setBrandModel("");
                  }, 150);
                }}
                autoComplete="off"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                  errors.brandModel ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Start typing brand/model..."
                aria-describedby="error-brandModel"
              />
              {brandSuggestions?.length > 0 && (
                <ul className="absolute z-20 w-full max-h-40 overflow-auto bg-white border border-gray-300 rounded shadow mt-1">
                  {brandSuggestions?.map((suggestion) => (
                    <li
                      key={suggestion._id}
                      className="px-3 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setBrandModel(suggestion);
                        setBrandSuggestions([]);
                      }}
                      role="option"
                      tabIndex={-1}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              {errors.brandModel && showErrorPopOver?.brandModel && (
                <div
                  id="error-brandModel"
                  className="absolute top-full left-0 mt-1 text-sm bg-red-100 text-red-700 p-1 rounded shadow animate-fadeIn"
                  role="alert"
                >
                  {errors.brandModel}
                </div>
              )}
            </div>

            {/* Fuel at Service */}
            <div className="space-y-1">
              <label htmlFor="fuelAtService" className="block font-medium mb-1">
                Fuel at service: {fuelAtService}%
              </label>
              <input
                id="fuelAtService"
                type="range"
                min="0"
                max="100"
                step="1"
                value={fuelAtService}
                onChange={(e) => setFuelAtService(Number(e.target.value))}
                className="w-full cursor-pointer"
                aria-describedby="error-fuelAtService"
              />
              {errors.fuelAtService && showErrorPopOver.fuelAtService && (
                <div
                  id="error-fuelAtService"
                  className="text-sm text-red-600"
                  role="alert"
                >
                  {errors.fuelAtService}
                </div>
              )}
            </div>

            {/* KM Driven */}
            <div className="relative">
              <label htmlFor="kmDriven" className="block font-medium mb-1">
                KM Driven <span className="text-red-600">*</span>
              </label>
              <input
                id="kmDriven"
                type="number"
                min="0"
                max="99999"
                value={kmDriven}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,5}$/.test(val)) setKmDriven(val);
                }}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                  errors.kmDriven ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0 - 99999"
                aria-describedby="error-kmDriven"
              />
              {errors.kmDriven && showErrorPopOver.kmDriven && (
                <div
                  id="error-kmDriven"
                  className="absolute top-full left-0 mt-1 text-sm bg-red-100 text-red-700 p-1 rounded shadow animate-fadeIn"
                  role="alert"
                >
                  {errors.kmDriven}
                </div>
              )}
            </div>

            {/* Vehicle-in Date */}
            <div className="relative">
              <label htmlFor="vehicleInDate" className="block font-medium mb-1">
                Vehicle-in Date <span className="text-red-600">*</span>
              </label>
              <input
                id="vehicleInDate"
                type="date"
                value={vehicleInDate}
                min={todayISO}
                max="2099-12-31"
                onChange={(e) => setVehicleInDate(e.target.value)}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                  errors.vehicleInDate ? "border-red-500" : "border-gray-300"
                }`}
                aria-describedby="error-vehicleInDate"
              />
              {errors.vehicleInDate && showErrorPopOver.vehicleInDate && (
                <div
                  id="error-vehicleInDate"
                  className="absolute top-full left-0 mt-1 text-sm bg-red-100 text-red-700 p-1 rounded shadow animate-fadeIn"
                  role="alert"
                >
                  {errors.vehicleInDate}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Customer Details */}
        <section className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Customer Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Customer Name */}
            <div className="relative">
              <label htmlFor="customerName" className="block font-medium mb-1">
                Customer Name <span className="text-red-600">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                  errors.customerName ? "border-red-500" : "border-gray-300"
                }`}
                aria-describedby="error-customerName"
                placeholder="Full name"
              />
              {errors.customerName && showErrorPopOver.customerName && (
                <div
                  id="error-customerName"
                  className="absolute top-full left-0 mt-1 text-sm bg-red-100 text-red-700 p-1 rounded shadow animate-fadeIn"
                  role="alert"
                >
                  {errors.customerName}
                </div>
              )}
            </div>

            {/* Mobile Number */}
            <div className="relative">
              <label htmlFor="mobileNumber" className="block font-medium mb-1">
                Mobile Number <span className="text-red-600">*</span>
              </label>
              <input
                id="mobileNumber"
                type="tel"
                value={mobileNumber}
                onChange={(e) => {
                  if (/^\d{0,10}$/.test(e.target.value))
                    setMobileNumber(e.target.value);
                }}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                  errors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
                aria-describedby="error-mobileNumber"
                placeholder="10 digits"
              />
              {errors.mobileNumber && showErrorPopOver.mobileNumber && (
                <div
                  id="error-mobileNumber"
                  className="absolute top-full left-0 mt-1 text-sm bg-red-100 text-red-700 p-1 rounded shadow animate-fadeIn"
                  role="alert"
                >
                  {errors.mobileNumber}
                </div>
              )}
            </div>

            {/* Alt Mobile Number */}
            <div className="relative">
              <label
                htmlFor="altMobileNumber"
                className="block font-medium mb-1"
              >
                Alt. Mobile Number (optional)
              </label>
              <input
                id="altMobileNumber"
                type="tel"
                value={altMobileNumber}
                onChange={(e) => {
                  if (/^\d{0,10}$/.test(e.target.value))
                    setAltMobileNumber(e.target.value);
                }}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                  errors.altMobileNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="10 digits"
                aria-describedby="error-altMobileNumber"
              />
              {errors.altMobileNumber && showErrorPopOver.altMobileNumber && (
                <div
                  id="error-altMobileNumber"
                  className="absolute top-full left-0 mt-1 text-sm bg-red-100 text-red-700 p-1 rounded shadow animate-fadeIn"
                  role="alert"
                >
                  {errors.altMobileNumber}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Customer Complaints */}
        <section className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Customer Complaints
          </h2>
          <div className="space-y-4">
            {complaints.length === 0 && (
              <p className="text-gray-500 italic">No complaints added yet.</p>
            )}
            {complaints.map((c, idx) => (
              <div
                key={idx}
                className="border rounded px-4 py-2 flex justify-between items-center bg-gray-50 shadow-sm"
              >
                <div>
                  <p className="font-semibold">{c?.title}</p>
                  {c?.description && (
                    <p className="text-gray-600 text-sm">{c?.description}</p>
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => onEditComplaint(idx)}
                    title="Edit Complaint"
                    aria-label={`Edit complaint titled ${c?.title}`}
                  >
                    ✎
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => onDeleteComplaint(idx)}
                    title="Delete Complaint"
                    aria-label={`Delete complaint titled ${c?.title}`}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}

            {/* Add/Edit form */}
            <div className="bg-gray-50 p-4 rounded shadow-inner">
              {/*
              <input
                type="text"
                placeholder="Complaint Title"
                className="w-full border border-gray-300 rounded px-3 py-1 mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={complaintTitle}
                onChange={(e) => setComplaintTitle(e.target.value)}
                aria-label="Complaint title"
              />
              */}
              <textarea
                placeholder="Complaint Description"
                className="w-full border border-gray-300 rounded px-3 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                rows={2}
                value={complaintDescription}
                onChange={(e) => setComplaintDescription(e.target.value)}
                aria-label="Complaint description"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setComplaintTitle("");
                    setComplaintDescription("");
                    setComplaintEdit(null);
                  }}
                  className="mr-2 text-gray-600 hover:text-gray-900"
                  type="button"
                >
                  Clear
                </button>
                <button
                  onClick={onAddComplaint}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded transition"
                  type="button"
                >
                  {complaintEdit !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Mechanic Observations */}
        <section className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Mechanic Observations
          </h2>
          <div className="space-y-4">
            {observations.length === 0 && (
              <p className="text-gray-500 italic">No observations added yet.</p>
            )}
            {observations.map((o, idx) => (
              <div
                key={idx}
                className="border rounded px-4 py-2 flex justify-between items-center bg-gray-50 shadow-sm"
              >
                <div>
                  <p className="font-semibold">{o?.title}</p>
                  {o?.description && (
                    <p className="text-gray-600 text-sm">{o?.description}</p>
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => onEditObservation(idx)}
                    title="Edit Observation"
                    aria-label={`Edit observation titled ${o?.title}`}
                  >
                    ✎
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => onDeleteObservation(idx)}
                    title="Delete Observation"
                    aria-label={`Delete observation titled ${o?.title}`}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}

            {/* Add/Edit form */}
            <div className="bg-gray-50 p-4 rounded shadow-inner">
              <input
                type="text"
                placeholder="Observation Title"
                className="hidden w-full border border-gray-300 rounded px-3 py-1 mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={observationTitle}
                onChange={(e) => setObservationTitle(e.target.value)}
                aria-label="Observation title"
              />
              <textarea
                placeholder="Observation Description"
                className="w-full border border-gray-300 rounded px-3 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                rows={2}
                value={observationDescription}
                onChange={(e) => setObservationDescription(e.target.value)}
                aria-label="Observation description"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setObservationTitle("");
                    setObservationDescription("");
                    setObservationEdit(null);
                  }}
                  className="mr-2 text-gray-600 hover:text-gray-900"
                  type="button"
                >
                  Clear
                </button>
                <button
                  onClick={onAddObservation}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded transition"
                  type="button"
                >
                  {observationEdit !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Parts & Accessories */}
        <section className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Parts & Accessories
          </h2>
          <div className="space-y-4">
            {parts.length === 0 && (
              <p className="text-gray-500 italic">
                No parts/accessories added yet.
              </p>
            )}
            {parts.map((p, idx) => (
              <div
                key={idx}
                className="border rounded px-4 py-2 flex justify-between items-center bg-gray-50 shadow-sm flex-wrap gap-2"
              >
                <div className="flex-grow min-w-[200px]">
                  <p className="font-semibold">{p?.title}</p>
                  {p?.description && (
                    <p className="text-gray-600 text-sm">{p?.description}</p>
                  )}
                  <p className="text-sm text-gray-700 mt-1">
                    Amount: ₹{p.amount.toFixed(2)} | cGST: ₹{p.cGST.toFixed(2)}{" "}
                    | sGST: ₹{p.sGST.toFixed(2)}
                  </p>
                </div>
                <div className="space-x-2 flex-shrink-0">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => onEditPart(idx)}
                    title="Edit Part"
                    aria-label={`Edit part titled ${p?.title}`}
                  >
                    ✎
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => onDeletePart(idx)}
                    title="Delete Part"
                    aria-label={`Delete part titled ${p?.title}`}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}

            {/* Add/Edit form */}
            <div className="bg-gray-50 p-4 rounded shadow-inner grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <input
                type="text"
                placeholder="Part Title"
                value={partTitle}
                onChange={(e) => setPartTitle(e.target.value)}
                aria-label="Part title"
                className="col-span-1 md:col-span-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Description"
                value={partDescription}
                onChange={(e) => setPartDescription(e.target.value)}
                aria-label="Part description"
                className="col-span-1 md:col-span-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="number"
                placeholder="Amount (₹)"
                value={partAmount}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    /^[0-9]*\.?[0-9]*$/.test(e.target.value)
                  )
                    setPartAmount(e.target.value);
                }}
                min="0"
                step="0.01"
                aria-label="Part amount"
                className="col-span-1 md:col-span-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="number"
                placeholder="cGST (₹)"
                value={partCGST}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    /^[0-9]*\.?[0-9]*$/.test(e.target.value)
                  )
                    setPartCGST(e.target.value);
                }}
                min="0"
                step="0.01"
                aria-label="cGST amount"
                className="col-span-1 md:col-span-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="number"
                placeholder="sGST (₹)"
                value={partSGST}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    /^[0-9]*\.?[0-9]*$/.test(e.target.value)
                  )
                    setPartSGST(e.target.value);
                }}
                min="0"
                step="0.01"
                aria-label="sGST amount"
                className="col-span-1 md:col-span-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <div className="flex space-x-2 md:col-span-5 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setPartTitle("");
                    setPartDescription("");
                    setPartAmount("");
                    setPartCGST("");
                    setPartSGST("");
                    setPartEdit(null);
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={onAddPart}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded transition"
                >
                  {partEdit !== null ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Staff Assignments */}
        <section className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Staff Assignments
          </h2>
          {staffList?.length === 0 ? (
            <p>Loading staff...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {staffList?.map((staff) => (
                <label
                  key={staff?._id}
                  className="inline-flex items-center cursor-pointer select-none"
                  title={`Assign to ${staff?.staffName}`}
                >
                  <input
                    type="checkbox"
                    checked={staffAssignments?.includes(staff?._id)}
                    onChange={() => onToggleStaff(staff?._id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2">
                    {staff?.staffName}{" "}
                    {staff?.isGarageOwner ? (
                      <span>(Owner)</span>
                    ) : (
                      <span></span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          )}
        </section>

        {/* Billing Details */}
        <section className="mb-8 border-b pb-4 text-sm">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Billing Details
          </h2>

          {/* Standard Services */}
          <div className="mb-4">
            <p className="font-semibold m-2">Standard Services</p>
            {standardServices?.length === 0 ? (
              <p>Loading services...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs/tight">
                {standardServices?.map((svc, index) => (
                  <label
                    key={svc?._id}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      disabled={
                        !standardServices?.isBaseLineService ||
                        false === standardServices?.isBaseLineService
                          ? false
                          : true
                      }
                      //checked={selectedStdServices?.includes(svc?._id)}
                      //onChange={() => onToggleStdService(svc?._id, index)}
                      checked={
                        !standardServices?.isBaseLineService ||
                        false === standardServices?.isBaseLineService
                          ? svc?.isChecked
                          : true
                      }
                      onChange={() => onToggleStdService(svc?._id, index)}
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2">
                      {svc?.title} - ₹
                      <span className="font-bold text-blue-800">
                        {false === standardServices?.isBaseLineService
                          ? svc?.amountSummary[svc?.amountSummary.length - 1]
                              .amount
                          : svc?.amount +
                            (false === standardServices?.isBaseLineService
                              ? svc?.amountSummary[
                                  svc?.amountSummary.length - 1
                                ].amount
                              : svc?.amount *
                                (false === standardServices?.isBaseLineService
                                  ? svc?.amountSummary[
                                      svc?.amountSummary.length - 1
                                    ].cGST
                                  : svc?.cGST + false ===
                                    standardServices?.isBaseLineService
                                  ? svc?.amountSummary[
                                      svc?.amountSummary.length - 1
                                    ].sGST
                                  : svc?.sGST)) /
                              100}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Labour Charges */}
          <div className="mb-4 max-w-sm">
            <div className="">
              <label
                htmlFor="washingCharges"
                className="block font-medium mb-1"
              >
                Labour Charges
              </label>
              <div className="flex">
                <input
                  id="labourCharges"
                  type="number"
                  disabled
                  min="0"
                  value={
                    serviceChargeDetails?.labourServiceChargesData
                      ?.amountSummary[
                      serviceChargeDetails?.labourServiceChargesData
                        ?.amountSummary?.length - 1
                    ].amount +
                    (serviceChargeDetails?.labourServiceChargesData
                      ?.amountSummary[
                      serviceChargeDetails?.labourServiceChargesData
                        ?.amountSummary?.length - 1
                    ].amount *
                      (serviceChargeDetails?.labourServiceChargesData
                        ?.amountSummary[
                        serviceChargeDetails?.labourServiceChargesData
                          ?.amountSummary?.length - 1
                      ].cGST +
                        serviceChargeDetails?.labourServiceChargesData
                          ?.amountSummary[
                          serviceChargeDetails?.labourServiceChargesData
                            ?.amountSummary?.length - 1
                        ].sGST)) /
                      100
                  }
                  /*onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (/^\d+$/.test(val) && Number(val) >= 0))
                    setWashingCharges(Number(val));
                }}*/
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="checkbox"
                  className="p-2 m-2 w-10"
                  checked={true}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Washing Charges (optional) */}
          <div className="mb-4 max-w-sm">
            <div className="">
              <label
                htmlFor="washingCharges"
                className="block font-medium mb-1"
              >
                Washing Charges (₹) (Optional)
              </label>
              <div className="flex">
                <input
                  id="washingCharges"
                  disabled
                  type="number"
                  min="0"
                  value={
                    serviceChargeDetails?.washingServiceChargesData
                      ?.amountSummary[
                      serviceChargeDetails?.washingServiceChargesData
                        ?.amountSummary?.length - 1
                    ].amount +
                    (serviceChargeDetails?.washingServiceChargesData
                      ?.amountSummary[
                      serviceChargeDetails?.washingServiceChargesData
                        ?.amountSummary?.length - 1
                    ].amount *
                      (serviceChargeDetails?.washingServiceChargesData
                        ?.amountSummary[
                        serviceChargeDetails?.washingServiceChargesData
                          ?.amountSummary?.length - 1
                      ].cGST +
                        serviceChargeDetails?.washingServiceChargesData
                          ?.amountSummary[
                          serviceChargeDetails?.washingServiceChargesData
                            ?.amountSummary?.length - 1
                        ].sGST)) /
                      100
                  }
                  /*onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (/^\d+$/.test(val) && Number(val) >= 0))
                    setWashingCharges(Number(val));
                }}*/
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="checkbox"
                  className="p-2 m-2 w-10"
                  checked={washingChargesCheck}
                  onChange={toggleWashingCharges}
                />
              </div>
            </div>
          </div>

          {/* pickup Charges (optional) */}
          <div className="mb-4 max-w-sm">
            <div className="">
              <label className="block font-medium mb-1">
                Pickup Charges (₹) (Optional)
              </label>
              <div className="flex">
                <input
                  type="number"
                  disabled
                  min="0"
                  value={
                    serviceChargeDetails?.pickupServiceChargesData
                      ?.amountSummary[
                      serviceChargeDetails?.pickupServiceChargesData
                        ?.amountSummary?.length - 1
                    ].amount +
                    (serviceChargeDetails?.pickupServiceChargesData
                      ?.amountSummary[
                      serviceChargeDetails?.pickupServiceChargesData
                        ?.amountSummary?.length - 1
                    ].amount *
                      (serviceChargeDetails?.pickupServiceChargesData
                        ?.amountSummary[
                        serviceChargeDetails?.pickupServiceChargesData
                          ?.amountSummary?.length - 1
                      ].cGST +
                        serviceChargeDetails?.pickupServiceChargesData
                          ?.amountSummary[
                          serviceChargeDetails?.pickupServiceChargesData
                            ?.amountSummary?.length - 1
                        ].sGST)) /
                      100
                  }
                  /*onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (/^\d+$/.test(val) && Number(val) >= 0))
                    setWashingCharges(Number(val));
                }}*/
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="checkbox"
                  className="p-2 m-2 w-10"
                  checked={pickupChargesCheck}
                  onChange={togglepickupCharges}
                />
              </div>
            </div>
          </div>

          {/* drop Charges (optional) */}
          <div className="mb-4 max-w-sm">
            <div className="">
              <label className="block font-medium mb-1">
                Drop Charges (₹) (Optional)
              </label>
              <div className="flex">
                <input
                  type="number"
                  disabled
                  min="0"
                  value={
                    serviceChargeDetails?.dropServiceChargesData?.amountSummary[
                      serviceChargeDetails?.dropServiceChargesData
                        ?.amountSummary?.length - 1
                    ].amount +
                    (serviceChargeDetails?.dropServiceChargesData
                      ?.amountSummary[
                      serviceChargeDetails?.dropServiceChargesData
                        ?.amountSummary?.length - 1
                    ].amount *
                      (serviceChargeDetails?.dropServiceChargesData
                        ?.amountSummary[
                        serviceChargeDetails?.dropServiceChargesData
                          ?.amountSummary?.length - 1
                      ].cGST +
                        serviceChargeDetails?.dropServiceChargesData
                          ?.amountSummary[
                          serviceChargeDetails?.dropServiceChargesData
                            ?.amountSummary?.length - 1
                        ].sGST)) /
                      100
                  }
                  /*onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (/^\d+$/.test(val) && Number(val) >= 0))
                    setWashingCharges(Number(val));
                }}*/
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="checkbox"
                  className="p-2 m-2 w-10"
                  checked={dropChargesCheck}
                  onChange={toggleDropCharges}
                />
              </div>
            </div>
          </div>

          {/* Parts & Accessories Billing (readonly) */}
          <div className="mb-4 max-w-md">
            <p className="font-medium mb-2">Parts & Accessories Additions:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {parts.length === 0 && (
                <li className="italic text-gray-400">No parts added</li>
              )}
              {parts.map((p, idx) => (
                <li key={idx}>
                  {p?.title}: ₹{p.amount} + {p.cGST}% (cGST) + {p.cGST}% (sGST)
                  = ₹{p.amount + (p.amount * (p.cGST + p.sGST)) / 100}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Billing Summary */}
        <section className="mb-8 border-b pb-4 max-w-md">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Billing Summary
          </h2>
          <div className="space-y-2 text-gray-800">
            <div className="flex justify-between">
              <span>Parts Amount</span>
              <span>₹{partsTotalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Services</span>
              <span>₹{stdServiceAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Labour Charges</span>
              <span>₹{labourCharges}</span>
            </div>
            <div className="flex justify-between">
              <span>Washing Charges</span>
              <span>₹{washingCharges}</span>
            </div>
            <div className="flex justify-between">
              <span>Pickup Charges</span>
              <span>₹{pickupCharges}</span>
            </div>
            <div className="flex justify-between">
              <span>Drop Charges</span>
              <span>₹{dropCharges}</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-semibold text-indigo-700 text-lg">
              <span>Total</span>
              <span>₹{billingTotal}</span>
            </div>
          </div>
        </section>

        {/* Delivery & Next Service Details */}
        <section className="mb-8 max-w-md">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Delivery & Next Service Details
          </h2>

          <div className="mb-4 relative">
            <label htmlFor="deliveryDate" className="block font-medium mb-1">
              Delivery Date <span className="text-red-600">*</span>
            </label>
            <input
              id="deliveryDate"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={vehicleInDate}
              max="2099-12-31"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                errors.deliveryDate ? "border-red-500" : "border-gray-300"
              }`}
              aria-describedby="error-deliveryDate"
            />
            {errors.deliveryDate && showErrorPopOver.deliveryDate && (
              <div
                id="error-deliveryDate"
                className="absolute top-full left-0 mt-1 text-sm bg-red-100 text-red-700 p-1 rounded shadow animate-fadeIn"
                role="alert"
              >
                {errors.deliveryDate}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="nextServiceDate" className="block font-medium mb-1">
              Next Service Date (optional)
            </label>
            <input
              type="date"
              value={vehicleNextServiceDate}
              onChange={(e) => setvehicleNextServiceDate(e.target.value)}
              min={vehicleInDate}
              max="2099-12-31"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
                errors.vehicleNextServiceDate
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              aria-describedby="error-deliveryDate"
            />
          </div>
        </section>

        {/* Action Buttons */}
        <footer className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100 transition bg-orange-300"
            type="button"
          >
            Close
          </button>
          <div className="md:flex justify-between">
            {serviceid && (
              <button
                onClick={handleSaveService}
                className="px-6 py-2 bg-blue-600 hover:bg-indigo-700 text-white rounded shadow transition flex text-center mr-2"
                type="button"
              >
                <SaveAllIcon className="mx-2" />
                Save Service
              </button>
            )}
            {serviceid && (
              <button
                onClick={handleSaveService}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow transition flex text-center"
                type="button"
              >
                <SunIcon className="mx-2" />
                Finish service
              </button>
            )}
            {!serviceid && (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow transition flex text-center"
                type="button"
              >
                Start Service
              </button>
            )}
          </div>
        </footer>

        {/* Animations */}
        <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(-4px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
      </div>
    </div>
  );
}
