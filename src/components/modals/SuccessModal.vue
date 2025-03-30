<template>
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2 class="text">{{ title }}</h2>
        <!-- <button class="close-button" @click="closeModal">&times;</button> -->
      </div>
      <div class="modal-content">
        <form @submit.prevent="handleSubmit" class="form-box">
          <div class="form-group" v-for="(field, index) in formFields" :key="index">
            <label :for="field.id">{{ field.label }}</label>
            
            <div v-if="field.id === 'lendingStatus'" class="dropdown-container">
              <select v-model="field.value" id="lendingStatus" class="input-field">
                <option value="Succeed">Succeed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <img src="https://img.icons8.com/?size=100&id=40021&format=png&color=000000" alt="Dropdown" class="dropdown-icon" />
            </div>

            <input
              v-else
              :id="field.id"
              :type="field.type"
              :placeholder="field.placeholder"
              v-model="field.value"
              :readonly="field.readonly"
              :required="field.required"
              class="input-field"
            />
          </div>

          <div class="button-container">
            <button type="button" class="action-btn cancel" @click="closeModal">Cancel</button>
            <button type="submit" class="action-btn submit">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Successful Lending",
    },
  },
  data() {
    return {
      formFields: [
        { id: "orderNumber", label: "Order Number", type: "text", placeholder: "", value: "P1768754678987675544", readonly: true },
        { id: "lendingStatus", label: "Lending Status", type: "text", placeholder: "", value: "Succeed" },
        { id: "tradeNumber", label: "Trade Number", type: "text", placeholder: "Please Enter", value: "" },
        { id: "paymentCode", label: "Payment Partner Transfer Code", type: "text", placeholder: "Please Enter", value: "" },
        { id: "loanDate", label: "Loan Date", type: "date", placeholder: "Select Date", value: "" },
        { id: "remarks", label: "Remarks", type: "text", placeholder: "Please Enter", value: "", required: true },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      const formData = this.formFields.map((field) => ({
        [field.id]: field.value,
      }));
      console.log("Form submitted with data:", formData);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.text {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  width: 563px;
  height: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #00CCFF;
  color: #004759;
  height: 46px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  font-size: 24px;
  padding: 0 16px;
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.close-button {
  width: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  color: #004759;
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: 400;
}

.input-field {
  width: 100%;
  height: 40px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
  margin-top: 4px;
  color: #004759;
}

.input-field::placeholder {
  color: #acacb2;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
}

.dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown-icon {
  position: absolute;
  right: 12px;
  width: 18px;
  height: 18px;
  pointer-events: none;
}

select.input-field {
  appearance: none;
  background-color: white;
  padding-right: 40px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

.action-btn {
  width: 98px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
}

.cancel {
  border: 1px solid#00CCFF;
  color:#00CCFF;
  background-color: #fff;
}

.submit {
  border: 1px solid#00CCFF;
  color: #ecf1f2;
  background-color:#00CCFF;
}
</style>
