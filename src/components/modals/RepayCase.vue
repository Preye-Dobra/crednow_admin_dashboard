<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead style="background-color: #D9F7FF;">
          <tr>
            <!-- Dynamically generate table headers -->
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through overdueForm array to render each row -->
          <tr v-for="(row, rowIndex) in overdueForm" :key="rowIndex">
<td 
  v-for="(header, index) in headers" 
  :key="index"
>
  <template v-if="/time|date$/i.test(header)">
    {{ row[header.toLowerCase().replace(/ /g, '').replace(/’/g, '')]?.split(' ')[0] }} 
    <span style="color: #00CCFF;">
      {{ row[header.toLowerCase().replace(/ /g, '').replace(/’/g, '')]?.split(' ')[1] || '' }}
    </span>
  </template>
  <template v-else>
    {{ row[header.toLowerCase().replace(/ /g, '').replace(/’/g, '')] || '-' }}
  </template>
</td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        "Loan Number",
        "Loan Order Number",
        "App Name",
        "Name",
        "Mobile",
        "Due date",
        "Product name",
        "Collector’s Name",
        "Collection Stage",
        "Daily Collector Time",
        "Collection Times",
        "Collector Log",
        "Collection Result",
        "Log Update Time",
        "Days overdue",
        "Lending Time",
        "Loan Amount",
        "Total repayment",
        "Loan tenure",
        "Loan Type",
        "Application Status",
        "Capital",
        "Intrest",
        "Service Fee",
        "Penalty",
        "Amount Repaid",
        "App Version",
        "App Package",
      ],
      overdueForm: [
        {
          loannumber: "211024",
          loanordernumber: "9098989898",
          appname: "Crednow",
          mobile: "9098989898",
          name:"Emmy",
          productname: "Crednow",
          duedate: "2025-02-01 22:33:08",
          collectorsname: "Jane Smith",
          collectionstage: "Stage 3",
          dailycollectortime: "10:00 AM",
          collectiontimes: "3",
          collectorlog: "Logged",
          collectionresult: "Pending",
          logupdatetime: "2024-01-25 12:11:23",
          daysoverdue: "10",
          lendingtime: "2024-01-10 15:30:00",
          loanamount: "10,000",
          totalrepayment: "12,000",
          loantenure: "24 months",
          loantype: "Personal Loan",
          applicationstatus: "Active",
          capital: "8,000",
          interest: "2,000",
          servicefee: "200",
          penalty: "100",
          amountrepaid: "9,000",
          appversion: "2.1.0",
          apppackage: "com.Crednow.solutions.enterprise.monetaryservices.explorer.globalapp.mobile.app",
          paymenttime: "2024-02-10 15:30:00",
          updatetime: "2024-02-11 08:45:00",
        },
{
          loannumber: "211024",
          loanordernumber: "9098989898",
          appname: "Crednow",
          mobile: "9098989898",
          name:"Emmy",
          productname: "Crednow",
          duedate: "2025-02-01 22:33:08",
          collectorsname: "Jane Smith",
          collectionstage: "Stage 3",
          dailycollectortime: "10:00 AM",
          collectiontimes: "3",
          collectorlog: "Logged",
          collectionresult: "Pending",
          logupdatetime: "2024-01-25 12:11:23",
          daysoverdue: "10",
          lendingtime: "2024-01-10 15:30:00",
          loanamount: "10,000",
          totalrepayment: "12,000",
          loantenure: "24 months",
          loantype: "Personal Loan",
          applicationstatus: "Active",
          capital: "8,000",
          interest: "2,000",
          servicefee: "200",
          penalty: "100",
          amountrepaid: "9,000",
          appversion: "2.1.0",
          apppackage: "com.Crednow.solutions.enterprise.monetaryservices.explorer.globalapp.mobile.app",
          paymenttime: "2024-02-10 15:30:00",
          updatetime: "2024-02-11 08:45:00",
        },{
          loannumber: "211024",
          loanordernumber: "9098989898",
          appname: "Crednow",
          mobile: "9098989898",
          name:"Emmy",
          productname: "Crednow",
          duedate: "2025-02-01 22:33:08",
          collectorsname: "Jane Smith",
          collectionstage: "Stage 3",
          dailycollectortime: "10:00 AM",
          collectiontimes: "3",
          collectorlog: "Logged",
          collectionresult: "Pending",
          logupdatetime: "2024-01-25 12:11:23",
          daysoverdue: "10",
          lendingtime: "2024-01-10 15:30:00",
          loanamount: "10,000",
          totalrepayment: "12,000",
          loantenure: "24 months",
          loantype: "Personal Loan",
          applicationstatus: "Active",
          capital: "8,000",
          interest: "2,000",
          servicefee: "200",
          penalty: "100",
          amountrepaid: "9,000",
          appversion: "2.1.0",
          apppackage: "com.Crednow.solutions.enterprise.monetaryservices.explorer.globalapp.mobile.app",
          paymenttime: "2024-02-10 15:30:00",
          updatetime: "2024-02-11 08:45:00",
        },{
          loannumber: "211024",
          loanordernumber: "9098989898",
          appname: "Crednow",
          mobile: "9098989898",
          name:"Emmy",
          productname: "Crednow",
          duedate: "2025-02-01 22:33:08",
          collectorsname: "Jane Smith",
          collectionstage: "Stage 3",
          dailycollectortime: "10:00 AM",
          collectiontimes: "3",
          collectorlog: "Logged",
          collectionresult: "Pending",
          logupdatetime: "2024-01-25 12:11:23",
          daysoverdue: "10",
          lendingtime: "2024-01-10 15:30:00",
          loanamount: "10,000",
          totalrepayment: "12,000",
          loantenure: "24 months",
          loantype: "Personal Loan",
          applicationstatus: "Active",
          capital: "8,000",
          interest: "2,000",
          servicefee: "200",
          penalty: "100",
          amountrepaid: "9,000",
          appversion: "2.1.0",
          apppackage: "com.Crednow.solutions.enterprise.monetaryservices.explorer.globalapp.mobile.app",
          paymenttime: "2024-02-10 15:30:00",
          updatetime: "2024-02-11 08:45:00",
        },{
          loannumber: "211024",
          loanordernumber: "9098989898",
          appname: "Crednow",
          mobile: "9098989898",
          name:"Emmy",
          productname: "Crednow",
          duedate: "2025-02-01 22:33:08",
          collectorsname: "Jane Smith",
          collectionstage: "Stage 3",
          dailycollectortime: "10:00 AM",
          collectiontimes: "3",
          collectorlog: "Logged",
          collectionresult: "Pending",
          logupdatetime: "2024-01-25 12:11:23",
          daysoverdue: "10",
          lendingtime: "2024-01-10 15:30:00",
          loanamount: "10,000",
          totalrepayment: "12,000",
          loantenure: "24 months",
          loantype: "Personal Loan",
          applicationstatus: "Active",
          capital: "8,000",
          interest: "2,000",
          servicefee: "200",
          penalty: "100",
          amountrepaid: "9,000",
          appversion: "2.1.0",
          apppackage: "com.Crednow.solutions.enterprise.monetaryservices.explorer.globalapp.mobile.app",
          paymenttime: "2024-02-10 15:30:00",
          updatetime: "2024-02-11 08:45:00",
        },
      ],
    };
  },
  methods: {
    // Ensure all fields are filled
    fillMissingFields() {
      this.overdueForm = this.overdueForm.map((row) => {
        const filledRow = {};
        this.headers.forEach((header) => {
          const key = header.toLowerCase().replace(/ /g, "").replace(/’/g, "");
          filledRow[key] = row[key] || "-"; // Fill missing fields with "-"
        });
        return filledRow;
      });
    },
  },
  mounted() {
    // Call the method to fill missing fields when the component is mounted
    this.fillMissingFields();
  },
};
</script>




