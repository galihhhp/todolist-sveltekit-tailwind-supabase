import supabase from '@lib/db';

export const deleteTodo = async (id) => {
  const { error } = await supabase
    .from('todos')
    .delete({ returning: 'minimal' })
    .eq('id', id);
  if (error) console.log(error);
};

export const toggleTodo = async (id, done) => {
  const { error } = await supabase
    .from('todos')
    .update(
      { done: done },
      {
        returning: 'minimal',
      }
    )
    .eq('id', id);
  if (error) console.log(error);
  // location.reload();
};

export const addTodo = async (title, desc, deadline) => {
  const { error } = await supabase
    .from('todos')
    .insert(
      { title: title, desc: desc, deadline: deadline },
      { returning: 'minimal' }
    );
  if (error) console.log(error);
};
