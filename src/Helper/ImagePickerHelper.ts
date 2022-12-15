import {TFunction} from 'i18next';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
  CameraOptions,
  launchCamera,
} from 'react-native-image-picker';
import {checkPermission, Permissions} from '~/Helpers/PermissionHelpers';
import {LangKeys} from '~/Locale/LangKeys';

export enum ImagePickerError {
  ERROR,
  CANCEL,
}

export enum ImagePickerActionSheetButtonTypes {
  CANCEL,
  GALLERY,
  CAMERA,
}

export const getImagePickerActionSheetButtonLabel = (
  type: ImagePickerActionSheetButtonTypes,
  t: TFunction,
) => {
  const labels = {
    [ImagePickerActionSheetButtonTypes.CANCEL]: t(LangKeys.cancel),
    [ImagePickerActionSheetButtonTypes.GALLERY]: t(LangKeys.gallery),
    [ImagePickerActionSheetButtonTypes.CAMERA]: t(LangKeys.camera),
  };

  return labels[type];
};

export const getImagePickerAction = (
  type: ImagePickerActionSheetButtonTypes,
) => {
  switch (type) {
    case ImagePickerActionSheetButtonTypes.CAMERA:
      return TakePhotoByCamera;
    case ImagePickerActionSheetButtonTypes.GALLERY:
    default:
      return SelectImageFromLibrary;
  }
};

export const getFullBase64String = (
  imageType: string,
  data: string,
): string => {
  return 'data:' + imageType + ';base64,' + data;
};

export const SelectImageFromLibrary = (
  imagePickerOptions?: ImageLibraryOptions,
) => {
  let options: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  if (imagePickerOptions) {
    options = {...options, ...imagePickerOptions};
  }

  return new Promise<ImagePickerResponse>((resolve, reject) => {
    checkPermission(Permissions.READ_STORAGE).then(() => {
      launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.didCancel) {
          reject(ImagePickerError.CANCEL);
        } else if (response.errorCode || response.errorMessage) {
          reject(ImagePickerError.ERROR);
        } else {
          resolve(response);
        }
      });
    });
  });
};

export const TakePhotoByCamera = (imagePickerOptions?: CameraOptions) => {
  let options: CameraOptions = {
    mediaType: 'photo',
  };

  if (imagePickerOptions) {
    options = {...options, ...imagePickerOptions};
  }

  return new Promise<ImagePickerResponse>((resolve, reject) => {
    checkPermission(Permissions.CAMERA).then(() => {
      launchCamera(options, (response: ImagePickerResponse) => {
        if (response.didCancel) {
          reject(ImagePickerError.CANCEL);
        } else if (response.errorCode || response.errorMessage) {
          reject(ImagePickerError.ERROR);
        } else {
          resolve(response);
        }
      });
    });
  });
};
