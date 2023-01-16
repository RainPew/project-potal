// Environments
export interface Environment {
  name: string;
  gqlApiUrl: string;
  restApiUrl: string;
  website: string;
  siteId: string;
}

const prod: Environment = {
  name: "prod",
  gqlApiUrl: process.env.REACT_APP_SERVICES_API_URL || "",
  restApiUrl:
    process.env.REACT_APP_REST_API_URL ||
    "https://dev001.e-courier.com/dev001/software/xml/ecJsonPost.asmx",
  website: process.env.REACT_APP_WEBSITE || "dev001",
  siteId: process.env.REACT_APP_SITE_ID || "test1",
};
const dev: Environment = {
  name: "dev",
  gqlApiUrl: process.env.REACT_APP_SERVICES_API_URL || "",
  restApiUrl:
    process.env.REACT_APP_REST_API_URL ||
    "https://dev001.e-courier.com/dev001/software/xml/ecJsonPost.asmx",
  website: process.env.REACT_APP_WEBSITE || "dev001",
  siteId: process.env.REACT_APP_SITE_ID || "test1",
};

let env: Environment = dev;

if (process.env.NODE_ENV === "production") {
  env = prod;
} else {
  env = dev;
}

// GraphQL Config
const REGION = "us-east-1";
const WEBSITE = env.website;

export { env, REGION, WEBSITE };
