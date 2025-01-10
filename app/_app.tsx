import { SessionWrapper } from "@/utils/sessionProvider";
import { AppProps } from "next/app";


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps & { pageProps: { session: any } }) {
  return (
    <SessionWrapper session={pageProps.session}>
      <Component {...pageProps} />
    </SessionWrapper>
  );
}
