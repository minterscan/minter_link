import { Tx } from '@/model/Tx'
import { MinterWalletBalance } from '@/model/Wallet'

export type CentrifugeTxsResponse = {
  channel: string;
  data: {
    data: Tx;
  };
}

export type CentrifugeAddressResponse = {
  channel: string;
  data: {
    data: MinterWalletBalance[];
  };
}
