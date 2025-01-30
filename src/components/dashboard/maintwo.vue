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
            <th style="color: #004759; font-size: 14px;" >Loan Number</th>
            <th style="color: #004759; font-size: 14px;" >Result Of The Automatic Audit</th>
            <th style="color: #004759; font-size: 14px;" >Product Name</th>
            <th style="color: #004759; font-size: 14px;" >Name</th>
            <th style="color: #004759; font-size: 14px;" >Application Channel</th>
            <th style="color: #004759; font-size: 14px;" >Gender</th>
            <th style="color: #004759; font-size: 14px;" >User Level</th>
            <th style="color: #004759; font-size: 14px;" >App Name</th>
            <th style="color: #004759; font-size: 14px;" >Mobile</th>
            <th style="color: #004759; font-size: 14px;" >Loan Tenure</th>
            <th style="color: #004759; font-size: 14px;" >Amount</th>
            <th style="color: #004759; font-size: 14px;" >Application Type</th>
            <th style="color: #004759; font-size: 14px;" >Loan Type</th>
            <th style="color: #004759; font-size: 14px;" >Application Status</th>
            <th style="color: #004759; font-size: 14px;" >Final Approval Time</th>
            <th style="color: #004759; font-size: 14px;" >Enter Approval Time</th>
            <th style="color: #004759; font-size: 14px;" >Successful Lending Time</th>
            <th style="color: #004759; font-size: 14px;" >Rejection Phase</th>
            <th style="color: #004759; font-size: 14px;" >Refuse Reason</th>
            <th style="color: #004759; font-size: 14px;" >App Version</th>
            <th style="color: #004759; font-size: 14px;" >App Package</th>
            <th style="color: #004759; font-size: 14px;" >Application Method</th>
            <th style="color: #004759; font-size: 14px;" >Tag</th>
            <th style="color: #004759; font-size: 14px;" >Is Privacy Data Authorized</th>
            <th style="color: #004759; font-size: 14px;" >User Unique Number</th>
            <th style="color: #004759; font-size: 14px;" >Reviewer</th>
            <th style="color: #004759; font-size: 14px;" >Actions</th>
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
  
  text-align: left;
}
 

tr th {
font-size: 14px;
line-height: 19.6px;
text-align: center;
color: #004759;
font-weight: 400;
}

tr td{
  font-size: 12px;
  line-height: 16.8px;
  font-weight: 400;
  text-align: center;
}
.data-table th,
.data-table td {
  padding: 0.75rem;
  color: #585865;
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


