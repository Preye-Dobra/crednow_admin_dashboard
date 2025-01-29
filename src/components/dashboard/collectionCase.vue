<template>
  <div class="main-content">
    <Header />
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
            <input
              type="text"
              id="mobile"
              v-model="collectionForm.mobile"
              placeholder="Please enter"
            />
          </div>
          <!-- Name -->
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="collectionForm.name"
              placeholder="Please enter"
            />
          </div>
          <!-- Loan Number -->
          <div class="form-group">
            <label for="loanNumber">Loan Number</label>
            <input
              type="text"
              id="loanNumber"
              v-model="collectionForm.loanNumber"
              placeholder="Please enter"
            />
          </div>
          <!-- Lending Time -->
          <div class="form-group">
            <label for="lendingTime">Lending Time</label>
            <input
              type="text"
              id="lendingTime"
              v-model="collectionForm.lendingTime"
              placeholder="Start-end"
            />
          </div>
          <!-- Days Overdue -->
          <div class="form-group">
            <label for="daysOverdue">Days Overdue</label>
            <input
              type="text"
              id="daysOverdue"
              v-model="collectionForm.daysOverdue"
              placeholder="Please enter"
            />
          </div>
          <!-- Collection Log Type -->
          <div class="form-group">
            <label for="collectionLogType">Collection Log Type</label>
            <select id="collectionLogType" v-model="collectionForm.collectionLogType">
              <option disabled value="">Select Option</option>
              <option v-for="option in logTypes" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
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
          <!-- Action Buttons -->
          <div class="form-group action-buttons">
            <button type="submit" class="btn btn-query">Query</button>
            <button type="button" class="btn btn-reset" @click="handleReset('collection')">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Overdue Case Form -->
    <div v-if="activeTab === 'overdue'" class="form-section">
     
      <form @submit.prevent="handleQuery">
        <div class="form-grid">
          <!-- Mobile -->
          <div class="form-group">
            <label for="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              v-model="overdueForm.mobile"
              placeholder="Please enter"
            />
          </div>
          <!-- Name -->
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="overdueForm.name"
              placeholder="Please enter"
            />
          </div>
          <!-- Loan Number -->
          <div class="form-group">
            <label for="loanNumber">Loan Number</label>
            <input
              type="text"
              id="loanNumber"
              v-model="overdueForm.loanNumber"
              placeholder="Please enter"
            />
          </div>
          <!-- Loan Order Number -->
          <div class="form-group">
            <label for="loanOrderNumber">Loan Order Number</label>
            <input
              type="text"
              id="loanOrderNumber"
              v-model="overdueForm.loanOrderNumber"
              placeholder="Please enter"
            />
          </div>
          <!-- Collection Stage -->
          <div class="form-group">
            <label for="collectionStage">Collection Stage</label>
            <select id="collectionStage" v-model="overdueForm.collectionStage">
              <option disabled value="">Select Option</option>
              <option v-for="option in stages" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <!-- Collector -->
          <div class="form-group">
            <label for="collector">Collector</label>
            <select id="collector" v-model="overdueForm.collector">
              <option disabled value="">Select Option</option>
              <option v-for="option in collectors" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <!-- Product Name -->
          <div class="form-group">
            <label for="productName">Product Name</label>
            <select id="productName" v-model="overdueForm.productName">
              <option disabled value="">Select Option</option>
              <option v-for="option in products" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <!-- Loan Tenure -->
          <div class="form-group">
            <label for="loanTenure">Loan Tenure</label>
            <input
              type="text"
              id="loanTenure"
              v-model="overdueForm.loanTenure"
              placeholder="Please enter"
            />
          </div>
          <!-- Action Buttons -->
          <div class="form-group action-buttons">
            <button type="submit" class="btn btn-query">Query</button>
            <button type="button" class="btn btn-reset" @click="handleReset('overdue')">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "../modals/header.vue";
export default {
  name: "MainContent",
   components: {
    Header
    // query,
    // queryTable

  },
  data() {
    return {
      activeTab: "collection", // Default active tab
      collectionForm: {
        mobile: "",
        name: "",
        loanNumber: "",
        lendingTime: "",
        daysOverdue: "",
        collectionLogType: "",
        collectionStage: "",
        collector: "",
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
      },
      logTypes: ["Type 1", "Type 2", "Type 3"],
      stages: ["Stage 1", "Stage 2", "Stage 3"],
      collectors: ["Collector 1", "Collector 2", "Collector 3"],
      products: ["Product 1", "Product 2", "Product 3"],
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
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.tab.active {
  background-color: #00CCFF;
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
  justify-content: end;
  align-items: center;
  margin-top: 22px;
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