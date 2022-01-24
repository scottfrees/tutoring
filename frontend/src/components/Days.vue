<template lang="pug">
span
  span(style="margin-bottom: 0px") {{ display }}
</template>


<script>
export default {
  name: "Day",
  props: ["days"],
  computed: {
    display() {
      let display = "";
      if (!this.days) return "-";
      if (this.days.MON) display += "M";
      if (this.days.TUE) display += "T";
      if (this.days.WED) display += "W";
      if (this.days.THU) display += "R";
      if (this.days.FRI) display += "F";
      if (this.days.SAT) display += "S";
      if (this.days.SUN) display += "U";
      return display;
    },
  },
};
</script>