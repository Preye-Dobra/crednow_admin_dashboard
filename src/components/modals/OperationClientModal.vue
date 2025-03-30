<template>
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">{{ ttitle }}</h2>

      </div>
      <div class="modal-content" style="margin-left: 20px; margin-top: 50px;">
        <form @submit.prevent="handleSubmit" class="form-box">
          <div class="form-group">
            <label for="userId">User ID<span>*</span></label>
            <input
              id="userId"
              type="text"
              v-model="formFields.userId"
              class="input-field"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="status">Status<span> *</span></label>
            <select
              id="status"
              v-model="formFields.status"
              class="input-field"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>

            </select>
          </div>
          <div class="form-group-checkbox">
            <label for="eligible" class="checkbox-label">Eligible</label>
            <input
              id="eligible"
              type="checkbox"
              v-model="formFields.eligible"
              class="checkbox-field"
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
  name: "OperationModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    ttitle: {
      type: String,
      default: "Operation",
    },
  },
  data() {
    return {
      formFields: {
        userId: "197554", // Example default value, replace as needed
        status: "Active",
        eligible: false,
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      console.log("Form submitted with data:", this.formFields);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
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
  background-color: #fff;
  height: 393px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  #00CCFF;
  color: #004759;
  padding: 12px 16px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #004759;
}

.close-button {
  font-size: 24px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-content {
  padding: 20px;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

label {
  font-size: 14px;
  margin-bottom: 4px;
  color: #004759;
}

.input-field {
  width: 463px;
  height: 46px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
}

.input-field:focus {
  border-color:  #00CCFF;
  outline: none;
}

.checkbox-field {
  width: 15px;
  height: 15px;
  margin-left: 10px;
}

.form-group-checkbox {
  display: flex;
  align-items: center;
  width: 10.5px;
  height: 10.5px;
}
.checkbox-field:checked {
  background-color:  #00CCFF; /* Change background to  #00CCFF when checked */
  border-color:  #00CCFF; /* Optional: Match border to the background color */
}
.checkbox-label {
  font-size: 14px;
  margin: 0;
  width: 67px;
  height: 20px;
  color: #004759;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

.action-btn {
  width: 100px;
  height: 40px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel {
  background: white;
  color:  #00CCFF;
  border: 1px solid  #00CCFF;
}

.cancel:hover {
  background: #f0faff;
}

.submit {
  background:  #00CCFF;
  color: white;
  border: 1px solid  #00CCFF;
}

.submit:hover {
  background: #009fcc;
}
span{
    color: #E85353;
}
</style>

