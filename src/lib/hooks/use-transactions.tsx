import {useState, useEffect, useCallback} from "react";

import useSession from "./use-session";

import {getLastTransactions, getAllTransactions} from "@/services/api";
import {Transaction} from "@/db/types";

export type TransactionFilter = "CASH_IN" | "CASH_OUT" | "SUS" | "ALL" | null;

export function useTransactions() {
  // TO DO: Tanstack Q
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {session} = useSession();

  const fetchTransactions = useCallback(
    async (filter: TransactionFilter = null) => {
      if (!session?.access_token) return;

      try {
        setIsLoading(true);
        setError(null);

        const response =
          filter === null
            ? await getLastTransactions(session.access_token)
            : await getAllTransactions(session.access_token, filter);

        if (response.success) {
          setTransactions(response.data);
        } else {
          setError("Failed to load transactions. Server returned an error.");
        }
      } catch (err) {
        setError(
          `Failed to load transactions: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      } finally {
        setIsLoading(false);
      }
    },
    [session?.access_token],
  );

  useEffect(() => {
    if (session?.access_token) {
      fetchTransactions();
    }
  }, [session?.access_token, fetchTransactions]);

  useEffect(() => {
    if (session?.access_token && activeFilter !== null) {
      fetchTransactions(activeFilter);
    }
  }, [activeFilter, session?.access_token, fetchTransactions]);

  const handleFilterChange = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      fetchTransactions();
    } else {
      const newFilter = filter === "" ? "ALL" : (filter as TransactionFilter);

      setActiveFilter(newFilter);
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    transactions: filteredTransactions,
    isLoading,
    error,
    activeFilter,
    searchQuery,
    setSearchQuery,
    handleFilterChange,
  };
}
