import { useEffect, useState } from "react";
import Header from "../Header";
import SidebarNavigation from "../SidebarNavigation";
import Head from "next/head";

const Layout = ({ children }) => {
  const [sidebarMenuActive, setSidebarMenuActive] = useState(true);

  const toggleSidebarMenu = () => setSidebarMenuActive(!sidebarMenuActive);
  const showSidebarMenu = () => setSidebarMenuActive(true);

  useEffect(() => {
    setSidebarMenuActive(window.innerWidth > 768 ? true : false);
  }, []);

  return (
    <>
      <Head>
        <title>ASDF Studio Admin</title>
        <meta name="description" content="The complete solution agency" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SidebarNavigation
        toggleSidebarMenu={toggleSidebarMenu}
        sidebarMenuActive={sidebarMenuActive}
      />
      <Header
        toggleSidebarMenu={toggleSidebarMenu}
        showSidebarMenu={showSidebarMenu}
      />
      <section className="content">
        {children}
      </section>
    </>
  );
};

export default Layout;
