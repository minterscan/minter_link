export type Config = {
  explorerBaseUrl: string;
  explorerApiBaseUrl: string;
  explorerWsUrl: string;
  gateApiBaseUrl: string;
  notification: {
    width: number;
    height: number;
  };
  const: {
    autoRedirectTimeout: number;
  };
  defaultSettings: {
    autoLock: number;
  };
}
