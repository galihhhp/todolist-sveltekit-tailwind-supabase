<script>
  import { user } from '@lib/stores/user';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import supabase from '@lib/db';
  import { browser } from '$app/env';

  $user = supabase.auth.user();

  $: console.log('Auth Wrapper', $user);

  const redirect = () => {
    if ($user && $page.url.pathname === '/') goto('/select-teams');
    if (!$user) goto('/');
  };

  $: if (browser) redirect();

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event == 'SIGNED_IN') {
      $user = supabase.auth.user();
    }
    if (event == 'TOKEN_REFRESHED') {
      $user = supabase.auth.user();
    }
    if (event == 'PASSWORD_RECOVERY') {
      $user = null;
      await goto('/resetPassword' + '?reset=' + session.access_token, {
        noscroll: true,
      });
    }
    if (event == 'SIGNED_OUT') {
      $user = null;
      await goto('/', { noscroll: true });
    }
  });
</script>

<div class="w-full">
  <slot />
</div>
