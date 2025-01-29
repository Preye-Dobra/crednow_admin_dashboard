<template>
  <div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
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
            <td>{{ item.loanNumber }}</td>
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
                <button class="operation-button" @click="openBillingModal(item.loanNumber)">Billing</button>
                <button class="operation-button" @click="openIncreaseModal(item.loanNumber)">Increase</button>
                <button class="operation-button" @click="openReductionModal(item.loanNumber)">Reduction</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Components -->
    <BillingModal
      :visible="showModal.billing"
      :title="`Billing Information for Loan ${selectedLoan}`"
      @close="closeModal('billing')"
    >
      <p>Provide necessary billing details here.</p>
    </BillingModal>

    <IncreaseModal
      :visible="showModal.increase"
      :title="`Increase Amount for Loan ${selectedLoan}`"
      @close="closeModal('increase')"
    >
      <p>Provide necessary increase details here.</p>
    </IncreaseModal>

    <ReductionModal
      :visible="showModal.reduction"
      :title="`Reduction Amount for Loan ${selectedLoan}`"
      @close="closeModal('reduction')"
    >
      <p>Provide necessary reduction details here.</p>
    </ReductionModal>
  </div>
</template>

<script>
import BillingModal from "../modals/billingModal.vue";
import IncreaseModal from "../modals/IncreaseModal.vue";
import ReductionModal from "../modals/ReductionModal.vue";

export default {
  components: {
    BillingModal,
    IncreaseModal,
    ReductionModal,
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
      showModal: {
        billing: false,
        increase: false,
        reduction: false,
      },
      selectedLoan: null,
    };
  },
  methods: {
    openBillingModal(loanNumber) {
      this.selectedLoan = loanNumber;
      this.showModal.billing = true;
    },
    openIncreaseModal(loanNumber) {
      this.selectedLoan = loanNumber;
      this.showModal.increase = true;
    },
    openReductionModal(loanNumber) {
      this.selectedLoan = loanNumber;
      this.showModal.reduction = true;
    },
    closeModal(modalType) {
      this.showModal[modalType] = false;
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


