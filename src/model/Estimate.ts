export type EstimateBuyRequest = {
  coin_id_to_buy: string;
  value_to_buy: string;
  coin_id_to_sell: string;
}

export type EstimateSellRequest = {
  coin_id_to_sell: string;
  value_to_sell: string;
  coin_id_to_buy: string;
}

export type EstimateSellAllRequest = {
  coin_id_to_sell: string;
  coin_id_to_buy: string;
}

export type EstimateResponse = {
  commission: string;
  will_pay: string;
  will_get: string;
}
