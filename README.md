<template>
  <div class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Mobile</th>
          <th>Loan Number</th>
          <th>Application Status</th>
          <th>Application Time</th>
          <th>Is It Repeated Borrowing</th>
          <th>Loan Success Time</th>
          <th>Loan Time Type</th>
          <th>Refuse Reason</th>
          <th>Product Name</th>
          <th>User Level</th>
          <th>Loan Tenure</th>
          <th>Loan Amount</th>
          <th>Application Channel</th>
          <th>Is Privacy Data Authorized</th>
          <th>App Package</th>
          <th>App Version</th>
          <th>Application Method</th>
          <th>Tag</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{ item.mobile }}</td>
          <td>{{ item.loanNumber }}</td>
          <td>{{ item.applicationStatus }}</td>
          <td>{{ item.applicationTime }}</td>
          <td>{{ item.isItRepeatedBorrowing }}</td>
          <td>{{ item.loanSuccessTime }}</td>
          <td>{{ item.loanTimeType }}</td>
          <td>{{ item.refuseReason }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.userLevel }}</td>
          <td>{{ item.loanTenure }}</td>
          <td>{{ item.loanAmount }}</td>
          <td>{{ item.applicationChannel }}</td>
          <td>{{ item.isPrivacyDataAuthorized }}</td>
          <td>{{ item.appPackage }}</td>
          <td>{{ item.appVersion }}</td>
          <td>{{ item.applicationMethod }}</td>
          <td>{{ item.tag }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          mobile: "9098989898",
          loanNumber: "211024",
          applicationStatus: "Approved",
          applicationTime: "2023-10-20",
          isItRepeatedBorrowing: "Yes",
          loanSuccessTime: "2023-10-21",
          loanTimeType: "Short-term",
          refuseReason: "N/A",
          productName: "Crednow",
          userLevel: "Level 1",
          loanTenure: "7D",
          loanAmount: 7000,
          applicationChannel: "Googleadwords_int",
          isPrivacyDataAuthorized: "Yes",
          appPackage: "Android",
          appVersion: "v3.0",
          applicationMethod: "Online",
          tag: "Priority",
        },
        {
          mobile: "9098981234",
          loanNumber: "211025",
          applicationStatus: "Pending",
          applicationTime: "2023-10-22",
          isItRepeatedBorrowing: "No",
          loanSuccessTime: "N/A",
          loanTimeType: "Medium-term",
          refuseReason: "N/A",
          productName: "LoanPro",
          userLevel: "Level 2",
          loanTenure: "30D",
          loanAmount: 15000,
          applicationChannel: "Web",
          isPrivacyDataAuthorized: "No",
          appPackage: "iOS",
          appVersion: "v2.0",
          applicationMethod: "In-Person",
          tag: "Regular",
        },
        // Add more rows as needed
      ],
    };
  },
};
</script>

<style scoped>
.table-container {
  /* overflow-x: auto; */
  width: 3592px;
  padding: 8px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
  text-align: left;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
}

.data-table th {
  background-color: #f4f4f4;
}

.pass {
  color: green;
  font-weight: bold;
}

.waiting {
  color: orange;
  font-weight: bold;
}
</style>