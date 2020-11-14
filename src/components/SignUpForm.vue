<template>
<!--TODO FILLER FORM PLACEHOLDER-->
<div class="SignUpForm">
  <form action="#" method="post">
    <h2>Sign Up</h2>    <p>
    <label for="Username" class="floatLabel">Username</label>
    <input id="Username" name="Username" type="text">
  </p>
    <p>
      <label for="Email" class="floatLabel">Email</label>
      <input id="Email" name="Email" type="email">
    </p>
    <p>
      <label for="password" class="floatLabel">Password</label>
      <input id="password" name="password" type="password">
      <span>Enter a password longer than 8 characters</span>
    </p>
    <p>
      <label for="confirm_password" class="floatLabel">Confirm Password</label>
      <input id="confirm_password" name="confirm_password" type="password">
      <span>Your passwords do not match</span>
    </p>
    <p>
      <input type="submit" value="Create My Account" id="submit">
    </p>
  </form>
</div>
</template>

<script>
export default {
  name: "SignUpForm",
  //TODO FIELD VERIFICATION
// methods: {
//     let this.$password = $("#password");
//     const this.$confirmPassword = $("#confirm_password");
//
// //Hide hints
//     $("form span").hide();
//
// function isPasswordValid() {
//   return $password.val().length >= 8;
// }
//
// function arePasswordsMatching() {
//   return $password.val() === $confirmPassword.val();
// }
//
// function canSubmit() {
//   return isPasswordValid() && arePasswordsMatching();
// }
//
// function passwordEvent(){
//   //Find out if password is valid
//   if(isPasswordValid()) {
//     //Hide hint if valid
//     $password.next().hide();
//   } else {
//     //else show hint
//     $password.next().show();
//   }
// }
//
// function confirmPasswordEvent() {
//   //Find out if password and confirmation match
//   if(arePasswordsMatching()) {
//     //Hide hint if match
//     $confirmPassword.next().hide();
//   } else {
//     //else show hint
//     $confirmPassword.next().show();
//   }
// }
//
// function enableSubmitEvent() {
//   $("#submit").prop("disabled", !canSubmit());
// }
//
// //When event happens on password input
// $password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);
//
// //When event happens on confirmation input
// $confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);
//
// enableSubmitEvent();
//
}


</script>

<style scoped>
/*//TODO REMPLACER FILLER STYLE PAR MÊME STYLE QUE RESTE DU SITE, IDÉALEMENT MODÈLE POPUP COMME VISITFORM*/
body {
  background: #384047;
  font-family: sans-serif;
  font-size: 10px
}
form {
  background: #fff;
  padding: 4em 4em 2em;
  max-width: 400px;
  margin: 50px auto 0;
  box-shadow: 0 0 1em #222;
  border-radius: 2px;
}
h2 {
  margin:0 0 50px 0;
  padding:10px;
  text-align:center;
  font-size:30px;
  color:blue;
  border-bottom:solid 1px #e5e5e5;
}
p {
  margin: 0 0 3em 0;
  position: relative;
}
input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  margin:0;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  background: #fff;
  border: 1px solid #dbdbdb;
  font-size: 1.6em;
  padding: .8em .5em;
  border-radius: 2px;
}
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  background: #fff
}
span {
  display:block;
  background: #F9A5A5;
  padding: 2px 5px;
  color: #666;
}
input[type="submit"] {
  border-radius: 2px;
  border: none;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 2em;
  line-height: 1.6em;
  margin: 2em 0 0;
  outline: none;
  padding: .8em 0;
  text-shadow: 0 1px #68B25B;
}
input[type="submit"]:hover {
  background: rgba(148,175,101,1);
}
input[type="submit"]:hover {

}
label{
  position: absolute;
  left: 8px;
  top: 12px;
  color: #999;
  font-size: 16px;
  display: inline-block;
  padding: 4px 10px;
  font-weight: 400;
  background-color: rgba(255,255,255,0);


}

</style>
