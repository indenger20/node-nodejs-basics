const parseEnv = () => {
    const envs = process.env;
    const avalabilityEnvs = Object.keys(envs)
        .filter((key) => key.startsWith('RSS_'))
        .map(key => `${key}=${envs[key]}`)
        .join(';')
    console.log(avalabilityEnvs);
};

parseEnv();