import { ToastProgrammatic as Toast } from "buefy";

export default class ToastDisplayService {
  success(message) {
    Toast.open({
      duration: 5000,
      message: message,
      position: "is-bottom",
      type: "is-success"
    });
  }

  fail(message) {
    Toast.open({
      duration: 5000,
      message: message,
      position: "is-bottom",
      type: "is-danger"
    });
  }
}
