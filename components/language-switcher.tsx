'use client';

import { setUserLocale } from '@/app/services/locale';
import { Locale } from '@/i18n/config';
import { Button } from 'antd';


import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending,startTransition] = useTransition();

  const switchLanguage = (newLocale: string) => {
   const local = newLocale as Locale;
   startTransition(() => {
    setUserLocale(local);
   })
  };

  return (
    <div>
      <Button loading={isPending} onClick={() => switchLanguage('en')}>English</Button>
      <Button loading={isPending} onClick={() => switchLanguage('ru')}>Russian</Button>
    </div>
  );
}
