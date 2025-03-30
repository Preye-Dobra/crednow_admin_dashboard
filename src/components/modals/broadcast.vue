<template>
  <div class="container">
    <div class="user-header">
  <img src="/public/profile.png" alt="" />
  <span>Invite User</span>
</div>
<hr style="border: 1px solid #ccc; width: 60%;" />

    
    <div class="invite-user-box">
      <div class="invite-option">
        <div class="option-label">Email Address</div>
        <div class="email-invite">
          Send invitations to your team or friends via email or phone.
        </div>
        <button class="send-btn" @click="showEmailInviteModal = true">Send Invite</button>
      </div>
      
      <div class="invite-option">
        <div class="option-label">Phone Number</div>
        <div class="phone-invite">Ensure correct number format</div>
        <button class="send-btn" @click="showPhoneInviteModal = true">Send Invite</button>
      </div>
    </div>
    
    <div class="promotion-header" style="border-bottom: 1px solide black;">
      <img src="/public/arrow.png" alt="" />
      <span>Promotion</span>
    </div>
    <hr style="border: 1px solid #ccc; width: 60%;" />

    <div class="invite-user-box">
      <div class="invite-option">
        <div class="option-label">Email Address</div>
        <div class="email-invite">
          Send promotions to your team or friends via email.
        </div>
        <button class="send-btn" @click="showEmailPromotionModal = true">Send Promotion</button>
      </div>
      
      <div class="invite-option">
        <div class="option-label">Phone Number</div>
        <div class="phone-invite">Ensure correct number format</div>
        <button class="send-btn" @click="showPhonePromotionModal = true">Send Promotion</button>
      </div>
    </div>
    
    <!-- Modals -->
    <EmailInviteModal 
      :visible="showEmailInviteModal" 
      @close="showEmailInviteModal = false" 
    />
    <PhoneInviteModal 
      :visible="showPhoneInviteModal" 
      @close="showPhoneInviteModal = false" 
    />
    <EmailPromotionModal 
      :visible="showEmailPromotionModal" 
      @close="showEmailPromotionModal = false" 
    />
    <PhonePromotionModal 
      :visible="showPhonePromotionModal" 
      @close="showPhonePromotionModal = false" 
    />
  </div>
</template>

<script>
// Import your modal components here
import EmailInviteModal from './inviteEmail.vue';
import PhoneInviteModal from './invitePhone.vue';
import EmailPromotionModal from './EmailPromotion.vue';
import PhonePromotionModal from './phonePromotion.vue';

export default {
  name: 'InvitePromotion',
  components: {
    EmailInviteModal,
    PhoneInviteModal,
    EmailPromotionModal,
    PhonePromotionModal,
  },
  data() {
    return {
      showEmailInviteModal: false,      // Controls Email Invite modal
      showPhoneInviteModal: false,      // Controls Phone Invite modal
      showEmailPromotionModal: false,   // Controls Email Promotion modal
      showPhonePromotionModal: false,   // Controls Phone Promotion modal
    };
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.container {
  max-width:87vw;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #ffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
font-family: 'Fira Sans', sans-serif;
  .user-header,
  .promotion-header {
    display: flex;
    align-items: center;
    gap: 8px; /* Space between the image and text */
    font-size: 16px;
    font-weight: 400;
    color: #004759;
    background-color: #ffff;
    margin-bottom: 20px;
    width: 689px;
    line-height: 22.4px;
  }

  .user-header img,
  .promotion-header img {
    width: 20px;
    height: 20px;
    /* Adjust size as needed; if different sizes required, consider overriding promotion-header img size */
  }
  
  /* For Promotion header, if you need a larger image */
  .promotion-header img {
    width: 24px;
    height: 24px;
  }

  .invite-user-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    height: 234px;
    width: 689px;
    
    border-radius: 8px;

    .invite-option {
      flex: 1;
      margin: 0 10px;
      text-align: center;
      border-radius: 8px;
      background-color: #fff;
      padding: 0 20px 20px  20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      .option-label {
        font-size: 16px;
        font-weight: 400;
        width: 287px;
        color: #004759;
        margin-top: 22px;
        margin-left: 10px;
        line-height: 22.4px;
        text-align: start;
      }

      .email-invite,
      .phone-invite {
        padding: 12px;
        background-color: #fff;
        font-size: 13px;
        font-weight: 400;
        height: 36px;
        gap: 8px;
        color: #acacb2;
        margin-bottom: 19px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        text-align: start;
      }

      

      .send-btn {
        width: 286.5px;
        padding: 10px 12px;
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        background-color: #00ccff;
        border: none;
        line-height: 22.4px;
        margin-top: 10px;
        border-radius: 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: block;
      }

      .send-btn:hover {
        background-color: #D9F7FF;
      }
    }
  }
}
</style>






