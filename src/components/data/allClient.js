// src/data/allClient.js
export const fields = [
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "input",
    props: { type: "text", placeholder: "Please Enter" },
  },
  {
    name: "firstName",
    label: "First Name",
    type: "input",
    props: { type: "text", placeholder: "Please Enter" },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "input",
    props: { type: "text", placeholder: "Please Enter" },
  },
  {
    name: "bvn",
    label: "BVN",
    type: "input",
    props: { type: "text", placeholder: "Please Enter" },
  },
  {
    name: "accountStatus",
    label: "Account Status",
    type: "select",
    props: {
      options: ["active", "deleted", "suspended"],
      placeholder: "--Select Option--",
    },
  },
  {
    name: "registrationTime",
    label: "Registration Time",
    type: "input",
    props: {
      type: "date",
      placeholder: "Select date",
      icon: "/date.png", // Calendar icon from public folder
    },
  },
  {
    name: "level",
    label: "User Level",
    type: "select",
    props: {
      options: [1, 2, 3, 4, 5],
      placeholder: "--Select Option--",
    },
  },
  {
    name: "email",
    label: "Email",
    type: "input",
    props: { type: "email", placeholder: "Please Enter" },
  },
  {
    name: "tradingStatus",
    label: "Trading Status",
    type: "select",
    props: {
      options: ["cleared", "pending"],
      placeholder: "--Select Option--",
    },
  },
  {
    name: "loanStatus",
    label: "Loan Status",
    type: "select",
    props: {
      options: ["open", "none", "active"],
      placeholder: "--Select Option--",
    },
  },
  {
    name: "loanLimit",
    label: "Loan Limit",
    type: "select",
    props: {
      options: [20000, 35000, 55000, 85000, 300000],
      placeholder: "--Select Option--",
    },
  },
];
