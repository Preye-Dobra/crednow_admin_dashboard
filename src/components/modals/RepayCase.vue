<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th>Loan Number</th>
            <th>Mobile</th>
            <th>Name</th>
            
            <th>Loan Order Number</th>
            <th>Product Name</th>
            <th>Loan Tenure</th>
            <th>Loan Amount</th>
            <th>App Version</th>
            <th>Due Date</th>
            <th>Loan Status</th>
            <th>Tag</th>
            <th>Is Repeated Borrowing</th>
            <th>Loan Type</th>
            <th>Collection Result</th>
            <th>Proportion Without Penalty</th>
            <th>Follow-up On Day</th>
            <th>App Name</th>
            <th>Collection Stage</th>
            <th>Collector</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
                       <td style="color: #00CCFF;">{{ item.loanNumber }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.name }}</td>

            <td>{{ item.loanOrderNumber }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.loanTenure }}</td>
            <td>{{ item.loanAmount }}</td>
            <td>{{ item.appVersion }}</td>
            <td>{{ item.dueDate }}</td>
            <td>{{ item.loanStatus }}</td>
            <td>{{ item.tag }}</td>
            <td>{{ item.isRepeatedBorrowing }}</td>
            <td>{{ item.loanType }}</td>
            <td>{{ item.collectionResult }}</td>
            <td>{{ item.proportionWithoutPenalty }}</td>
            <td>{{ item.followUpOnDay }}</td>
            <td>{{ item.appName }}</td>
            <td>{{ item.collectionStage }}</td>
            <td>{{ item.collector }}</td>
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
      tableData: [
        {
          loanNumber: "211024",
          productName: "Crednow",
          loanOrderNumber: "1001",
          mobile: "9098989898",
          name: "Isaac Emmanuel",
          loanTenure: "12 months",
          loanAmount: "5000",
          appVersion: "1.2.3",
          dueDate: "2023-11-01",
          loanStatus: "Active",
          tag: "Urgent",
          isRepeatedBorrowing: "Yes",
          loanType: "Personal Loan",
          collectionResult: "Pending",
          proportionWithoutPenalty: "80%",
          followUpOnDay: "2023-11-05",
          appName: "LoanApp",
          collectionStage: "Stage 2",
          collector: "John Doe",
        },
      ],
    };
  },
};
</script>



<style scoped>
.table-container {
  overflow-x: auto;
  width: 99.5%;
  padding: 8px;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 22px;
}

.data-table {
  width: 2592px;
  border-collapse: collapse;
  margin: 0;
  text-align: left;
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






</style>