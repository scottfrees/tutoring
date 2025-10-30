<template lang="pug">
span {{ display }}
</template>


<script>
import { parseISO, format } from "date-fns";
export default {
  name: "ShortDate",
  props: ["date"],
  computed: {
    display() {
      // Parse ISO date string (YYYY-MM-DD) and format as abbreviated month + day
      const parsed = parseISO(this.date);
      return format(parsed, "MMM d");
    },
  },
};
</script>
