<template>
  <div class="main-content">
    <Header title="Collection Cases" />
    <!-- Tabs for Collection Case and Overdue Case -->
    <div class="tabs">
      <button
        :class="['tab', { active: activeTab === 'collection' }]"
        @click="activeTab = 'collection'"
      >
        Collection Case
      </button>
      <button
        :class="['tab', { active: activeTab === 'overdue' }]"
        @click="activeTab = 'overdue'"
      >
        Overdue Case
      </button>
    </div>
    <div class="line"></div>

    <!-- Collection Case Form -->
    <div v-if="activeTab === 'collection'" class="form-section">
      <form @submit.prevent="handleQuery">
        <div class="form-grid">
          <!-- Mobile -->
          <div class="form-group">
            <label for="mobile">Mobile</label>
            <input type="text" id="mobile" v-model="collectionForm.mobile" placeholder="Please enter" />
          </div>

          <!-- Name -->
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="collectionForm.name" placeholder="Please enter" />
          </div>

          <!-- Loan Number -->
          <div class="form-group">
            <label for="loanNumber">Loan Number</label>
            <input type="text" id="loanNumber" v-model="collectionForm.loanNumber" placeholder="Please enter" />
          </div>

          <!-- Loan Order Number -->
          <div class="form-group">
            <label for="loanOrderNumber">Loan Order Number</label>
            <input type="text" id="loanOrderNumber" v-model="collectionForm.loanOrderNumber" placeholder="Please enter" />
          </div>

          <!-- Product Name -->
          <div class="form-group">
            <label for="productName">Product Name</label>
            <input type="text" id="productName" v-model="collectionForm.productName" placeholder="Please enter" />
          </div>

          <!-- Loan Tenure -->
          <div class="form-group">
            <label for="loanTenure">Loan Tenure</label>
            <input type="text" id="loanTenure" v-model="collectionForm.loanTenure" placeholder="Please enter" />
          </div>

          <!-- Loan Amount -->
          <div class="form-group">
            <label for="loanAmount">Loan Amount</label>
            <input type="text" id="loanAmount" v-model="collectionForm.loanAmount" placeholder="Please enter" />
          </div>

          <!-- App Version -->
          <div class="form-group">
            <label for="appVersion">App Version</label>
            <input type="text" id="appVersion" v-model="collectionForm.appVersion" placeholder="Please enter" />
          </div>

          <!-- Due Date -->
          <div class="form-group">
            <label for="dueDate">Due Date</label>
            <input type="date" id="dueDate" v-model="collectionForm.dueDate" />
          </div>

          <!-- Loan Status -->
          <div class="form-group">
            <label for="loanStatus">Loan Status</label>
            <input type="text" id="loanStatus" v-model="collectionForm.loanStatus" placeholder="Please enter" />
          </div>

          <!-- Tag -->
          <div class="form-group">
            <label for="tag">Tag</label>
            <input type="text" id="tag" v-model="collectionForm.tag" placeholder="Please enter" />
          </div>

          <!-- Is Repeated Borrowing -->
          <div class="form-group">
            <label for="isRepeatedBorrowing">Is Repeated Borrowing</label>
            <select id="isRepeatedBorrowing" v-model="collectionForm.isRepeatedBorrowing">
              <option disabled value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <!-- Loan Type -->
          <div class="form-group">
            <label for="loanType">Loan Type</label>
            <input type="text" id="loanType" v-model="collectionForm.loanType" placeholder="Please enter" />
          </div>

          <!-- Collection Result -->
          <div class="form-group">
            <label for="collectionResult">Collection Result</label>
            <input type="text" id="collectionResult" v-model="collectionForm.collectionResult" placeholder="Please enter" />
          </div>

          <!-- Proportion Without Penalty -->
          <div class="form-group">
            <label for="proportionWithoutPenalty">Proportion Without Penalty</label>
            <input type="text" id="proportionWithoutPenalty" v-model="collectionForm.proportionWithoutPenalty" placeholder="Please enter" />
          </div>

          <!-- Follow-up On Day -->
          <div class="form-group">
            <label for="followUpOnDay">Follow-up On Day</label>
            <input type="date" id="followUpOnDay" v-model="collectionForm.followUpOnDay" />
          </div>

          <!-- App Name -->
          <div class="form-group">
            <label for="appName">App Name</label>
            <input type="text" id="appName" v-model="collectionForm.appName" placeholder="Please enter" />
          </div>

          <!-- Collection Stage -->
          <div class="form-group">
            <label for="collectionStage">Collection Stage</label>
            <select id="collectionStage" v-model="collectionForm.collectionStage">
              <option disabled value="">Select Option</option>
              <option v-for="option in stages" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Collector -->
          <div class="form-group">
            <label for="collector">Collector</label>
            <select id="collector" v-model="collectionForm.collector">
              <option disabled value="">Select Option</option>
              <option v-for="option in collectors" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button type="submit" class="btn btn-query">Query</button>
          <button type="button" class="btn btn-reset" @click="handleReset('collection')">Reset</button>
        </div>
      </form>
      <RepayCase />
    </div>

    <!-- Overdue Case Form -->
    <div v-if="activeTab === 'overdue'" class="form-section">
      <form @submit.prevent="handleQuery">
        <div class="form-grid">
          <!-- Mobile -->
          <div class="form-group">
            <label for="mobile">Mobile</label>
            <input type="text" id="mobile" v-model="overdueForm.mobile" placeholder="Please enter" />
          </div>

          <!-- Name -->
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="overdueForm.name" placeholder="Please enter" />
          </div>

          <!-- Loan Number -->
          <div class="form-group">
            <label for="loanNumber">Loan Number</label>
            <input type="text" id="loanNumber" v-model="overdueForm.loanNumber" placeholder="Please enter" />
          </div>

          <!-- Loan Order Number -->
          <div class="form-group">
            <label for="loanOrderNumber">Loan Order Number</label>
            <input type="text" id="loanOrderNumber" v-model="overdueForm.loanOrderNumber" placeholder="Please enter" />
          </div>

          <!-- Collection Stage -->
          <div class="form-group">
            <label for="collectionStage">Collection Stage</label>
            <select id="collectionStage" v-model="overdueForm.collectionStage">
              <option disabled value="">Select Option</option>
              <option v-for="option in stages" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>

          <!-- Collector -->
          <div class="form-group">
            <label for="collector">Collector</label>
            <select id="collector" v-model="overdueForm.collector">
              <option disabled value="">Select Option</option>
              <option v-for="option in collectors" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>

          <!-- Product Name -->
          <div class="form-group">
            <label for="productName">Product Name</label>
            <select id="productName" v-model="overdueForm.productName">
              <option disabled value="">Select Option</option>
              <option v-for="option in products" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>

          <!-- Loan Tenure -->
          <div class="form-group">
            <label for="loanTenure">Loan Tenure</label>
            <input type="text" id="loanTenure" v-model="overdueForm.loanTenure" placeholder="Please enter" />
          </div>

          <!-- Loan Amount -->
          <div class="form-group">
            <label for="loanAmount">Loan Amount</label>
            <input type="text" id="loanAmount" v-model="overdueForm.loanAmount" placeholder="Please enter" />
          </div>

          <!-- App Version -->
          <div class="form-group">
            <label for="appVersion">App Version</label>
            <input type="text" id="appVersion" v-model="overdueForm.appVersion" placeholder="Please enter" />
          </div>

          <!-- Due Date -->
          <div class="form-group">
            <label for="dueDate">Due Date</label>
            <input type="date" id="dueDate" v-model="overdueForm.dueDate" />
          </div>

          <!-- Loan Status -->
          <div class="form-group">
            <label for="loanStatus">Loan Status</label>
            <select id="loanStatus" v-model="overdueForm.loanStatus">
              <option disabled value="">Select Option</option>
              <option v-for="option in statuses" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>

          <!-- Tag -->
          <div class="form-group">
            <label for="tag">Tag</label>
            <input type="text" id="tag" v-model="overdueForm.tag" placeholder="Please enter" />
          </div>

          <!-- Is It Repeated Borrowing -->
          <div class="form-group">
            <label for="isRepeated">Is It Repeated Borrowing</label>
            <select id="isRepeated" v-model="overdueForm.isRepeated">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <!-- Loan Type -->
          <div class="form-group">
            <label for="loanType">Loan Type</label>
            <input type="text" id="loanType" v-model="overdueForm.loanType" placeholder="Please enter" />
          </div>

          <!-- Collection Result -->
          <div class="form-group">
            <label for="collectionResult">Collection Result</label>
            <input type="text" id="collectionResult" v-model="overdueForm.collectionResult" placeholder="Please enter" />
          </div>

          <!-- App Name -->
          <div class="form-group">
            <label for="appName">App Name</label>
            <input type="text" id="appName" v-model="overdueForm.appName" placeholder="Please enter" />
          </div>

          <!-- The proportion of the amount to be repaid without penalty interest is less than -->
          <div class="form-group">
            <label for="repaymentProportion">The proportion of the amount to be repaid without penalty interest is less than</label>
            <input type="text" id="repaymentProportion" v-model="overdueForm.repaymentProportion" placeholder="Please enter" />
          </div>

          <!-- Did You Follow Up On The Day -->
          <div class="form-group">
            <label for="remarks">Remarks</label>
            <input type="text" id="remarks" v-model="overdueForm.remarks" placeholder="Please enter" />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button type="submit" class="btn btn-query">Query</button>
          <button type="button" class="btn btn-reset" @click="handleReset('overdue')">Reset</button>
        </div>
      </form>
      <OverdueCase />
    </div>
  </div>
