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
            <img src="/logo1.png" class="logo-img" alt="Reset Password" />
            <h2 class="text-center signin-text">Reset Password</h2>
          </div>
        </div>

        <div class="form-box">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="new-password">New password</label>
              <div class="input-container">
                <input
                  placeholder="********"
                  type="password"
                  id="new-password"
                  name="new-password"
                  v-model="newPassword"
                  required
                  class="input-field"
                />
                <i
                  id="toggleNewPassword"
                  class="fa fa-eye-slash"
                  @click="togglePasswordVisibility('new-password', 'toggleNewPassword')"
                ></i>
              </div>
            </div>

            <div class="form-group">
              <label for="retype-password">Re-type password</label>
              <div class="input-container">
                <input
                  placeholder="********"
                  type="password"
                  id="retype-password"
                  name="retype-password"
                  v-model="retypePassword"
                  required
                  class="input-field"
                />
                <i
                  id="toggleRetypePassword"
                  class="fa fa-eye-slash"
                  @click="togglePasswordVisibility('retype-password', 'toggleRetypePassword')"
                ></i>
              </div>
            </div>
            <div v-if="loading" class="text-center text-blue-500">Loading...</div>
            <div v-if="resetError" class="text-center text-red-500">{{ resetError }}</div>
            <button type="submit" class="submit-btn mt-4">Submit</button>
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
      newPassword: '',
      retypePassword: '',
      loading: false,
      resetError: null
    };
  },
  setup(){
    const toast = useToast();

    return{
      toast
    }
  },
  methods: {
    togglePasswordVisibility(inputId, iconId) {
      const passwordInput = document.getElementById(inputId);
      const icon = document.getElementById(iconId);
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    },

    async handleSubmit() {
      this.resetError = null;
      this.loading = true;
      // Check if the new password and retype password match
      if (this.newPassword !== this.retypePassword) {
        this.resetError = 'Passwords do not match!';
        this.toast.error('Passwords do not match!', {
          timeout: 3000, // Duration in milliseconds
          position: 'top-right',
        });
        this.loading = false;
        return; // Prevent submission if passwords don't match
      }
      try {
          const token = Cookies.get("resetToken");
        const response = await fetchDataWithToken(
          'https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/auth/reset-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password: this.newPassword }),
          }
        );
        if (response.success) {
          this.toast.success(response.message, {
            timeout: 3000, // Duration in milliseconds
            position: 'top-right',
          });
          Cookies.remove("resetToken");
          this.$router.push('/auth/signin');
        } else {
          this.resetError = response.message || 'Password reset failed.';
          this.toast.error(response.message || "Password reset failed.", {
            timeout: 3000, // Duration in milliseconds
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Network error:', error);
        this.resetError = 'Network error occurred. Please try again.';
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

.content-wrapper h2 {
  margin: 0;
}

.signin-text {
  font-weight: 400;
  font-size: 36px;
  line-height: 50.4px;
  align-self: center;
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
  margin-bottom: 21px;
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
  height: 50px; /* Consistent button height */
}

.submit-btn:hover {
  background-color: #0097cc;
}

#toggleNewPassword,
#toggleRetypePassword {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.1em;
  color: #555;
}
.form-container {
  margin-top: 0px;
}
</style>

