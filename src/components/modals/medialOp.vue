<template>
   <div class="container">
     <!-- Navigation buttons -->
     <div class="trigger-button" style="color: #004759;">
       <div
          class="report"
          :class="{ active: activeSection === 'ocr' }"
         @click="setActiveSection('ocr')"
         style=""
       >
         <h4 style="font-size: 16px; font-weight: 400;line-height: 22.4px;">OCR Report</h4>
       </div>
       <div
          class="recognition"
         :class="{ active: activeSection === 'face' }"
         @click="setActiveSection('face')"
       >
         <h4 style="font-size: 16px; font-weight: 400;line-height: 22.4px;">Face Recognition</h4>
       </div>
     </div>
     
     <!-- OCR Report Section -->
     <table v-if="activeSection === 'ocr'" class="data-table">
       <thead>
         <tr>
           <th>Recognition Result</th>
           <th>Name</th>
           <th>BVN Number</th>
           <th>Creation Time</th>
         </tr>
       </thead>
       <tbody>
         <tr v-if="loading">
           <td colspan="4">Loading...</td>
         </tr>
         <tr v-else-if="error">
           <td colspan="4">{{ error }}</td>
         </tr>
         <tr v-else>
           <td :style="{ color: bvnDetails ? 'green' : 'red' } " style="font-size: 12px;">
             {{ bvnDetails ? 'Successful' : 'Failed' }}
           </td>
           <td style="font-size: 12px;">{{ bvnDetails ? `${bvnDetails.firstName} ${bvnDetails.lastName}` : '-' }}</td>
           <td style="font-size: 12px;">{{ bvnDetails ? bvnDetails.bvn : '-' }}</td>
           <td v-html="bvnDetails ? formatCreatedAt(bvnDetails.createdAt) : '-'" style="font-size: 12px;"></td>
         </tr>
       </tbody>
     </table>
     
     <!-- Face Recognition Section -->
     <table v-if="activeSection === 'face'" class="data-table">
       <thead>
         <tr>
           <th>Recognition Result</th>
           <th>BVN Image</th>
           <th>Head Image</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>
             <div class="failed-container" style="background-color: #fff;">
               <h1 style="font-size: 12px; color:#004759;">{{ profileImage ? 'Successful' : 'Failed' }}</h1>
             </div>
           </td>
           <td>
             <div class="failed-container">
               <h1></h1>
             </div>
           </td>
           <td>
             <div class="failed-container" :style="profileImage ? { padding: '0' } : {}">
               <img v-if="profileImage" :src="profileImage" alt="User Profile" class="profile-image" />
               <h1 v-else></h1>
             </div>
           </td>
         </tr>
       </tbody>
     </table>
   </div>
</template>

<script>
export default {
  name: "ToggleSections",
  data() {
    return {
      activeSection: 'ocr', // Default to OCR section
      bvnDetails: null,
      profileImage: null,
      loading: true,
      error: null
    }
  },
  created() {
    this.fetchBvnDetailsFromLocalStorage();
    this.fetchProfileImageFromLocalStorage();
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
    fetchBvnDetailsFromLocalStorage() {
      try {
        // Try to retrieve user data from localStorage
        const savedUserData = localStorage.getItem('userData');
        
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          
          // Check if BVN details exist
          if (userData.bvnDetails) {
            this.bvnDetails = userData.bvnDetails;
            console.log('BVN Details from localStorage:', this.bvnDetails);
          } else {
            this.error = 'No BVN details found in saved user data';
          }
        } else {
          this.error = 'No user data found in localStorage';
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.error = 'Error retrieving user data';
      } finally {
        this.loading = false;
      }
    },
    fetchProfileImageFromLocalStorage() {
      try {
        // First try to get from userProfileImage in localStorage
        const profileImage = localStorage.getItem('userProfileImage');
        
        if (profileImage) {
          this.profileImage = profileImage;
          console.log('Profile image URL retrieved from localStorage:', this.profileImage);
          return;
        }
        
        // If not found, try to get from userData
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          if (userData.profilePic) {
            this.profileImage = userData.profilePic;
            console.log('Profile image URL retrieved from userData:', this.profileImage);
          } else {
            console.warn('No profile image found in user data');
          }
        }
      } catch (error) {
        console.error('Error retrieving profile image:', error);
      }
    },
    formatCreatedAt(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const formattedTime = `<span style="color: #00CCFF;">${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}</span>`;
      return `${formattedDate} ${formattedTime}`;
    }
  }
};
</script>


<style scoped>
.container {
  height: auto;
  width: 100%;
  background-color: aquamarine;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 100px;
}

.trigger-button {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 18px;
}

.report, .recognition {
  width: 142px;
  height: 42px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.report.active, .recognition.active {
  color: #00ccff;
  border-bottom: 2px solid #00ccff;
}

.report:not(.active), .recognition:not(.active) {
  color: rgb(17, 16, 16);
  border-bottom: none;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th {
  background: #F2F7F8;
  padding: 14px;
  font-size: 16px;
  color: #004759;
  text-align: center;
  font-weight: 400;
}

.data-table td {
  padding: 14px;
  text-align: center;
  background: #fff;
  color: #585865;
}

.failed-container {
  height: 208px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #D9D9D9;
  margin: 10px auto;
  font-size: 12px;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

h4 {
  margin: 0;
}
</style>

