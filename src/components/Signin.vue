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
            <p class="text-gray-500 text-center signin-paragragh">Please login to your account</p>
          </div>
        </div>

        <div class="form-box">
          <form action="post">
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                placeholder="Enter Email"
                type="email"
                id="email"
                name="email"
                required
                class="input-field"
              />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <div style="position: relative; display: flex; align-items: center;">
                <input
                  placeholder="Enter Password"
                  type="password"
                  id="password"
                  name="password"
                  required
                  class="input-field"
                />
                <i
                  id="togglePassword"
                  class="fa fa-eye-slash"
                  style="
                    position: absolute;
                    right: 10px;
                    cursor: pointer;
                    font-size: 1.0em;
                    color: #555;
                  "
                ></i>
              </div>
              <a href="#" class="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" class="submit-btn">Continue</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    togglePassword.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      // Toggle icons using Font Awesome classes
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    });
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: row;
  height: 1024px;
  padding: 0;
  margin: 0;
  width: 1440px;
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
  width: 250px;
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
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  color: #004759;
  font-size: 14px;
  margin-bottom: 8px;
}

.input-field,
.submit-btn {
  width: 100%;
  height: 50px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-sizing: border-box;
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
}
</style>




