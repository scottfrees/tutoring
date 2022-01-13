<template>
  <div
    class="card bg-dark text-white mb-3"
    style="max-width: 30rem; border: #333 solid thin"
  >
    <div class="card-header" style="border: #333 solid thin">
      <h4 class="card-title">Ramapo College of New Jersey</h4>
      <h6 class="card-subtitle mb-2 text-muted">Tutoring</h6>
    </div>
    <div class="card-body" style="border: #333 solid thin">
      <section class="card-text">
        <form @keyup.enter="login()">
          <fieldset>
            <label for="exampleInputEmail1">Email address</label>
            <section class="form-group">
              <input
                type="email"
                v-model="username"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </section>
            <section class="form-group mt-3">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </section>
            <section class="form-group">
              <button
                class="btn btn-primary mt-2 mr-3"
                type="button"
                @click="login"
              >
                Login
              </button>
              <span class="text-warning ml-3" v-if="message">{{
                message
              }}</span>
            </section>
          </fieldset>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState } from "vuex";
import AuthService from "@/api/auth";
export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  components: {},
  computed: {
    ...mapState(["user", "is_admin", "is_staff", "is_tutor"]),
  },
  methods: {
    login: async function () {
      this.message = "";
      const user = await AuthService.login(this.username, this.password);
      if (user) {
        this.$store.commit("login", user);
        this.$store.dispatch("init");
        if (this.is_admin || this.is_staff) {
          this.$router.push("/tutoring");
        } else if (this.is_tutor) {
          this.$router.push("/mytutoring");
        } else {
          this.$router.push("/search");
        }
      } else {
        this.message = "Login failed";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
  .card {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    position: fixed;
    top: 25%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -25%);
  }
}
@media only screen and (min-width: 768px) {
  .card {
    float: right;
    margin-right: 20%;
    margin-top: 10em;
    min-width: 400px;
  }
}
</style>