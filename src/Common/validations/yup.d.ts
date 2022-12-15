import * as yup from 'yup';
import {AnyObject, Maybe} from 'yup/lib/types';

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    isValidTCKN(): StringSchema<TType, TContext>;
    turkishPhoneNumber(): StringSchema<TType, TContext>;
    clearEmpty(): StringSchema<TType, TContext>;
    email(): StringSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    clearNaN(): NumberSchema<TType, TContext>;
  }
}
