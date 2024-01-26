export type Options = readonly { label: string; value: string }[];
export type GetValues<T extends Options> = T[number]["value"];
