const BASE_URL = "/api/paisabank";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "An error occurred");
  }

  return response.json();
};

export const getUserCards = async (accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/cards`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching user cards:", error);
    throw error;
  }
};

export const getLastTransactions = async (accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/movements/last`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching last transactions:", error);
    throw error;
  }
};

export const getAllTransactions = async (accessToken: string, filter?: string) => {
  try {
    const url = filter ? `${BASE_URL}/movements/all?filter=${filter}` : `${BASE_URL}/movements/all`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching all transactions:", error);
    throw error;
  }
};
