"use client";
import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Search, Filter} from "lucide-react";

import {useTransactions} from "@/lib/hooks/use-transactions";
import {formatDate, getTransactionIcon} from "@/lib/utils";

const containerVariants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 15},
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export function Transactions() {
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    transactions,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    activeFilter,
    searchQuery,
    setSearchQuery,
    handleFilterChange,
  } = useTransactions();

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatCurrency = (amount: string) => {
    const value = Number.parseFloat(amount);

    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.section
      animate={{y: 0, opacity: 1}}
      className="mt-0 flex-1 rounded-3xl bg-white p-4 md:mt-6 dark:bg-gray-800"
      initial={{y: 50, opacity: 0}}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Úlltimos movimientos</h2>
        <motion.button
          className="rounded-full bg-gray-100 p-2 dark:bg-gray-700"
          whileTap={{scale: 0.95}}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter size={18} />
        </motion.button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
            size={18}
          />
          <input
            className="w-full rounded-xl bg-gray-100 py-3 pr-4 pl-10 text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none dark:bg-gray-700"
            placeholder="Buscar transacciones..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <AnimatePresence>
          {filterOpen && (
            <motion.div
              animate={{opacity: 1, scaleY: 1}}
              className="mt-2 grid origin-top grid-cols-3 gap-2 overflow-hidden rounded-xl bg-gray-100 p-3 dark:bg-gray-700"
              exit={{opacity: 0, scaleY: 0}}
              initial={{opacity: 0, scaleY: 0}}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              <button
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                  activeFilter === "ALL"
                    ? "bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300"
                    : "bg-white dark:bg-gray-800"
                }`}
                type="button"
                onClick={() => handleFilterChange("ALL")}
              >
                Todas
              </button>
              <button
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                  activeFilter === "CASH_IN"
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                    : "bg-white dark:bg-gray-800"
                }`}
                type="button"
                onClick={() => handleFilterChange("CASH_IN")}
              >
                Ingresos
              </button>
              <button
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                  activeFilter === "CASH_OUT"
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                    : "bg-white dark:bg-gray-800"
                }`}
                type="button"
                onClick={() => handleFilterChange("CASH_OUT")}
              >
                Egresos
              </button>
              <button
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors duration-200 ${
                  activeFilter === "SUS"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-white dark:bg-gray-800"
                }`}
                type="button"
                onClick={() => handleFilterChange("SUS")}
              >
                Suscripciones
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isLoadingTransactions ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-violet-700" />
        </div>
      ) : transactionsError ? (
        <div className="py-10 text-center text-red-500">{transactionsError}</div>
      ) : (
        <motion.div
          key={activeFilter + searchQuery}
          animate="show"
          className="space-y-3"
          initial="hidden"
          variants={containerVariants}
        >
          <AnimatePresence mode="wait">
            {filteredTransactions.length > 0 ? (
              <motion.div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    layout
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50"
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: {duration: 0.2},
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: {duration: 0.2},
                    }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                          transaction.transactionType === "CASH_IN"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : transaction.transactionType === "SUS"
                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {getTransactionIcon(transaction.transactionType)}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold ${Number.parseFloat(transaction.amount) > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {Number.parseFloat(transaction.amount) > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                animate={{opacity: 1}}
                className="py-8 text-center text-gray-500 dark:text-gray-400"
                exit={{opacity: 0}}
                initial={{opacity: 0}}
                transition={{duration: 0.3}}
              >
                No se encontraron movimientos
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.section>
  );
}
