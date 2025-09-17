import { setI18n } from "@lingui/react/server";
import { headers } from "next/headers";
import type { FC } from "react";
import { getI18nInstance } from "./router";

export type LangParam = {
  lang: string;
};

type I18nProps<T = unknown> = T & {
  params: Promise<LangParam>;
};

export const withI18n = <T extends I18nProps = I18nProps>(
  Component: FC<T>,
): FC<T> => {
  return async function WithI18nBuild(props) {
    const { lang } = await props.params;
    const i18n = getI18nInstance(lang);
    setI18n(i18n);

    return <Component {...props} />;
  };
};

export const withI18nNotFound = (Component: FC): FC => {
  return async function WithI18nBuild() {
    const store = await headers();

    const lang = store.get("x-language") ?? "fr";
    const i18n = getI18nInstance(lang);
    setI18n(i18n);

    return <Component />;
  };
};
