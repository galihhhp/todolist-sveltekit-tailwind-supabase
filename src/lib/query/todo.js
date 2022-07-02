import supabase from '@lib/db';
import { toastFailed, toastSuccess } from '@lib/utils/toast';
import { logs } from '@lib/query/logs';

export const deleteTodo = async (id, title, userId) => {
  const { error } = await supabase
    .from('todos')
    .delete({ returning: 'minimal' })
    .eq('id', id);

  if (error) {
    toastFailed('FAILED: todo is not deleted, please try again later.');
  } else {
    logs(`DELETE: ${title} is deleted.`, userId, 'delete');
    toastSuccess(`DELETE: ${title} is deleted!`);
  }
};

export const toggleTodo = async (id, done, title, userId) => {
  const { error } = await supabase
    .from('todos')
    .update(
      { done: done },
      {
        returning: 'minimal',
      }
    )
    .eq('id', id);
  if (error) {
    toastFailed('FAILED: todo is not updated, please try again later.');
  } else {
    logs(`DONE: ${title} is Updated`, userId, 'done');
    toastSuccess(`DONE: ${title} is done!`);
  }
  // location.reload();
};

export const addTodo = async (title, desc, deadline, userId) => {
  const { error } = await supabase
    .from('todos')
    .insert(
      { title: title, desc: desc, deadline: deadline, user_id: userId },
      { returning: 'minimal' }
    );
  if (error) {
    toastFailed('FAILED: todo is not added, please try again later.');
  } else {
    logs(`ADD: ${title} is added!`, userId, 'add');
    toastSuccess(`ADD: ${title} is added!`);
  }
};
