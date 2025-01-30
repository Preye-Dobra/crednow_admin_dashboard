<template>
  <div>
    <div class="table-scroll-buttons">
      <!-- <button @click="scrollLeft" class="scroll-button">◀ Scroll Left</button>
      <button @click="scrollRight" class="scroll-button">Scroll Right ▶</button> -->
    </div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th>Payout Number</th>
            <th>Loan Number</th>
            <th>Loan Status</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Lending Status</th>
            <th>Loan Amount</th>
            <th>Real Amount</th>
            <th>Payment Serial Number</th>
            <th>Loan Channel</th>
            <th>Bank Card Number</th>
            <th>Bank Name</th>
            <th>Payment Time</th>
            <th>Remarks</th>
            <th>Reason For Failure</th>
            <th>Creation Time</th>
            <th>Update Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.payoutNumber }}</td>
            <td>{{ item.loanNumber }}</td>
            <td>{{ item.loanStatus }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.lendingStatus }}</td>
            <td>{{ item.loanAmount }}</td>
            <td>{{ item.realAmount }}</td>
            <td>{{ item.paymentSerialNumber }}</td>
            <td>{{ item.loanChannel }}</td>
            <td>{{ item.bankCardNumber }}</td>
            <td>{{ item.bankName }}</td>
            <td>{{ item.paymentTime }}</td>
            <td>{{ item.remarks }}</td>
            <td>{{ item.reasonForFailure }}</td>
            <td>{{ item.creationTime }}</td>
            <td>{{ item.updateTime }}</td>
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
          payoutNumber: "PN20231024",
          loanNumber: "211024",
          loanStatus: "Cleared",
          name: "Isaac Emmanuel",
          mobile: "9098989898",
          lendingStatus: "Active",
          loanAmount: "5000",
          realAmount: "5000",
          paymentSerialNumber: "PSN123456",
          loanChannel: "Bank Transfer",
          bankCardNumber: "1234567890",
          bankName: "Bank XYZ",
          paymentTime: "2023-10-22",
          remarks: "No issues",
          reasonForFailure: "",
          creationTime: "2023-10-21",
          updateTime: "2023-10-23",
        },
        {
          payoutNumber: "PN20231023",
          loanNumber: "211023",
          loanStatus: "Pending",
          name: "Rebecca Tife",
          mobile: "9098981234",
          lendingStatus: "Pending",
          loanAmount: "10000",
          realAmount: "0",
          paymentSerialNumber: "PSN654321",
          loanChannel: "Mobile Money",
          bankCardNumber: "9876543210",
          bankName: "Bank ABC",
          paymentTime: "2023-10-20",
          remarks: "Awaiting approval",
          reasonForFailure: "Pending review",
          creationTime: "2023-10-19",
          updateTime: "2023-10-20",
        },
      ],
    };
  },
  methods: {
    scrollLeft() {
      this.$refs.tableContainer.scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight() {
      this.$refs.tableContainer.scrollBy({ left: 300, behavior: "smooth" });
    },
  },
};
</script>


<style scoped>
.table-container {
  overflow-x: auto;
  width: 99.5%;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.data-table {
  width: 3592px;
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
  color: #585865;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
}

.table-scroll-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.scroll-button {
  padding: 5px 15px;
  margin: 0 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.scroll-button:hover {
  background-color: #0056b3;
}

.pass {
  color: #00ccff;
}

.waiting {
  color: orange;
}

button-container {
  display: flex;
  gap: 10px;
}

.approve-button {
  color: #fff;
  background-color: #00ccff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.reject-button {
  color: red;
  background-color: #fff;
  border: 1px solid red;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
