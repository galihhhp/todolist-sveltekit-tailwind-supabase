<script>
  import supabase from '@lib/db';
  import '../app.css';

  // const test = async () => {
  //   const { data, error } = await supabase.from('todos').select('*');

  //   console.log(data);
  //   console.log(error);
  // };

  // $: test();
</script>

<div class="relative min-h-screen bg-neutral-100 text-neutral-900 p-4">
  <slot />
</div>
