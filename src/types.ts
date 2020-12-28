export interface TwitterError {
  message: string;
  code: number;
}

export interface TwitterResponseError {
  errors: TwitterError[];
}
