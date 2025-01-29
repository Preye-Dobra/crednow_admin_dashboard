<template>
  <div
    class="user-info-container bg-gray-100 p-6 rounded-lg shadow-lg"
    style="width: 1218px; height: auto;"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 bg-white px-4 py-2 border-b">
      <!-- Tabs aligned to the left -->
      <div class="flex space-x-4 trigger-container">
        <button
          class="tab-button"
          :class="{'active': activeTab === 'user'}"
          @click="toggleTab('user')"
        >
          User Information
        </button>
        <button
          class="tab-button"
          :class="{'active': activeTab === 'media'}"
          @click="toggleTab('media')"
        >
          Media Information
        </button>
      </div>

      <!-- Delete button aligned to the right -->
      <button
        class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
      >
        Delete Client
      </button>
    </div>

    <!-- User Information Tab -->
    <div v-if="activeTab === 'user'" class="user-info-content">
      <!-- Basic Information -->
      <div class="basic-info-section mb-6">
        <h3 class="text-lg font-semibold mb-4">Basic Information</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p><strong>User ID:</strong> 198859</p>
            <p><strong>Name:</strong> Covenant Oubisi</p>
            <p><strong>Mobile:</strong> 906/459898</p>
            <p><strong>International Area Code:</strong> 198859</p>
            <p><strong>Registration Time:</strong> 2025-01-04 13:45:00</p>
            <p><strong>Current Equipment:</strong> Redmi 2873N002A</p>
            <p><strong>User Level:</strong> Level 1</p>
            <p><strong>Loan Settlement Times:</strong> 0</p>
          </div>
          <div>
            <p><strong>Application Channel:</strong> -</p>
            <p><strong>Face Recognition Score:</strong> -1,000000</p>
            <p><strong>Status:</strong> Active</p>
            <p><strong>Expired Date:</strong> -</p>
            <p><strong>Last Logged in IP:</strong> 102.90.79.152</p>
            <p><strong>Number of Borrowing:</strong> 0</p>
            <p><strong>Application Progress:</strong> -</p>
            <p><strong>Package Name Applied for:</strong> -</p>
          </div>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="personal-info-section mb-6">
        <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> Covenant Oubisi Bello</p>
            <p><strong>Birthday:</strong> 1996-12-23</p>
            <p><strong>Province:</strong> Kaduna</p>
            <p><strong>City:</strong> Kanuna South</p>
          </div>
          <div>
            <p><strong>Address:</strong> Egypt Road Barnawa</p>
            <p><strong>Mailbox:</strong> covenant@hotmail.com</p>
            <p><strong>Education Level:</strong> Bachelor</p>
            <p><strong>Marital Status:</strong> Unmarried</p>
          </div>
        </div>
      </div>

      <!-- Employment Information -->
      <div class="employment-info-section">
        <h3 class="text-lg font-semibold mb-4">Employment Information</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Corporation Name:</strong> Mankind factory</p>
            <p><strong>City of the Company:</strong> Port Harcourt</p>
            <p><strong>Work Phone:</strong> 816760767</p>
            <p><strong>Monthly Income before Tax:</strong> 500000</p>
          </div>
          <div>
            <p><strong>Province of Company:</strong> Rivers</p>
            <p><strong>Company Address:</strong> East west Road</p>
            <p><strong>Occupation:</strong> Banker</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Media Information Tab -->
    <div v-if="activeTab === 'media'" class="media-info-content">
      <!-- OCR Report Section -->
      <div class="ocr-report-section mb-6">
        <h3 class="text-lg font-semibold mb-4">OCR Report</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Recognition Result:</strong> Failed</p>
            <p><strong>Name:</strong> Isaac Emmanuel</p>
            <p><strong>Image Identification ID:</strong> 9098989898</p>
            <p><strong>Creation Time:</strong> 2025-02-01 22:33:08</p>
          </div>
        </div>
      </div>

      <!-- Face Recognition Section -->
      <div class="face-recognition-section">
        <h3 class="text-lg font-semibold mb-4">Face Recognition</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Recognition Result:</strong> Failed</p>
            <p><strong>Name:</strong> Isaac Emmanuel</p>
            <p><strong>Image Identification ID:</strong> 9098989898</p>
            <p><strong>Creation Time:</strong> 2025-02-01 22:33:08</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfoSection",
  data() {
    return {
      activeTab: "user", // Default active tab
    };
  },
  methods: {
    toggleTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
.user-info-container {
  width: 1218px; /* Fixed width for the container */
  margin: 0 auto; /* Centers the container */
  height: 417px;
}
.user-info-content{
  width: 519px;
  background-color: #3182ce;
  height: 308px;
}
button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ef4444; /* Changes to red on hover */
}

button:focus {
  outline: none; /* Removes the default focus outline */
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.mb-4 {
  margin-bottom: 1rem;
}

.bg-white {
  background-color: #ffffff;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.border-b {
  border-bottom: 2px solid #e2e8f0;
}

.text-blue-600 {
  color: #3182ce;
}

.text-gray-600 {
  color: #4a5568;
}

.font-medium {
  font-weight: 500;
}

.hover\:text-blue-600:hover {
  color: #3182ce;
}

.bg-red-500 {
  background-color: #ef4444;
}

.text-white {
  color: #ffffff;
}

.rounded {
  border-radius: 0.375rem;
}

.hover\:bg-red-600:hover {
  background-color: #dc2626;
}

.transition {
  transition: all 0.3s ease;
}

.duration-300 {
  transition-duration: 300ms;
}

.focus\:outline-none:focus {
  outline: none;
}

.trigger-container {
  display: flex;
  gap: 1rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: #4a5568;
  border-radius: 0.375rem; /* Border radius for the buttons */
  transition: all 0.3s ease;
  background: none;
  cursor: pointer;
}

.tab-button:hover {
  color: #3182ce;
}

.tab-button.active {
  color: #3182ce;
  border-bottom: 2px solid #3182ce; /* Add a blue bottom border for active state */
}

.user-info-content,
.media-info-content {
  padding: 1rem;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.gap-4 {
  gap: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.font-semibold {
  font-weight: 600;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
