<template>
  <div class="dashboard-container h-screen">
    <!-- Left Section -->
    <div class="left-section flex items-center justify-center">
      <img src="/signin-img.png" alt="Logo" class="w-3/4 md:w-1/2" />
    </div>

    <!-- Right Section -->
    <div class="right-section flex items-center justify-center">
      <div class="form-container">
        <div class="logo-box-container">
          <div class="content-wrapper">
            <img src="/logo1.png" class="logo-img" alt="Sign in" />
            <h2 class="text-center signin-text">Enter your OTP</h2>
            <p class="text-gray-500 text-center signin-paragragh">
              An OTP has been sent to your email
            </p>
          </div>
        </div>

        <div class="form-box">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="code">Enter OTP</label>
              <div class="input-container">
                <input
                  placeholder="Enter your OTP"
                  type="password"
                  id="code"
                  name="code"
                  v-model="code"
                  required
                  class="input-field"
                />
                <i id="togglePassword" class="fa fa-eye-slash" @click="togglePasswordVisibility"></i>
              </div>
              <div v-if="loading" class="text-center text-blue-500">Loading...</div>
              <div v-if="verificationError" class="text-center text-red-500">{{ verificationError }}</div>
            </div>

            <button type="submit" class="submit-btn mt-4">Verify</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { fetchDataWithToken } from '../../auth';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      code: '',
      loading: false,
      verificationError: null,
    };
  },
  setup(){
    const toast = useToast();

    return{
      toast
    }
  },
  methods: {
    async handleSubmit() {
      this.verificationError = null;
      this.loading = true;

      try {
        const token = Cookies.get("resetToken");
        console.log("Token is:", token)
        console.log("Error before response");
         const response = await fetchDataWithToken(
          'https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/auth/verify-forgot-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ otp: this.code, token: token }),
          }
        );
        console.log("response is:", response)

        if (response.success) {
            this.toast.success(response.message, {
              timeout: 3000, // Duration in milliseconds
              position: 'top-right',
            });
          // Navigate to the /auth/set-password route
          this.$router.push('/auth/set-password');
        } else {
          this.verificationError = response.message || 'OTP verification failed.';
            this.toast.error(response.message || "OTP verification failed.", {
              timeout: 3000, // Duration in milliseconds
              position: 'top-right',
            });
        }
      } catch (error) {
        console.error('Network error:', error);
        this.verificationError = 'Network error occurred. Please try again.';
        this.toast.error("Network error!", {
              timeout: 3000, // Duration in milliseconds
              position: 'top-right',
            });
      } finally {
        this.loading = false;
      }
    },
    // Toggle password visibility
    togglePasswordVisibility() {
      const passwordInput = document.getElementById('code');
      const icon = document.getElementById('togglePassword');
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      }
    },
  },
};
</script>

<style scoped>
/* ... (Your existing styles) ... */
.dashboard-container {
  display: flex;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  margin: 0;
  padding: 0;
  overflow: hidden; /* Prevent scrolling */
}

.left-section {
  width: 50%; /* Exact 50% width */
  display: flex;
  
  background-color: #00ccff;
  border-radius: 0 0 150px 0;
}

.right-section {
  width: 50%; /* Exact 50% width */
  display: flex;
  
  background-color: #ffffff;
}
.left-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00ccff;
  padding: 0px;
  width: 100%;
  border-radius: 0 0 150px 0;
}

.right-section {
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
  width: 100%;
}

.logo-box-container {
  width: 260px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 100px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
}

.logo-img {
  width: 100px;
  display: block;
  margin: 0;
}

.content-wrapper h2,
.content-wrapper p {
  margin: 0;
}

.signin-text {
  font-weight: 400;
  font-size: 36px;
  line-height: 50.4px;
  align-self: center;
  color: #004759;
}

.signin-paragragh {
  font-weight: 400;
  font-size: 16px;
  line-height: 19.6px;
  color: #004759;
}

.form-box {
  width: 425px;
  height: auto;
  background-color: #fff;
  margin-top: 30px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  flex: 1;
}

label {
  color: #004759;
  font-size: 16px;
  margin-bottom: 6px;
}

.input-container {
  position: relative;
}

.input-field {
  padding: 18px 18px; /* Reduced padding */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 30px;
  width: 425px;
  height: 46px; /* Reduced height */
}

.input-field::placeholder {
  color: #acacb2;
  font-size: 14px;
}

.submit-btn {
  width: 425px;
  padding: 14px;
  background-color: #00ccff;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0097cc;
  
}

#togglePassword {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.1em;
  color: #555;
}
.form-container{
  margin-top: 0px;
}
</style>


