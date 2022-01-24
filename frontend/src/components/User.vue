<template lang="pug">
div
  p(v-if="user", style="margin-bottom: 0px") 
    span {{ user.name.last }}, {{ user.name.first }}
    br
    span.text-muted {{ user.email }}
</template>


<script>
export default {
  name: "User",
  props: ["user"],
};
</script>
