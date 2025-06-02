// import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {useCrud} from '@src/hooks/useCrud';
import {Project} from '@src/types/entities';
import {Page} from '@src/types/types';
import {useQuery} from '@tanstack/react-query';
import {Typography} from '@src/components/ui/Typography/Typography';
import {Button} from '@src/components/ui/Button/Button';
import {ProjectCard} from '@src/components/molecules/ProjectCard';

export function ProjectsScreen() {
  // const {navigate} = useNavigation<NavigationProp<PrivateScreenNavList>>();
  const auth = useAuth();

  const {search} = useCrud<Project>('project');

  const searchProjects = () => {
    return search(0, 0, {});
  };

  const {data: projectPage, refetch: reloadProjects} = useQuery<
    Page<Project> | undefined
  >({
    queryKey: ['searchProjects'],
    queryFn: searchProjects,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <View style={style.mainBox}>
      <View style={style.headerBox}>
        <Typography variant="h1">{'Projects'}</Typography>
        <Button variant="outlined" iconLeft="add" onPress={() => false}>
          {'Add'}
        </Button>
      </View>
      <FlatList
        data={projectPage?.content}
        contentContainerStyle={style.projectsList}
        renderItem={element => <ProjectCard project={element.item} />}
      />
    </View>
  );
}

const style = StyleSheet.create({
  mainBox: {gap: 16, flex: 1},
  headerBox: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  projectsList: {
    gap: 16,
  },
});
