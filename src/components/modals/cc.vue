<template>
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

      <!-- Action Buttons in the fourth column -->
      <div class="form-group action-buttons">
        <button type="submit" class="btn btn-query">Query</button>
        <button type="button" class="btn btn-reset" @click="handleReset">
          Reset
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { fields } from "../data/main";
export default {
  name: "QueryForm",
  props: {
    formData: {mobile: "",
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
        appName: "",},
    fields,
  },
  methods: {
    handleQuery() {
      this.$emit("submitQuery", this.formData);
    },
    handleReset() {
      this.$emit("resetForm");
    },
  },
};
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 1fr;
  gap: 10px;
  margin-bottom: 10px;
  padding: 10px 12px 12px 10px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
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
  color: #acacb2;
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
  border: 1px solid #00ccff;
}

.btn-query {
  background-color: #00ccff;
  color: white;
}

.btn-reset {
  background-color: #fff;
  color: #00ccff;
  border: 1px solid #ddd;
}
</style>
