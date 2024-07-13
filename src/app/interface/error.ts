export type TErrorSources = {
  path: string | number;
  message: string;
}[];
export type TGenerecErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
