<template>
  <div class="visit">
    <form action="">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Visit information</p>
          <button type="button" class="delete" @click="close" />
        </header>
        <section class="modal-card-body">
          <star-rating
            :inline="true"
            :star-size="20"
            :read-only="true"
            :show-rating="true"
            :rating="visitInfo.rating"
            :fixed-points="1"
            :increment="0.1"
          ></star-rating>
          <div class="visit-date">
            Date of visit : {{ visitInfo.date.slice(0, 10) }}
          </div>
          <div class="visit-message">Comment : {{ visitInfo.comment }}</div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="close">
            Close
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "VisitForm",
  props: ["close", "visitInfo"],
  data() {
    return {};
  }
};
</script>
