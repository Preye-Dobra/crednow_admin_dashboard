<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Loan Number</th>
            <th>Product Name</th>
            <th>Master Loan</th>
            <th>Mobile</th>
            <th>Name</th>
            <th>Days Overdue</th>
            <th>Repayment Date</th>
            <th>Already Flattened Amount</th>
            <th>Flatting Amount</th>
            <th>Total Remaining Repayment</th>
            <th>Pending Principal</th>
            <th>Reduce Principal</th>
            <th>Pending Interest</th>
            <th>Pending Service Fee</th>
            <th>Pending Default Interest</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td><input type="checkbox" :id="`checkbox-${index}`" /></td>
            <td style="color: #00CCFF;">{{ item.loanNumber }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.masterLoan }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.daysOverdue }}</td>
            <td>{{ item.repaymentDate }}</td>
            <td>{{ item.alreadyFlattenedAmount }}</td>
            <td>{{ item.flattingAmount }}</td>
            <td>{{ item.totalRemainingRepayment }}</td>
            <td>{{ item.pendingPrincipal }}</td>
            <td>{{ item.reducePrincipal }}</td>
            <td>{{ item.pendingInterest }}</td>
            <td>{{ item.pendingServiceFee }}</td>
            <td>{{ item.pendingDefaultInterest }}</td>
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
      :title="modalTitle"
      @close="closeModal"
    >
      <p>Provide necessary details here.</p>
    </component>
  </div>
</template>

<script>
import OperationModal from "../modals/OperationModal.vue";
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
          loanNumber: "211024",
          productName: "Crednow",
          masterLoan: "MasterLoan1",
          mobile: "9098989898",
          name: "Isaac Emmanuel",
          daysOverdue: 5,
          repaymentDate: "2023-11-01",
          alreadyFlattenedAmount: 3000,
          flattingAmount: 2000,
          totalRemainingRepayment: 2000,
          pendingPrincipal: 1500,
          reducePrincipal: 500,
          pendingInterest: 300,
          pendingServiceFee: 200,
          pendingDefaultInterest: 100,
        },
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
  color: #004759;
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
