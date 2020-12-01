<template>

  <section class="src-components-formulario-usuario">

    <div class="jumbotron">
      <h2>Formulario </h2>
      <hr />

          <form novalidate autocomplete="off" @submit.prevent="enviar()">

          <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    class="form-control"
                    v-model="$v.f.nombre.$model"
                >

                <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.nombre.minLength.$invalid">Este campo debe ser de al menos {{$v.f.nombre.minLength.$params.length}} caracteres</div>
                    <div v-if="$v.f.nombre.maxLength.$invalid">Este campo debe ser de máximo {{$v.f.nombre.maxLength.$params.max}} caracteres</div>
                </div>
          </div>

          <div class="form-group">
                <label for="edad">Edad</label>
                <input 
                    type="number"
                    id="edad"
                    class="form-control"
                    v-model.number="$v.f.edad.$model"
                >

                <div v-if="$v.f.edad.$error && $v.f.edad.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.edad.required.$invalid">Este campo es requerido</div>
                    <!-- <div v-if="$v.f.edad.between.$invalid">La edad debe estar entre los {{$v.f.edad.between.$params.min}} y los {{$v.f.edad.between.$params.max}} años</div> -->
                    <div v-if="$v.f.edad.between.$invalid">{{$v.f.edad.between.$message}}</div>
                </div>
          </div>

          <div class="form-group">
                <label for="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    class="form-control"
                    v-model="$v.f.email.$model"
                >

                <div v-if="$v.f.email.$error && $v.f.email.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.email.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.email.email.$invalid">Email invalido</div>
                </div>
          </div>

          <div class="form-group">
                <input 
                    type="submit"
                    :disabled="$v.$invalid"
                    class="btn btn-success mt-4"
                    value="Enviar"
                >
          </div>
      </form> 

      <!-- <p>{{$v}}</p> -->

    </div>

  </section>

</template>

<script>
  import { required, minLength, maxLength,  between, email } from '@vuelidate/validators'

  export default  {
    name: 'src-components-formulario-usuario',
    props: [],
    mounted () {
        this.getDatos()
    },
    data () {
      return {
          f: this.resetForm(),
          url : 'https://5f96610111ab98001603a8ef.mockapi.io/usuarios'
      }
    },
    validations: {
      f: {
        nombre: { 
          required,
          minLength: minLength(5),
          maxLength: maxLength(15)
        },
        edad: { 
          required,
          between: between(18,120)
        },
        email: { 
          required,
          email
        }
      }
    },
    methods: {

        /* Envio de datos del formularioVue al backend */
        async sendDatos(datos) {
            try {
              let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
              console.log(res.data)
            }
            catch(error) {
              console.log('Error post', error)
            }
        },

        /* Pedido de datos almacenados en el backend */
        async getDatos() {
            try {
              let res = await this.axios(this.url)
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP GET ERROR', error)
            }
        },

        /* Submit del form */
        async enviar() {
            this.$v.$touch()
            if(!this.$v.$invalid) {
              let form = this.f
              console.log(form)
              await this.sendDatos(form)
              this.f = this.resetForm()
              this.$v.$reset()
            }
        },
        
        /* valor inicial de los campos de datos del formularioVue */
        resetForm() {
            return {
               nombre: '',
               edad : '',
               email : ''
            }
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  .jumbotron {
    background-color: rgb(62, 114, 19);
    color: white;
  }

  hr {
    background-color: #ddd;
  }

</style>
