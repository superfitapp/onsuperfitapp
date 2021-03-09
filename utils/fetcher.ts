const fetcher = async (url: string, accessToken?: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    credentials: "same-origin",
  });

  return res.json();
};

export default fetcher;
