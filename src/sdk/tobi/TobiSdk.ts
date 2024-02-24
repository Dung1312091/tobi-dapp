/* eslint-disable @typescript-eslint/no-explicit-any */
import { Config, Connector } from "wagmi";
import { topiHelper } from ".";
export class TobiSdk {
  config: Config;
  connector: Connector;
  constructor(config: Config) {
    this.config = config;
    this.connector = config.connectors[0];
  }

  private onDisplayUri(uri: string) {
    if (topiHelper.isDappRunningOnTelegram()) {
      const paramString = encodeURIComponent(uri || "");
      const params = paramString
        .replaceAll("/", "%2F")
        .replaceAll(",", "%2C")
        .replaceAll(":", "%3A")
        .replaceAll(".", "%2E")
        .replaceAll("-", "%2D")
        .replaceAll("_", "%5F")
        .replaceAll("&", "-")
        .replaceAll("=", "__")
        .replaceAll("%", "--");

      const url =
        "https://t.me/mpc_wallet_connect_bot/tobi_wallet?startapp=" + params;

      (window as any).Telegram.WebApp.openTelegramLink(url);
    } else {
      window.parent.postMessage(
        {
          type: "RequestConnect",
          uri: uri,
        },
        "*"
      );
    }
  }

  public initialize() {
    if (topiHelper.isDappRunningOnBrowser()) return;
    this.connector.getProvider().then((provider: any) => {
      provider.on("display_uri", this.onDisplayUri);
    });
  }
  public destroy() {
    this.connector.getProvider().then((provider: any) => {
      provider.removeListener("display_uri", this.onDisplayUri);
    });
  }
}
