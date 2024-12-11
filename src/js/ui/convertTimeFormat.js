export function convertTimeFormat(time){
    const endsAtDate = new Date(time);
            const hours = String(endsAtDate.getHours()).padStart(2, '0');
            const minutes = String(endsAtDate.getMinutes()).padStart(2, '0');
         

            const formattedTime = `${hours}:${minutes}`;
            return formattedTime;


}

export function convertDateformat(time){
    const endsAtDate = new Date(time);
            const day = String(endsAtDate.getDate()).padStart(2, '0');
            const month = String(endsAtDate.getMonth() + 1).padStart(2, '0');
            const year = endsAtDate.getFullYear();
            const formattedDate = `${day}.${month}.${year}`;
            return formattedDate;

}