const parseArgs = () => {
  const args = process.argv;
  const availabilityArguments = args
    .map((arg, index, array) => {
      if (arg.startsWith('--')) {
        return `${arg.replace('--', '')} is ${array[index + 1]}`
      }
      return null;
    })
    .filter(Boolean)
    .join(', ');
  console.log(availabilityArguments);
};

parseArgs();
