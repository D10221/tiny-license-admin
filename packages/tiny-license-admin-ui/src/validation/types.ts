
export type KeyOf<T> = keyof T & string;

export type ValidationResultMap<TState> = Partial<{ [k in KeyOf<TState>]: string | undefined }>;

export type ValidationFunc<TState> = (data: TState, key: KeyOf<TState>) => boolean | Promise<boolean>;

export type Validate<TState> = (data: TState) => Promise<ValidationResultMap<TState>>;

export type ValidateRule<T> = (
  key: string,
  value: any
) => Promise<ValidationResultMap<T>>;

export type ValidationRuleTest<T> =
  | ValidationFunc<T>
  | RegExp
  | string
  | boolean
  | string[];

/**
 * @returns OK
 */
export type ValidationRule<T> = {
  test: ValidationRuleTest<T>;
  message: ValidationMessage;
};

export type SetResulCallback<T> = (key: KeyOf<T>, value?: string) => any;

export type ValidationRuleMap<T> = Partial<{ [key in KeyOf<T>]: ValidationRule<T> }>;

export type ValidationMessage =
  | { [key: string]: string }
  | string
  | ((k: string) => string)
  // TODO: Race condition !
  | ((k: string) => Promise<string>)
  | Map<string, string>;