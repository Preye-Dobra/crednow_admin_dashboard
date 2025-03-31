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
            <th>Payment Reference</th>
            <th>Payment Method</th>
            <th>Transaction Reference</th>
            <th>Payment Amount</th>
            <th>Days Overdue</th>
            <th>Payment Channel</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>Payment Status</th>
            <th>Date of Payment</th>
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
            <td>{{ getRepaymentValue(loan, 'paymentReference', loan.reference) }}</td>
            <td>{{ getRepaymentValue(loan, 'paymentMethod', '-') }}</td>
            <td>{{ getRepaymentValue(loan, 'transactionReference', loan.transactionReference) }}</td>
            <td>{{ formatCurrency(getRepaymentValue(loan, 'amount', loan.paidAmount)) }}</td>
            <td>{{ loan.daysOverDue }}</td>
            <td>{{ getRepaymentValue(loan, 'repaymentChannel', loan.paymentChannel) }}</td>
            <td>{{ loan.bank ? loan.bank.bankName : '-' }}</td>
            <td>{{ loan.bank ? loan.bank.accountNumber : '-' }}</td>
            <td>{{ getRepaymentValue(loan, 'paymentStatus', '-') }}</td>
            <td v-html="formatDateTime(getRepaymentValue(loan, 'dateOfPayment', null))"></td>
            <td v-html="formatDateTime(loan.repaymentDeadline)"></td>
            <td>{{ formatCurrency(getRepaymentValue(loan, 'loanBalance', loan.loanBalance)) }}</td>
          </tr>
          <tr v-if="!tableData || tableData.length === 0">
            <td colspan="18" class="no-data">No repayment data found</td>
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
    // Helper method to get value from repayment or fallback
    getRepaymentValue(loan, field, fallback) {
      if (loan.loanRepayments && loan.loanRepayments.length > 0) {
        // Get the most recent repayment (assuming they're sorted with most recent first)
        return loan.loanRepayments[0][field] !== undefined ? loan.loanRepayments[0][field] : fallback;
      }
      return fallback; // Fallback value
    },
    
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
      
      try {
        // Handle different date formats
        let date;
        if (typeof datetime === 'string' && datetime.includes('T')) {
          // ISO format: 2025-03-18T15:26:40.643Z
          date = new Date(datetime);
        } else if (typeof datetime === 'string' && datetime.includes(' ')) {
          // Custom format: 2025-03-18 15:47:57.0
          const [datePart, timePart] = datetime.split(' ');
          const [year, month, day] = datePart.split('-');
          const [hour, minute, secondPart] = timePart.split(':');
          const second = secondPart ? parseInt(secondPart.split('.')[0]) : 0;
          date = new Date(year, month-1, day, hour, minute, second);
        } else {
          date = new Date(datetime);
        }
        
        if (isNaN(date.getTime())) {
          return '-';
        }
        
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} <span style="color: #00CCFF;">${formattedTime}</span>`;
      } catch (e) {
        console.error('Date formatting error:', e);
        return '-';
      }
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
  margin-top: 8px;
  border-radius: 5px;
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
  position: sticky;
  top: 0;
  background-color: #F2F7F8;
  z-index: 1;
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

/* Sticky the Loan ID column */
.data-table th:first-child,
.data-table td:first-child {
  position: sticky;
  left: 0;
  background-color: #fff; /* Ensure the background color matches the rest */
  z-index: 1; /* Keep it on top of other elements */
}

.data-table th:first-child {
  background-color: #F2F7F8; /* Ensure the background color matches the rest */
  z-index: 2; /* Higher z-index for header to appear above sticky cells */
}

.data-table tbody tr:hover {
  background-color: #f8f8f8; /* Subtle hover effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow under the hovered row */
  cursor: pointer; /* Change cursor to pointer on hover */
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #777;
  font-style: italic;
}

/* Status styling classes */
.status-success {
  color: #00CCFF;
  font-weight: 500;
}

.status-pending {
  color: #FFA500;
  font-weight: 500;
}

.status-failed, .status-overdue {
  color: #FF4444;
  font-weight: 500;
}
</style>