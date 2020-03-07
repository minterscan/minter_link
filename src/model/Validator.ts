export type Validator = {
  public_key: string;
  status: number;
  stake: string;
  part: string;
  meta: ValidatorMeta;
}

export type ValidatorMeta = {
  name: string;
  description: string;
  icon_url: string;
  site_url: string;
}
