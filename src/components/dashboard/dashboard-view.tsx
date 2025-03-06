"use cache";

import {Transactions} from "./transactions";
import {Cards} from "./cards";
import {Header} from "./header";

export default async function DashboardView() {
  return (
    <main className="h-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <Cards />
      <Transactions />
    </main>
  );
}
