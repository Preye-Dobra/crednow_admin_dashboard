<template>
  <div class="main-content">
    <!-- Header Section -->
    <div class="header-container">
      <h1 class="header-title">All Applications</h1>
      <div class="header-details">
        <ul class="header-list">
          <li class="header-item header-date">LT: 2025/01/01 09:44:02</li>
          <li class="header-item header-circle">LT</li>
          <li class="header-item header-name">Lincon Tife</li>
          <li class="header-item header-dropdown"><img src="/public/dropdown.png" alt=""></li>
        </ul>
      </div>
    </div>

    <!-- Form Section -->
    <div class="form-section">
      <form @submit.prevent="handleQuery">
        <div class="form-grid">
          <!-- Input Fields -->
          <div v-for="(field, index) in fields" :key="index" class="form-group">
            <label :for="field.name">{{ field.label }}</label>
            <component
              :is="field.type"
              v-bind="field.props"
              :id="field.name"
              v-model="formData[field.name]"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button type="submit" class="btn btn-query">Query</button>
          <button type="button" class="btn btn-reset" @click="handleReset">Reset</button>
          <button type="button" class="btn btn-rollup">Roll up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContent",
  data() {
    return {
      formData: {
        mobile: "",
        loanNumber: "",
        applicationStatus: "",
        applicationTime: "",
        // ...other fields
      },
      fields: [
        { name: "mobile", label: "Mobile", type: "input", props: { type: "text", placeholder: "Please enter" } },
        { name: "loanNumber", label: "Loan Number", type: "input", props: { type: "text", placeholder: "Please enter" } },
        { name: "applicationStatus", label: "Application Status", type: "select", props: { options: ["--Select Option--", "Approved", "Rejected"] } },
        { name: "applicationTime", label: "Application Time", type: "input", props: { type: "date" } },
        // ...other fields
      ],
    };
  },
  methods: {
    handleQuery() {
      console.log("Querying with data:", this.formData);
    },
    handleReset() {
      this.formData = Object.keys(this.formData).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
    },
  },
};
</script>

<style scoped>
.main-content {
 padding: 6px;
  background-color: #D9F7FF;
  width: 100vw;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 1228px;
  height: 46px;
}

.header-title {
  font-size: 14px;
  font-weight: bold;
  color: #004759;
}

.header-details {
  display: flex;
  align-items: center;
}

.header-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.header-date{
    width: 146px;
    font-size: 14px;
    color:#E85353;
}
.header-item {
  margin-left: 10px;
}

.header-circle {
  width: 12px;
  height: 17px;
  background-color: #D9F7FF;
  color: #004759;
  text-align: center;
font-size: 12px;
}
.header-name{
    color: #585865;
}
.form-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 1228px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-query {
  background-color: #007bff;
  color: white;
}

.btn-reset {
  background-color: #f4f4f4;
  color: #333;
  border: 1px solid #ddd;
}

.btn-rollup {
  background-color: #287fa7;
  color: white;
}
</style>









