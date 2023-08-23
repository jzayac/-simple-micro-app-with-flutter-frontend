interface ICountTree {
  [key: string]: string[];
}

export interface TreeReponse {
  [key: string]: ICountTree[];
}

export interface AuthTokensResponse {
  access: TokenResponse;
  refresh?: TokenResponse;
}
