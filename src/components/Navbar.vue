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
        <li><a href="#"><img src="/public/bro.png" alt="Admin" class="nav-icon" /> Broadcast</a></li>
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
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.sidebar {
  width: 198px;
  height: 1024px;
  background-color: #00ccff;
  color: white;
  font-size: 12px;
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
  padding: 12px 10px 10px 12px;
  display: flex;
  align-items: center;
  gap: 12px; /* Adjusted gap between icon and text */
  border-radius: 8px;
}

.nav-list a {
  text-decoration: none;
  color: #ffff;
  font-size: 12px;
  font-weight: 400;
  display: flex;
   font-family: 'Fira Sans', sans-serif;
  align-items: center; 
  gap: 8px; /* Add space between icon and text inside the <a> tag */
}

.nav-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  transition: filter 0.3s ease; 
}

/* Hover effect for list items */
.nav-list li:hover {
  background-color: #ffff;
}

.nav-list a:hover {
  color: #004759;
}

/* Icon hover effect */
.nav-list li:hover .nav-icon {
  filter: brightness(0) saturate(100%) invert(51%) sepia(66%) saturate(290%) hue-rotate(158deg) brightness(95%) contrast(94%);
}

</style>











