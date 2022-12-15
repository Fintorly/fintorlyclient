import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

type Partial<T> = {
  [P in keyof T]?: T[P];
};

abstract class DataProvider<T> {
  abstract get configKey(): string;
  abstract get autoSave(): boolean;
  abstract get secure(): boolean;
  abstract get defaultData(): T;

  public get secureAccesibility(): string {
    return ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY;
  }

  public get data(): Partial<T> {
    return this._data;
  }

  public set data(val: Partial<T>) {
    if (this.isLoaded) {
      this._data = val;

      if (this.autoSave) {
        this.save();
      }
    }
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  private _data: Partial<T> = {};
  private _isLoaded: boolean = false;
  private _revokeProxy?: Function;

  private handleReload(resolve?: (data: any) => void, resultData?: string) {
    this._data = resultData ? JSON.parse(resultData) : this.defaultData;
    this.injectAutoSaveProxyIfEnabled();
    this._isLoaded = true;
    resolve && resolve(this._data);
  }

  private injectAutoSaveProxyIfEnabled(): void {
    if (this.autoSave) {
      if (this._revokeProxy) {
        this._revokeProxy();
        this._data = {};
      }

      let {proxy, revoke} = Proxy.revocable(this._data, {
        set: (target, key, value) => {
          target[key] = value;
          this.save();
          return true;
        },
      });
      this._data = proxy;
      this._revokeProxy = revoke;
    }
  }

  public reload(): Promise<Partial<T>> {
    console.log('DataProvider::reload->Begin', this.configKey);
    return new Promise<Partial<T>>((resolve) => {
      const promise = this.secure
        ? RNSecureKeyStore.get(this.configKey)
        : AsyncStorage.getItem(this.configKey);
      promise
        .then((result) => {
          console.log('DataProvider::reload->Success', this.configKey);
          this.handleReload(resolve, result);
        })
        .catch((error) => {
          console.log(
            'DataProvider::reload->Fail',
            this.configKey,
            `Error: ${error}`,
          );
          this.handleReload(resolve);
        });
    });
  }

  public save(): Promise<any> {
    if (!this._isLoaded || !this._data) {
      return Promise.reject();
    }

    const dataStr = JSON.stringify(this._data);
    if (this.secure) {
      return RNSecureKeyStore.set(this.configKey, dataStr, {
        accessible: this.secureAccesibility,
      });
    } else {
      return AsyncStorage.setItem(this.configKey, dataStr);
    }
  }

  public saveByKey(value: Partial<T>): Promise<any> {
    if (!this._isLoaded) {
      return Promise.reject();
    }

    if (!this._data) {
      this._data = {};
    }
    this._data = {...this._data, ...value};
    if (this.autoSave) {
      return this.save();
    } else {
      return Promise.resolve(this.data);
    }
  }

  public erase(): Promise<any> {
    this.handleReload();
    if (this.secure) {
      return RNSecureKeyStore.remove(this.configKey);
    } else {
      return AsyncStorage.removeItem(this.configKey);
    }
  }
}

export default DataProvider;
