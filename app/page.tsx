import  LanguageSwitcher from "@/components/language-switcher";
import { useTranslations, } from "next-intl";



export default function Home() {
  const t = useTranslations("HomePage");
  
  return (
    <main className="flex flex-col items-center justify-between ">
      {/* {JSON.stringify(d,null,2)} */}
      <LanguageSwitcher />
      <h1>
        {t('title')}
      </h1>
    </main>
  );
}
