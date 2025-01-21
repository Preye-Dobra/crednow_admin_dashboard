<template>
  <div class="sidebar">
    <!-- Sidebar Content: Logo inside a box at the top -->
    <div class="logo-box">
      <img src="/logo1.png" alt="Logo" class="sidebar-logo" />
    </div>

    <div class="nav-list">
      <ul>
        <li><a href="#"><img src="/public/all.png" alt="All applications" class="nav-icon" /> All applications</a></li>
        <li><a href="#"><img src="/public/cl.png" alt="All client" class="nav-icon" /> All client</a></li>
         
        <li><a href="#"><img src="/public/finance.png" alt="Financial" class="nav-icon" /> Financial</a></li>
        
         <li><a href="#"><img src="/public/cocase.png" alt="Collection case" class="nav-icon" /> Collection case</a></li>
        <li><a href="#"><img src="/public/opera.png" alt="Operation" class="nav-icon" /> Operation</a></li>
        <li><a href="#"><img src="/public/cl.png" alt="Admin" class="nav-icon" /> Admin</a></li>
        <li><a href="#"><img src="/public/bro.png" alt="Admin" class="nav-icon" /> Admin</a></li>  
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
.sidebar {
  width: 198px;
  height: 1024px;
  background-color: #00ccff;
  color: white;
  font-size: 16px;
  box-sizing: border-box; /* Ensures padding doesn't affect the width and height */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items to the top */
  padding: 20px;
}

.logo-box {
  width: 100px;
  height: 100px;
  padding: 15px;
  border-radius: 8px; /* Optional: Adds rounded corners to the logo box */
  margin-bottom: 40px; /* Adds space between the logo and other content */
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-logo {
  width: 80%; /* Adjust size as needed */
  height: auto;
}

.nav-list {
  width: 162px; 
  height: 466px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  gap: 24px; 
  padding: 0;
}

.nav-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  height: 46px;
  padding: 12px 10px 10px 12px;
  display: flex;
  align-items: center;
  
  gap: 10px; /* Space between the icon and text */
  margin-bottom: 12px; /* Adds spacing below each item */
}

.nav-list a {
  text-decoration: none;
  color: #ffff;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  height: 22px;
  line-height: 22.4px;
  align-items: center; /* Align icon and text in the middle */
}

.nav-list a:hover {
  color: #00ccff;
}

.nav-icon {
  width: 20px;
  height: 20px;
  object-fit: contain; /* Ensures icons fit inside their container */
}
</style>






