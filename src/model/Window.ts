export enum WindowType {
  Sign = 'sign',
  Connect = 'connect',
  Payment = 'payment'
}

export type WindowQueryObject = {
  tabId: string;
  coin?: string;
  amount?: string;
  address?: string;
  payload?: string;
  message?: string;
  merchantUrl: string;
  merchantName: string;
}