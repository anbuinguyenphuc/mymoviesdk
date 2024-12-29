let API_KEY;
export function initSdk({ apiKey }) {
  API_KEY = apiKey;
}

const checkAPIKey = () => {
  if (!API_KEY) {
    throw new Error("API_KEY is not provided, must call initSDK first");
  }
};
export const get = ({ url }: { url: string }): Promise<any> => {
  checkAPIKey();
  return new Promise(function (resolve, reject) {
    console.log("MOVIE-SDK:requesting " + url);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json: any) => {
        resolve(json);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};
