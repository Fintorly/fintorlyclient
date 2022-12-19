import DataProvider from './DataProvider';
import {Language} from '../Utils/Enum';

interface CommonDataHolder {
  language?: Language;
}

type T = CommonDataHolder;

class CommonDataProvider extends DataProvider<T> {
  private static _sharedInstance: CommonDataProvider;
  private constructor() {
    super();
  }
  get configKey(): string {
    return 'common';
  }

  get autoSave(): boolean {
    return true;
  }

  get secure(): boolean {
    return false;
  }

  get defaultData(): T {
    return {};
  }

  public static get Data(): T {
    return this.Shared.data;
  }

  public static get Shared(): CommonDataProvider {
    if (CommonDataProvider._sharedInstance == null) {
      CommonDataProvider._sharedInstance = new CommonDataProvider();
    }
    return CommonDataProvider._sharedInstance;
  }
}

export default CommonDataProvider;
