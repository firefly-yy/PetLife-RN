import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { Box, VStack, IconButton, Input, Icon, Flex, KeyboardAvoidingView } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IdeaPop from '../components/IdeaPop';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { addIdea, getIdea } from '../api/idea';
import { useQuery, useMutation } from '@tanstack/react-query';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signOut, getCurrentUser } = useAuth();
  const [idea, setIdea] = useState(''); // 状态用于存储用户的想法
  const [filter, setFilter] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const { data: ideas } = useQuery({
    queryKey: ['ideas'],
    queryFn: () => getIdea(filter),
    // enabled: searchTriggered, // 查询仅在 searchTriggered 为 true 时触发
  });

  const { mutate } = useMutation({
    mutationFn: addIdea,
    onSuccess: () => {
      setIdea(''); // 发布后清空输入框
      Alert.alert('发布成功');
    },
    onError: (error) => {
      // 错误处理逻辑
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
      Alert.alert('发布失败', error.message);
    },
  });

  // 处理发布想法
  const handlePublish = () => {
    mutate(idea);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <VStack space={5} w='100%' padding={5}>
          <Box>
            <Input
              placeholder='搜索...'
              w='100%'
              variant='filled'
              bg='white'
              borderRadius='10'
              py='3'
              px='1'
              borderWidth='0'
              onChangeText={setFilter}
              value={filter}
              _focus={{
                borderWidth: '1',
                borderColor: 'cyan.500',
                bg: 'white',
              }}
              InputLeftElement={
                <Icon
                  as={<FontAwesome5 name='search' />}
                  size='sm'
                  m='2'
                  ml='3'
                  color='muted.400'
                />
              }
            />
          </Box>
          <Flex direction='row' alignItems='center' w='100%'>
            <ScrollView
              style={{ flex: 1 }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              <Input
                placeholder='发表你的今日想法'
                variant='filled'
                bg='white'
                borderRadius='10'
                py='2'
                px='3'
                multiline
                maxHeight={120} // 设置最大高度
                borderWidth='0'
                numberOfLines={4} // 根据需要调整行数
                _focus={{
                  borderWidth: '1',
                  borderColor: 'cyan.500',
                  bg: 'white',
                }}
                onChangeText={setIdea}
                value={idea}
                InputRightElement={
                  <IconButton
                    icon={<Icon as={FontAwesome5} name='feather' size='sm' />}
                    borderRadius='full'
                    _icon={{
                      color: 'cyan.500',
                    }}
                    onPress={handlePublish}
                    mr='2'
                  />
                }
              />
            </ScrollView>
          </Flex>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
          >
            <VStack space={4} alignItems='center' w='100%' px='3'>
              <IdeaPop
                title={'Idea Title'}
                onPress={() => {
                  console.log('Idea clicked');
                }}
              />
              {/* Empty state (conditionally rendered) */}
              {/* {ideas.length === 0 && <Text>No ideas to show</Text>} */}
            </VStack>
          </ScrollView>
          {/*<Button*/}
          {/*  onPress={() => navigation.navigate('PetDetail' as never)}*/}
          {/*  colorScheme='cyan'*/}
          {/*  _text={{ color: 'white' }}*/}
          {/*>*/}
          {/*  跳转到PetDetail*/}
          {/*</Button>*/}
          {/*<Button onPress={signOut} colorScheme='cyan' variant='solid'>*/}
          {/*  登出*/}
          {/*</Button>*/}
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default HomeScreen;