<style scoped>
.table-container {
  overflow-x: auto;
  width: 100%;
  
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  
  margin-top: 22px;
}

.data-table {
  width: 2592px;
  border-collapse: collapse;
  margin: 0;
  text-align: left;
}
/* Sticky the Loan Number column */
.data-table th:first-child,
.data-table td:first-child {
  position: sticky;
  left: 0;
  background-color: #fff; /* Ensure the background color matches the rest */
  z-index: 1; /* Keep it on top of other elements */
}
.data-table td:first-child{
  color: #00CCFF;
}
.data-table th:first-child {
  
  background-color: #F2F7F8; /* Ensure the background color matches the rest */
  
}
/* Styling for header row to make sure sticky column header stays visible */
.data-table th {
  background-color: #F2F7F8;
}
tr th {
  font-size: 14px;
  line-height: 19.6px;
  text-align: center;
  color: #004759;
  font-weight: 400;
}

tr td {
  font-size: 12px;
  line-height: 16.8px;
  font-weight: 400;
  text-align: center;
  color: #585865;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.operation-button {
  color: #004759;
  background-color: #fff;
  border: 1px solid #00CCFF;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.operation-button:hover {
  background-color: #00CCFF;
  color: #fff;
}



 .data-table tbody tr:hover {
  background-color: #ffff; /* Change background color on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow under the hovered row */
  cursor: pointer; /* Change cursor to pointer on hover */
}


</style>
