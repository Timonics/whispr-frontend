const env: string = "production";
let api: string;

if (env === "development") {
  api = "http://localhost:5002/api/v1";
} else {
  api = "https://136c18c6680d.ngrok-free.app/api/v1";
}

export { api };
