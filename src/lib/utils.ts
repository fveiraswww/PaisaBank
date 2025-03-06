import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseEnumToArray = <T extends object>(_enum: T) => {
  return Object.values(_enum) as string[];
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getCardColor = (issuer: string) => {
  switch (issuer.toLowerCase()) {
    case "visa":
      return "from-violet-500 to-purple-700";
    case "mastercard":
      return "from-amber-500 to-orange-600";
    default:
      return "from-emerald-500 to-teal-700";
  }
};

export const getTransactionIcon = (type: string) => {
  switch (type) {
    case "SUS":
      return "🔄";
    case "CASH_IN":
      return "💰";
    case "CASH_OUT":
      return "💸";
    default:
      return "📊";
  }
};
