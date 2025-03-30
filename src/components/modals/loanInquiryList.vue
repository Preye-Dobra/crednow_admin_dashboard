<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Loan Number</th>
            <th>Product Name</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Loan Status</th>
            <th>Loan Type</th>
            <th>Loan Terms</th>
            <th>Transaction Reference</th>
            <th>Loan Amount</th>
            <th>Days Overdue</th>
            <th>Payment Channel</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>Lending Status</th>
            <th>Creation Time</th>
            <th>Repayment Deadline</th>
            <th>Loan Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(loan, loanIndex) in tableData" :key="loanIndex">
            <td>{{ truncateId(loan.loanId) }}</td>
            <td style="color: #00CCFF;">{{ loan.loanNumber }}</td>
            <td>{{ loan.productName }}</td>
            <td>{{ loan.user ? `${loan.user.firstName} ${loan.user.lastName}` : '-' }}</td>
            <td>{{ loan.phoneNumber }}</td>
            <td>{{ loan.loanStatus }}</td>
            <td>{{ loan.loanType }}</td>
            <td>{{ loan.loanTerms }}</td>
            <td>{{ loan.transactionReference }}</td>
            <td>{{ formatCurrency(loan.loanAmount) }}</td>
            <td>{{ loan.daysOverDue }}</td>
            <td>{{ loan.paymentChannel }}</td>
            <td>{{ loan.bank ? loan.bank.bankName : '-' }}</td>
            <td>{{ loan.bank ? loan.bank.accountNumber : '-' }}</td>
            <td>{{ loan.lendingStatus }}</td>
            <td v-html="formatDateTime(loan.createdAt)"></td>
            <td v-html="formatDateTime(loan.repaymentDeadline)"></td>
            <td>{{ formatCurrency(loan.loanBalance) }}</td>
          </tr>
          <tr v-if="!tableData || tableData.length === 0">
            <td colspan="18" class="no-data">No loan data found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    queryResponse: {
      type: Object,
      default: () => ({
        success: false,
        message: "",
        totalLoans: 0,
        data: []
      })
    }
  },
  computed: {
    tableData() {
      return this.queryResponse && this.queryResponse.data ? this.queryResponse.data : [];
    }
  },
  methods: {
    truncateId(id) {
      if (!id) return '';
      return id.length > 8 ? `${id.substring(0, 8)}...` : id;
    },
    
    formatCurrency(amount) {
      if (!amount) return '₦0';
      const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(numAmount);
    },
    
    formatDateTime(datetime) {
      if (!datetime) return '-';
      
      // Handle different date formats
      let date;
      if (datetime.includes('T')) {
        // ISO format: 2025-03-18T15:26:40.643Z
        date = new Date(datetime);
      } else {
        // Custom format: 2025-03-18 15:47:57.0
        const [datePart, timePart] = datetime.split(' ');
        const [year, month, day] = datePart.split('-');
        const [hour, minute, second] = timePart.split(':');
        date = new Date(year, month-1, day, hour, minute, parseInt(second));
      }
      
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${formattedDate} <span style="color: #00CCFF;">${formattedTime}</span>`;
    }
  }
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
}

/* Sticky the Loan Number column */
.data-table th:first-child,
.data-table td:first-child {
  position: sticky;
  left: 0;
  background-color: #fff; /* Ensure the background color matches the rest */
  z-index: 1; /* Keep it on top of other elements */
}
.data-table th:first-child {
  
  background-color: #F2F7F8; /* Ensure the background color matches the rest */
  
}
/* Styling for header row to make sure sticky column header stays visible */
.data-table th {
  background-color: #F2F7F8;
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
  color:  #00CCFF;
}
.data-table tbody tr:hover {
  background-color: #ffff; /* Change background color on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow under the hovered row */
  cursor: pointer; /* Change cursor to pointer on hover */
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
  background-color:  #00CCFF;
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

/* Make only the time part blue */
.blue-time {
  color:  #00CCFF; /* Apply light blue color to the time */
}
</style>
