<template>
<div>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">QianMai</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a v-if="! signed"  href="/" class="nav-link">Sign in</a>    
          <a v-if="signed" href="/" class="nav-link">Sign out</a>
        </li>
      </ul>
    </nav>
    <div class="container">
    <div class="row">
    <button class="col-md-1 btn btn-primary pull-right" style="margin:20px" @click="submitMoment"> Submit</button>
    <select style="margin:20px" class="col-md-3" v-model="selectUser">
        <option value ="">Select User</option>
        <option value ="volvo">Volvo</option>
        <option value ="sdssssssssaab">Saddddddddddab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
    </select>
    </div></div>
    <div class="container full-height editor">
    <div class="row" >
        <VueEditor class="col-md-12" v-model="input"> </VueEditor>
    </div>
    </div>
</div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { AddMoment } from "../api/api";
import marked from "marked";

export default {
  name: "TestComponent",
  components: {
    VueEditor
  },
  data() {
    return {
      signed: true,
      content: "",
      input: "Please input your description here",
      selectUser: "",
      field: ""
    };
  },
  methods: {
    update: function(e) {
      this.input = e.target.value;
    },
    submitMoment() {
      let params = {};
      params.mtext = this.input;
      if (this.selectUser == ""); //[TODO]
      params.passed = 0;
      params.userx = this.selectUser;
      params.field = this.field;
      AddMoment(params)
        .then()
        .catch(err => console.log(err));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea,
#editor {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}
.userText {
  font-size: 27px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
  height: 750px;
}
</style>
