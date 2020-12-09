<template>

  <div class="product">

    <h3>Add Product</h3>
    <div class="col-md-12">
      <div class="row">

            <div class="col-md-3"></div>
                <div class="product-test col-md-6 text-center">
                <div class="form-group">
                  <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                </div>

                <div class="form-group">
                  <input type="text" placeholder="Price" v-model="product.price" class="form-control">
                </div>

                <div class="form-group">
                    <button @click="saveData" class="btn btn-primary">Save Data</button>
                </div>

          </div>
          <div class="col-md-3"></div>
      </div>

      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
             <h3>Products list</h3>

            <table class="table table-bodered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>

                <tr v-for="product in products" :key="product">
                  <td> {{product.name}} </td>
                  <td> {{product.price}} </td>
                </tr>


              </tbody>
            </table>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </div>


    
    
  </div>
</template>

<script>
import{fb,db} from '../firebase';
export default {
  name: "product",
  props: {
    msg: String
  },
  data(){
    return {

      products:[],

      product:{
      name:null,
      price:null,
      }
      
    }
  },
  methods:{

        readData(){
                        db.collection("products").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    this.products.push(doc.data());
                });
            });
        },
    
          saveData(){

            db.collection("products").add(this.product)
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.reset();
          this.readData();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

    },

    reset(){
      Object.assign(this.$data, this.$options.data.apply(this));
    },
  },

  created(){
       this.readData();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
