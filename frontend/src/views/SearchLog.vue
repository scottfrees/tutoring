<template  lang="pug">
.container
      .card.my-3(v-if="is_admin || is_staff")
        .card-header
          h4 Search log
          
        .card-body
            table.table
                thead 
                    tr 
                        th Date 
                        th Search 
                        th Search Date
                        th Result Count 
                        th Result Details (Tutoring Session Title)
                tbody
                    tr(v-for="log in logs")
                        td {{ log.date }}
                        td {{ log.search }}
                        td {{ log.sdate }}
                        td {{ log.results }}
                        td {{ log.resultsDetails }}
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
        return { logs: []  };
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
        
        fetchLogs: async function () {
            this.logs = await SearchLog.fetch();
            console.log(this.logs)
        },
      },
    };
</script>
    
    
<style scoped>
</style>