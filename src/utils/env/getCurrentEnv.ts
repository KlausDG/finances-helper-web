const environments = {
  development: "dev",
  production: "prod",
};

export const getCurrentEnv = () => {
  const currentEnv = import.meta.env.MODE;
  return environments[currentEnv as keyof typeof environments];
};
