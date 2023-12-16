import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  FlatList,
  Text,
  View,
} from 'react-native';
import { Box, VStack, IconButton, Input, Icon, Flex, KeyboardAvoidingView } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IdeaPop from '../components/IdeaPop';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { addIdea, getIdea } from '../api/idea';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signOut, getCurrentUser } = useAuth();
  const [idea, setIdea] = useState(''); // 状态用于存储用户的想法
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('');
  const queryClient = useQueryClient();

  // const { data } = useQuery({
  //   queryKey: ['ideas', filter],
  //   queryFn: () => getIdea(filter),
  // });
  const { fetchNextPage, hasNextPage, isFetchingNextPage, ...result } = useInfiniteQuery({
    queryKey: ['ideas', filter],
    queryFn: ({ pageParam }) => getIdea(filter, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { mutate } = useMutation({
    mutationFn: addIdea,
    onSuccess: () => {
      setIdea(''); // 发布后清空输入框
      Alert.alert('发布成功');
      queryClient.invalidateQueries({ queryKey: ['ideas'] });
    },
    onError: (error) => {
      // 错误处理逻辑
      Alert.alert(error.message);
    },
  });

  // 处理发布想法
  const handlePublish = () => {
    mutate(idea);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Text>100字以内</Text>
        <Text>500字以内</Text>
        <Text>1000字以内</Text>
      </View>
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
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={() => setFilter(inputValue)}
              returnKeyType={'search'}
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
          <FlatList
            data={result.data?.pages.flatMap((page) => page.items)}
            renderItem={({ item }) => (
              <IdeaPop
                title={item.content}
                onPress={() => {
                  console.log('Idea clicked');
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (!isFetchingNextPage && hasNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
          />
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
