<template>
  <b-field :label="label" :message="message" :type="getInputType(state)">
    <b-input
      :placeholder="label"
      :icon="icon"
      :type="type"
      :maxlength="maxlength"
      v-model="inputVal"
      @input="validate()"
    ></b-input>
  </b-field>
</template>

<script>
export default {
  name: "InputField",
  props: {
    hasValidation: { type: Boolean, default: true },
    minChars: { type: Number, default: 4 },
    label: { type: String, required: true },
    type: { type: String, required: true },
    maxlength: { type: Number, default: 30 },
    icon: String,
    value: [String, Number],
    validationMethod: {
      type: Function,
      default: () => {
        return true;
      }
    }
  },
  data: () => {
    return {
      message: [],
      state: 0,
      isValid: false
    };
  },
  methods: {
    validate() {
      if (this.hasValidation) {
        const isLengthValid = this.validateLength(this.value, this.minChars);
        const isParentValid = this.validationMethod();
        if (!isLengthValid) {
          this.state = -1;
          this.message = [this.label + " is too short"];
        } else if (!isParentValid) {
          this.state = -1;
          this.message = undefined;
        } else {
          this.state = 1;
          this.message = [];
        }
      } else {
        this.state = 0;
      }

      this.isValid = this.state == 1;
      this.$emit("isValid", this.isValid);
    },

    validateLength(input, minChars) {
      return input.length >= minChars;
    },
    getInputType(state) {
      return state == 1 ? "is-success" : state == -1 ? "is-danger" : "";
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style scoped></style>
