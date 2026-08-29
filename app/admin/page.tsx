import { notFound } from "next/navigation";

import { App } from "./app";

const AdminPage = async () => {
  if (process.env.NODE_ENV === "production") notFound();

  return <App />;
};

export default AdminPage;