</template>

<script>
import Header from "../modals/header.vue";
import OverdueCase from "../modals/OverdueCase.vue";
import RepayCase from "../modals/RepayCase.vue";

export default {
  name: "MainContent",
  components: {
    Header,
    OverdueCase,
    RepayCase,
  },
  data() {
    return {
      activeTab: "collection", // Default active tab
      collectionForm: {
        mobile: "",
        name: "",
        loanNumber: "",
        loanOrderNumber: "",
        collectionStage: "",
        collector: "",
        productName: "",
        loanTenure: "",
        loanAmount: "",
        appVersion: "",
        dueDate: "",
        loanStatus: "",
        tag: "",
        isRepeatedBorrowing: "",
        loanType: "",
        collectionResult: "",
        proportionWithoutPenalty: "",
        followUpOnDay: "",
        appName: "",
      },
      overdueForm: {
        mobile: "",
        name: "",
        loanNumber: "",
        loanOrderNumber: "",
        collectionStage: "",
        collector: "",
        productName: "",
        loanTenure: "",
        loanAmount: "",
        appVersion: "",
        dueDate: "",
        loanStatus: "",
        tag: "",
        isRepeated: "",
        loanType: "",
        collectionResult: "",
        repaymentProportion: "",
        remarks: "",
        appName: "",
      },
      logTypes: ["Type 1", "Type 2", "Type 3"],
      stages: ["Stage 1", "Stage 2", "Stage 3"],
      collectors: ["Collector 1", "Collector 2", "Collector 3"],
      products: ["Product 1", "Product 2", "Product 3"],
      statuses: ["Active", "Closed", "Overdue"],
    };
  },
  methods: {
    handleQuery() {
      if (this.activeTab === "collection") {
        console.log("Querying Collection Case with data:", this.collectionForm);
      } else {
        console.log("Querying Overdue Case with data:", this.overdueForm);
      }
    },
    handleReset(formType) {
      if (formType === "collection") {
        this.collectionForm = Object.keys(this.collectionForm).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});
      } else {
        this.overdueForm = Object.keys(this.overdueForm).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});
      }
    },
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border: solid #00CCFF;
  border-radius: 8px;
}

.tab.active {
  background-color: #00CCFF;
  border-bottom: 0 0 0 1px;
  color: white;
}

.form-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #004759;
}

.form-group input,
.form-group select {
  width: 100%;
  height: 40px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 0px 12px;
  height: 37px;
  width: 82px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 10px;
  border: #00CCFF;
}

.btn-query {
  background-color: #00CCFF;
  color: white;
}

.btn-reset {
  background-color: #ffff;
  color: #00CCFF;
  border: 1px solid #ddd;
}

.line {
  width: 100%;
  height: 1.2px;
  background: linear-gradient(to right, #00CCFF 3.7%, black 6%);
  margin-bottom: 20px;
}
</style>