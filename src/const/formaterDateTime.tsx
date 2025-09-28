export const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    let processedString = dateString;
    if (!dateString.endsWith('Z')) {
        processedString = dateString + 'Z';
    }
    
    
    const date = new Date(processedString);
    
    if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return dateString;
    }
    
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
    
};