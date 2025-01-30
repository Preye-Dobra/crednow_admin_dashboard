<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Order Number</th>
            <th>Payment Company</th>
            <th>Payment Amount</th>
            <th>Handling Fee</th>
            
            <th>Taxes</th>
            <th>Real Amount</th>
            <th>The Transaction</th>
            <th>Bank Account</th>
            <th>Mobile</th>
            <th>Use Name</th>
            <th>Lending Status</th>
            <th>Reason Failure</th>
            <th>Payment Time</th>
            <th>Loan Channel</th>
            <th>Operation</th>
          </tr>
        </thead>
<tbody>
  <tr v-for="(item, index) in tableData" :key="index">
    <td><input type="checkbox" :id="`checkbox-${index}`" /></td>
    <td style="color: #00CCFF;">{{ item.loanNumber }}</td>
    <td>{{ item.paymentCompany }}</td>
    <td>{{ item.paymentAmount }}</td>
    <td>{{ item.handlingFee }}</td>
    <td>{{ item.taxes }}</td>
    <td>{{ item.realAmount }}</td>
    <td>{{ item.transaction }}</td>
    <td>{{ item.bankAccount }}</td>
    <td>{{ item.mobile }}</td>
    <td>{{ item.userName }}</td>
    <td>{{ item.lendingStatus }}</td>
    <td>{{ item.reasonForFailure }}</td>
    <td>{{ item.paymentTime }}</td>
    <td>{{ item.loanChannel }}</td>
    <td>
      <div class="button-container">
        <button class="operation-button" @click="openModal('operation', item.loanNumber)" style="width: 98px;">Operation</button>
        <button class="operation-button" @click="openModal('edit', item.loanNumber)" style="width: 98px;">Edit</button>
        <button class="operation-button" @click="openModal('refresh', item.loanNumber)" style="width: 98px;">Refresh</button>
        <button class="operation-button" @click="openModal('modifyAccount', item.loanNumber)">Modify Account</button>
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
import OperationModal from "../modals/ModifyAccountModal.vue";
import EditModal from "../modals/EditModal.vue";
import RefreshModal from "../modals/RefreshModal.vue";
import ModifyAccountModal from "../modals/ModifyAccountModal.vue";

export default {
  components: {
    OperationModal,
    EditModal,
    RefreshModal,
    ModifyAccountModal,
  },
  data() {
    return {
tableData: [
  {
    loanNumber: "123456",             
    paymentCompany: "XYZ Payments",
    paymentAmount: "$500",             
    handlingFee: "$5",
    taxes: "$2",                       
    realAmount: "$493",
    transaction: "Success",
    bankAccount: "1234 **** **** 5678",
    mobile: "9876543210",              
    userName: "John Doe",              
    lendingStatus: "Approved",
    reasonForFailure: "N/A", 
    paymentTime: "2024-01-29 14:30",   
    loanChannel: "Bank ABC",          
  }
]
,
      showModal: false,
      selectedModal: null,
      modalTitle: "",
      selectedLoan: null,
    };
  },
  methods: {
    openModal(type, loanNumber) {
      const modalMapping = {
        operation: OperationModal,
        edit: EditModal,
        refresh: RefreshModal,
        modifyAccount: ModifyAccountModal,
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
  margin-top: 12px;
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
</style>