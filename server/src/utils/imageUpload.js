import multer from 'multer'

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limits:{
        fileSize: 1*1024*1024
    },
    fileFilter: (req, file, cb) => {
        if(
            file.mimetype === 'image/jpeg' || 
            file.mimetype === 'image/jpg' || 
            file.mimetype === 'image/png'
        ){
            cb(null,true)
        }
        else{
            cb(new Error("Please upload a valid image!"))
        }
    }
})

export default upload