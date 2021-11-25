export default class EventHandler {
  constructor(eventType = "click") {
    this.eventType = eventType;
  }

  /**
   * Build an event with specified config.
   * CSS Id is recommended.
   * @param {string} selector - valid css selector ()
   * @param {function} callback
   */
  buildHandler(selector, callback) {
    if (selector && document.getElementById(selector)) {
      document
        .getElementById(selector)
        .addEventListener(
          this.eventType,
          callback ? callback : () => console.log(`No callback provided for ${selector}.`)
        );
    } else {
      this.failedEventWarning(selector, "makeEvent");
    }
  }

  /**
   * Creates an event for every member of the nodelist with the provided name.
   * Executes the callback on every member.
   * @param {string} cssClass
   * @param {function} callback
   */
  buildHandlerGroup(cssClass, callback) {
    if (cssClass && document.querySelector(cssClass)) {
      document.querySelectorAll(cssClass).forEach((element) => {
        element.addEventListener(
          this.eventType,
          callback ? callback : () => console.log(`No callback provided for ${cssClass}.`)
        );
      });
    } else {
      this.failedEventWarning(cssClass, "makeMultiElementEvent");
    }
  }

  /**
   * Communicates warning when event listener creation fails.
   * @param {string} selector - the selector used
   * @param {string} invoker - the calling function.
   */
  failedEventWarning(selector, invoker) {
    console.warn(
      `Calling ${invoker}, but no selector provided or there is no element with the name ${selector}.  Event listener attachment failed.`
    );
  }
}
