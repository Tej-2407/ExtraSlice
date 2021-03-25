<template>
<CRow>
    <CCol col="25" xl="8">
      <CCard>
        <CCardHeader>
          <CButton class="float-right" color="primary" @click="Create">Create</CButton>
        </CCardHeader>
        <CCardBody>
          <Ctable  class="table table-dark">
            <Cthead>
              <tr>
                <th  scope="col">Length</th>
                <th  scope="col">Actions</th>
              </tr>
            </Cthead>
            <Ctbody class="table table-striped">
              <tr>
             
                <td ><!----> <!----></td>
              </tr>
              <tr>
                <td ></td>
                <td >
                  <Cbutton  type="button" class="btn right-create btn-primary btn-sm">Edit</Cbutton> 
                  <Cbutton  type="button" class="btn right-create btn-danger btn-sm">Delete</Cbutton>
                </td>
              </tr>
            </Ctbody>
          </Ctable>
          
 
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
 
</template>

<script>

export default {
  name: 'ContractsLength',

}
</script>
