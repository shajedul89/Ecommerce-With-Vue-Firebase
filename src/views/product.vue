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

      product:{
      name:null,
      price:null,
      }
      
    }
  },
  methods:{
          saveData(){

            db.collection("products").add(this.product)
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.reset();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

    },

    reset(){
      Object.assign(this.$data, this.$options.data.apply(this));
    }
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
