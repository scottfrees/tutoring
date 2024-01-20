<template  lang="pug">
.container
      .card.my-3(v-if="is_admin || is_staff")
        .card-header
          .row 
            .col-md
              h2 Search log
            .col-md
              .form-group
                label(for='from') From
              
                input.form-control(
                    style="font-size: 1rem",
                    type="date",
                    v-model="from",
                    name: "from",
                    @change="fetchLogs"
                  )
            .col-md
              .form-group
                label(for='until') Until
              
                input.form-control(
                    style="font-size: 1rem",
                    type="date",
                    v-model="until",
                    name: "until", 
                    @change="fetchLogs"
                  )
            .col-md(style='text-align:right') 
              button(type='button' class="btn btn-primary" @click="download") Export
          
          
        .card-body
            table.table
                thead 
                    tr 
                        th Timestamp<br/> (when searched) 
                        th Search <br/>(what was searched for)
                        th Search Date <br/>(date searched for)
                        th Result Count 
                        th Result Details<br/>(Tutoring Session Titles)
                tbody
                    tr(v-for="log in logs")
                        td {{ log.Timestamp }}
                        td {{ log.Search_String }}
                        td {{ log.Search_Date }}
                        td {{ log.Results }}
                        td {{ log.Results_Details }}

                        
</template>
    
<script>
    // @ is an alias to /src
    
    import SearchLog from "@/api/searchlog";
    import AuthService from "@/api/auth";
    import { mapState } from "vuex";
    export default {
      name: "SearchLogs",
      components: {},
      data: function () {
        return {
          logs: [], 
          from: new Date().toISOString().split("T")[0], 
          until: new Date().toISOString().split("T")[0], 
        };
      },
      computed: {
        ...mapState([
          "is_admin",
          "is_staff",
          "is_tutor",
        ]),
      },
      mounted: async function () {
        if (!this.user) {
          const user = await AuthService.user();
          if (user) {
            this.$store.commit("login", user);
          } else {
            this.$router.push("/login");
          }
        }
        this.fetchLogs();
      },
      methods: {
        download: async function () {
            const data = await SearchLog.download({from: this.from, until: this.until});
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "searchlog.xlsx");
            document.body.appendChild(link);
            link.click();
        },
        fetchLogs: async function () {
            this.logs = await SearchLog.fetch({from: this.from, until: this.until});
            
        },
      },
    };
</script>
    
    
<style scoped>
</style>