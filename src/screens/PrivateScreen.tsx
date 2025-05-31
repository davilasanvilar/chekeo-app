import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button/Button';
import { useCrud } from '../hooks/useCrud';
import { useQuery } from '@tanstack/react-query';
import { Page } from '../types/types';
import { Project } from '../types/entities';

export function PrivateScreen() {
  const { user, logout } = useAuth();

  const { search } = useCrud<Project>('project')

  const searchProjects = () => {
    return search(0, 0, {})
  }
  const { authToken } = useAuth()

  const {
    data: projectPage,
    refetch: reloadProjects
  } = useQuery<Page<Project> | undefined>({
    queryKey: ['searchProjects'],
    queryFn: searchProjects,
    retry: false,
    refetchOnWindowFocus: false,
  });


  return (
    <View>
      <Text style={{ color: 'black' }}>WELCOME</Text>
      <Text style={{ color: 'black' }}>{user?.username}</Text>
      <Button onPress={logout}>Logout</Button>
      <Text style={{ color: 'blue' }}>{projectPage?.content === undefined ? 'No data' : projectPage?.content.map(project => project.name)}
      </Text>
      <Text style={{ color: 'green' }}>{authToken}</Text>
      <Button onPress={() => reloadProjects()}>{"Reload data"}</Button>
    </View>
  );
}
