import {FrequencyUnitType, ICheckForm} from '@src/types/entities';
import React, {forwardRef, useContext, useImperativeHandle} from 'react';
import {StyleSheet, View} from 'react-native';
import {FormField} from '../ui/FormField/FormField';
import {Input} from '../ui/Input/Input';
import {Typography} from '../ui/Typography/Typography';
import {IconButton} from '../ui/Button/IconButton';
import {colors} from '@src/styleVars';
import {ChecksContext} from '@src/screens/AddProjectScreen';
import {Switch} from '../ui/Switch/Switch';
import {
  notEmptyValidator,
  shouldBeANumberValidator,
  shouldBeGreaterThanZero,
  useValidator,
} from '@src/hooks/useValidator';

export interface CheckFormProps {
  position: number;
  checkForm: ICheckForm;
}

export interface CheckValidationRef {
  validateCheck: () => boolean;
}

export const CheckForm = forwardRef<CheckValidationRef, CheckFormProps>(
  ({position, checkForm}, ref) => {
    const {setChecks, setCheckRefs} = useContext(ChecksContext);
    const [nameDirty, nameError, nameMessage, nameValidate, setDirtyName] =
      useValidator(checkForm.name, [notEmptyValidator]);
    const [urlDirty, urlError, urlMessage, urlValidate, setDirtyUrl] =
      useValidator(checkForm.url, [notEmptyValidator]);
    const [
      frequencyDirty,
      frequencyError,
      frequencyMessage,
      frequencyValidate,
      setDirtyFrequency,
    ] = useValidator(checkForm.frequency.toString(), [
      notEmptyValidator,
      shouldBeANumberValidator,
      shouldBeGreaterThanZero,
    ]);

    const onDeleteCheck = () => {
      setChecks(oldState => [
        ...oldState.slice(0, position),
        ...oldState.slice(position + 1),
      ]);
      setCheckRefs(oldState => [
        ...oldState.slice(0, position),
        ...oldState.slice(position + 1),
      ]);
    };

    const onChangeValue = <K extends keyof ICheckForm>(
      property: K,
      value: ICheckForm[K],
    ) => {
      const newCheck = checkForm;
      newCheck[property] = value;
      setChecks(oldState => [
        ...oldState.slice(0, position),
        checkForm,
        ...oldState.slice(position + 1),
      ]);
    };

    useImperativeHandle(ref, () => ({
      validateCheck() {
        const isNameValid = nameValidate();
        const isUrlValid = urlValidate();
        const isFrequencyValid = frequencyValidate();
        return isNameValid && isUrlValid && isFrequencyValid;
      },
    }));

    return (
      <View>
        <View style={style.header}>
          <Typography variant="h2">{`Check ${position + 1}`}</Typography>
          <IconButton
            fontColor={colors.error[500]}
            variant="ghost"
            iconSize={32}
            icon="delete"
            onPress={() => onDeleteCheck()}
          />
        </View>
        <FormField
          label="Name"
          input={
            <Input
              value={checkForm.name}
              setValue={val => onChangeValue('name', val)}
              onBlur={() => setDirtyName()}
            />
          }
          error={nameDirty && nameError ? nameMessage : undefined}
        />
        <FormField
          label="Url"
          input={
            <Input
              value={checkForm.url}
              setValue={val => onChangeValue('url', val)}
              onBlur={() => setDirtyUrl()}
            />
          }
          error={urlDirty && urlError ? urlMessage : undefined}
        />
        <FormField
          label="Frequency (h)"
          input={
            <View style={style.inputAndSwitchBox}>
              <Input
                value={checkForm.frequency.toString()}
                keyboardType="decimal-pad"
                setValue={val =>
                  onChangeValue(
                    'frequency',
                    isNaN(Number(val)) ? 0 : Number.parseInt(val, 10),
                  )
                }
                onBlur={() => setDirtyFrequency()}
              />
              <Switch
                options={[
                  {label: 'h', value: 'h'},
                  {label: 'min', value: 'm'},
                ]}
                value={checkForm.frequencyType}
                setValue={val =>
                  onChangeValue('frequencyType', val as FrequencyUnitType)
                }
              />
            </View>
          }
          error={
            frequencyDirty && frequencyError ? frequencyMessage : undefined
          }
        />
      </View>
    );
  },
);

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'space-between',
  },
  inputAndSwitchBox: {
    flexDirection: 'row',
    gap: 12,
  },
});
