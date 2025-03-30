<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead style="background-color: #D9F7FF;">
          <tr>
            <th ><input type="checkbox" :id="`checkbox-${index}`" /></th>
            <th >Loan Number</th>
            <th >Order Number</th>
            <th >Payment Serial Number</th>
            <th >Payment Company’s order status</th>
            <th >Payment Amount</th>
            <th >Handling Fee</th>
            <th >Taxes</th>
            <th >Real Amount</th>
            <th >The Transaction Amount</th>
            <th >Bank Account</th>
            <th >Mobile</th>
            <th >User Name</th>
            <th >Lending Status</th>
            <th >Reason for failure</th>
            <th >Payment time</th>
            <th >Loan Channel</th>
            <th >Creation time</th>
            <th >Update time</th>
            <th >Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td><input type="checkbox" :id="`checkbox-${index}`" /></td>
            <td style="color: #00CCFF;">{{ item.loanNumber }}</td>
            <td>{{ item.orderNumber }}</td>
            <td>{{ item.paymentSerialNumber }}</td>
            <td>{{ item.paymentCompanyOrderStatus }}</td>
            <td>{{ item.paymentAmount }}</td>
            <td>{{ item.handlingFee }}</td>
            <td>{{ item.taxes }}</td>
            <td>{{ item.realAmount }}</td>
            <td>{{ item.transactionAmount }}</td>
            <td>{{ item.bankAccount }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.userName }}</td>
            <td>{{ item.lendingStatus }}</td>
            <td>{{ item.reasonForFailure }}</td>
            <td>
              <span>{{ getDate(item.paymentTime) }}</span>
              <span style="color: #00CCFF;">{{ getTime(item.paymentTime) }}</span>
            </td>
            <td>{{ item.loanChannel }}</td>
            <td>
              <span>{{ getDate(item.creationTime) }}</span>
              <span style="color: #00CCFF;">{{ getTime(item.creationTime) }}</span>
            </td>
            <td>
              <span>{{ getDate(item.updateTime) }}</span>
              <span style="color: #00CCFF;">{{ getTime(item.updateTime) }}</span>
            </td>
            <td>
              <div class="button-container">
                <button class="operation-button" @click="openModal('success', item.loanNumber)" style="width: 86px; color: #004759; background-color:  #B8FFC1; border-color: #B8FFC1;">Success</button>
                <button class="operation-button" @click="openModal('failure', item.loanNumber)" style="width: 86px;color:#AB2828; background-color:  #EEC8C8; border-color:#EEC8C8;">Failure</button>
                 <button class="operation-button" @click="openModal('refresh', item.loanNumber)" style="width: 86px;color:#00CCFF; background-color:#D9F7FF; border-color:#D9F7FF;">Refresh</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dynamic Modal Components -->
    <component
      v-if="selectedModal"
      :is="selectedModal"
      :visible="showModal"
      @close="closeModal"
    >
      <p>Provide necessary details here.</p>
    </component>
  </div>
</template>

<script>
import SuccessModal from "../modals/SuccessModal.vue"; // Only import SuccessModal and FailureModal
import FailureModal from "../modals/FailModal.vue"; // Only import SuccessModal and FailureModal

