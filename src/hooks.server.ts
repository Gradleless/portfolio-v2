export let requestIp: string;

export const handle = async ({ event, resolve }) => {

    requestIp = event.getClientAddress(); 
    return await resolve(event);
};

export default handle;