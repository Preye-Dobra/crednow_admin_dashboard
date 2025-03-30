<template>
  <div class="dashboard-container h-screen">
    <!-- Left Section -->
    <div class="left-section flex items-center justify-center">
      <img src="/signin-img.png" alt="Logo" class="w-3/4 md:w-1/2" />
    </div>

    <!-- Right Section -->
    <div class="right-section flex items-center justify-center">
      <div class="form-container bg-black">
        <div class="logo-box-container">
          <div class="content-wrapper">
            <image src="/logo1.png" class="logo-img" alt="Sign in" />
            <h2 class="text-center signin-text">Sign in</h2>
            <p class="text-gray-500 text-center signin-paragragh">
              Please login to your account
            </p>
          </div>
        </div>

        <div class="form-box">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                placeholder="Enter Email"
                type="email"
                id="email"
                name="email"
                required
                class="input-field"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <div class="password-input-wrapper">
                <input
                  placeholder="Enter Password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  required
                  class="input-field"
                  v-model="password"
                />
                <i
                  class="password-toggle-icon"
                  :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                  @click="togglePasswordVisibility"
                ></i>
              </div>
              <a href="/auth/verify-email" class="forgot-password">Forgot Password?</a>
            </div>
            <div v-if="loginError" class="text-center text-red-500 error-message">{{ loginError }}</div>
            <button type="submit" class="submit-btn" :disabled="loading">
              <span v-if="!loading">Continue</span>
              <span v-else class="loading-spinner-btn">
                <i class="fa fa-spinner fa-spin"></i> Loading...
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'; // Import js-cookie
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      loginError: null,
      showPassword: false, // Added state for password visibility
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    
    redirectBasedOnRole(userProfile) {
      // Check if user role is super-agent
      if (userProfile && userProfile.role === 'super-agent') {
        // Redirect to collection-case page
        this.$router.push('/collection-case');
      } else {
        // Redirect to dashboard for all other roles
        this.$router.push('/dashboard');
      }
    },
    
    async handleSubmit() {
      this.loginError = null; // Clear previous errors
      this.loading = true; // Start loading
      
      try {
        const response = await fetch(
          'https://crednow-app-t4vnc.ondigitalocean.app/api/v1/admin/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          // Assuming the token is in data.token or data.accessToken
          const token = data.token || data.accessToken;
          
          if (token) {
            // Set the token in a cookie (using js-cookie)
            Cookies.set('authToken', token, {
              expires: 7,
              secure: true,
              sameSite: 'Strict',
            }); // expires in 7 days
            
            // Create user profile object
            let userProfile = null;
            
            // Store user data in localStorage under 'UserProfile'
            if (data.data) {
              userProfile = {
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                email: data.data.email,
                role: data.data.role
              };
              localStorage.setItem('UserProfile', JSON.stringify(userProfile));
              
              // Log for debugging
            //  console.log('User role:', userProfile.role);
              
              // Notify with a toast
              this.toast.success('Login successful!', {
                timeout: 3000,
                position: 'top-right',
              });
              
              // Redirect based on user role
              this.redirectBasedOnRole(userProfile);
            } else {
              this.loginError = 'User data not found in response.';
              this.$router.push('/dashboard'); // Fallback to dashboard if no user data
            }
          } else {
            this.loginError = 'Token not found in response.';
          }
        } else {
          const errorData = await response.json();
          this.loginError = errorData.message || 'Login failed.'; // Assuming the server returns an error message
            
          this.toast.error('Login failed!', {
            timeout: 3000,
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Network error:', error);
        this.loginError = 'Network error occurred. Please try again.';
        this.toast.error('Network error!', {
          timeout: 3000,
          position: 'top-right',
        });
      } finally {
        this.loading = false; // Stop loading
      }
    },
  },
};
</script>

<style scoped>
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
  width: 541px;
  height: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
}

.logo-img {
  width: 120px;
  display: block;
  margin: 0;
  padding: 0;
  max-width: 100%;
  height: auto;
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
  font-size: 18px;
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

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
}

label {
  color: #004759;
  font-size: 14px;
  margin-bottom: 8px;
}

.input-field,
.submit-btn {
  padding: 18px 18px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 30px;
  width: 100%;
  height: 46px;
}

.password-input-wrapper {
  position: relative;
  width: 100%;
}

.password-toggle-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 16px;
  color: #555;
}

.input-field::placeholder {
  color: #acacb2;
  font-size: 14px;
}

.forgot-password {
  margin-top: 8px;
  font-size: 16px;
  color: #00ccff;
  text-decoration: none;
  font-weight: 400;
  text-align: right;
}

.submit-btn {
  background-color: #00ccff;
  color: #fff;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.submit-btn:disabled {
  background-color: #80e5ff;
  cursor: not-allowed;
}

.loading-spinner-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.error-message {
  margin-bottom: 10px;
}
.form-container {
  margin-top: 0px;
}
</style>



