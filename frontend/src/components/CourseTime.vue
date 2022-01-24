<template lang="pug">
span {{ display }}
</template>


<script>
export default {
  name: "CourseTime",
  props: ["time"],
  computed: {
    display() {
      if (this.time) {
        const mm = this.time.slice(-2);
        const HH = parseInt(this.time.slice(0, -2).padStart(2, "0"));
        const h = HH > 12 ? HH - 12 : HH;
        const A = HH >= 12 ? "PM" : "AM";
        if (h == 0) return "";
        return h.toString() + ":" + mm + " " + A;
      } else {
        return "-";
      }
    },
  },
};
</script>