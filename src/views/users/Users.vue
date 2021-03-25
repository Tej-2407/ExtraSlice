<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader>
          Users
          
          <b-button class = "float-right" v-b-modal.modal-prevent-closing>
            Create
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
                            <b-container>

              <b-form-input v-model="input_1" placeholder="Enter your name"></b-form-input>
              <code>{{input_1}}</code>

              <hr />

              <b-row v-for="type in input_2.types" :key="type">
                  <b-col sm="3">
                      <label :for="`type-{$type}`">Type: <code>{{type}}</code></label>
                  </b-col>
                  <b-col sm="9">
                      <b-form-input :for="`type-{$type}`" :type="type" v-model="input_2.fields[type]"></b-form-input>
                      <code>{{input_2.fields[type]}}</code>
                  </b-col>
              </b-row>

              <hr />

              <div role="form-group">
                  <b-form-input
                          id="input-3"
                          v-model="input_3"
                          :state="input_3_nameState"
                          placeholder="Enter your name"
                          aria-describedby="input-3-valid input-3-invalid"
                          trim
                      ></b-form-input>
                  <code>{{input_3}}</code>

                  <b-form-invalid-feedback id="input-3-invalid">Enter at least 3 letters</b-form-invalid-feedback>
                  <b-form-valid-feedback id="input-3-valid">Your full name success</b-form-valid-feedback>
              </div>

          </b-container>
              </b-form-group>
            </form>
          </b-modal>
 
        </CCardHeader>
        <CCardBody>
          <CDataTable
            class="table table-light dark"
            hover
            striped
            :items="items"
            :fields="fields"
            :items-per-page="5"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center'}"
            @page-change="pageChange"
          >
            <template #status="data">
              <td>
                <CBadge :color="getBadge(data.item.status)">
                  {{data.item.status}}
                </CBadge>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import usersData from './UsersData'
// import CreateUser from '@/api/users'
export default {
  name: 'Users',
  // components: {
  //   CreateUser,
  // },
  data () {
    return {
      modal5_input: '',
      modal5_name_input: '',
      modal5_name_state: null,
       input_1: '',
        input_2: {
            fields: {
                text: null,
                number: null,
                email: null,
                password: null,
                search: null,
                url: null,
                tel: null,
                date: null,
                time: null,
                range: null,
                color: null,
            },

            types: [
                'text',
                'number',
                'email',
                'password',
                'search',
                'url',
                'tel',
                'date',
                'time',
                'range',
                'color'
            ]
        },

        input_3: '',
    
      items: usersData,
      fields: [
        { key: 'username', label: 'Name', _classes: 'font-weight-bold' },
        { key: 'MailId' },
        { key: 'Status' },
        
      ],
      activePage: 1
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      }
    }
  },
  methods: {
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },

    CreateUser(){
      this.$router.push({path: `CreateUser/${index + 1}`})
    
    },
    rowClicked (item, index) {
      this.$router.push({path: `users/${index + 1}`})
    },
    pageChange (val) {
      this.$router.push({ query: { page: val }})
    },

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