export default {
  components: {
    SuccessModal,  // Only include SuccessModal
    FailureModal,  // Only include FailureModal
  },
  data() {
    return {
      tableData: [
        {
          loanNumber: "LN1234567",
          orderNumber: "ORD987654",
          paymentSerialNumber: "PSN567890",
          paymentCompanyOrderStatus: "Completed",
          paymentAmount: "$1,500.00",
          handlingFee: "$15.00",
          taxes: "$50.00",
          realAmount: "$1,435.00",
          transactionAmount: "$1,500.00",
          bankAccount: "1234567890123456",
          mobile: "+1234567890",
          userName: "John Doe",
          lendingStatus: "Approved",
          reasonForFailure: "N/A",
          paymentTime: "2025-01-15 12:30:45",
          loanChannel: "Bank Transfer",
          creationTime: "2025-01-10 09:00:00",
          updateTime: "2025-01-15 12:30:45"
        },
        {
          loanNumber: "LN1234568",
          orderNumber: "ORD987655",
          paymentSerialNumber: "PSN567891",
          paymentCompanyOrderStatus: "Pending",
          paymentAmount: "$2,000.00",
          handlingFee: "$20.00",
          taxes: "$60.00",
          realAmount: "$1,920.00",
          transactionAmount: "$2,000.00",
          bankAccount: "2345678901234567",
          mobile: "+1234567891",
          userName: "Jane Smith",
          lendingStatus: "Pending",
          reasonForFailure: "N/A",
          paymentTime: "2025-01-16 14:00:00",
          loanChannel: "Credit Card",
          creationTime: "2025-01-12 10:30:00",
          updateTime: "2025-01-16 14:00:00"
        },
                {
          loanNumber: "LN1234568",
          orderNumber: "ORD987655",
          paymentSerialNumber: "PSN567891",
          paymentCompanyOrderStatus: "Pending",
          paymentAmount: "$2,000.00",
          handlingFee: "$20.00",
          taxes: "$60.00",
          realAmount: "$1,920.00",
          transactionAmount: "$2,000.00",
          bankAccount: "2345678901234567",
          mobile: "+1234567891",
          userName: "Jane Smith",
          lendingStatus: "Pending",
          reasonForFailure: "N/A",
          paymentTime: "2025-01-16 14:00:00",
          loanChannel: "Credit Card",
          creationTime: "2025-01-12 10:30:00",
          updateTime: "2025-01-16 14:00:00"
        },
                {
          loanNumber: "LN1234568",
          orderNumber: "ORD987655",
          paymentSerialNumber: "PSN567891",
          paymentCompanyOrderStatus: "Pending",
          paymentAmount: "$2,000.00",
          handlingFee: "$20.00",
          taxes: "$60.00",
          realAmount: "$1,920.00",
          transactionAmount: "$2,000.00",
          bankAccount: "2345678901234567",
          mobile: "+1234567891",
          userName: "Jane Smith",
          lendingStatus: "Pending",
          reasonForFailure: "N/A",
          paymentTime: "2025-01-16 14:00:00",
          loanChannel: "Credit Card",
          creationTime: "2025-01-12 10:30:00",
          updateTime: "2025-01-16 14:00:00"
        },        {
          loanNumber: "LN1234568",
          orderNumber: "ORD987655",
          paymentSerialNumber: "PSN567891",
          paymentCompanyOrderStatus: "Pending",
          paymentAmount: "$2,000.00",
          handlingFee: "$20.00",
          taxes: "$60.00",
          realAmount: "$1,920.00",
          transactionAmount: "$2,000.00",
          bankAccount: "2345678901234567",
          mobile: "+1234567891",
          userName: "Jane Smith",
          lendingStatus: "Pending",
          reasonForFailure: "N/A",
          paymentTime: "2025-01-16 14:00:00",
          loanChannel: "Credit Card",
          creationTime: "2025-01-12 10:30:00",
          updateTime: "2025-01-16 14:00:00"
        },        {
          loanNumber: "LN1234568",
          orderNumber: "ORD987655",
          paymentSerialNumber: "PSN567891",
          paymentCompanyOrderStatus: "Pending",
          paymentAmount: "$2,000.00",
          handlingFee: "$20.00",
          taxes: "$60.00",
          realAmount: "$1,920.00",
          transactionAmount: "$2,000.00",
          bankAccount: "2345678901234567",
          mobile: "+1234567891",
          userName: "Jane Smith",
          lendingStatus: "Pending",
          reasonForFailure: "N/A",
          paymentTime: "2025-01-16 14:00:00",
          loanChannel: "Credit Card",
          creationTime: "2025-01-12 10:30:00",
          updateTime: "2025-01-16 14:00:00"
        }
        
      ],
      showModal: false,
      selectedModal: null,
      modalTitle: "",
      selectedLoan: null,
    };
  },
  methods: {
    openModal(type, loanNumber) {
      const modalMapping = {
        success: SuccessModal,
        failure: FailureModal,
      };

      this.selectedLoan = loanNumber;
      this.selectedModal = modalMapping[type];
      this.modalTitle = `${type.charAt(0).toUpperCase() + type.slice(1)} for Loan ${loanNumber}`;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedModal = null;
    },
    // Helper functions to extract date and time
    getDate(dateTime) {
      return dateTime.split(" ")[0]; // Extract the date portion
    },
    getTime(dateTime) {
      return dateTime.split(" ")[1]; // Extract the time portion
    },
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.table-container {
  overflow-x: auto;
  width: 99.5%;
  
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 12px;
  font-family: 'Fira Sans', sans-serif;
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
  background-color: #F2F7F8;
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
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.operation-button {
  color: #00CCFF;
  background-color: #fff;
  border: 1px solid #00CCFF;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.operation-button:hover {
  background-color: #00CCFF;
  color: #fff;
}

/* Sticky the Operation column */
.data-table th:last-child,
.data-table td:last-child {
  position: sticky;
  right: 0;
  background-color: #fff; /* Ensure the background color matches the rest */
  z-index: 1; /* Keep it on top of other elements */
}

.data-table tbody tr:hover {
  background-color: #ffff; /* Change background color on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow under the hovered row */
  cursor: pointer; /* Change cursor to pointer on hover */
}
</style>