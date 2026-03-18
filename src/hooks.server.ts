export const handle = async ({ event, resolve }) => {
    return await resolve(event);
};

export default handle;