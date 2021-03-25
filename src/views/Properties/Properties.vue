<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader>

        </CCardHeader>
        <CCardBody>
           <b-button v-b-modal.modal-prevent-closing>
        Open Modal - prevent closing
      </b-button>
      <div>
        Submitted name: <code>{{modal5_input}}</code>
      </div>
      <b-modal
          id="modal-prevent-closing"
          ref="modal-5"
          title="Submit your name"
          @show="modal5Reset"
          @hide="modal5Reset"
          @ok="modal5HandleOk"
      >
        <form ref="modal-5-form" @submit.stop.prevent="modal5HandleSubmit">
          <b-form-group
              :state="modal5_name_state"
              label="Name"
              label-for="name-input"
              invalid-feedback="Name is required"
          >
            <b-form-input
                id="name-input"
                v-model="modal5_name_input"
                :state="modal5_name_state"
                required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
          <CDatatable>
            <CHead>
              <Crow>
                <CHead scope="col">Location</CHead>
                <CHead class="float-right" scope="col">Action</CHead>
              </Crow>
            </CHead>
            <CBody>
              <CRow>
                <CCol>america</CCol>
                <CCol></CCol>
              </CRow>
              <CRow>
                <CCol>India</CCol>
                <CCol></CCol>
              </CRow>
            </CBody>
          </CDatatable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  
</template>

<script>
  export default {
 data () {
    return {
      modal4Show: false,

      modal5_input: '',
      modal5_name_input: '',
      modal5_name_state: null
    }
  },

  methods: {
    modal5Reset () {
      this.modal5_name_input = '';
      this.modal5_name_state = null;
    },

    modal5HandleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.modal5HandleSubmit()
    },

    modal5CheckFormValidation () {
      const valid = this.$refs['modal-5-form'].checkValidity()
      this.modal5_name_state = valid
      return valid
    },

    modal5HandleSubmit () {
      if(!this.modal5CheckFormValidation()) {
        return
      }

      this.modal5_input = this.modal5_name_input
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
     
    
  }
</script>