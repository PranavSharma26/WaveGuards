export const getDate = (s) => {
    const date = new Date(s);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

export const getTime = (s) => {
    const date = new Date(s);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};  