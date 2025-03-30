export const fields = [
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "input",
    props: { type: "text", placeholder: "Please enter phone number" },
  },
  {
    name: "firstName",
    label: "First Name",
    type: "input",
    props: { type: "text", placeholder: "Please enter first name" },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "input",
    props: { type: "text", placeholder: "Please enter last name" },
  },
  {
    name: "loanNumber",
    label: "Loan Number",
    type: "input",
    props: { type: "number", placeholder: "Please enter loan number" },
  },
  {
    name: "loanStatus",
    label: "Loan Status",
    type: "select",
    props: {
      options: ["overdue", "approved", "disbursed", "disbursement failed"],
      placeholder: "--Select Loan Status--",
    },
  },
  {
    name: "lendingStatus",
    label: "Lending Status",
    type: "select",
    props: {
      options: ["success", "failed"],
      placeholder: "--Select Lending Status--",
    },
  },
  {
    name: "bankName",
    label: "Bank Name",
    type: "input",
    props: { type: "text", placeholder: "Please enter bank name" },
  },
  {
    name: "accountNumber",
    label: "Account Number",
    type: "input",
    props: { type: "text", placeholder: "Please enter account number" },
  },
  {
    name: "creationTime",
    label: "Creation Time",
    type: "input",
    props: {
      type: "datetime-local",
      placeholder: "Select creation date and time",
      icon: "/public/calendar-icon.png",
    },
  },
];
