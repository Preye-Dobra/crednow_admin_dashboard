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
      name: "daysOverDue",
      label: "Days Overdue",
      type: "input",
      props: { type: "number", placeholder: "Enter days overdue" },
    },
    {
      name: "paymentChannel",
      label: "Payment Channel",
      type: "select",
      props: {
        options: ["monify", "Bank Transfer", "Credit Card", "Cash"],
        placeholder: "--Select Payment Channel--",
      },
    },
    {
      name: "applicationTime",
      label: "Application Time",
      type: "input",
      props: { type: "datetime-local", placeholder: "Select application date and time" },
    },
    {
      name: "paybackTime",
      label: "Payback Time",
      type: "input",
      props: { type: "datetime-local", placeholder: "Select payback date and time" },
    },
    {
      name: "loanNumber",
      label: "Loan Number",
      type: "input",
      props: { type: "number", placeholder: "Please enter loan number" },
    },
    {
      name: "productName",
      label: "Product Name",
      type: "select",
      props: {
        options: ["crednow", "Other Product A", "Other Product B"],
        placeholder: "--Select Product--",
      },
    },
  ];



