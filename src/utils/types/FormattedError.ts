export type FormattedError = {
  property: string;
  constraints?: { [type: string]: string };
};
