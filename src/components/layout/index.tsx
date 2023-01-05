import { ChildrenProps } from "../../types";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <section className="flex justify-center items-center max-w-full w-full min-h-screen dark:bg-gray-900">
      <div className="flex justify-center items-center flex-col p-4 max-w-7xl w-full">
        {children}
      </div>
    </section>
  );
};

export default Layout;
