// import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useCrud} from '@src/hooks/useCrud';
import {IProject} from '@src/types/entities';
import {Page} from '@src/types/types';
import {useQuery} from '@tanstack/react-query';
import {Typography} from '@src/components/ui/Typography/Typography';
import {Button} from '@src/components/ui/Button/Button';
import {ProjectCard} from '@src/components/molecules/ProjectCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PrivateScreenNavList} from '@src/types/navProps';

export function ProjectsScreen() {
  const {search} = useCrud<IProject>('project');

  const searchProjects = () => {
    return search(0, 0, {});
  };

  const {navigate} = useNavigation<NavigationProp<PrivateScreenNavList>>();

  const {data: projectPage} = useQuery<Page<IProject> | undefined>({
    queryKey: ['searchProjects'],
    queryFn: searchProjects,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <View style={style.mainBox}>
      <View style={style.headerBox}>
        <Typography variant="h1">{'Projects'}</Typography>
        <Button
          variant="outlined"
          iconLeft="add"
          onPress={() => navigate('AddProject')}>
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
