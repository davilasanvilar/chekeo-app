import {Project} from '@src/types/entities';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from '../ui/Icon/Icon';
import {colors} from '@src/styleVars';
import {Typography} from '../ui/Typography/Typography';
import {CheckIndicator} from '../atom/CheckIndicator';

export function ProjectCard({project}: {project: Project}) {
  const isOk =
    !project.checks ||
    project.checks.every(
      check =>
        !check.lastResult ||
        (check.lastResult.status >= 200 && check.lastResult.status < 300),
    );

  return (
    <TouchableOpacity style={style.mainBox}>
      <View style={style.titleBox}>
        <Icon
          color={isOk ? colors.success[500] : colors.error[500]}
          size={48}
          type={isOk ? 'ok' : 'error'}
        />
        <Typography variant="h2">{project.name}</Typography>
      </View>
      <View style={style.checkList}>
        {project.checks?.map(check => (
          <CheckIndicator check={check} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  mainBox: {
    padding: 8,
    borderRadius: 8,
    gap: 16,
    backgroundColor: colors.neutral[600],
  },
  titleBox: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkList: {
    flexDirection: 'row',
    gap: 32,
    flexWrap: 'wrap',
  },
});
