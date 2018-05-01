<template>
<div>
  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">QianMai</a>
      <input class="form-control form-control-dark w-100" @keydown.enter="search" v-model="searchcontent" type="text" placeholder="Search Activity" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a v-if="! signed"  href="/" class="nav-link">Sign in</a>    
          <a v-if="signed" href="/" class="nav-link">Sign out</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
            <li class="nav-item" v-for="(item,index) in fields" v-bind:key=index>
              <a class="nav-link btn" href="/" @click.prevent="activeField = item">{{item}}</a>
            </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <a class="btn btn-sm" @click.prevent="toreview = 3" v-bind:class="{ 'btn-dark':toreview == 3,'btn-outline-secondary':toreview != 3}" href="[TODO]">全部</a>                
                <a class="btn btn-sm" @click.prevent="toreview = 0" v-bind:class="{ 'btn-dark':toreview == 0,'btn-outline-secondary':toreview != 0}" href="[TODO]">待审核</a>
                <a class="btn btn-sm" @click.prevent="toreview = 1" v-bind:class="{ 'btn-dark':toreview == 1,'btn-outline-secondary':toreview != 1}" href="[TODO]">审核通过</a>
                <a class="btn btn-sm" @click.prevent="toreview = 2" v-bind:class="{ 'btn-dark':toreview == 2,'btn-outline-secondary':toreview != 2}" href="[TODO]">审核不通过</a>
              </div>
            </div>
          </div>    
<div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th class="firstColumn">发起者</th>
                  <th>内容</th>
                  <th v-if="toreview == 0">审核</th>
                </tr>
              </thead>
              <tbody>
                <tr v-bind:key="index" v-for="(element,index) in reviewData" >
                  <td class="firstColumn">{{ element.userx }}</td>
                  <td>
                      {{ element.mtext }}
                  </td>
                  <td  v-if="toreview == 0">
                    <a href="/" @click.prevent="reviewMethod(element.id,true)" class = "btn-sm btn btn-outline-success">审核通过</a>
                    <a href="/" @click.prevent="reviewMethod(element.id,false)" class = "btn-sm btn btn-outline-danger">审核不通过</a>
                  </td>
                  <!-- <td v-bind:key="index" v-for="(element,index) in elements" >
                    {{ element }}
                  </td> -->
                </tr>
              </tbody>
            </table> 
  </div>
 </main>
      </div>
    </div>
    </div>
</template>

<script>
import {
  fetchAllUser,
  fetchAllMoment,
  UpdatePass,
  UpdateMomentFail
} from "../api/api";
import qs from "qs";
import { truncate } from "fs";
export default {
  name: "HelloWorld",
  data() {
    return {
      signed: true,
      searchcontent: "",
      Users: {},
      Moments: [],
      // toview 0:待审核 1:审核通过 2:审核不通过 3:全部
      // passed
      toreview: 0,
      activeField: "全部"
    };
  },
  methods: {
    search() {
      console.log("Search" + this.searchcontent);
      //search content.
      let len = this.Moments.length;
      let res = [];
      for (let i = 0; i < len; i++) {
        if (this.Moments[i].mtext.includes(this.searchcontent)) res.push(this.Moments[i]);
      }
      return res;
    },
    reviewMethod(id, success) {
      let content = this.Moments.find(value => value.id == id);
      if (content == null) return;
      else if (success == true) {
        UpdatePass(content)
          .then(data => console.log(data))
          .catch(err => console.log(err));
        //审核通过
      } else {
        //审核不通过
        UpdateMomentFail(content)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }
    }
  },
  computed: {
    // reviewData() {
    //   let retArr = [];
    //   let len = this.Moments.length;
    //   for (let i = 0; i < len; i++) {
    //     if (
    //       (this.activeField == "全部" ||
    //         this.Moments[i].field == this.activeField) &&
    //       (this.toreview == 3 || this.Moments[i].passed == this.toreview)
    //     ) {
    //       retArr.push(this.Moments[i]);
    //     }
    //   }
    //   return retArr;
    // },
    reviewData: {
      get: function() {
        let retArr = [];
        if (this.searchcontent != "") {
          return this.search();
        }
        let len = this.Moments.length;
        for (let i = 0; i < len; i++) {
          if (
            (this.activeField == "全部" ||
              this.Moments[i].field == this.activeField) &&
            (this.toreview == 3 || this.Moments[i].passed == this.toreview)
          ) {
            retArr.push(this.Moments[i]);
          }
        }
        return retArr;
      },
      set: function(data) {
        console.log("set");
        return data;
      }
    },
    elements() {
      return ["ele1", "ele2", "ele3", "ele4", "ele5"];
    },
    fields() {
      let rets = new Set();
      let len = this.Moments.length;
      for (let i = 0; i < len; i++) {
        rets.add(this.Moments[i].field);
      }
      let retArr = [];
      retArr.push("全部");
      for (let item of rets) retArr.push(item);
      return retArr;
    }
  },
  mounted() {
    // this.Moments = [
    //   {
    //     id: 1,
    //     userx: 1523877687771,
    //     mtext: `建设世界一流大学建设世界一流大学建设世界一流大学建设世界一流大学建设世界一流大学建设世流大学建设世界一流大学建设世界一流大学建设世流大学建设世界一流大学建设世界一流大学建设世流大学建设世界一流大学建设世界一流大学建设世界一`,
    //     field: "教育",
    //     passed: 1
    //   },
    //   {
    //     id: 2,
    //     userx: 1523877687771,
    //     mtext: `somethingsomengsomethingsomethingsomethingsomethingsomething`,
    //     field: "学习",
    //     passed: 0
    //   }
    // ];
    let self = this;
    let paramUser = {};
    fetchAllUser(qs.stringify(paramUser))
      .then(data => {
        self.Users = data.User;
      })
      .catch(err => console.log(err));
    let paramMoment = {};
    fetchAllMoment(qs.stringify(paramMoment))
      .then(data => {
        self.Moments = data.Moment;
      })
      .catch(err => console.log(err));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.firstColumn {
  width: 100px;
}
</style>
