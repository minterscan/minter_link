// Persistent background Keyring store

interface BackgroundStore {
  password: string;
  expiry: number;
}

const store: BackgroundStore = {
  password: '',
  expiry: 0
}

export default store
