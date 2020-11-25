<template>
  <!--TODO FILLER FORM PLACEHOLDER-->
  <div class="section">
    <div class="SignUpForm">
      <div class="columns">
        <div class="column is-one-third"></div>
        <div class="column is-one-third">
          <figure class="image is-96x96 container">
            <img
              class="logoNav"
              src="../img/ufood-logo-no-text.png"
              alt="logo-no-text"
            />
          </figure>
          <h1 class="title is-1">
            Sign up for free !
          </h1>
          <b-field
            label="Email"
            type="is-success"
            message="This username is available"
          >
            <b-input placeholder="Email" type="email" icon="envelope"></b-input>
          </b-field>

          <b-field
            label="Username"
            type="is-success"
            message="This username is available"
          >
            <b-input
              placeholder="Username"
              icon="user"
              maxlength="30"
            ></b-input>
          </b-field>

          <b-field
            label="Password"
            type="is-warning"
            :message="[
              'Password is too short',
              'Password must have at least 8 characters'
            ]"
          >
            <b-input
              placeholder="Password"
              value="123"
              icon="key"
              type="password"
              maxlength="30"
            ></b-input>
          </b-field>

          <b-field
            label="Confirm Password"
            type="is-warning"
            :message="[
              'Password is too short',
              'Password must have at least 8 characters'
            ]"
          >
            <b-input
              placeholder="Password"
              value="123"
              icon="key"
              type="password"
              maxlength="30"
            ></b-input>
          </b-field>

          <b-button type="is-primary" expanded>Submit</b-button>
        </div>

        <div class="column is-one-third"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpForm"
};
</script>

<style scoped></style>
