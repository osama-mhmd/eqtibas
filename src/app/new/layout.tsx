import ReduxProvider from "@/redux/redux-provider";
import Nav from "@/components/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <ReduxProvider>{children}</ReduxProvider>
    </>
  );
}
