const transformObject = (values) => {
    return Object.entries(values).reduce((acc, [key, value]) => {
        // console.log(1)
        // console.log(acc)
        const [prefix, suffix] = key.split('-');

        if (!suffix) {
            // Handle keys without a prefix
            acc[prefix] = acc[prefix] || {};
            acc[prefix] = value;
        } else {
            // Handle keys with a prefix
            acc[prefix] = acc[prefix] || [];
            if (value) {
                acc[prefix].push(suffix);
            }
        }

        return acc;
    }, {});
}


export {transformObject}