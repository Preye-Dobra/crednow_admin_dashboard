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
            <th>Remarks</th>
            <th>App Name</th>
            <th>Collection Stage</th>
            <th>Collector</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="color: #00CCFF;">{{ overdueForm.loanNumber }}</td>
            <td>{{ overdueForm.mobile }}</td>
            <td>{{ overdueForm.name }}</td>
            <td>{{ overdueForm.loanOrderNumber }}</td>
            <td>{{ overdueForm.productName }}</td>
            <td>{{ overdueForm.loanTenure }}</td>
            <td>{{ overdueForm.loanAmount }}</td>
            <td>{{ overdueForm.appVersion }}</td>
            <td>{{ overdueForm.dueDate }}</td>
            <td>{{ overdueForm.loanStatus }}</td>
            <td>{{ overdueForm.tag }}</td>
            <td>{{ overdueForm.isRepeated }}</td>
            <td>{{ overdueForm.loanType }}</td>
            <td>{{ overdueForm.collectionResult }}</td>
            <td>{{ overdueForm.repaymentProportion }}</td>
            <td>{{ overdueForm.remarks }}</td>
            <td>{{ overdueForm.appName }}</td>
            <td>{{ overdueForm.collectionStage }}</td>
            <td>{{ overdueForm.collector }}</td>
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
      overdueForm:
       {
      mobile: "9876543210",
      name: "John Doe",
      loanNumber: "LN-202401",
      loanOrderNumber: "ORD-5678",
      collectionStage: "Stage 3",
      collector: "Jane Smith",
      productName: "FastLoan",
      loanTenure: "24 months",
      loanAmount: "10,000",
      appVersion: "2.1.0",
      dueDate: "2024-02-15",
      loanStatus: "Overdue",
      tag: "High Priority",
      isRepeated: "Yes",
      loanType: "Personal Loan",
      collectionResult: "Pending",
      appName: "LoanMaster",
      repaymentProportion: "75%",
      remarks: "Customer promised to pay next week",
    },
    
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
