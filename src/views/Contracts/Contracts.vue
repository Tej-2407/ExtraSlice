<template>
  <div>
  <b-button v-b-modal.modal-center>Launch centered modal</b-button>

  <b-modal id="modal-center" centered title="BootstrapVue">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>
</div>
</template>

<script>
export default {
  methods: {
    // showModal() {
    //   this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    // },
    // hideModal() {
    //   this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    // },
    // toggleModal() {
    //   this.$root.$emit('bv::toggle::modal', 'modal-1', '#btnToggle')
    // }
  }
}
</script>
