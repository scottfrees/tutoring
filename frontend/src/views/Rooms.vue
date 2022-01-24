<template  lang="pug">
.container
  .card.my-3(v-if="is_admin")
    .card-header
      h4 Rooms
      p.text-muted Use this page to manage the list of rooms selectable when setting up tutoring sessions. Note, if you delete a room here, tutoring sessions using this room will not be affected - the deleted room simply will no longer show up on the list of available rooms to create new tutoring schedules.
    .card-body
      section
        .col.col-8
          .form-group
            label.form-label New Room
            input.form-control(v-model="new_room")
          .form-group
            button.btn.btn-success(v-if="new_room", @click="save") + Add Room
      section.p-3
        h4 Tutoring Rooms / Spaces
        ul.list-unstyled.row
          li.list-item.col-sm-6.col-md-4.col-lg-4(v-for="room in rooms")
            p.alert.alert-danger
              span.h4 {{ room }}
              br
              a(href="#", @click="remove(room)") remove
</template>

<script>
// @ is an alias to /src

import RoomService from "@/api/rooms";
import AuthService from "@/api/auth";
import { mapState } from "vuex";
export default {
  name: "Rooms",
  components: {},
  data: function () {
    return { new_room: null };
  },
  computed: {
    ...mapState([
      "rooms",
      "admins",
      "staff",
      "tutors",
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
    this.room_list();
  },
  methods: {
    async save() {
      await RoomService.add(this.new_room);
      const rooms = await RoomService.fetch();
      this.$store.commit("rooms", rooms);
      this.new_room = null;
    },
    async remove(room) {
      await RoomService.drop(room);
      const rooms = await RoomService.fetch();
      this.$store.commit("rooms", rooms);
      this.new_room = null;
    },
    room_list: async function () {},
  },
};
</script>


<style scoped>
</style>