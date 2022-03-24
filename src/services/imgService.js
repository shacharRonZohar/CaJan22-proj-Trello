import axios from 'axios'

export const imgService = {
    uploadImgFromComp
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
