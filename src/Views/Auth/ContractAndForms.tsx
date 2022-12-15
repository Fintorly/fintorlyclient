import React, {useContext, useRef, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useStyle} from '~/Theme/ThemeHelper';
import {Card} from '~/Components/Card';
import Text from '~/Components/Text';
import {useTranslation} from 'react-i18next';
import {LangKeys} from '~/Locale/LangKeys';
import Form from '~/Components/Form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '~/Common/yup';
import {useForm} from 'react-hook-form';
import Button from '~/Components/Button';
import KeyboardAwareScrollView from '~/Components/KeyboardAwareScrollView';
import {
  ContractFormModal,
  ContractFormModalRefType,
} from '~/Components/ContractFormModal';
import UserContext from '~/Context/UserContext';
import {DocumentsType} from '~/Common/enums/document';
import MobileApi from '~/Api/MobileApi';
import {handleError} from '~/Helpers/ErrorHandler';
import {hideHud, showHud} from '~/Hud/HudHelper';
import {documentList} from '~/Common/constants/documents';
import {schemaDocumentsForms} from '~/Common/validations/contractAndForm';
import {GoToLoginRequirements} from '~/Navigator/Router';
import AvatarWithName from '~/Components/AvatarWithName';
import {getUserAccessType} from '~/Helpers/User';

export function ContractAndForms() {
  type FormType = yup.InferType<typeof schemaDocumentsForms>;
  type FormDocumentInputType = keyof FormType;
  const _documentList = documentList;
  const {t} = useTranslation();
  const {layoutStyles} = useStyle();
  const [modalMessage, setModalMessage] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string | null>('');
  const [selectedInputName, setSelectedInputName] =
    useState<FormDocumentInputType>();
  const {userInfo, setUserInfo} = useContext(UserContext);
  const contractModalRef = useRef<ContractFormModalRefType>(null);
  const {handleSubmit, control, formState, setValue, getValues} =
    useForm<FormType>({
      mode: 'onChange',
      resolver: yupResolver(schemaDocumentsForms),
      defaultValues: {
        kvkk: false,
        lightingText: false,
        userAgreement: false,
      },
    });

  const ListHeaderComponent = () => {
    return (
      <Text category="h1" appearance="ink">
        {t(LangKeys.label_form_contract)}
      </Text>
    );
  };

  const openModal = (type: DocumentsType, inputName: FormDocumentInputType) => {
    showHud();
    MobileApi.document
      .getDocumentTemplateByTemplateName(type)
      .then((response) => {
        setSelectedInputName(inputName);
        const message = response.data.content;
        setModalMessage(message ?? '');
        setFormTitle(response?.data?.description ?? '');
        contractModalRef?.current?.show();
      })
      .catch(handleError)
      .finally(hideHud);
  };

  const approveDocumentAction = (inputName: FormDocumentInputType) => {
    setValue(inputName, true, {
      shouldValidate: true,
    });
  };

  const declineDocumentAction = (inputName: FormDocumentInputType) => {
    setValue(inputName, false, {
      shouldValidate: true,
    });
  };

  const handlePress = (
    type: DocumentsType,
    inputName: FormDocumentInputType,
  ) => {
    if (!getValues(inputName)) {
      openModal(type, inputName);
      return;
    }
    declineDocumentAction(inputName);
  };

  const handleLinkPress = (
    url: DocumentsType,
    inputName: FormDocumentInputType,
  ) => {
    openModal(url, inputName);
  };

  const handleApprove = () => {
    selectedInputName && approveDocumentAction(selectedInputName);
  };

  const _handleSubmit = () => {
    showHud();
    MobileApi.me
      .getApprovment()
      .then((response) => {
        const accessType = getUserAccessType(response.data);
        MobileApi.approvement
          .updateDocumentConfirmed()
          .then(() => {
            hideHud();
            setUserInfo({
              ...response.data,
              isDocumentConfirmed: true,
              userAccessType: accessType,
            });
            GoToLoginRequirements();
          })
          .catch(handleError);
      })
      .catch(handleError);
  };

  return (
    <View
      style={[
        layoutStyles.fullscreenContainer,
        layoutStyles.horizontalPadding,
        layoutStyles.marginTopLarge,
      ]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={[
          layoutStyles.flexGrow,
          layoutStyles.bottomPadding,
        ]}>
        <View style={[layoutStyles.alignCenter, layoutStyles.justifyCenter]}>
          <AvatarWithName
            name={[userInfo.name, userInfo.surname].join(' ')}
            label={t(LangKeys.label_greeting_text)}
          />
        </View>
        <Card
          style={[
            layoutStyles.marginTopLarge,
            layoutStyles.marginBottomMedium,
          ]}>
          <Form.Context value={{control}}>
            <FlatList
              bounces={false}
              style={[layoutStyles.bgWhite]}
              contentContainerStyle={layoutStyles.paddingRightMedium}
              data={_documentList}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({item}) => {
                return (
                  <Form.CheckBox
                    name={item.name}
                    label={t(item.label)}
                    preventFormUpdate
                    checked={getValues(item.name) ?? false}
                    onLinkPress={() => handleLinkPress(item.type, item.name)}
                    onChange={() => handlePress(item.type, item.name)}
                  />
                );
              }}
              ListHeaderComponent={ListHeaderComponent}
            />
          </Form.Context>
          <Button
            label={t(LangKeys.button_continue).toLocaleUpperCase()}
            buttonType="rounded"
            disabled={!formState.isValid}
            style={layoutStyles.marginTopBase}
            onPress={handleSubmit(_handleSubmit)}
            status={'primary'}
          />
        </Card>
        <ContractFormModal
          ref={contractModalRef}
          approveText={t(LangKeys.read_approve)}
          message={modalMessage}
          title={formTitle ?? ''}
          onApprove={handleApprove}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
