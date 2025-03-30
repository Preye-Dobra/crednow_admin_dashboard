export const fields = [
  {
    name: "mobile",
    label: "Mobile",
    type: "input",
    props: { type: "text", placeholder: "Enter mobile number" },
  },
  {
    name: "name",
    label: "Name",
    type: "input",
    props: { type: "text", placeholder: "Enter full name" },
  },
  {
    name: "loanNumber",
    label: "Loan Number",
    type: "input",
    props: { type: "text", placeholder: "Enter loan number" },
  },
  {
    name: "loanOrderNumber",
    label: "Loan Order Number",
    type: "input",
    props: { type: "text", placeholder: "Enter loan order number" },
  },
  {
    name: "collectionStage",
    label: "Collection Stage",
    type: "select",
    props: {
      options: ["--Select Option--", "Early", "Mid", "Late", "Final"],
      placeholder: "--Select Collection Stage--",
    },
  },
  {
    name: "collector",
    label: "Collector",
    type: "input",
    props: { type: "text", placeholder: "Enter collector's name" },
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
      placeholder: "--Select Product Name--",
    },
  },
  {
    name: "loanTenure",
    label: "Loan Tenure",
    type: "input",
    props: { type: "number", placeholder: "Enter tenure in months" },
  },
  {
    name: "loanAmount",
    label: "Loan Amount",
    type: "input",
    props: { type: "number", placeholder: "Enter loan amount" },
  },
  {
    name: "appVersion",
    label: "App Version",
    type: "select",
    props: {
      options: ["--Select Option--", "v1.0", "v2.0", "v3.0", "v3.5"],
      placeholder: "--Select App Version--",
    },
  },
  {
    name: "dueDate",
    label: "Due Date",
    type: "input",
    props: { type: "date", placeholder: "Select due date" },
  },
  {
    name: "loanStatus",
    label: "Loan Status",
    type: "select",
    props: {
      options: [
        "--Select Option--",
        "Active",
        "Closed",
        "Overdue",
        "Written Off",
      ],
      placeholder: "--Select Loan Status--",
    },
  },
  {
    name: "tag",
    label: "Tag",
    type: "select",
    props: {
      options: ["--Select Option--", "Priority", "Regular", "Low", "High"],
      placeholder: "--Select Tag--",
    },
  },
  {
    name: "isRepeatedBorrowing",
    label: "Is Repeated Borrowing",
    type: "select",
    props: {
      options: ["--Select Option--", "Yes", "No"],
      placeholder: "--Select Repeated Borrowing--",
    },
  },
  {
    name: "loanType",
    label: "Loan Type",
    type: "select",
    props: {
      options: ["--Select Option--", "Short-term", "Long-term", "Medium-term"],
      placeholder: "--Select Loan Type--",
    },
  },
  {
    name: "collectionResult",
    label: "Collection Result",
    type: "select",
    props: {
      options: [
        "--Select Option--",
        "Paid",
        "Partially Paid",
        "Unpaid",
        "Promise to Pay",
      ],
      placeholder: "--Select Collection Result--",
    },
  },
  {
    name: "proportionWithoutPenalty",
    label: "Proportion Without Penalty",
    type: "input",
    props: { type: "number", placeholder: "Enter proportion (%)" },
  },
  {
    name: "followUpOnDay",
    label: "Follow Up On Day",
    type: "input",
    props: { type: "date", placeholder: "Select follow-up date" },
  },
  {
    name: "appName",
    label: "App Name",
    type: "select",
    props: {
      options: ["--Select Option--", "App A", "App B", "App C"],
      placeholder: "--Select App Name--",
    },
  },
];
