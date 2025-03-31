<template>
  <div class="container">
    <div class="header-button-container flex items-center justify-between mb-4 bg-white px-4 py-2 border-b">
      <!-- Tabs -->
      <div class="button-container flex space-x-4">
        <button
          class="tab-button"
          :class="{ active: activeTab === 'user' }"
          @click="activeTab = 'user'"
        >
          User Information
        </button>
        <button
          class="tab-button"
          :class="{ active: activeTab === 'media' }"
          @click="activeTab = 'media'"
        >
          Media Information
        </button>
      </div>

      <!-- Suspend/Unsuspend Button -->
      <div class="delete-button-container">
        <button
          class="delete-button"
          @click="openSuspendModal"
          style="
            width: auto;
            min-width: 94px;
            height: 33px;
            border-radius: 8px;
            padding: 8px 12px;
            background-color: #E85353;
            border: none;
            color: #fff;
          "
        >
          {{ 
            userData.accountStatus === 'suspended' 
              ? 'Reactivate User' 
              : (isSuspended ? 'Unsuspend' : 'Suspend') 
          }}
        </button>
      </div>
    </div>

    <div class="tab-content tab-margin">
      <!-- User Information Section -->
      <div v-if="activeTab === 'user'" class="content-box">
        <div class="flex-container">
          <div class="box" style="width: 48%; margin-top: 18px;">
            <div class="basic-info-box">
              <div class="basic-header">
                <h3>Basic Information</h3>
              </div>
              <p>
                <strong>User ID:</strong>
                <div class="normal" style="color: #00CCFF; transform: translateY(0); display: flex; align-items: center;  margin-left: 100px;">
                  {{ userData.userId && userData.userId.length > 10 ? userData.userId.substring(0, 10) + '...' : userData.userId || '-' }}
                  <span v-if="userData.userId && userData.userId.length > 10" class="copy-icon" @click="copyToClipboard(userData.userId)" title="Copy User ID">
                    <img src="/public/icons8-copy-30.png" style="width: 14px; height: 14px; margin-left: 1px; cursor: pointer;" alt="copy" />
                  </span>
                </div>
              </p>
              <p><strong>Name:</strong><div class="normal" style="transform: translateY(0);">{{ userData.firstName || '-' }} {{ userData.lastName || '-' }}</div></p>
              <p><strong>Mobile:</strong><div class="normal" style="transform: translateY(0);">{{ userData.phoneNumber || '-' }}</div></p>
              <p><strong>Email:</strong><div class="normal" style="transform: translateY(0);">{{ userData.email || '-' }}</div></p>
              <p><strong>Registration Time:</strong><div class="normal" style="transform: translateY(0);"><span class="blue" style="font-size: 12px;">{{ formatDateDisplay(userData.createdAt) }} <span class="red">{{ formatTimeDisplay(userData.createdAt) }}</span></span></div></p>
              <p><strong>User Level:</strong><div class="normal" style="transform: translateY(0);">Level {{ userData.level || '-' }}</div></p>
              <p><strong>Loan Limit:</strong><div class="normal" style="transform: translateY(0);">{{ formatCurrency(userData.loanLimit) }}</div></p>
            </div>

            <div class="basic-info-box" style="margin-left: 10px; margin-top: -20px;">
              <div><p><strong></strong><span class="edit" @click="openBasicInfoModal" style="font-size: 12px;"> Edit <img src="/public/mynaui_edit.png" style="width: 12px;height: 12px;" alt="edit"></span></p></div>
              <p><strong>Application Channel:</strong><div class="normal" style="transform: translateY(0);">-</div></p>
              <p>
                <strong>Status:</strong>
                <div class="normal" style="transform: translateY(0);">
                  <span 
                    :class="{ 
                      'active': userData.accountStatus === 'active' && !isSuspended, 
                      'inactive-status': userData.accountStatus !== 'active' || isSuspended 
                    }" 
                    style="font-size: 12px;"
                  >
                    {{ isSuspended ? 'Suspend' : userData.accountStatus || '-' }}
                  </span>
                </div>
              </p>
              <p><strong>BVN:</strong><div class="normal" style="transform: translateY(0);">{{ userData.bvnDetails ? userData.bvnDetails.bvn : '-' }}</div></p>
              <p><strong>Expired Date:</strong><div class="normal" style="transform: translateY(0);">{{ formatDateDisplay(userData.expirationDate) || '-' }}</div></p>
              <p>
                <strong>Verified:</strong>
                <div class="normal" style="transform: translateY(0);">
                  <span 
                    :class="getVerificationClass(userData.verified)" 
                    style="font-size: 12px;"
                  >
                    {{ userData.verified === true ? 'true' : (userData.verified === false ? 'false' : '-') }}
                  </span>
                </div>
              </p>
              <p><strong>Number of Borrowing:</strong><div class="normal" style="transform: translateY(0);">{{ userData.numOfLoans || 0 }}</div></p>
              <p><strong>Application Progress:</strong><div class="normal" style="transform: translateY(0);">{{ userData.loanStatus || '-' }}</div></p>
            </div>
          </div>
          <div class="line" style="margin-top: -140px; width: 1px;"></div>
          <div class="box" style="width: 48%; display: flex; gap: 12px;">
            <div style="width: 50%; margin-top: 60px;">
              <h3>Personal Information <span class="edit" @click="openPersonalInfoModal"> Edit <img src="/public/mynaui_edit.png" style="width: 12px;height: 12px;" alt="edit"></span></h3>
              <p>
                <strong>Name:</strong><div class="normal" style="transform: translateY(0);">{{ userData.personalDetails ? getFullNameFromPersonalDetails() : '-' }}</div>
              </p>
              <p>
                <strong>Birthday:</strong><div class="normal" style="transform: translateY(0);">{{ userData.personalDetails ? formatDateDisplay(userData.personalDetails.dateOfBirth) : '-' }}</div>
              </p>
              <p>
                <strong>Province:</strong><div class="normal" style="transform: translateY(0);">{{ userData.personalDetails ? userData.personalDetails.state : '-' }}</div>
              </p>
              <!-- <p>
                <strong>City:</strong><div class="normal" style="transform: translateY(0);">{{ userData.personalDetails ? userData.personalDetails.city : '-' }}</div>
              </p>
              <p>
                <strong>Address:</strong><div class="normal" style="transform: translateY(0);">{{ userData.personalDetails ? userData.personalDetails.address : '-' }}</div>
              </p> -->
              <p>
                <strong>Mailbox:</strong><div class="normal" style="transform: translateY(0);">{{ userData.personalDetails ? userData.personalDetails.email : '-' }}</div>
              </p>
              <p>
                <strong>Education Level:</strong><div class="normal" style="transform: translateY(0);">{{ userData.personalDetails ? userData.personalDetails.education : '-' }}</div>
              </p>
              <p>
                <strong>Marital Status:</strong><div class="normal" style="transform: translateY(0);">{{ userData.personalDetails ? userData.personalDetails.maritalStatus : '-' }}</div>
              </p>
            </div>
            <div class="line"></div>
            <div style="width: 50%; margin-top: 40px;">
              <h3>Employment Information <span class="edit" @click="openEmploymentInfoModal"> Edit <img src="/public/mynaui_edit.png" style="width: 12px;height: 12px;" alt="edit"></span></h3>
              <p v-if="userData.workHistory === null">
                <strong>Corporation Name:</strong><div class="normal" style="transform: translateY(0);">-</div>
              </p>
              <p v-else>
                <strong>Corporation Name:</strong><div class="normal" style="transform: translateY(0);">{{ userData.workHistory.companyName || '-' }}</div>
              </p>
              <p>
                <strong>City of the Company:</strong><div class="normal" style="transform: translateY(0);">{{ userData.workHistory ? userData.workHistory.cityOfCompany : '-' }}</div>
              </p>
              <p>
                <strong>Work Phone:</strong><div class="normal" style="transform: translateY(0);">{{ userData.workHistory ? userData.workHistory.companyPhone : '-' }}</div>
              </p>
              <p>
                <strong>Monthly Income:</strong><div class="normal" style="transform: translateY(0);">{{ userData.workHistory ? formatCurrency(userData.workHistory.monthlyIncome) : '-' }}</div>
              </p>
              <p>
                <strong>Province/State:</strong><div class="normal" style="transform: translateY(0);">{{ userData.workHistory && userData.workHistory.state ? userData.workHistory.state : '-' }}</div>
              </p>
              <p>
                <strong>Company Address:</strong><div class="normal" style="transform: translateY(0);">{{ userData.workHistory ? userData.workHistory.companyAddress : '-' }}</div>
              </p>
              <p>
                <strong>Occupation:</strong><div class="normal" style="transform: translateY(0);">{{ getOccupation() }}</div>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Media Information Section -->
      <div v-if="activeTab === 'media'" class="content-box loss">
        <ChildComponent style="margin-top: -124px;" />
      </div>
    </div>

    <!-- Modals -->
    <BasicInformation v-if="isBasicInfoModalOpen" @close="closeBasicInfoModal" />
    <ReactivateUser v-if="isDeleteModalOpen" @close="closeReactivateModal" />
    <PersonalInfo v-if="isPersonalInfoModalOpen" @close="closePersonalInfoModal" />
    <EmploymentInfo v-if="isEmploymentInfoOpen" @close="closeEmploymentInfoModal" />
    
    <!-- Suspension Modal -->
    <div v-if="isSuspendModalOpen" class="modal-overlay">
      <div class="suspend-modal">
        <h3>{{ isSuspended ? 'Unsuspend Account' : 'Suspend Account' }}</h3>
        
        <div v-if="!isSuspended">
          <p>Please provide a reason for suspending this account:</p>
          <textarea 
            v-model="suspensionReason" 
            placeholder="Enter suspension reason"
            class="suspension-reason"
          ></textarea>
        </div>
        
        <div v-else>
          <p>Are you sure you want to unsuspend this account?</p>
        </div>
        
        <div class="modal-buttons">
          <button class="cancel-button" @click="closeSuspendModal">Cancel</button>
          <button class="confirm-button" @click="handleSuspendAccount">
            {{ isSuspended ? 'Unsuspend' : 'Suspend' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import BasicInformation from "./EditUser.vue";
import ReactivateUser from "./ReactivateUser.vue";
import PersonalInfo from "./EditPersonalInfo.vue";
import EmploymentInfo from "./EditEmploymentModal.vue";
import ChildComponent from "./medialOp.vue";

export default {
  components: {
    BasicInformation,
    ReactivateUser,
    PersonalInfo,
    EmploymentInfo,
    ChildComponent,
  },
  data() {
    return {
      activeTab: 'user',
      isBasicInfoModalOpen: false,
      isDeleteModalOpen: false,
      isPersonalInfoModalOpen: false,
      isEmploymentInfoOpen: false,
      isSuspendModalOpen: false,
      suspensionReason: '',
      isSuspended: false,
      suspensionStatus: '',
      isLoading: false, // Added loading state
      userData: {
        userId: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        createdAt: '',
        deviceId: '',
        level: '',
        numOfLoans: '',
        accountStatus: '',
        expirationDate: '',
        loanStatus: '',
        state: '',
        city: '',
        loanLimit:'',
        address: '',
        incomeDetails: '',
        email: '',
        dateOfBirth: '',
        personalDetails: null,
        workHistory: null,
        profilePic: null,
        verified: null, // Explicitly initialized
        bvnDetails: null
      }
    };
  },
  methods: {
    /**
     * Get verification status class based on verified value
     * @param {boolean|null} verified - Verification status
     * @returns {string} - CSS class name
     */
    getVerificationClass(verified) {
      if (verified === true) {
        return 'active';
      } else if (verified === false) {
        return 'inactive-status';
      }
      return '';
    },
    
    /**
     * Get occupation based on available data
     * @returns {string} - Occupation or default placeholder
     */
    getOccupation() {
      if (this.userData.workHistory && this.userData.workHistory.professionType) {
        return this.userData.workHistory.professionType;
      }
      return this.userData.employmentStatus || '-';
    },

    /**
     * Process and manage user data including profile image
     * @param {Object|null} userData - User data from API response
     * @returns {boolean} - Indicates if processing was successful
     */
    processUserData(userData) {
      try {
        // If userData is null or undefined, clear local storage
        if (userData === null || userData === undefined) {
          this.clearUserLocalStorage();
          console.warn('User data is null. Local storage cleared.');
          return false;
        }

        // Extract contact details and profile image
        const contactDetails = userData.contactDetails;
        const profilePic = userData.profilePic || null;

        // Save profile image URL to local storage
        if (profilePic) {
          localStorage.setItem('userProfileImage', profilePic);
          console.log('Profile image URL saved to local storage:', profilePic);
        } else {
          localStorage.removeItem('userProfileImage');
        }

        // Process contact details
        const isContactValid = this.processContactDetails(contactDetails);
        
        return isContactValid;
      } catch (error) {
        console.error('Error processing user data:', error);
        this.clearUserLocalStorage();
        return false;
      }
    },

    /**
     * Process and manage contact details
     * @param {Object|null} contactDetails - Contact details from API response
     * @returns {boolean} - Indicates if contact details processing was successful
     */
    processContactDetails(contactDetails) {
      try {
        // If contactDetails is null or undefined, clear relevant storage
        if (contactDetails === null || contactDetails === undefined) {
          localStorage.removeItem('userContacts');
          localStorage.removeItem('contactDetails');
          console.warn('Contact details are null. Contact storage cleared.');
          return false;
        }

        // Validate contact details
        if (this.isValidContactDetails(contactDetails)) {
          // Save contact details to local storage
          localStorage.setItem('contactDetails', JSON.stringify(contactDetails));
          
          // Save contacts if they exist
          if (contactDetails.contacts) {
            localStorage.setItem('userContacts', JSON.stringify(contactDetails.contacts));
          } else {
            // Ensure contacts are removed if not present
            localStorage.removeItem('userContacts');
          }
          
          return true;
        } else {
          // Clear storage if details are invalid
          localStorage.removeItem('userContacts');
          localStorage.removeItem('contactDetails');
          console.warn('Invalid contact details. Contact storage cleared.');
          return false;
        }
      } catch (error) {
        console.error('Error processing contact details:', error);
        localStorage.removeItem('userContacts');
        localStorage.removeItem('contactDetails');
        return false;
      }
    },

    /**
     * Clear all user-related data from local storage
     */
    clearUserLocalStorage() {
      localStorage.removeItem('userData');
      localStorage.removeItem('userContacts');
      localStorage.removeItem('contactDetails');
      localStorage.removeItem('userProfileImage');
    },

    /**
     * Validate contact details
     * @param {Object} contactDetails - Contact details to validate
     * @returns {boolean} - Indicates if contact details are valid
     */
    isValidContactDetails(contactDetails) {
      return (
        contactDetails &&
        typeof contactDetails === 'object' &&
        // Additional validation as needed
        (contactDetails.contacts === null || 
         (Array.isArray(contactDetails.contacts) && contactDetails.contacts.length >= 0))
      );
    },

    formatDateDisplay(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    },
    
    formatTimeDisplay(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toTimeString().split(' ')[0]; // HH:MM:SS
    },
    
    formatCurrency(amount) {
      if (!amount && amount !== 0) return '₦0';
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    },
    
    getFullNameFromPersonalDetails() {
      if (this.userData.personalDetails) {
        const { firstName, middleName, lastName } = this.userData.personalDetails;
        return [firstName, middleName, lastName].filter(Boolean).join(' ');
      }
      return `${this.userData.firstName || ''} ${this.userData.lastName || ''}`;
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          // Create a temporary div for the toast notification
          const toast = document.createElement('div');
          toast.textContent = 'User ID copied to clipboard';
          toast.style.position = 'fixed';
          toast.style.bottom = '20px';
          toast.style.left = '50%';
          toast.style.transform = 'translateX(-50%)';
          toast.style.padding = '10px 20px';
          toast.style.background = '#333';
          toast.style.color = '#fff';
          toast.style.borderRadius = '4px';
          toast.style.zIndex = '1000';
          
          // Add the toast to the document
          document.body.appendChild(toast);
          
          // Remove the toast after 2 seconds
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 2000);
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          alert('Failed to copy text. Please try again.');
        });
    },
    
    async fetchUserData() {
      // Set loading state
      this.isLoading = true;

      try {
        // Get userId from route params
        const userId = this.$route.params.id;
        
        if (!userId) {
          console.error('No user ID provided in route parameters');
          this.isLoading = false;
          return;
        }
        
        const token = Cookies.get('authToken') || Cookies.get('token') || Cookies.get('access_token');

        if (!token) {
          console.error('No authentication token found in cookies');
          this.isLoading = false;
          return;
        }

        const response = await axios.get(
          `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/single-client/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('User API Response:', response.data);
        
        // Ensure we have valid data from API response
        if (!response.data || !response.data.data) {
          console.error('Invalid API response structure:', response.data);
          this.isLoading = false;
          return;
        }
        
        const userDataResponse = response.data.data;

        // Process all user data including profile image and contact details
        const isProcessed = this.processUserData(userDataResponse);
        
        if (!isProcessed) {
          console.warn('Failed to process user data properly');
          // Optionally emit an event about processing failure
          this.$emit('user-data-error', 'Failed to process user data');
        }

        // Explicitly check for verified status and other fields
        console.log('Verified status from API:', userDataResponse.verified);
        console.log('Account status from API:', userDataResponse.accountStatus);

        // Update userData with proper type checking
        this.userData = {
          userId: userDataResponse.userId || '',
          firstName: userDataResponse.firstName || '',
          lastName: userDataResponse.lastName || '',
          phoneNumber: userDataResponse.phoneNumber || '',
          createdAt: userDataResponse.createdAt || '',
          deviceId: userDataResponse.deviceId || '',
          level: typeof userDataResponse.level === 'number' ? userDataResponse.level : 0,
          numOfLoans: typeof userDataResponse.numOfLoans === 'number' ? userDataResponse.numOfLoans : 0,
          accountStatus: userDataResponse.accountStatus || '',
          expirationDate: userDataResponse.expirationDate || '',
          loanStatus: userDataResponse.loanStatus || '',
          loanLimit: typeof userDataResponse.loanLimit === 'number' ? userDataResponse.loanLimit : 0,
          state: userDataResponse.state || '',
          city: userDataResponse.city || '',
          address: userDataResponse.address || '',
          incomeDetails: typeof userDataResponse.incomeDetails === 'number' ? userDataResponse.incomeDetails : 0,
          email: userDataResponse.email || '',
          dateOfBirth: userDataResponse.dateOfBirth || '',
          personalDetails: userDataResponse.personalDetails || null,
          workHistory: userDataResponse.workHistory || null,
          bvnDetails: userDataResponse.bvnDetails || null,
          profilePic: userDataResponse.profilePic || null,
          verified: typeof userDataResponse.verified === 'boolean' ? userDataResponse.verified : null
        };

        // Save full user data to localStorage
        localStorage.setItem('userData', JSON.stringify(this.userData));
        
        console.log('Updated userData:', this.userData);
        console.log('Verified status saved:', this.userData.verified);
        
        // Check suspension status
        await this.checkSuspensionStatus();
      } catch (error) {
        console.error('Error fetching user data:', error);
        
        // Clear local storage in case of error
        this.clearUserLocalStorage();
        
        // Optionally emit an error event
        this.$emit('fetch-error', error);
      } finally {
        // Ensure loading state is always turned off
        this.isLoading = false;
      }
    },
    
    async checkSuspensionStatus() {
      try {
        const userId = this.$route.params.id;
        const token = Cookies.get('authToken') || Cookies.get('token') || Cookies.get('access_token');
        
        if (!token || !userId) return;
        
        // This is a hypothetical endpoint - you might need to adjust based on your actual API
        const response = await axios.get(
          `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/suspension-status/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Update suspension status based on API response
        if (response.data && response.data.data) {
          this.suspensionStatus = response.data.data.suspensionStatus || '';
          this.isSuspended = this.suspensionStatus === 'open';
        } else {
          this.isSuspended = this.userData.accountStatus === 'suspended';
        }
        
        console.log('Suspension status:', this.suspensionStatus, 'Is suspended:', this.isSuspended);
      } catch (error) {
        console.error('Error checking suspension status:', error);
        // Fallback to account status for suspension status
        this.isSuspended = this.userData.accountStatus === 'suspended';
      }
    },
    
    async handleSuspendAccount() {
      try {
        const userId = this.$route.params.id;
        const token = Cookies.get('authToken') || Cookies.get('token') || Cookies.get('access_token');
        
        if (!token || !userId) {
          console.error('Missing token or user ID');
          return;
        }
        
        if (!this.isSuspended && !this.suspensionReason.trim()) {
          alert('Please provide a reason for suspension');
          return;
        }
        
        const endpoint = `https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/client/account-suspension/${userId}`;
        const payload = {
          suspensionReason: this.suspensionReason
        };
        
        const response = await axios.post(endpoint, payload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Full Suspension Response:', response);
        
        if (response.data.success) {
          // Reload the current page
          window.location.reload();
        } else {
          // Handle potential error in the response
          alert(response.data.message || 'Failed to suspend account');
        }
      } catch (error) {
        console.error('Error suspending account:', error);
        
        // More detailed error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(error.response.data.message || 'An error occurred while suspending the account');
        } else if (error.request) {
          // The request was made but no response was received
          alert('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          alert('Error setting up the suspension request');
        }
      }
    },
    
    openSuspendModal() {
      // Check if the account is already suspended
      if (this.userData.accountStatus === 'suspended') {
        // Open reactivation modal
        this.isDeleteModalOpen = true;
      } else {
        // Open suspension modal
        this.isSuspendModalOpen = true;
      }
    },
    
    closeSuspendModal() {
      this.isSuspendModalOpen = false;
      if (!this.isSuspended) {
        this.suspensionReason = '';
      }
    },
    
    openBasicInfoModal() {
      this.isBasicInfoModalOpen = true;
    },
    
    closeBasicInfoModal() {
      this.isBasicInfoModalOpen = false;
    },
    
    openDeleteModal() {
      this.isDeleteModalOpen = true;
    },
    
    closeReactivateModal() {
      this.isDeleteModalOpen = false;
    },
    
    openPersonalInfoModal() {
      this.isPersonalInfoModalOpen = true;
    },
    
    closePersonalInfoModal() {
      this.isPersonalInfoModalOpen = false;
    },
    
    openEmploymentInfoModal() {
      this.isEmploymentInfoOpen = true;
    },
    
    closeEmploymentInfoModal() {
      this.isEmploymentInfoOpen = false;
    },

    /**
     * Get profile image URL from localStorage or user data
     * @returns {string|null} - The profile image URL or null if not available
     */
    getProfileImageUrl() {
      // First try to get from localStorage
      const storedImage = localStorage.getItem('userProfileImage');
      if (storedImage) {
        return storedImage;
      }
      
      // If not in localStorage, try from userData
      return this.userData.profilePic || null;
    }
  },
  created() {
    if (this.activeTab === 'user') {
      this.fetchUserData();
    }
  },
  watch: {
    activeTab(newTab) {
      if (newTab === 'user') {
        this.fetchUserData();
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  max-width: 85vw;
  margin: 0;
  height: auto;
  overflow: visible;
  font-family: 'Fira Sans', sans-serif;
  background-color: #fff;
  padding: 10px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  font-size: 18px;
  color: #00CCFF;
}

.flex-container {
  display: flex;
  width: 100%;
  gap: 12px;
  justify-content: space-between;
}

.loss{
  margin-top: -170px;
}

.header-button-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 16px;
}

.button-container {
  display: flex;
  width: 350px;
  background: #d9f7ff;
  height: 49px;
  border-radius: 24px;
  padding: 6px 12px;
}

.tab-button {
  flex: 1;
  border-radius: 24px;
  height: 37px;
  transition: background 0.3s ease;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  gap: 8px;
}

.tab-button.active {
  background: #00CCFF;
  color: white;
}

.tab-content {
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
}

.tab-margin{
  margin-top: 100px;
}

.content-box {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  justify-content: space-between;
  align-items: flex-start;
}

.box {
  background: #ffff;
  border-radius: 8px;
  padding: 20px;
}

.basic-info-box {
  display: inline-block;
  width: 49%;
  vertical-align: top;
}

.divider {
  width: 2px;
  background: black;
}

.active {
  color: #00CCFF;
  font-weight: 400;
}

h3 {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #004759;
  margin: 10px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #f2f2f2;
}

.edit {
  float: right;
  cursor: pointer;
  color: #00CCFF;
  font-weight: 400;
}

p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 33px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;
  margin: 4px 0;
}

strong {
  color: #acacb2;
  font-size: 12px;
  font-weight: 500;
  line-height: 16.8px;
  min-width: 40px;
  white-space: nowrap;
}

.normal {
  font-size: 12px;
  color: #004759;
  white-space: nowrap;
  text-align: right;
  flex: 1;
}

button {
  padding: 10px 0;
}

.line {
  width: 1px;
  height: 400px;
  background-color: #e5e5e5;
  margin: 0 15px;
}

.red {
  color: #E85353;
}

.blue {
  color: #004759;
}

.inactive-status {
  color: #E85353;
}

/* Modal styles */
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

.suspend-modal {
  background: white;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.suspend-modal h3 {
  margin-top: 0;
  color: #004759;
  font-size: 18px;
}

.suspension-reason {
  width: 100%;
  min-height: 100px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-button {
  padding: 8px 15px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
}

.confirm-button {
  padding: 8px 15px;
  background-color: #E85353;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #d23b3b;
}

.cancel-button:hover {
  background-color: #e5e5e5;
}
</style>