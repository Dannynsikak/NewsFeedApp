interface ClientResponse<T> {
  status: number;
  data: T;
  headers: Headers;
  url: string;
}

export async function client<T>(
  endpoint: string,
  { body, ...customConfig }: Partial<RequestInit> = {}
): Promise<ClientResponse<T>> {
  const headers = { "Content-Type": "application/json" };

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response: Response;
  let data: T;

  try {
    response = await window.fetch(endpoint, config);

    // Try to parse the response body as JSON
    try {
      data = await response.json();
    } catch (jsonError) {
      // If JSON parsing fails, handle the error
      if (response.ok) {
        return Promise.reject(
          `Response is not valid JSON: ${response.statusText}`
        );
      }
      throw new Error(response.statusText);
    }

    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }

    // For non-OK responses, throw an error with status text
    throw new Error(
      `Error ${response.status}: ${response.statusText} - ${data}`
    );
  } catch (err: any) {
    // Handle any other errors that occur during the fetch process
    return Promise.reject(
      err.message || "An unknown error occurred while fetching data."
    );
  }
}

client.get = function <T>(
  endpoint: string,
  customConfig: Partial<RequestInit> = {}
) {
  return client<T>(endpoint, { ...customConfig, method: "GET" });
};

client.post = function <T>(
  endpoint: string,
  body: any,
  customConfig: Partial<RequestInit> = {}
) {
  return client<T>(endpoint, { ...customConfig, body });
};
