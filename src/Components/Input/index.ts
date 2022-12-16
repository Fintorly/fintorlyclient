import {InputProps as UIInputProps} from '@ui-kitten/components';
// import {FormBasicProps, FormChangeProps, FormFieldWithIcon} from '../Form';
import Input from './Input';

export type InputProps = 
  // FormFieldWithIcon &
  // FormChangeProps &
   {
    name?: string;
  } & UIInputProps;

export default Input;
