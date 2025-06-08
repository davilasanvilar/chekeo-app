import {ICheckForm, IProject, IProjectForm} from '@src/types/entities';
import React, {createContext, Dispatch, RefObject, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Form} from '@src/components/ui/Form/Form';
import {FormField} from '@src/components/ui/FormField/FormField';
import {Input} from '@src/components/ui/Input/Input';
import {Button} from '@src/components/ui/Button/Button';
import {Typography} from '@src/components/ui/Typography/Typography';
import {checkToCheckForm} from '@src/utils/utilFunctions';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useCrud} from '@src/hooks/useCrud';
import {ApiError, ValidationError} from '@src/types/types';
import StatusCode from 'status-code-enum';
import {useToast} from '@src/hooks/useToast';
import {useError} from '@src/hooks/useError';
import {notEmptyValidator, useValidator} from '@src/hooks/useValidator';
import {ChecksCreator} from '@src/components/organisms/ChecksCreator';
import {useNavigation} from '@react-navigation/native';
import {CheckValidationRef} from '@src/components/molecules/CheckForm';

export interface ChecksContext {
  checks: ICheckForm[];
  setChecks: Dispatch<React.SetStateAction<ICheckForm[]>>;
  checkRefs: RefObject<CheckValidationRef>[];
  setCheckRefs: Dispatch<React.SetStateAction<RefObject<CheckValidationRef>[]>>;
}

export const ChecksContext = createContext<ChecksContext>({} as ChecksContext);

export function AddProjectScreen({project}: {project?: IProject}) {
  const [name, setName] = useState<string>(project?.name ?? '');

  const [nameDirty, nameError, nameMessage, nameValidate, setDirtyName] =
    useValidator(name, [notEmptyValidator]);
  const {create} = useCrud<IProject>('project');

  const [checks, setChecks] = useState<ICheckForm[]>(
    project?.checks ? project.checks.map(check => checkToCheckForm(check)) : [],
  );

  const [checkRefs, setCheckRefs] = useState<RefObject<CheckValidationRef>[]>(
    [],
  );
  const {showToast} = useToast();
  const {setError} = useError();

  const queryClient = useQueryClient();

  const createProject = async () => {
    const nameValid = nameValidate();
    checkRefs.map(
      checkRef => checkRef.current && checkRef.current.validateCheck(),
    );

    if (nameValid) {
      await create({name, checks} as IProjectForm);
    } else {
      throw new ValidationError();
    }
  };

  const navigation = useNavigation();
  const onCancel = () => {
    navigation.goBack();
  };

  const {mutate: onCreateProject, isPending: isLoading} = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['searchProjects']});
      navigation.goBack();
    },
    onError: e => {
      if (e instanceof ApiError) {
        if (e.statusCode === StatusCode.ClientErrorBadRequest) {
          showToast({message: 'There are errors in the form', color: 'error'});
          return;
        }
      }
      if (e instanceof ValidationError) {
        showToast({message: 'There are errors in the form', color: 'error'});
        return;
      }
      if (e instanceof Error) {
        setError(e);
      }
    },
  });

  return (
    <View style={style.mainBox}>
      <Typography variant="h1">{'Add project'}</Typography>
      <Form
        fields={
          <>
            <FormField
              label="Name"
              input={
                <Input
                  value={name}
                  setValue={setName}
                  onBlur={() => setDirtyName()}
                />
              }
              error={nameDirty && nameError ? nameMessage : undefined}
            />
            <ChecksContext.Provider
              value={{checks, setChecks, checkRefs, setCheckRefs}}>
              <ChecksCreator />
            </ChecksContext.Provider>
          </>
        }
        buttons={
          <>
            <Button variant="outlined" onPress={() => onCancel()}>
              {'Cancel'}
            </Button>
            <Button
              variant="solid"
              onPress={() => onCreateProject()}
              isLoading={isLoading}>
              {project ? 'Update' : 'Save'}
            </Button>
          </>
        }
      />
    </View>
  );
}

const style = StyleSheet.create({
  mainBox: {
    flex: 1,
    gap: 24,
  },
});
