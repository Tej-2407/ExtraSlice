<template>
  <div>
    <CModal
      :show.sync="showModal"
      :close-on-backdrop="false"
      :centered="true"
      title="Modal title 2"
      size="lg"
      color="dark"
    >
      <label class="required-field">Name</label>
      <CInput v-model.trim="form.name" placeholder="Enter your name" />
      <span v-if="$v.form.name.$error" class="text-danger"
        >Please enter valid name</span
      >

      <div>
        <label class="required-field">Mobile number</label>
      </div>
      <CInput
        v-model="form.mobile"
        type="text"
        v-mask="'(###) ###-####'"
        placeholder="Enter Mobile number"
      />
      <span v-if="$v.form.mobile.$error" class="text-danger"
        >Phone format should be : (000) 000-0000</span
      >

      <div>
        <label class="required-field">Role</label>
      </div>
      <select class="form-control" v-model="form.role">
        <option>admin</option>
        <option>user</option>
      </select>
      <span v-if="$v.form.role.$error" class="text-danger"
        >Role is required</span
      >

      <div>
        <label class="required-field mt-3">Email</label>
      </div>
      <CInput
        v-model="form.email"
        type="email"
        placeholder="Enter Email"
        class="mt-2"
      />
      <span v-if="$v.form.email.$error" class="text-danger"
        >Email must be valid</span
      >

      <div v-if="!this.$props.id">
        <label class="required-field">Password</label>
      </div>
      <CInput
        v-if="!this.$props.id"
        v-model="form.password"
        type="password"
        placeholder="Enter Password"
      />
      <span
        v-if="$v.form.password.$error && !this.$props.id"
        class="text-danger"
        >Password must be at least 6 characters in length</span
      >

      <div v-if="!this.$props.id">
        <label class="required-field">Confirm Password</label>
      </div>
      <CInput
        v-if="!this.$props.id"
        v-model="form.c_password"
        type="password"
        placeholder="Enter Confirm Password"
      />
      <span
        v-if="$v.form.c_password.$error && !this.$props.id"
        class="text-danger"
        >Confirm Password must be same as password</span
      >
      <template #footer>
        <CButton @click.prevent="saveModal" color="success">Save</CButton>
        <CButton @click="onCloseModal()" color="danger">Cancel</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import { postUser, getUser, putUser } from "@/api/user";
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  sameAs,
  email,
  helpers
} from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
const isName = helpers.regex("custom", /^([a-zA-Z ]){2,30}$/);
const isPhone = value => /^\(\d{3}\)\s?\d{3}-\d{4}$/.test(value);

export default {
  name: "UserEditForm",
  directives: { mask },
  props: {
    id: {
      type: Number,
      default: 0
    },
    modalShow: {
      type: Boolean,
      default: false
    },
    onHideModal: {
      type: Function
    }
  },
  created() {
    this.showModal = this.$props.modalShow;
    if (this.$props.id) {
      getUser(this.$props.id)
        .then(res => {
          this.form = res.data.data;
        })
        .catch(error => {
          console.log(error, "error");
        });
    }
  },
  data: () => {
    return {
      showModal: false,
      form: {
        name: "",
        mobile: "",
        email: "",
        password: "",
        c_password: "",
        role: ""
      },
      errors: null
    };
  },
  methods: {
    onReset() {
      this.form.length = "";
    },
    
    changeModal() {
      if (!this.showModal) {
        this.onCloseModal();
      }
    },
    onCloseModal() {
      this.showModal = false;
      this.$props.onHideModal();
    },
    saveModal() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        return;
      }
      if (this.$props.id) {
        putUser(this.$props.id, this.form)
          .then(res => {
            this.$emit("saveUser", res.data.data, this.$props.id);
            this.$notify({
              group: "notify",
              type: "success",
              text: res.data.message
            });
            this.onCloseModal();
          })
          .catch(error => {
            console.log(error, "error");
          });
      } else {
        postUser(this.form)
          .then(res => {
            this.$emit("saveUser", res.data.data);
            this.$notify({
              group: "notify",
              type: "success",
              text: res.data.message
            });
            this.onCloseModal();
          })
          .catch(error => {
            console.log(error, "error");
          });
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        isName
      },
      mobile: {
        required,
        phoneValid: isPhone
      },
      email: {
        required,
        email
      },
      password: {
        required: requiredIf(function() {
          return !this.$props.id;
        }),
        minLength: minLength(6)
      },
      c_password: {
        required: requiredIf(function() {
          return !this.$props.id;
        }),
        sameAsPassword: sameAs("password")
      },
      role: {
        required
      }
    }
  }
};
</script>
