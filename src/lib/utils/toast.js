import { toast } from '@zerodevx/svelte-toast';

export const toastSuccess = (text) =>
  toast.push(text ?? 'Success!', {
    intro: { y: -64 },
    theme: {
      '--toastBackground': '#15803d',
      '--toastBarBackground': '#2F855A',
    },
  });

export const toastFailed = (text) =>
  toast.push(text ?? 'Whoops! Your request failed', {
    intro: { y: -64 },
    theme: {
      '--toastBackground': '#B60C0C',
      '--toastBarBackground': '#C53030',
    },
  });
