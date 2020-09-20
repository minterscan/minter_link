export enum UISettingsData {
  General = 'general',
  Wallets = 'wallets'
}

export type UISettingsButtons = {
  [key in UISettingsData]: UISettingsButton;
}

export type UISettingsButton = {
  icon: string;
  label: string;
}

export type Settings = {
  autoLock: number;
}
