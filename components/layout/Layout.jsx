import MainNavigation from "./main-navigation/MainNavigation";

const Layout = ({children}) => {
    return (
        <>
            <MainNavigation />
            <main>{children}</main>
        </>
    );
};

export default Layout;