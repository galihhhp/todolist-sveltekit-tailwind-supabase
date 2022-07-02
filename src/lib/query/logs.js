import supabase from '@lib/db';

export const logs = async (msg, userId, type) => {
  const { error, data } = await supabase
    .from('logs')
    .insert(
      { msg: msg, user_id: userId, type: type },
      { returning: 'minimal' }
    );

  if (error) {
    console.log(error);
  }
};
