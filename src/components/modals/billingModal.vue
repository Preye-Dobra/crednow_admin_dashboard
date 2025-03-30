<template>
  <div v-if="visible" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2 class="text">Billing</h2>
      </div>
      <div class="modal-content">
        <form @submit.prevent="handleSubmit" class="form-box">
          <div class="form-group">
            <label for="amount">Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              v-model="formData.amount"
              required
              class="input-field"
            />
          </div>
          
          <div class="form-group">
            <label for="actionType">Action Type</label>
            <select
              id="actionType"
              v-model="formData.actionType"
              required
              class="input-field"
            >
              <option value="" disabled>Select action type</option>
              <option value="reduce">Reduce</option>
              <option value="increase">Increase</option>
              <option value="payment">Payment</option>
            </select>
          </div>
          
          <!-- Bank name input field (shows only when Payment is selected) -->
          <div class="form-group" v-if="formData.actionType === 'payment'">
            <label for="bankName">Bank Name</label>
            <input
              id="bankName"
              type="text"
              placeholder="Enter bank name"
              v-model="formData.bankName"
              required
              class="input-field"
            />
          </div>
          
          <!-- Loan Options List (shows only when Payment is selected) -->
          <div class="form-group loan-options-container" v-if="formData.actionType === 'payment' && loanData && loanData.loanOptions && loanData.loanOptions.length > 0">
            <label>Loan Options / Debt Balance</label>
            <div class="loan-options-list">
              <div v-for="(option, index) in loanData.loanOptions" :key="index" class="loan-option-item" :class="{'open-status': option.status === 'open'}">
                <div class="loan-option-header">
                  <span>Option #{{ index + 1 }}</span>
                  <span class="loan-status">{{ option.status.toUpperCase() }}</span>
                </div>
                <div class="loan-option-details">
                  <div class="detail-row">
                    <span>Loan Amount:</span>
                    <span>₦{{ formatCurrency(option.loanAmount) }}</span>
                  </div>
                  <div class="detail-row">
                    <span>Amount Paid:</span>
                    <span>₦{{ formatCurrency(option.amountPaid) }}</span>
                  </div>
                  <div class="detail-row">
                    <span>Loan Balance:</span>
                    <span class="balance-amount">₦{{ formatCurrency(option.loanBalance) }}</span>
                  </div>
                  <div class="detail-row">
                    <span>Total Due:</span>
                    <span class="total-amount">₦{{ formatCurrency(option.totalAmount) }}</span>
                  </div>
                  <div class="detail-row">
                    <span>Overdue Charges:</span>
                    <span class="overdue-amount">₦{{ formatCurrency(option.overDueCharges) }}</span>
                  </div>
                  <div class="detail-row">
                    <span>Days Overdue:</span>
                    <span>{{ option.daysOverDue }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="remark">Remark</label>
            <textarea
              id="remark"
              placeholder="Enter remark"
              v-model="formData.remark"
              required
              class="input-field textarea"
            ></textarea>
          </div>
          
          <div class="button-container">
            <button @click="closeModal" type="button" class="action-btn cancel" :disabled="isSubmitting">Cancel</button>
            <button type="submit" class="action-btn submit" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loader"></span>
              <span v-else>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "BillingModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    loanId: {
      type: String,
      required: true,
    },
    loanData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {
        amount: "",
        actionType: "",
        bankName: "",
        remark: ""
      },
      isSubmitting: false
    };
  },
  methods: {
    formatCurrency(value) {
      if (!value) return "0.00";
      return parseFloat(value).toLocaleString('en-NG', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      });
    },
    closeModal() {
      if (!this.isSubmitting) {
        this.$emit("close");
      }
    },
    async handleSubmit() {
      this.isSubmitting = true;
      
      try {
        // Validate form data
        if (!this.formData.amount || !this.formData.actionType || !this.formData.remark) {
          throw new Error("All fields are required");
        }
        
        // Additional validation for bankName if actionType is payment
        if (this.formData.actionType === "payment" && !this.formData.bankName) {
          throw new Error("Bank name is required for payment");
        }
        
        // Format the data according to backend requirements
        const payload = {
          amount: parseFloat(this.formData.amount),
          actionType: this.formData.actionType,
          remark: this.formData.remark
        };
        
        // Add bankName to payload if action type is payment
        if (this.formData.actionType === "payment") {
          payload.bankName = this.formData.bankName;
        }
        
        // Get auth token
        const authToken = Cookies.get("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found. Please log in again.");
        }
        
        console.log(`Submitting billing data for loan ID: ${this.loanId}`, payload);
        
        // Make API request
        const response = await fetch(
          `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/financial/add-bill/${this.loanId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
          }
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Billing update successful:", data);
        
        // Emit success event
        this.$emit("success", data);
        
       setTimeout(() => {
      this.closeModal();
    }, 100);
        
      } catch (error) {
        console.error("Error submitting billing update:", error);
        this.$emit("error", error.message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
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

.text {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
  flex-grow: 1;
  color: white;
}

.modal {
  width: 563px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-header {
  display: flex;
  height: 46px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #00CCFF;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-content {
  padding: 20px 0;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}

.form-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  color: #004759;
  font-size: 14px;
  margin-bottom: 8px;
  margin: 0 55px;
}

.input-field {
  width: 463px;
  height: 40px;
  padding: 8px 12px;
  margin: 0 auto;
  color: #004759;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-sizing: border-box;
}

.textarea {
  height: 80px;
  resize: vertical;
  font-family: inherit;
  padding: 12px;
}

.input-field::placeholder {
  color: #acacb2;
}

.button-container {
  width: 208px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

.action-btn {
  width: 98px;
  height: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel {
  border: 1px solid #00CCFF;
  color: #00CCFF;
  background-color: #fff;
}

.submit {
  border: 1px solid #00CCFF;
  color: #ecf1f2;
  background-color: #00CCFF;
}

.loader {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

.loan-options-container {
  margin-top: 5px;
}

.loan-options-list {
  max-height: 300px;
  overflow-y: auto;
  margin: 0 auto;
  width: 463px;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  background-color: #f9f9f9;
}

.loan-option-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.loan-option-item.open-status {
  border-left: 4px solid #FF9800;
}

.loan-option-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: 600;
  color: #004759;
}

.loan-status {
  color: #585865;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background-color: #e0e0e0;
}

.loan-option-details {
  padding: 10px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 13px;
  color: #585865;
}

.balance-amount, .total-amount {
  font-weight: 600;
  color: #004759;
}

.overdue-amount {
  color: #F44336;
  font-weight: 600;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>