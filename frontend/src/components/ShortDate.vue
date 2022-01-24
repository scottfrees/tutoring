<template lang="pug">
span {{ display }}
</template>


<script>
export default {
  name: "ShortDate",
  props: ["date"],
  computed: {
    display() {
      const d = new Date(this.date);
      const strArray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const w = d.getDate();
      const m = strArray[d.getMonth()];
      return `${m} ${w}`;
    },
  },
};
</script>
