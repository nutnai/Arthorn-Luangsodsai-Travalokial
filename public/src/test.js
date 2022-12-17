import { upload_image } from "./firestoreAPI.js";

async function clickImage() {
    var file = document.getElementById("image-upload").files
    // console.log(file[0].f);
    await upload_image(file).then((result) => {
        console.log(result);
    })
}
window.clickImage = clickImage