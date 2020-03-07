export type EstimateBuyRequest = {
  coinToBuy: string;
  valueToBuy: string;
  coinToSell: string;
}

export type EstimateSellRequest = {
  coinToSell: string;
  valueToSell: string;
  coinToBuy: string;
}

export type EstimateSellAllRequest = {
  coinToSell: string;
  coinToBuy: string;
}

export type EstimateResponse = {
  commission: string;
  will_pay: string;
  will_get: string;
}
