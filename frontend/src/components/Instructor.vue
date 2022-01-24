<template lang="pug">
div
  p(style="margin-bottom: 0px") {{ display }}
</template>


<script>
export default {
  name: "Instructor",
  props: ["instructor"],
  computed: {
    display() {
      if (this.instructor) {
        return `${this.instructor.name.last}, ${this.instructor.name.first} - ${this.instructor.email}`;
      } else {
        return "No Instructor Assigned";
      }
    },
  },
};
</script>
