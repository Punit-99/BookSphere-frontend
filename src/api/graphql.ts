import API from "./axios";

export const graphqlRequest = async <T>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T> => {
  try {
    const res = await API.post("", {
      query,
      variables,
    });

    // 🔥 FULL GRAPHQL ERROR LOGGING (IMPORTANT)
    if (res.data.errors) {
      throw new Error(res.data.errors[0].message);
    }

    return res.data.data;
  } catch (err: any) {
    console.log("NETWORK / AXIOS ERROR:", err.response?.data || err.message);
    throw err;
  }
};
