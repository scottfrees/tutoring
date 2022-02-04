<template lang="pug">
span {{ display }}
</template>


<script>
import moment from "moment";
export default {
  name: "ShortDate",
  props: ["date"],
  computed: {
    display() {
      return moment(this.date, "YYYY-MM-DD").format("MMM D");
    },
  },
};
</script>
