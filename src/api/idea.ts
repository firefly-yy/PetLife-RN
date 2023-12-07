import AV from 'leancloud-storage';

export const addIdea = async (idea: string) => {
  const Idea = AV.Object.extend('Idea'); // 'Idea' 是您在 LeanCloud 控制台创建的类
  const ideaObj = new Idea();

  // 获取当前用户
  const currentUser = await AV.User.currentAsync();
  if (!currentUser) {
    throw new Error('用户未登录');
  }
  ideaObj.set('content', idea);
  ideaObj.set('author', currentUser);

  return await ideaObj.save();
};

export const getIdea = async (filter: string) => {
  const query = new AV.Query('Idea');

  // 当 filter 非空时，应用筛选条件
  if (filter) {
    query.contains('content', filter);
  }

  query.include('author'); // 确保加载关联的作者信息

  const results = await query.find();
  return results.map((idea) => ({
    id: idea.id,
    content: idea.get('content'),
    author: idea.get('author')?.getUsername(), // 获取作者的用户名
    likes: idea.get('likes') || 0, // 获取点赞数，如果未定义则默认为 0
  }));
};
