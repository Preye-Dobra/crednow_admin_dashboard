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
              <div class="action-buttons">
                <button
                  id="query-btn"
                  type="submit"
                  class="btn btn-action btn-query"
                  style="width: 82px;"
                >
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
                  Batch Success
                </button>
                <button
                  id="batch-modification-btn"
                  type="button"
                  class="btn btn-action btn-modify"
                  @click="handleBatchModification"
                >
                  Batch Failure
                </button>
              </div>
            </component>
          </div>
          <!-- Action Buttons -->
          <div
            class="action-buttons"
            style=" width: 398px;
            margin-top: 20px;"
            
          >
            <button
              id="query-btn"
              type="submit"
              class="btn btn-action btn-query"
            >
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
              class="btn btn-action btn-batch text-danger"
              @click="handleBatchOperation"
            >
              Export
            </button>

          </div>
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

        productNamme: "",
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
        {
          name: "productNamme",
          label: "product Namme",
          type: "input",
          props: { type: "text", placeholder: "Enter order product namme" },
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
  font-family: 'Fira Sans', sans-serif;
}

.form-grid {
  display: flex;
  align-items: center;
  gap: 0; /* Remove gap between inputs */
  margin-bottom: 10px;
  padding: 10px 12px 12px 10px;
}

.form-group {
  margin-right: 10px; /* Adjust spacing between form groups */
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
.form-group select,
.form-group option {
  width: 286.5px;
  height: 40px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  color: #ACACB2;
;
}

.action-buttons {
  display: flex;
  align-items: center; /* Vertically center buttons */
  gap: 10px; /* Spacing between buttons */
  margin-left: auto; /* Push the container to the right */

  width: 398px; /* Fixed width */
  justify-content: flex-end; /* Align buttons to the end (right) */
  padding: 10px; /* Optional: Add padding for better spacing */
}

.btn {
  padding: 10px 16px;
 line-height: 16.8px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid #00CCFF;
  white-space: nowrap; /* Prevents text wrapping */
}

.btn-query {
  background-color: #00CCFF;
  color: white;
}

.btn-reset,
.btn-batch,
.btn-modify {
  background-color: #ffffff;
  color: #00CCFF;
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
.text-danger{
    color: red;
}
</style>
