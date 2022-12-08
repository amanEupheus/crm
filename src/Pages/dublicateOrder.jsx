import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SearchDropDown from "../Components/SearchDropDown";
import { useFormik } from "formik";
import Button from "../Components/Material/Button";
import BasicButton from "../Components/Material/Button";
import BasicTextFields from "../Components/Material/TextField";
import instance from "../Instance";
import Cookies from "js-cookie";
import DatePicker from "../Components/Material/Date";
import {Autocomplete, Backdrop, CircularProgress, Collapse, TextField } from "@mui/material";
import Snackbars from "../Components/Material/SnackBar";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import { protectedResources } from "../util/msConfig";
import { getToken } from "../util/msAuth";
import CustomizedSteppers from "../Components/Material/Stepper";
import { useParams } from "react-router-dom";

const OrderProcessing = () => {
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("order_pro");
  const [orderData, setDublicateOrderData] = useState({
    order_type: "", 
    fk_bp: "",
    order_processing_addresses:"",
    fk_school:"",
    bp_contact:"",
    delivery_date:"",
    order_processing_items:"",
    quantity: "",
    amount:"",
    order_priority:"",});


  console.log(orderData)
 
  const [customerData, setCustomerData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [transpoterData, setTranspoterData] = useState([]);
  const [seriesData, setSeriesData] = useState([{ series: "", disable: true }]);
  const [address, setAddress] = useState({ disable: true });
  const [sAddress, setSaddress] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const sidebarRef = useRef();

  const { id } = useParams();
  const show = null;

  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });

  const [value, setValue] = useState({
    item_quan: true,
    total_quan: "0",
    total_before_tax: "0",
    total: "0",
  });
  const snackbarRef = useRef();
  const [rowData, setRowData] = useState([]);



  const formik = useFormik({
    initialValues: {
      order_type: "",
      cutomer_name: "",
      s_address: "",
      b_address: "",
      date: new Date(),
      orDate: new Date(),
      order_pref: "",
      bp_contact_id: "",
      school: null,
      subject: "",
      series: "",
      item_quan: "",
      items: [],
      order_priority: "",
      total_quan: value.total_quan,
      total_before_tax: value.total_before_tax,
      total: value.total,
      pref_transpoter_name: "",
      remarks: "",
    },
    validate: () => {
      const errors = {};
      if (!formik.values.order_type) {
        errors.order_type = "Required";
      }
      // if (!formik.values.cutomer_name) {
      //   errors.cutomer_name = "Required";
      // }
      if (!formik.values.date) {
        errors.date = "Required";
      }
      // if (!formik.values.order_pref) {
      //   errors.order_pref = "Required";
      // }
      // if (!formik.values.school) {
      //   errors.school = "Required";
      // }
      if (!formik.values.subject) {
        errors.subject = "Required";
      }
      if (!formik.values.series) {
        errors.series = "Required";
      }
      if (!formik.values.item_quan) {
        errors.item_quan = "Required";
      }
      // if ((formik.values.items.length = 0)) {
      //   errors.items = "Required";
      // }
      if (!formik.values.order_priority) {
        errors.order_priority = "Required";
      }
      if (!formik.values.total_quan) {
        errors.total_quan = "Required";
      }
      if (!formik.values.total_before_tax) {
        errors.total_before_tax = "Required";
      }
      if (!formik.values.total) {
        errors.total = "Required";
      }
      if (!formik.values.pref_transpoter_name) {
        errors.pref_transpoter_name = "Required";
      }
      if (!formik.values.remarks) {
        errors.remarks = "Required";
      }

      if (Object.keys(errors).length > 0) {
        setSnackbarErrStatus(true);
        setErrMessage("Please Fill All The Fields");
        snackbarRef.current.openSnackbar();
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);

      formik.values.items = formik.values.items.filter(
        (item) => !(Number(item.quantity) === 0)
      );

      const res = await instance({
        url: "sales_data/createorder",
        method: "POST",
        data: {
          order_type: formik.values.order_type,
          fk_bp_id: formik.values.cutomer_name,
          order_ref: formik.values.order_pref,
          fk_school_id: formik.values.school,
          bp_contact_id: formik.values.bp_contact_id,
          ordate: formik.values.orDate,
          delivery_date: formik.values.date,
          order_priority: formik.values.order_priority,
          transporter_name: formik.values.pref_transpoter_name,
          quantity: value.total_quan,
          amount: value.total,
          remarks: formik.values.remarks,
          fk_shipping_address_id: formik.values.s_address,
          fk_billing_address_id: formik.values.b_address,
          fk_item_id: formik.values.items.map((item) => {
            return { fk_item_id: item.id, quantity: item.quantity };
          }),
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      if (res.data.status === "success") {
        setSnackbarErrStatus(false);
        setErrMessage("Order Created SuccessFully");
        snackbarRef.current.openSnackbar();
        setTimeout(() => {
          window.scroll({
            top: 0,
            // behavior: "smooth",
          });
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }, 1400);
      }
      setLoading(false);
      setOpen(true);
    },
  });




  const navInfo = {
    title: "Duplicate Order",
    details: ["Home", " / Duplicate Order"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const getCustomerData = async () => {
    setLoading(true);
    if (Cookies.get("ms-auth")) {
      const accessToken = await getToken(
        protectedResources.apiTodoList.scopes.read
      );
      const customerRes = await instance({
        url: "sales_data/getcustomer",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setCustomerData(customerRes.data.message);
    } else {
      const customerRes = await instance({
        url: "sales_data/getcustomer",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setCustomerData(customerRes.data.message);
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    

    const getdublicateOrder = async () => {
      

     const orderDetails = await instance({
        url: `sales_data/get_order_detail/${id}`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });

       setDublicateOrderData(orderDetails.data.message);

       //console.log(orderDetails.data)
      


    };
    

    const getSchoolData = async () => {
      if (Cookies.get("ms-auth")) {
        const accessToken = await getToken(
          protectedResources.apiTodoList.scopes.read
        );
        const schoolRes = await instance({
          url: "school/get/allschools",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSchoolData(schoolRes.data.message);
      } else {
        const schoolRes = await instance({
          url: "school/get/allschools",
          method: "GET",
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        });
        // console.log(schoolRes.data.message)
        setSchoolData(schoolRes.data.message);
      }
    };
    const getSubjectData = async () => {
      if (Cookies.get("ms-auth")) {
        const accessToken = await getToken(
          protectedResources.apiTodoList.scopes.read
        );
        const SubjectRes = await instance({
          url: "subject/getsubjects",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSubjectData(SubjectRes.data.message);
      } else {
        const SubjectRes = await instance({
          url: "subject/getsubjects",
          method: "GET",
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        });
        setSubjectData(SubjectRes.data.message);
      }
    };

    const getTranspoterData = async () => {
      if (Cookies.get("ms-auth")) {
        const accessToken = await getToken(
          protectedResources.apiTodoList.scopes.read
        );
        const transpoterRes = await instance({
          url: "transporter/get",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTranspoterData(transpoterRes.data.message);
      } else {
        const transpoterRes = await instance({
          url: "transporter/get",
          method: "GET",
          headers: {
            Authorization: Cookies.get("accessToken"),
          },
        });
        setTranspoterData(transpoterRes.data.message);
      }
    };

    // getCustomerData();
    getSchoolData();
    getSubjectData();
    getTranspoterData();
    getdublicateOrder()
  }, []);

  // console.log(schoolData)

  const getCustomerAddress = async (id) => {
    setLoading(true);
    const addressRes = await instance({
      url: `sales_data/getcustomer/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(addressRes.data.message)
    setAddress({
      billing: JSON.parse(
        JSON.stringify(addressRes.data.message[0].bp_addresses[0])
      ),
    });

    const addressRes2 = await instance({
      url: `sales_data/getcustomer/shipping/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(.data)
    setSaddress({
      shipping: JSON.parse(
        JSON.stringify(addressRes2.data.message[0].bp_addresses)
      ),
    });

    setLoading(false);
  };
  // console.log(schoolData)

  const GetContactRes = async (id) => {
    const res = await instance({
      url: `sales_data/get/customer/contact/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setContactData(res.data.message);
  };

  const getSeriesData = async (id) => {
    setLoading(true);
    const SeriesRes = await instance({
      url: `series/getseries/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(SeriesRes.data);
    setSeriesData(SeriesRes.data.message);

    setLoading(false);
  };

  const getListData = async (seriesID) => {
    setLoading(true);
    const getListData = await instance({
      url: `items/getitem/${seriesID}/${formik.values.subject.id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });

    // console.log(getListData.data.message);
    setRowData(getListData.data.message);
    // if (!value.item_quan) {
    //   console.log("working");
    //   formik.values.items = [];
    // }
    // console.log(formik.values.items.length);
    getListData.data.message.map((item) => {
      formik.values.items.push({
        id: item.id,
        item_id: item.item_code,
        quantity: formik.values.item_quan,
        price: item.price_master.price,
        tax: item.fk_tax.tax,
        discount: item.fk_discount.discount,
      });
    });
    setValue({
      item_quan: false,
      total_quan: calValues("total_quan"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
    setLoading(false);
    setOpen(true);
  };

  const handleDate = (date) => {
    let modifiedDate = `${date.split(" ")[1]} ${date.split(" ")[2]} ${
      date.split(" ")[3]
    }`;

    return modifiedDate;
  };

  const conditionalGetList = (id) => {
    if (!value.item_quan) {
      getListData(id);
    }
  };

  const getSampleCustomers = async () => {
    setLoading(true);
    const customer = await instance({
      url: "sales_data/get/sample_customer",
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setCustomerData(customer.data.message);
    setLoading(false);
  };

  const calActiceStep = () => {
    if (steps.step1) {
      return 0;
    }
    if (steps.step2) {
      return 1;
    }
    if (steps.step3) {
      return 2;
    }
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "order_type":
        if (value.order_type === "Sample") {
          getSampleCustomers();
        } else {
          getCustomerData();
        }
        formik.values.order_type = value.order_type;
        break;
      case "customer_name":
        // console.log(value)
        getCustomerAddress(value.id);
        // getShippingAddress(value.id)
        GetContactRes(value.id);
        formik.values.cutomer_name = value.id;
        break;
      case "pref_transpoter":
        formik.values.pref_transpoter_name = value.id;
        break;
      case "Delivery Date":
        formik.values.date = handleDate(value.toString());
        break;
      case "contact_id":
        formik.values.bp_contact_id = value.id;
        break;
      case "OR Date":
        formik.values.orDate = handleDate(value.toString());
        break;
      case "Order Reference":
        formik.values.order_pref = value;
        break;
      case "school_name":
        formik.values.school = value.id;
        break;
      case "subject_name":
        formik.values.subject = value;
        break;
      case "series_name":
        formik.values.series = value;
        conditionalGetList(value.id);
        // getListData(value.id);
        setValue((prev) => ({ ...prev, item_quan: false }));

        break;
      case "Items Quantity":
        formik.values.item_quan = value;
        if (rowData.length === 0) {
          getListData(formik.values.series.id);
        }
        break;
      case "order_priority":
        formik.values.order_priority = value.order_priority;
        break;
      case "shipping_address":
        formik.values.s_address = value.id;
        break;
      case "billing_address":
        formik.values.b_address = value.id;
        break;
      case "Total Quantity":
        formik.values.total_quan = value;
        break;
      case "Total Before Tax":
        formik.values.total_before_tax = value;
        break;
      case "Total":
        formik.values.total = value;
        break;
      // case "Preffered Transpoter Name":
      //   formik.values.pref_transpoter_name = value;
      //   break;
      case "Remarks":
        formik.values.remarks = value;
        break;

      default:
        break;
    }
    console.log(formik.values);
  };
  // console.log(address);

  const calValues = (type) => {
    if (type === "total_quan") {
      let total = 0;
      formik.values.items.map((item) => {
        total = total + Number(item.quantity);
      });
      return total.toString();
    }
    if (type === "total_before_tax") {
      let total = 0;
      let discount = 0;
      formik.values.items.map((item) => {
        discount =
          discount +
          (Number(item.discount) / 100) *
            Number(item.price) *
            Number(item.quantity);
        total = total + Number(item.price) * Number(item.quantity);
      });
      total = total - discount;
      return total.toString();
    }
    if (type === "total_after_tax") {
      let total = 0;
      let discount = 0;
      formik.values.items.map((item) => {
        let percentage =
          (Number(item.tax) / 100) * Number(item.price) * Number(item.quantity);
        discount =
          discount +
          (Number(item.discount) / 100) *
            Number(item.price) *
            Number(item.quantity);
        total = total + Number(item.price) * Number(item.quantity) + percentage;
      });
      // console.log(total - discount);
      // console.log(discount);
      return (total - discount).toString();
    }
  };

  const alterItemQuantity = (index, value) => {
    formik.values.items[index] = {
      id: formik.values.items[index].id,
      item_id: formik.values.items[index].item_id,
      quantity: value,
      price: formik.values.items[index].price,
      tax: formik.values.items[index].tax,
      discount: formik.values.items[index].discount,
    };
    console.log(formik.values.items);
    setValue({
      item_quan: false,
      total_quan: calValues("total_quan"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
  };
  // console.log(value);

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
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Sidebar
          highLight={""}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={""}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-400 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Snackbars
            ref={snackbarRef}
            snackbarErrStatus={snackbarErrStatus}
            errMessage={errMessage}
          />
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Create Duplicate Order            </h1>
            <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
              <CustomizedSteppers
                activeStep={calActiceStep()}
                steps={["Order Details", "Contact Details", "Address Details"]}
              />
              {/* step 1 */}
              {steps.step1 ? ( 
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                  <Autocomplete
                      value={orderData?.order_type}
                      options={['Order', 'Sample']}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "order_type");
                      }}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Order Type *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />                                                                                             
                    <Autocomplete
                      value={orderData?.fk_bp}
                      options={['Order', 'Sample']}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "customer_name");
                      }}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Customer name *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />  

                    {
                      console.log(orderData.fk_bp.bp_name)
                    }

                    <Autocomplete
                      value={orderData?.order_processing_addresses}
                      options={['Order', 'Sample']}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "shipping_address");
                      }}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Shipping Address *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />  

                    <Autocomplete
                      value={orderData?.order_processing_addresses}
                      options={['Order', 'Sample']}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "billing Address");
                      }}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Billing Address *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />  


                    <Autocomplete
                      value={orderData?.bp_contact}
                      options={['Order', 'Sample']}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "billing Address");
                      }}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Contact *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />  


                    




                  </div>
                  <div
                    className="mt-3"
                    onClick={() => {
                      if (
                        // formik.values.school_name &&
                        // formik.values.board &&
                        // formik.values.category
                        true
                      ) {
                        setSteps({ step1: false, step2: true, step3: false });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      } else {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Fill All The Fields");
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 2 */}
              {steps.step2 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-5 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    

                    <DatePicker
                    value={orderData?.delivery_date}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"Delivery Date"}
                      
                    />

                    <DatePicker
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"OR Date"}
                    />

                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      lable={"Order Reference"}
                      variant={"standard"}
                      value={orderData.order_ref}
                      multiline={false}
                    />

                     <Autocomplete
                      value={orderData?.fk_school.school_name}
                      options={['Order', 'Sample']}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "select_school");
                      }}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select School *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    /> 

                  </div>

                  <div
                    onClick={() => {
                      if (
                        // formik.values.name &&
                        // formik.values.email &&
                        // formik.values.phone &&
                        // formik.values.web &&
                        // formik.values.designation
                        true
                      ) {
                        setSteps({ step1: false, step2: false, step3: true });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      } else {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Fill All The Fields");
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 3 */}
              {steps.step3 ? (
                <div className="flex flex-col gap-0 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600"> 

                  <section className="bg-white px-3 py-2 rounded-md w-full h-[15rem] overflow-auto sm:grid sm:grid-cols-2 flex flex-col gap-2 col-span-4">
                      {orderData?.order_processing_items.map((item, index) => {
                        return (
                          <div
                            key={item.id}
                            className="flex flex-col rounded-md text-xs gap-1 px-4 py-2 bg-slate-400 text-slate-700 font-bold"
                          >
                            <span>Item Name: {item.fk_item.item_name}</span>
                            <span>Item Code: {item.fk_item.item_code}</span>
                            <span>Price: {item.fk_item.price}</span>
                            <span>series: {item.fk_item.fk_sery.series}</span>
                            <span>subject: {item.fk_item.fk_subject.subject}</span>
                            <span>
                              Quantity:{"   "}
                              <input
                                type="text"
                                onChange={(e) =>
                                  alterItemQuantity(index, e.target.value)
                                }
                                defaultValue={item.quantity}
                                placeholder="Enter Quantity"
                                className="px-4 py-2 font-bold rounded-md sm:w-[30%] w-[70%] outline-none"
                              />
                            </span>
                          </div>
                        );
                      })}
                    </section>


                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      getSeriesData={getSeriesData}
                      data={subjectData}
                      Name={"subject_name"}
                      label={"Select Subject"}
                      color={"rgb(243, 244, 246)"}
                    />

                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      Name={"series_name"}
                      disable={seriesData[0].disable}
                      data={seriesData}
                      label={"Select Series"}
                      color={"rgb(243, 244, 246)"}
                    />

                    <TextField
                      id="standard-basic"
                      onBlur={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Items Quantity"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      label="Items Quantity"
                      variant="standard"
                    />
                  </div>

                  <Collapse in={open}>
                    <section className="bg-white px-3 py-2 rounded-md w-full h-[15rem] overflow-auto sm:grid sm:grid-cols-2 flex flex-col gap-2 col-span-4">
                      {rowData.map((item, index) => {
                        return (
                          <div
                            key={item.id}
                            className="flex flex-col rounded-md text-xs gap-1 px-4 py-2 bg-slate-400 text-slate-700 font-bold"
                          >
                            <span>Item Name: {item.item_name}</span>
                            <span>Item Code: {item.item_code}</span>
                            <span>Discount: {item.fk_discount.discount}%</span>
                            <span>Price: {item.price_master.price}</span>
                            <span>Tax: {item.fk_tax.tax}%</span>
                            <span>
                              Quantity:{"   "}
                              <input
                                type="text"
                                onChange={(e) =>
                                  alterItemQuantity(index, e.target.value)
                                }
                                defaultValue={formik.values.item_quan}
                                placeholder="Enter Quantity"
                                className="px-4 py-2 font-bold rounded-md sm:w-[30%] w-[70%] outline-none"
                              />
                            </span>
                          </div>
                        );
                      })}
                    </section>
                  </Collapse>
                  <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                    <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                      

                       <Autocomplete
                      value={orderData?.order_priority}
                      options={[
                          { order_priority: "Low" },
                          { order_priority: "Medium" },
                          { order_priority: "High" },
                        ]}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "order_priority");
                      }}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select School *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    /> 

                      <BasicTextFields
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        lable={"Total Quantity"}
                        readOnly={true}
                        value={orderData?.quantity + value.total_quan}
                        defaultValue={value.total_quan}
                        // value={value.total_quan}
                        variant={"standard"}
                        multiline={false}
                      />

                      <BasicTextFields
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        lable={"Total Before Tax"}
                        defaultValue={Math.round(value.total_before_tax)}
                        value={Math.round(value.total_before_tax)}
                        readOnly={true}
                        variant={"standard"}
                        multiline={false}
                      />

                      <BasicTextFields
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        lable={"Total"}
                        readOnly={true}
                        defaultValue={Math.round(value.total)}
                       // value={Math.round(value.total)}
                       value={orderData?.amount + Math.round(value.total)}
                        variant={"standard"}
                        multiline={false}
                      />

                      <Autocomplete
                        value={orderData?.transporter_name_pref_transporter.name}
                      options={['Order', 'Sample']}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "select_school");
                      }}
                      sx={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={"Preffered Transpoter Name"}
                          Name={"pref_transpoter"}
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />

                      <BasicTextFields
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        lable={"Remarks"}
                        value={orderData?.remarks}
                        //   variant={"standard"}
                        multiline={true}
                      />
                    </div>
                  </div>

                  <div
                    className="mt-3"
                    onClick={() => {
                      if (
                        formik.values.state &&
                        formik.values.city &&
                        formik.values.address &&
                        formik.values.pin_code
                      ) {
                        formik.handleSubmit();
                      } else {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Fill All The Fields");
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                  >
                    <BasicButton text={"Create Order"} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderProcessing;
