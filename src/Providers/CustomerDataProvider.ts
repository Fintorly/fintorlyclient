import {ImageURISource} from 'react-native';
import {LoginUserType} from '../Common/enums/user';
import DataProvider from './DataProvider';

interface CustomerDataHolder {
  tcknOrVkn?: string | null; //TODO daha sonra kaldırılacak
  customerIdentifier?: string | null;
  name?: string | null;
  surname?: string | null;
  profilePhoto?: ImageURISource | string; //TODO dönecek response göre düzenlenecek
  customertype?: LoginUserType | null;
  memberCustomerNumber?: string | null;
  companyName?: string | null;
}

type T = CustomerDataHolder;

class CustomerDataProvider extends DataProvider<T> {
  get configKey(): string {
    return 'CustomerData';
  }

  get autoSave(): boolean {
    return true;
  }

  get secure(): boolean {
    return true;
  }

  get defaultData(): T {
    return {};
  }

  private static _sharedInstance: CustomerDataProvider;
  private constructor() {
    super();
  }

  public static get Data(): T {
    return this.Shared.data;
  }

  public static get Shared(): CustomerDataProvider {
    if (CustomerDataProvider._sharedInstance == null) {
      CustomerDataProvider._sharedInstance = new CustomerDataProvider();
    }
    return CustomerDataProvider._sharedInstance;
  }
}

export default CustomerDataProvider;
