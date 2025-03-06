import {useState, useEffect} from "react";

import useSession from "./use-session";

import {getUserCards} from "@/services/api";
import {Card} from "@/db/types";

export function useCards() {
  // TO DO: Tanstack Q
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {session} = useSession();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const response = await getUserCards(session?.access_token ?? "");

        if (response.success) {
          setCards(response.data);
        }
        setIsLoading(false);
      } catch {
        setError("Failed to load cards. Please try again.");
        setIsLoading(false);
      }
    };

    if (session?.access_token) {
      fetchCards();
    }
  }, [session?.access_token]);

  return {cards, isLoading, error};
}
