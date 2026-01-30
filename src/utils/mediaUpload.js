
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

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