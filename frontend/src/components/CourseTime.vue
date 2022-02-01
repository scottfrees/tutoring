<template lang="pug">
span {{ display }}
</template>


<script>
import moment from "moment";
export default {
  name: "CourseTime",
  props: ["time"],
  computed: {
    display() {
      return moment(this.time, "HH:mm").format("h:mm a");
      /*
      // Check correct time format and split into components
      let time = this.time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [this.time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
      */
    },
  },
};
</script>