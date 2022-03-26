import axios from 'axios'
import { createApi } from "unsplash-js"


const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: "LM4Rpq3DaqATHDr2uryLi9FbEwE5CJhRJR6qRGc5Nu0"
})

export const imgService = {
    uploadImgFromComp,
    queryPhotos
}

async function queryPhotos(request = 'nature') {
    try {
        const res = await api.search.getPhotos({ query: request, orientation: "landscape" })
        return res.response
    } catch (err) {
        console.log('Couldnt get photos from unsplash', err)
        throw err
    }

}


async function uploadImgFromComp(ev) {
    //Defining our variables
    const UPLOAD_PRESET = 'twello' //insert yours
    const CLOUD_NAME = 'twello' //insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData()
    //Building the request body
    FORM_DATA.append('file', ev.target.files[0]) // form data kind of key : file, add the file we get
    FORM_DATA.append('upload_preset', UPLOAD_PRESET) // add the upload_preset
    //Sending a post method request to Cloudinary`s API
    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA)
        return res.data
    } catch (err) {
        console.log(err)
        throw err
    }
}
