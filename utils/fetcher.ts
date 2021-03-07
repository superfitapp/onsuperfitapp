const fetcher = async (url: string, accessToken?: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }),
    credentials: "same-origin",
  });

  return res.json();
};

export default fetcher;
