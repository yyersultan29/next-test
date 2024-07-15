export const fetchInterceptors = async (
  url: string,
  options: RequestInit = {},
  retryCount: number = 2
) => {
  retryCount = retryCount - 1;
  const response = await fetch(url);

  if (!response.ok) {
    if (retryCount <= 0) {
      const lastResponse = await fetch(url);

      setTimeout(() => {
        return lastResponse.statusText;
      }, 4000);
    } else {
      fetchInterceptors(url, {}, retryCount - 1);
    }
  } else {
    const data = response.json();
    return data;
  }
};
