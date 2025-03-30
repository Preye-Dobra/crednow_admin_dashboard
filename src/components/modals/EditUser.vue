<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit Basic Information</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <form @submit.prevent="handleSubmit" class="form-content">
        <div class="form-row">
          <div class="form-group">
            <label for="user-id">User ID</label>
            <input id="user-id" type="text" v-model="formData.userId" disabled />
          </div>
          <div class="form-group">
            <label for="application-channel">Application Channel</label>
            <input id="application-channel" type="text" v-model="formData.applicationChannel" placeholder="Please Enter" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" type="text" v-model="formData.name" />
          </div>
                    <div class="form-group">
            <label for="face-recognition-score">Face Recognition Score</label>
            <input id="face-recognition-score" type="number" v-model="formData.faceRecognitionScore" />
          </div>
        </div>
        <div class="form-row">

          <div class="form-group">
            <label for="mobile">Mobile</label>
            <input id="mobile" type="text" v-model="formData.mobile" />
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <input id="status" type="text" v-model="formData.status" disabled />
          </div>
        </div>
        <!-- done -->
        <div class="form-row">
          <div class="form-group">
            <label for="registration-time">Registration Time</label>
            <input id="registration-time" type="text" v-model="formData.registrationTime" disabled />
          </div>
          <div class="form-group">
            <label for="current-equipment">Current Equipment</label>
            <input id="current-equipment" type="text" v-model="formData.currentEquipment" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="user-level">User Level</label>
            <input id="user-level" type="text" v-model="formData.userLevel" />
          </div>
          <div class="form-group">
            <label for="loan-settlement-times">Loan Settlement Times</label>
            <input id="loan-settlement-times" type="number" v-model="formData.loanSettlementTimes" />
          </div>
        </div>

        

        <div class="form-row">
          <div class="form-group">
            <label for="expired-date">Expired Date</label>
            <input id="expired-date" type="text" v-model="formData.expiredDate" placeholder="Please Enter" />
          </div>
          <div class="form-group">
            <label for="last-logged-in-ip">Last Logged in IP</label>
            <input id="last-logged-in-ip" type="text" v-model="formData.lastLoggedInIp" disabled />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="number-of-borrowing">Number of Borrowing</label>
            <input id="number-of-borrowing" type="number" v-model="formData.numberOfBorrowing" />
          </div>
          <div class="form-group">
            <label for="application-progress">Application Progress</label>
            <input id="application-progress" type="text" v-model="formData.applicationProgress" placeholder="Please Enter" />
          </div>
        </div>

        <div class="form-row" style="margin-left: auto; margin-right: 40px;">
          <div class="form-group">
            <label for="package-name-applied-for">Package Name Applied for</label>
            <input id="package-name-applied-for" type="text" v-model="formData.packageNameAppliedFor" placeholder="Please Enter" />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-cancel" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn btn-confirm">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        userId: '197554',
        applicationChannel: '',
        name: 'Conveant Olubisi',
        mobile: '08184747474',
        registrationTime: '2025-01-04 18:45:00',
        currentEquipment: 'Redmi 2837RN02A',
        userLevel: 'Level 1',
        loanSettlementTimes: 0,
        faceRecognitionScore: -1.0,
        status: 'Active',
        expiredDate: '',
        lastLoggedInIp: '102.90.79.152',
        numberOfBorrowing: 0,
        applicationProgress: '',
        packageNameAppliedFor: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      alert('Form submitted!');
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
  width: 1055px;
  max-width: 90%; /* Ensure it doesn't overflow on smaller screens */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden; /* Prevent content from overflowing */
  margin-left: 50px;
  height: 790px;
  margin-top: 86px;
  margin-bottom: 50px;
  overflow-y: auto; /* Add vertical scrollbar */
}

.modal-content::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

.modal-content::-webkit-scrollbar-track {
  background: transparent; /* Transparent track */
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888; /* Color of the scrollbar thumb */
  border-radius: 4px; /* Rounded corners for the thumb */
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555; /* Darker color on hover */
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  #00CCFF;
  color: #004759;
  padding: 10px 12px;
  height: 50px;
  width: 100%;
  position: relative; /* Allows absolute positioning of the close button */
}

.modal-header h2 {
  margin: 0;
  font-size: 16px;
  flex-grow: 1; /* Ensures text is centered */
  text-align: center; /* Centers text */
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  right: 15px; /* Positions close button to the right */
  top: 50%;
  transform: translateY(-50%);
}

.form-content {
  padding: 20px; /* Add padding to the form */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 2px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.6px;
  color: #004759;
}

input {
  padding: 10px;
  border: 1px solid #ACACB2;
  border-radius: 20px;
  font-size:12px;
  height: 46px;
  width: 463px;
}

input[type="text"] {
  padding: 0.5rem;
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 20px; /* Rounded corners */
  font-size: 1rem;
  font-size: 12px;
  color: #ACACB2; /* Medium gray text color */
  outline: none; /* Removes default focus outline */
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px; /* Add padding to ensure buttons are visible */
}

input[type="text"]::placeholder {
  color: #999; /* Light gray placeholder text */
  font-style: italic; /* Italic placeholder text */
}

input[type="text"]:focus {
  border-color: #007bff; /* Blue border on focus */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Adds a subtle glow effect */
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  width: 154px;
  height: 40px;
}

.btn-cancel {
  background: white;
  color:  #00CCFF;
  border: 1px solid  #00CCFF;
}

.btn-confirm {
  background:  #00CCFF;
  color: white;
  border: none;
}
</style>