import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from "@mui/icons-material";
 import { Link } from "react-router-dom";
// import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from "../DummyData";
// import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";

const ManageOrder = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("manageOrder");
  const [orderData, setOrderData] = useState([]);
  const [orderNum, setOrderNum] = useState(0);
  const sidebarRef = useRef();

  const navInfo = {
    title: "Manage Order",
    details: ["Home", " / Manage Order"],
  };

  const Tablecolumns = [
    { field: "SchoolName", headerName: "School Name", width: 300 },
    {
      field: "City",
      headerName: "City",
      width: 180,
    },
    {
      field: "State",
      headerName: "State",
      width: 120,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 350,
    },
  ];

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useLayoutEffect(() => {
    const getOrderData = async () => {
      const data = await instance({
        url: "sales_data/get/orders",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      console.log(data.data);
      setOrderNum(data.data.message.length);
      setOrderData(data.data.message);
    };
    getOrderData();
  }, []);

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <div className="flex bg-[#111322]">
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

      <div>
        <SwipeableTemporaryDrawer
          ref={sidebarRef}
          sidebarCollapsed={sidebarCollapsed}
          highLight={highLight}
          // show={show}
        />
      </div>

      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div
            className={`sm:px-8 px-4 py-3 grid sm:grid-cols-2 grid-cols-1 gap-4 bg-[#141728]`}
          >
            {orderData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex font-medium flex-col gap-4 text-gray-100 justify-center rounded-md items-start px-4 py-1 bg-slate-600"
                >
                {/* <span>Order Type: {item.id}</span> */}
                  <span>Order Type: {item.order_type}</span>
                  <span>
                    School Name:{" "}
                    {item.fk_school ? item.fk_school.school_name : "null"}
                  </span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Amount: ₹{item.amount}</span>
                  <div className="mb-2">
                    <Link to={'/dublicateOrder/' + (item.id)}><BasicButton text={"Duplicate"} /></Link>
                  </div>
                  {/* <span>Status: {!item.sap_status && }</span> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
