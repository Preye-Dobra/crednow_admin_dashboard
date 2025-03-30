<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-header">Edit Personal Information</h2>
      <form @submit.prevent="handleSubmit" class="form-content">
        <div class="form-group" v-for="field in fields" :key="field.id">
          <label :for="field.id" class="form-label">{{ field.label }}</label>
          <input
            :id="field.id"
            v-model="field.value"
            :type="field.type"
            class="form-input"
            :placeholder="field.placeholder"
          />
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-cancel" @click="handleCancel">Cancel</button>
          <button type="submit" class="btn btn-update">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { id: "name", label: "Name", value: "Covenant Olubisi", type: "text", placeholder: "Enter name" },
        { id: "birthday", label: "Birthday", value: "1996-12-23", type: "date", placeholder: "Enter birthday" },
        { id: "province", label: "Province", value: "Kaduna", type: "text", placeholder: "Enter province" },
        { id: "city", label: "City", value: "Kanuna South", type: "text", placeholder: "Enter city" },
        { id: "address", label: "Address", value: "Egypt Road Barnawa", type: "text", placeholder: "Enter address" },
        { id: "mailbox", label: "Mailbox", value: "covenant@hotmail.com", type: "email", placeholder: "Enter email" },
        { id: "education-level", label: "Education Level", value: "Bachelor", type: "text", placeholder: "Enter education level" },
        { id: "marital-status", label: "Marital Status", value: "Unmarried", type: "text", placeholder: "Enter marital status" },
      ],
    };
  },
  methods: {
    handleSubmit() {
      alert("Personal information updated!");
      this.$emit("close");
    },
    handleCancel() {
      alert("Changes discarded!"); // Notify the user
      this.$emit("close"); // Close the modal
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 563px;
  height: 853px;
  max-height: 90vh; /* Limit height to 80% of viewport height */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensure content doesn't overflow */
}

.modal-header {
  background-color: #00CCFF;
  color: #004759;
  font-size: 24px;
  padding: 20px 0;
  font-weight: 600;
  height: 58px;
  line-height: 16px;
  width: 100%;
  text-align: center;
  position: sticky; /* Make header sticky */
  top: 0; /* Stick to the top */
  z-index: 1; /* Ensure header is above the form content */
}

.form-content {
  width: 100%;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(95vh - 100px); /* Adjust height to account for header */
}

/* Hide scrollbar */
.form-content::-webkit-scrollbar {
  width: 0; /* Hide scrollbar */
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
  width: 100%;
  max-width: 463px;
}

.form-label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 400;
  color: #004759;
  text-align: left;
}

.form-input {
  width: 463px;
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px 12px;
  color: #CCCCD8;
  font-size: 14px;
  outline: none;
}

.form-input:focus {
  border-color: #CCCCD8;
  box-shadow: 0 0 5px rgba(0, 207, 232, 0.5);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px; /* Space between buttons */
  width: 100%;
  max-width: 463px;
  margin-top: 20px;
}

.btn {
  padding: 10px 12px;
  border-radius: 8px;
  width: 154px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-cancel {
  background-color: white;
  color: #00CCFF;
  border: 1px solid #00CCFF;
}

.btn-cancel:hover {
  background-color: #f0f0f0; /* Light gray on hover */
}

.btn-update {
  background-color: #00CCFF;
  color: white;
  border: none;
}

.btn-update:hover {
  background-color: #00a5c5;
}
</style>