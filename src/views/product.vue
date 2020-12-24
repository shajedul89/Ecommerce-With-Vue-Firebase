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
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                <tr v-for="product in products" :key="product">
                  <td> {{product.data().name}} </td>
                  <td> {{product.data().price}} </td>
                  <td>
                    <button  @click="editproduct(product)" class="btn btn-info  btn-sm mr-2">Edit</button>
                     <button @click="deleteproduct(product.id)" class="btn btn-danger btn-sm " >Delete</button>
                  </td>
                </tr>


              </tbody>
            </table>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </div>


    <div class="modal" tabindex="-1" role="dialog" id="edit">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        

        <div class="form-group">
                  <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                </div>

                <div class="form-group">
                  <input type="text" placeholder="Price" v-model="product.price" class="form-control">
                </div>

      </div>
      <div class="modal-footer">
        <button type="button" @click="updateproduct()" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
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
      },
      activeItem : null
      
    }
  },
  methods:{

        watcher(){
                    db.collection("products")
            .onSnapshot((querySnapshot) => {
                this.products = [];
                querySnapshot.forEach((doc) => {
                    this.products.push(doc);
                });
               
    });
        },
    

        readData(){
                        db.collection("products").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    this.products.push(doc);
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

    editproduct(product){
      $('#edit').modal('show');
      this.product= product.data();
      this.activeItem=product.id;
    },

    updateproduct(){

            db.collection("products").doc(this.activeItem).update(this.product)
          .then(() => {

            this.watcher();
                  $('#edit').modal('hide');
                  
              console.log("Document successfully updated!");
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });

    },

    deleteproduct(doc){

      if(confirm('Are you sure ?')){
        
              db.collection("products").doc(doc ).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
});
      }
      else{
        
      }
        
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
