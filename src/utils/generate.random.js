export const getRandomId = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString(10);
};