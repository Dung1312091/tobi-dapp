/* eslint-disable @typescript-eslint/no-explicit-any */
class TobiHelper {
  public isDappRunningInIframe() {
    return window.self !== window.top;
  }
  public isDappRunningOnTelegram() {
    return (window as any).Telegram.WebApp.initData;
  }
  public isDappRunningOnBrowser() {
    return !(this.isDappRunningInIframe() || this.isDappRunningOnTelegram());
  }
  public displayW3Modal(display: "hidden" | "unset") {
    const w3mModal = document.querySelector("w3m-modal");
    if (w3mModal) {
      w3mModal.style.visibility = display;
    }
  }
}
export const topiHelper = new TobiHelper();
