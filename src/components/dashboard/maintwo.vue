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
            <th>Loan Number</th>
            <th>Result Of The Automatic Audit</th>
            <th>Product Name</th>
            <th>Name</th>
            <th>Application Channel</th>
            <th>Gender</th>
            <th>User Level</th>
            <th>App Name</th>
            <th>Mobile</th>
            <th>Loan Tenure</th>
            <th>Amount</th>
            <th>Application Type</th>
            <th>Loan Type</th>
            <th>Application Status</th>
            <th>Final Approval Time</th>
            <th>Enter Approval Time</th>
            <th>Successful Lending Time</th>
            <th>Rejection Phase</th>
            <th>Refuse Reason</th>
            <th>App Version</th>
            <th>App Package</th>
            <th>Application Method</th>
            <th>Tag</th>
            <th>Is Privacy Data Authorized</th>
            <th>User Unique Number</th>
            <th>Reviewer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.loanNumber }}</td>
            <td :class="{'pass': item.auditResult === 'Pass', 'waiting': item.auditResult === 'WAITING_PRE_REVIEW'}">
              {{ item.auditResult }}
            </td>
            <td>{{ item.productName }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.applicationChannel }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.userLevel }}</td>
            <td>{{ item.appName }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.loanTenure }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.applicationType }}</td>
            <td>{{ item.loanType }}</td>
            <td>{{ item.applicationStatus }}</td>
            <td>{{ item.finalApprovalTime }}</td>
            <td>{{ item.enterApprovalTime }}</td>
            <td>{{ item.successfulLendingTime }}</td>
            <td>{{ item.rejectionPhase }}</td>
            <td>{{ item.refuseReason }}</td>
            <td>{{ item.appVersion }}</td>
            <td>{{ item.appPackage }}</td>
            <td>{{ item.applicationMethod }}</td>
            <td>{{ item.tag }}</td>
            <td>{{ item.isPrivacyDataAuthorized }}</td>
            <td>{{ item.userUniqueNumber }}</td>
            <td>{{ item.reviewer }}</td>
            <td>
              <div class="button-container">
                <button class="approve-button" @click="approveLoan(item.loanNumber)">Approve</button>
                <button class="reject-button" @click="rejectLoan(item.loanNumber)">Reject</button>
              </div>
            </td>
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
          loanNumber: "211024",
          auditResult: "Pass",
          productName: "Crednow",
          name: "Isaac Emmanuel",
          applicationChannel: "Googleadwords_int",
          gender: "Male",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098989898",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Approved",
          finalApprovalTime: "2023-10-22 10:30",
          enterApprovalTime: "2023-10-21 15:45",
          successfulLendingTime: "2023-10-23 09:00",
          rejectionPhase: "N/A",
          refuseReason: "N/A",
          appVersion: "v3.0",
          appPackage: "com.crednow",
          applicationMethod: "Online",
          tag: "Priority",
          isPrivacyDataAuthorized: "Yes",
          userUniqueNumber: "CN20231024",
          reviewer: "John Doe",
        },
        {
          loanNumber: "211023",
          auditResult: "WAITING_PRE_REVIEW",
          productName: "Crednow",
          name: "Rebecca Tife",
          applicationChannel: "Default",
          gender: "Female",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098981234",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Pending",
          finalApprovalTime: "N/A",
          enterApprovalTime: "2023-10-20 12:30",
          successfulLendingTime: "N/A",
          rejectionPhase: "Initial Review",
          refuseReason: "Insufficient Credit Score",
          appVersion: "v2.0",
          appPackage: "com.crednow",
          applicationMethod: "In-Person",
          tag: "Regular",
          isPrivacyDataAuthorized: "No",
          userUniqueNumber: "CN20231023",
          reviewer: "Jane Smith",
        },
        {
          loanNumber: "211023",
          auditResult: "WAITING_PRE_REVIEW",
          productName: "Crednow",
          name: "Rebecca Tife",
          applicationChannel: "Default",
          gender: "Female",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098981234",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Pending",
          finalApprovalTime: "N/A",
          enterApprovalTime: "2023-10-20 12:30",
          successfulLendingTime: "N/A",
          rejectionPhase: "Initial Review",
          refuseReason: "Insufficient Credit Score",
          appVersion: "v2.0",
          appPackage: "com.crednow",
          applicationMethod: "In-Person",
          tag: "Regular",
          isPrivacyDataAuthorized: "No",
          userUniqueNumber: "CN20231023",
          reviewer: "Jane Smith",
        },
        {
          loanNumber: "211023",
          auditResult: "WAITING_PRE_REVIEW",
          productName: "Crednow",
          name: "Rebecca Tife",
          applicationChannel: "Default",
          gender: "Female",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098981234",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Pending",
          finalApprovalTime: "N/A",
          enterApprovalTime: "2023-10-20 12:30",
          successfulLendingTime: "N/A",
          rejectionPhase: "Initial Review",
          refuseReason: "Insufficient Credit Score",
          appVersion: "v2.0",
          appPackage: "com.crednow",
          applicationMethod: "In-Person",
          tag: "Regular",
          isPrivacyDataAuthorized: "No",
          userUniqueNumber: "CN20231023",
          reviewer: "Jane Smith",
        },
        {
          loanNumber: "211023",
          auditResult: "WAITING_PRE_REVIEW",
          productName: "Crednow",
          name: "Rebecca Tife",
          applicationChannel: "Default",
          gender: "Female",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098981234",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Pending",
          finalApprovalTime: "N/A",
          enterApprovalTime: "2023-10-20 12:30",
          successfulLendingTime: "N/A",
          rejectionPhase: "Initial Review",
          refuseReason: "Insufficient Credit Score",
          appVersion: "v2.0",
          appPackage: "com.crednow",
          applicationMethod: "In-Person",
          tag: "Regular",
          isPrivacyDataAuthorized: "No",
          userUniqueNumber: "CN20231023",
          reviewer: "Jane Smith",
        },
        {
          loanNumber: "211023",
          auditResult: "WAITING_PRE_REVIEW",
          productName: "Crednow",
          name: "Rebecca Tife",
          applicationChannel: "Default",
          gender: "Female",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098981234",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Pending",
          finalApprovalTime: "N/A",
          enterApprovalTime: "2023-10-20 12:30",
          successfulLendingTime: "N/A",
          rejectionPhase: "Initial Review",
          refuseReason: "Insufficient Credit Score",
          appVersion: "v2.0",
          appPackage: "com.crednow",
          applicationMethod: "In-Person",
          tag: "Regular",
          isPrivacyDataAuthorized: "No",
          userUniqueNumber: "CN20231023",
          reviewer: "Jane Smith",
        },
        {
          loanNumber: "211023",
          auditResult: "WAITING_PRE_REVIEW",
          productName: "Crednow",
          name: "Rebecca Tife",
          applicationChannel: "Default",
          gender: "Female",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098981234",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Pending",
          finalApprovalTime: "N/A",
          enterApprovalTime: "2023-10-20 12:30",
          successfulLendingTime: "N/A",
          rejectionPhase: "Initial Review",
          refuseReason: "Insufficient Credit Score",
          appVersion: "v2.0",
          appPackage: "com.crednow",
          applicationMethod: "In-Person",
          tag: "Regular",
          isPrivacyDataAuthorized: "No",
          userUniqueNumber: "CN20231023",
          reviewer: "Jane Smith",
        },
        {
          loanNumber: "211023",
          auditResult: "WAITING_PRE_REVIEW",
          productName: "Crednow",
          name: "Rebecca Tife",
          applicationChannel: "Default",
          gender: "Female",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098981234",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Pending",
          finalApprovalTime: "N/A",
          enterApprovalTime: "2023-10-20 12:30",
          successfulLendingTime: "N/A",
          rejectionPhase: "Initial Review",
          refuseReason: "Insufficient Credit Score",
          appVersion: "v2.0",
          appPackage: "com.crednow",
          applicationMethod: "In-Person",
          tag: "Regular",
          isPrivacyDataAuthorized: "No",
          userUniqueNumber: "CN20231023",
          reviewer: "Jane Smith",
        },{
          loanNumber: "211023",
          auditResult: "WAITING_PRE_REVIEW",
          productName: "Crednow",
          name: "Rebecca Tife",
          applicationChannel: "Default",
          gender: "Female",
          userLevel: "Level 1",
          appName: "Crednow",
          mobile: "9098981234",
          loanTenure: "7D",
          amount: 7000,
          applicationType: "Payday",
          loanType: "Payday",
          applicationStatus: "Pending",
          finalApprovalTime: "N/A",
          enterApprovalTime: "2023-10-20 12:30",
          successfulLendingTime: "N/A",
          rejectionPhase: "Initial Review",
          refuseReason: "Insufficient Credit Score",
          appVersion: "v2.0",
          appPackage: "com.crednow",
          applicationMethod: "In-Person",
          tag: "Regular",
          isPrivacyDataAuthorized: "No",
          userUniqueNumber: "CN20231023",
          reviewer: "Jane Smith",
        },
      ],
    };
  },
  methods: {
    approveLoan(loanNumber) {
      alert(`Loan Number ${loanNumber} approved.`);
    },
    rejectLoan(loanNumber) {
      alert(`Loan Number ${loanNumber} rejected.`);
    },
    scrollLeft() {
      this.$refs.tableContainer.scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight() {
      this.$refs.tableContainer.scrollBy({ left: 300, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  width: 99.5%;
  padding: 8px;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.data-table {
  width: 3592px;
  border-collapse: collapse;
  margin:  0;
  font-size: 0.9rem;
  text-align: left;
}

.data-table th,
.data-table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
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
  font-weight: bold;
}

.waiting {
  color: orange;
  font-weight: bold;
}

button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.approve-button {
  color: #fff;
  background-color: #00CCFF;
  border: none;
  padding: 10px 10px;
  margin: 4px;
  border-radius: 5px;
  cursor: pointer;
}

.reject-button {
  color: red;
  background-color: #fff;
  border: 1px solid red;
  padding: 10px 10px;
  margin: 4px;
  border-radius: 5px;
  cursor: pointer;
}
</style>


