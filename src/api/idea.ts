import AV from 'leancloud-storage';

export const addIdea = async (idea: string) => {
  const Idea = AV.Object.extend('Idea'); // 'Idea' 是您在 LeanCloud 控制台创建的类
  const ideaObj = new Idea();

  // 获取当前用户
  const currentUser = await AV.User.currentAsync();
  if (!currentUser) {
    throw new Error('用户未登录');
  }
  if (!idea) {
    throw new Error('请输入想法');
  }
  if (idea) ideaObj.set('content', idea);
  ideaObj.set('author', currentUser);

  return await ideaObj.save();
};

export const getIdea = async (filter: string, pageParam = 0) => {
  const limit = 10;
  const query = new AV.Query('Idea');
  query.skip(pageParam * limit); // 更新 skip 值
  query.limit(limit);

  if (filter) {
    query.contains('content', filter);
  }

  query.include('author');

  const results = await query.find();
  const hasMore = results?.length === limit; // 假设如果返回的数据少于 limit，则没有更多数据

  return {
    items: results.map((idea) => ({
      id: idea.id,
      content: idea.get('content'),
      author: idea.get('author')?.getUsername(),
      likes: idea.get('likes') || 0,
    })),
    nextCursor: hasMore ? pageParam + 1 : null, // 如果有更多数据，增加页码
  };
};
