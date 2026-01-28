
import { createClient } from "@supabase/supabase-js";


const url = "https://lwptajhukamvasjfbphy.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cHRhamh1a2FtdmFzamZicGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MDIzMzYsImV4cCI6MjA4NTE3ODMzNn0.gEabHS0Z_Y9f4iofKnfe1ounH8YuCNWQDfHunc898yE";

const supabase = createClient(url, key);

function uploadFile(file) {
    return new Promise(
        (resolve, reject) => {
            const timeStamp = Date.now();
            const fileName = timeStamp + "_" + file.name;
            supabase.storage.from("i-computers-images").upload(fileName, file, {
                cacheControl: "3600",
                upsert: false
            }).then(
                () => {
                    const publicURL = supabase.storage.from("i-computers-images").getPublicUrl(file.name).data.publicUrl;
                    resolve(publicURL);
                }
            ).catch( 
                (error) => {
                    reject(error);
                })
        });
}

export default uploadFile;