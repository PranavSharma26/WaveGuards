// export const getDate = (s) => {
//     const date = new Date(s);
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

// export const getTime = (s) => {
//     const date = new Date(s);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// };  

export const getDate = (s) => {
  const date = new Date(s);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export const getTime = (s) => {
  const date = new Date(s);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC', 
  });
};

export const toDatetimeLocal = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const pad = (n) => n.toString().padStart(2, "0");
  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes())
  );
};



// export const toDatetimeLocal = (dateStr) => {
//   if (!dateStr) return "";
//   const date = new Date(dateStr);
//   // Pad month, day, hour, minute
//   const pad = (n) => n.toString().padStart(2, "0");
//   return (
//     date.getFullYear() +
//     "-" +
//     pad(date.getMonth() + 1) +
//     "-" +
//     pad(date.getDate()) +
//     "T" +
//     pad(date.getHours()) +
//     ":" +
//     pad(date.getMinutes())
//   );
// }