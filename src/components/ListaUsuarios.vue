<template>
  <section class="src-components-lista-usuarios">
    <div class="jumbotron">
        <h1>Lista de usuarios</h1>

        <div v-if="usuarios.length" ><!--  !(usuarios.isEmpty()) -->
          <div class="table-responsive ">
              <table class="table" > <!-- v-if="Object.values(usuario).length" -->
                  <tr class="bg-dark text-white ">
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Email</th>
                  </tr>
                  <tr
                      class="bg-white text-black"
                      v-for="(usuario, index) in usuarios"
                      :key="index"
                  > 
                      <td>{{ usuario.nombre }}</td>
                      <td>{{ usuario.edad }}</td>
                      <td>{{ usuario.email }}</td>
                  </tr>
              </table>
              
          </div>
        </div> 

        <div v-else class="alert alert-warning">
            No hay usuarios disponibles
        </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "src-components-lista-usuarios",
  props: [],
  mounted() {
    this.getDatosFormAxios()
  },
  data() {
    return {
        url : 'https://5f96610111ab98001603a8ef.mockapi.io/usuarios',
        usuarios: []
    };
  },
  methods: {
    async getDatosFormAxios() {
            try {
                let res = await this.axios(this.url)
                console.log(res.data);
                this.usuarios = res.data

            }
            catch(error) {
                console.log('HTTP GET ERROR', error)
            }
        },
  },
  computed: {

  },
};
</script>

<style scoped lang="css">

    .jumbotron {
    background-color: rgb(39, 52, 167);
    color: white;
    }
    h1{
      color: black;
    }
    hr {
    background-color: #ddd;
    }

    .table td, .table th {
        vertical-align: middle;
    }
</style>
