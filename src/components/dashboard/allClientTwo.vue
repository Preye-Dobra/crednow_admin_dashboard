<template>
  <div>
    <div class="table-scroll-buttons">
      <!-- <button @click="scrollLeft" class="scroll-button">◀ Scroll Left</button>
      <button @click="scrollRight" class="scroll-button">Scroll Right ▶</button> -->
    </div>
    <div class="table-container" ref="tableContainer">
      <table class="data-table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Id Card</th>
            <th>Status</th>
            <th>Registration Time</th>
            <th>User Level</th>
            <th>Email</th>
            <th>Deleted</th>
            <th>Eligibility</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.userId }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.idCard }}</td>
            <td :class="getStatusClass(item.status)">{{ item.status }}</td>
            <td>{{ item.registrationTime }}</td>
            <td>{{ item.userLevel }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.deleted }}</td>
            <td>{{ item.eligibility }}</td>
            <td>{{ item.operation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [
        {
          userId: '1001',
          name: 'John Doe',
          idCard: 'ID12345',
          status: 'Active',
          registrationTime: '2025-01-20 08:30',
          userLevel: 'Admin',
          email: 'johndoe@example.com',
          deleted: 'No',
          eligibility: 'Eligible',
          operation: 'Edit',
        },
        {
          userId: '1002',
          name: 'Jane Smith',
          idCard: 'ID67890',
          status: 'Inactive',
          registrationTime: '2025-01-18 14:45',
          userLevel: 'Member',
          email: 'janesmith@example.com',
          deleted: 'Yes',
          eligibility: 'Not Eligible',
          operation: 'Delete',
        },
        {
          userId: '1003',
          name: 'Sam Brown',
          idCard: 'ID54321',
          status: 'Active',
          registrationTime: '2025-01-15 09:00',
          userLevel: 'Guest',
          email: 'sambrown@example.com',
          deleted: 'No',
          eligibility: 'Eligible',
          operation: 'Edit',
        },
        {
          userId: '1004',
          name: 'Alice Green',
          idCard: 'ID98765',
          status: 'Suspended',
          registrationTime: '2025-01-10 16:30',
          userLevel: 'Admin',
          email: 'alicegreen@example.com',
          deleted: 'Yes',
          eligibility: 'Not Eligible',
          operation: 'Restore',
        },
        {
          userId: '1005',
          name: 'Bob White',
          idCard: 'ID11223',
          status: 'Active',
          registrationTime: '2025-01-05 11:20',
          userLevel: 'Member',
          email: 'bobwhite@example.com',
          deleted: 'No',
          eligibility: 'Eligible',
          operation: 'Edit',
        },
      ],
    };
  },
  methods: {
    getStatusClass(status) {
      return status === 'Active' ? 'active-status' : 'inactive-status';
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  padding: 8px;
  white-space: nowrap;
  background-color: #fff;
  border-radius: 10px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  text-align: left;
}

tr th {
  font-size: 14px;
  line-height: 19.6px;
  text-align: center;
  color: #004759;
  font-weight: 400;
}

tr td {
  font-size: 12px;
  line-height: 16.8px;
  font-weight: 400;
  text-align: center;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
}

.table-scroll-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.scroll-button {
  padding: 5px 15px;
  margin: 0 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.scroll-button:hover {
  background-color: #0056b3;
}

.pass {
  color: #00CCFF;
}

.waiting {
  color: orange;
}

button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

/* Remove borders from table */
.data-table th,
.data-table td {
  border: none;
}

/* Style for Active Status */
.active-status {
  color: #00CCFF;
}

/* Style for Inactive or Suspended Status */
.inactive-status {
  color: red;
}
</style>

