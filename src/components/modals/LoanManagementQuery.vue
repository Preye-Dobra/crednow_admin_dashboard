<template>
  <div class="main-content">
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
            >
              <!-- Add default select option -->
              <template v-if="field.type === 'select'">
                <option disabled value="">
                  {{ field.props.placeholder || "--Select Option--" }}
                </option>
                <option
                  v-for="(option, idx) in field.props.options"
                  :key="idx"
                  :value="option"
                >
                  {{ option }}
                </option>
              </template>
            </component>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button id="query-btn" type="submit" class="btn btn-action btn-query">
            Query
          </button>
          <button
            id="reset-btn"
            type="button"
            class="btn btn-action btn-reset"
            @click="handleReset"
          >
            Reset
          </button>
          <button
            id="batch-operation-btn"
            type="button"
            class="btn btn-action btn-batch"
            @click="handleBatchOperation"
          >
            Batch Operation
          </button>
          <button
            id="batch-modification-btn"
            type="button"
            class="btn btn-action btn-modify"
            @click="handleBatchModification"
          >
            Batch Account Modification
          </button>
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
        orderNumber: "",
        mobile: "",
        name: "",
        orderNumber: "",
        userID: "",
        lendingStatus: "",
        orderChannel: "",
        bankName: "",
        orderStatus: "",
        creationTime: "",
        paymentSerialNumber: "",
        payoutNumber: "",
        updateTime: "",
      },
      fields: [
        {
          name: "mobile",
          label: "Mobile",
          type: "input",
          props: { type: "number", placeholder: "Enter mobile number" },
        },

        {
          name: "orderNumber",
          label: "order Number",
          type: "input",
          props: { type: "number", placeholder: "Enter order number" },
        },

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
    handleBatchOperation() {
      console.log("Batch Operation initiated");
    },
    handleBatchModification() {
      console.log("Batch Account Modification initiated");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap");

.form-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1220px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px 12px 12px 10px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  line-height: 19.6px;
  font-weight: 400;
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
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 16px;
  min-width: 120px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #00ccff;
  white-space: nowrap; /* Prevents text wrapping */
}

.btn-action {
  transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.btn-query {
  background-color: #00ccff;
  color: white;
}

.btn-reset,
.btn-batch,
.btn-modify {
  background-color: #ffffff;
  color: #00ccff;
}

.btn-reset:hover,
.btn-batch:hover,
.btn-modify:hover {
  background-color: #e6f7ff;
}

.btn-query:hover {
  opacity: 0.8;
}

.form-group input::placeholder,
.form-group select::placeholder {
  color: #acacb2;
  font-size: 12px;
}
</style>