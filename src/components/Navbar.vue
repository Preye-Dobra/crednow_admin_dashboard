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
  box-sizing: border-box; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  align-items: center; 
}

.logo-box {
  width: 100px;
  height: 100px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 0px; 
  display: flex;
  justify-content: center;
  align-items: center;
 
}

.sidebar-logo {
  width: 70%;
  height: auto;
}

.nav-list {
  width: 162px; 
  height: auto; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 18px;
  padding: 0;
  margin-top: 8px; 
}

.nav-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  height: 46px;
  top: 12px;
  padding: 12px 10px 10px 12px;
  display: flex;
  align-items: center;
  gap: 10px; 
  border-radius: 8px;
}


.nav-list li:hover {
  background-color: #ffff;
}
.nav-list a:hover {
  color: #004759;
  
}
.nav-list a {
  text-decoration: none;
  color: #ffff;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  height: 22px;
  line-height: 22.4px;
  align-items: center;
}


.nav-icon {
  width: 20px;
  height: 20px;
  object-fit: contain; 
}

.nav-icon:hover {
  width: 20px;
  height: 20px;
  object-fit: contain; 
  color: #004759;
}
</style>










