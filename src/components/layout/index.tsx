import { Children } from "src/interfaces";

const Layout = ({ children }: Children) => {
  return (
    <section className="flex justify-center items-center w-full min-h-screen dark:bg-gray-900">
      <div className="flex justify-center items-center flex-col p-4 w-[85%]">
        {children}
      </div>
    </section>
  );
};

export default Layout;
