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
            <th>Repayment Number</th>
            <th>Loan Number</th>
            <th>Product Name</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Trading Status</th>
            <th>Repayment Code (VA)/Link</th>
            <th>Repayment Amount</th>
            <th>Real Amount</th>
            <th>Liquidation Amount</th>
            <th>Days Overdue</th>
            <th>Collector</th>
            <th>Payment Company Serial Number</th>
            <th>Transaction No. of the Payment Company</th>
            <th>Payment Channel</th>
            <th>Creation Time</th>
            <th>Payback Time</th>
            <th>Whether It Has Been Backed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.repaymentNumber }}</td>
            <td>{{ item.loanNumber }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.tradingStatus }}</td>
            <td>{{ item.repaymentCode }}</td>
            <td>{{ item.repaymentAmount }}</td>
            <td>{{ item.realAmount }}</td>
            <td>{{ item.liquidationAmount }}</td>
            <td>{{ item.daysOverdue }}</td>
            <td>{{ item.collector }}</td>
            <td>{{ item.paymentCompanySerialNumber }}</td>
            <td>{{ item.transactionNo }}</td>
            <td>{{ item.paymentChannel }}</td>
            <td>{{ item.creationTime }}</td>
            <td>{{ item.paybackTime }}</td>
            <td>{{ item.hasBeenBacked }}</td>
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
          repaymentNumber: "RN20231024",
          loanNumber: "211024",
          productName: "Personal Loan",
          name: "Isaac Emmanuel",
          mobile: "9098989898",
          tradingStatus: "Cleared",
          repaymentCode: "VA123456",
          repaymentAmount: "5000",
          realAmount: "5000",
          liquidationAmount: "0",
          daysOverdue: "3",
          collector: "John Doe",
          paymentCompanySerialNumber: "PCS123456",
          transactionNo: "TXN789123",
          paymentChannel: "Bank Transfer",
          creationTime: "2023-10-21 to 2023-10-22",
          paybackTime: "2023-10-22 to 2023-10-23",
          hasBeenBacked: "Yes",
        },
        {
          repaymentNumber: "RN20231023",
          loanNumber: "211023",
          productName: "Car Loan",
          name: "Rebecca Tife",
          mobile: "9098981234",
          tradingStatus: "Pending",
          repaymentCode: "VA654321",
          repaymentAmount: "10000",
          realAmount: "0",
          liquidationAmount: "0",
          daysOverdue: "5",
          collector: "Jane Smith",
          paymentCompanySerialNumber: "PCS654321",
          transactionNo: "TXN321789",
          paymentChannel: "Mobile Money",
          creationTime: "2023-10-19 to 2023-10-20",
          paybackTime: "2023-10-20 to 2023-10-21",
          hasBeenBacked: "No",
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
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  
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
