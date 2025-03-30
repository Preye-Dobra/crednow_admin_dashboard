export const fields = [
  {
    name: "mobile",
    label: "Mobile",
    type: "input",
    props: { type: "text", placeholder: "Please enter" },
  },
  {
    name: "loanNumber",
    label: "Loan Number",
    type: "input",
    props: { type: "text", placeholder: "Please enter " },
  },
  {
    name: "applicationStatus",
    label: "Application Status",
    type: "select",
    props: {
      options: [
        "--Select Option--",
        "Approved",
        "Rejected",
        "Pending",
        "In Progress",
      ],
     
    },
  },
  {
    name: "applicationTime",
    label: "Application Time",
    type: "input",
    props: {
      type: "text",
      placeholder: "start ~ end",
      icon: "/date.png", // Calendar icon from public folder
    },
  },
  {
    name: "isItRepeatedBorrowing",
    label: "Is it Repeated Borrowing",
    type: "select",
    props: {
      options: ["--Select Option--", "Yes", "No"],
     
    },
  },
  {
    name: "loanSuccessTime",
    label: "Loan Success Time",
    type: "input",
    props: {
      type: "text",
      placeholder: "start ~ end",
      icon: "/date.png", // Calendar icon from public folder
    },
  },
  {
    name: "loanTimeType",
    label: "Loan Time Type",
    type: "select",
    props: {
      options: ["--Select Option--", "Short-term", "Long-term", "Medium-term"],
     
    },
  },
  {
    name: "refuseReason",
    label: "Refuse Reason",
    type: "select",
    props: {
      options: [
        "--Select Option--",
        "Ineligible",
        "Missing documents",
        "Rejected by system",
        "Other",
      ],
     
    },
  },
  {
    name: "productName",
    label: "Product Name",
    type: "select",
    props: {
      options: [
        "--Select Option--",
        "Product A",
        "Product B",
        "Product C",
        "Product D",
      ],
     
    },
  },
  {
    name: "userLevel",
    label: "User Level",
    type: "select",
    props: {
      options: [
        "--Select Option--",
        "New",
        "Returning",
        "VIP",
        "Gold",
        "Platinum",
      ],
     
    },
  },
  {
    name: "loanTenure",
    label: "Loan Tenure",
    type: "input",
    props: { type: "number", placeholder: "Please enter" },
  },
  {
    name: "loanAmount",
    label: "Loan Amount",
    type: "input",
    props: { type: "number", placeholder: "Please enter" },
  },
  {
    name: "applicationChannel",
    label: "Application Channel",
    type: "select",
    props: {
      options: [
        "--Select Option--",
        "Web",
        "Mobile App",
        "Agent",
        "Call Center",
      ],
     
    },
  },
  {
    name: "isPrivacyDataAuthorized",
    label: "Is Privacy Data Authorized",
    type: "select",
    props: {
      options: ["--Select Option--", "Yes", "No"],
     
    },
  },
  {
    name: "appPackage",
    label: "App Package",
    type: "select",
    props: {
      options: ["--Select Option--", "Android", "iOS", "Web", "Other"],
     
    },
  },
  {
    name: "appVersion",
    label: "App Version",
    type: "select",
    props: {
      options: ["--Select Option--", "v1.0", "v2.0", "v3.0", "v3.5"],
     
    },
  },
  {
    name: "applicationMethod",
    label: "Application Method",
    type: "select",
    props: {
      options: [
        "--Select Option--",
        "Online",
        "Offline",
        "In-Person",
        "Through Agent",
      ],
     
    },
  },
  {
    name: "tag",
    label: "Tag",
    type: "select",
    props: {
      options: ["--Select Option--", "Priority", "Regular", "Low", "High"],
      
    },
  },
];
