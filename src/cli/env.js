const parseEnv = () => {
    const envs = process.env;
    const availabilityEnvs = Object.keys(envs)
        .filter((key) => key.startsWith('RSS_'))
        .map(key => `${key}=${envs[key]}`)
        .join(';')
    console.log(availabilityEnvs);
};

parseEnv();