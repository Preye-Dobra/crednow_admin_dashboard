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
            <h2 class="text-center signin-text">Verify your email</h2>
            <p class="text-gray-500 text-center signin-paragragh">Enter your email</p>
          </div>
        </div>

        <div class="form-box">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Enter email</label>
              <input
                placeholder="youremail@example.com"
                type="email"
                id="email"
                name="email"
                v-model="email"
                required
                class="input-field"
              />
            </div>
            <div v-if="loading" class="text-center text-blue-500">Loading...</div>
            <div v-if="verificationError" class="text-center text-red-500">{{ verificationError }}</div>
            <button type="submit" class="submit-btn mt-4">Verify</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { fetchDataWithToken } from '/auth';
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      email: '', // Store the email input value
      loading: false,
      verificationError: null
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
        const response = await fetchDataWithToken('https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.email }),
        });

        if (response.success) {
          // Store the token in a cookie
          Cookies.set('resetToken', response.token, {
            expires: 1,
            secure: true,
            sameSite: 'Strict',
          });
          this.toast.success(response.message, {
          timeout: 3000, // Duration in milliseconds
          position: 'top-right',
        });
          // Navigate to the /auth/password-reset route
          this.$router.push('/auth/password-reset');
        } else {
          this.verificationError = response.message || 'Verification failed.';
          this.toast.error(response.message || "Verification failed", {
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
      }
      finally{
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* ... (Your existing styles) ... */
.dashboard-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.left-section {
  width: 50%;
  display: flex;
  background-color: #00ccff;
  border-radius: 0 0 150px 0;
}

.right-section {
  width: 50%;
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
  margin-top: 90px;
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
  margin-top: 0px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
}
.form-container {
  margin-top: 100px;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 21px;
}

label {
  color: #004759;
  font-size: 16px;
  margin-bottom: 6px;
}

.input-field {
  padding: 18px 18px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 30px;
  width: 425px;
  height: 46px;
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
.form-container {
  margin-top: 0px;
}
</style>

