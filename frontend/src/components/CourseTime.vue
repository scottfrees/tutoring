<template lang="pug">
span {{ display }}
</template>


<script>
import { parse, format } from "date-fns";
export default {
  name: "CourseTime",
  props: ["time"],
  computed: {
    display() {
      // Parse time string (HH:mm format) and format as 12-hour time
      const parsed = parse(this.time, "HH:mm", new Date());
      return format(parsed, "h:mm a");
    },
  },
};
</script>