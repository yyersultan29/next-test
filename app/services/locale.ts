'use server';

import {cookies} from 'next/headers';
import {Locale, defaultLocale} from '@/i18n/config';


const LANG_KEY = 'lang';

export async function getUserLocale() {
  return cookies().get(LANG_KEY)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(LANG_KEY, locale);
}