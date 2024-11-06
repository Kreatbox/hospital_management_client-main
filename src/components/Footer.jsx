import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const [hospital, setHospital] = useState();

  const getInfo = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const token = localStorage.getItem("token");
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}/api/hospital/`,
        { headers }
      );

      if (response.data.success) {
        setHospital(response.data.Hos[0]);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      const errorMsg =
        err.response?.data?.msg || "An error occurred while fetching data.";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <footer className="flex flex-row gap-4 bg-slate-200 mt-2">
      {/* Logo */}
      <div className="w-[30%] flex flex-row items-center gap-3 p-2">
        <img src={hospital?.logo?.url} alt="" className="h-16 rounded-full" />
        <span className="text-xl font-semibold">
          Welcome to {hospital?.name || "the"} Hospital
        </span>
      </div>

      {/* Privacy */}
      <div className="w-[30%] flex flex-col items-center">
        <span className="text-xl font-semibold">Privacy & Policy</span>
        <span>
          {hospital?.privacy_policy || "No privacy policy available."}
        </span>
      </div>

      {/* Connection */}
      <div className="flex flex-col items-center">
        <span className="text-xl font-semibold">Connection Information</span>
        <ul className="flex flex-row gap-4">
          <li>
            <span className="font-semibold">Phone 1:</span>{" "}
            {hospital?.phone1 || "N/A"}
          </li>
          <li>
            <span className="font-semibold">Phone 2:</span>{" "}
            {hospital?.phone2 || "N/A"}
          </li>
          <li>
            <span className="font-semibold">Mobile :</span>{" "}
            {hospital?.phone3 || "N/A"}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
