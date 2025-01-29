<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Loan Number</th>
            <th>Mobile</th>
            <th>Loan Status</th>
            <th>Payout Number</th>
            
            <th>Lending Status</th>
            <th>Reason For Failure</th>
            <th>Loan Application</th>
            <th>Pay Time</th>
            <th>Update Time</th>
            <th>Loan Channel</th>
            <th>Customer Bank Card Number</th>
            <th>Loan Amount</th>
            <th>User Inique Number</th>

            <th>Operation</th>
          </tr>
        </thead>
<tbody>
  <tr v-for="(item, index) in tableData" :key="index">
    <td><input type="checkbox" :id="`checkbox-${index}`" /></td>
    <td style="color: #00CCFF;">{{ item.loanNumber }}</td>
    <td>{{ item.mobile }}</td>
    <td>{{ item.loanStatus }}</td>
    <td>{{ item.payoutNumber }}</td>
    <td>{{ item.lendingStatus }}</td>
    <td>{{ item.reasonForFailure }}</td>
    <td>{{ item.loanApplication }}</td>
    <td>{{ item.payTime }}</td>
    <td>{{ item.updateTime }}</td>
    <td>{{ item.loanChannel }}</td>
    <td>{{ item.customerBankCardNumber }}</td>
    <td>{{ item.loanAmount }}</td>
    <td>{{ item.userUniqueNumber }}</td>
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
        loanNumber: 'LN123456789',
        mobile: '08012345678',
        loanStatus: 'Approved',
        payoutNumber: 'PN987654321',
        lendingStatus: 'Active',
        reasonForFailure: 'N/A',
        loanApplication: 'App001',
        payTime: '2024-01-15 14:00',
        updateTime: '2024-01-20 09:30',
        loanChannel: 'Online',
        customerBankCardNumber: '1234567890123456',
        loanAmount: '₦500,000',
        userUniqueNumber: 'UN12345'
      },
      {
        loanNumber: 'LN987654321',
        mobile: '08087654321',
        loanStatus: 'Pending',
        payoutNumber: 'PN123456789',
        lendingStatus: 'Inactive',
        reasonForFailure: 'Not Verified',
        loanApplication: 'App002',
        payTime: '2024-01-18 10:30',
        updateTime: '2024-01-20 11:00',
        loanChannel: 'App',
        customerBankCardNumber: '6543210987654321',
        loanAmount: '₦300,000',
        userUniqueNumber: 'UN98765'
      },
      {
        loanNumber: 'LN1122334455',
        mobile: '08011223344',
        loanStatus: 'Rejected',
        payoutNumber: 'PN6655443322',
        lendingStatus: 'Inactive',
        reasonForFailure: 'Insufficient Credit',
        loanApplication: 'App003',
        payTime: '2024-01-10 13:20',
        updateTime: '2024-01-12 15:40',
        loanChannel: 'Website',
        customerBankCardNumber: '1111222233334444',
        loanAmount: '₦150,000',
        userUniqueNumber: 'UN11223'
      },
      {
        loanNumber: 'LN2233445566',
        mobile: '08099887766',
        loanStatus: 'Approved',
        payoutNumber: 'PN8899776655',
        lendingStatus: 'Active',
        reasonForFailure: 'N/A',
        loanApplication: 'App004',
        payTime: '2024-01-12 09:50',
        updateTime: '2024-01-15 16:10',
        loanChannel: 'Partner',
        customerBankCardNumber: '5555444433332222',
        loanAmount: '₦1,000,000',
        userUniqueNumber: 'UN22334'
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
