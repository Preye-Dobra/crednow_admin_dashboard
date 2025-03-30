<template>
  <div>
    <MonnifyButton class="tan" />
    <div class="three-boxes">
      <div class="box" style="background-color: #d9f7ff">
        <div class="inner-box">
          <img src="/public/cde.png" alt="Icon 1" class="icon" />
          <div class="text-container">
            <span class="small-text">Total Loan Amount</span>
            <span class="big-text">₦{{ formatCurrency(loanStats.totalLoanGiven) }}</span>
          </div>
        </div>
      </div>
      <div class="box" style="background-color: #e8535340">
        <div class="inner-box">
          <img src="/public/cd.png" alt="Icon 2" class="icon" />
          <div class="text-container">
            <span class="small-text">Total Outstanding Loan</span>
            <span class="big-text">₦{{ formatCurrency(loanStats.totalOutstandingLoan) }}</span>
          </div>
        </div>
      </div>
      <div class="box" style="background-color: #b8ffc140">
        <div class="inner-box">
          <img src="/public/cord.png" alt="Icon 3" class="icon" />
          <div class="text-container">
            <span class="small-text">Total Users</span>
            <span class="big-text">{{ loanStats.totalUsers }}</span>
          </div>
        </div>
      </div>
            <div class="box" style="background-color: #e8535340">
        <div class="inner-box">
          <img src="/public/cd.png" alt="Icon 2" class="icon" />
          <div class="text-container">
            <span class="small-text"> Amount Recieved</span>
            <span class="big-text">₦{{ formatCurrency(loanStats.amountReceived) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MonnifyButton from "./Monifier.vue";
import Cookies from "js-cookie"; // Import js-cookie if needed for auth

export default {
  components: {
    MonnifyButton
  },
  data() {
    return {
      loanStats: {
        totalLoanGiven: "0.00",
        totalOutstandingLoan: "0.00",
        totalUsers: 0,
        amountReceived: "0.00"
      },
      isLoading: false,
      error: null
    };
  },
  mounted() {
    this.fetchLoanStats();
  },
  methods: {
    async fetchLoanStats() {
      this.isLoading = true;
      try {
        // Get auth token if your API requires it
        const authToken = Cookies.get("authToken");
        
        if (!authToken) {
          console.error("No authToken found in cookies!");
          return;
        }
        
        const response = await fetch(
          "https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/application/loan-stats",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`
            }
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Loan Stats Response:", responseData);
        
        if (responseData.success && responseData.data) {
          // Update the loan stats with the data from the API
          this.loanStats = {
            totalLoanGiven: responseData.data.totalLoanGiven || "0.00",
            totalOutstandingLoan: responseData.data.totalOutstandingLoan || "0.00",
            totalUsers: responseData.data.totalUsers || 0,
            amountReceived: responseData.data.amountReceived || "0.00",
            
          };
        }
      } catch (error) {
        console.error("Error fetching loan stats:", error);
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    formatCurrency(value) {
      // Convert string to number and format with commas
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return "0";
      
      return numValue.toLocaleString('en-NG');
    }
  }
};
</script>

<style>
.tan{
  padding-top: 12px;
}
.three-boxes {
  display: flex;
  gap: 24px; /* Space between the boxes */
  justify-content: center;
  width: 1182px;
  height: 108px;
  margin: auto;
  padding-top: 8px;
  margin-bottom: 24px;
}

.box {
  display: flex; /* Enables flexbox */
  justify-content: center; /* Center items horizontally */
  align-items: center; /* Center items vertically */
  height: 108px; /* Fixed height */
  width: 378px; /* Fixed width */
  padding: 13px 36px; /* Padding: top/bottom 13px, left/right 36px */
  border-radius: 8px; /* Rounded corners */
  gap: 12px; /* Space between inner items */
  margin-bottom: 16px; /* Margin below the box */
  box-sizing: border-box; /* Ensures padding is included in the width/height */
}

.inner-box {
  display: flex; /* Enables flexbox */
  align-items: center; /* Centers items vertically */
  justify-content: flex-start; /* Keeps items aligned to the left horizontally */
  gap: 12px; /* Space between items */
  height: 66px; /* Height of the parent container */
  width: fit-content;
  margin: auto;
}

.icon {
  width: 42px;
  height: 42px; 
}

.text-container {
  display: flex;
  flex-direction: column; 
  gap: 4px;
}

.small-text {
  line-height: 19.6px;
  font-size: 14px;
  color: #004759;
  font-weight: 400;
  width: auto;
  height: 10px;
}

.big-text {
  font-size: 40px; /* Adjust font size for big text */
  font-weight:400; /* Make big text bold */
  color: #004759; /* Adjust color for big text */
  line-height: 56px;
}
</style>