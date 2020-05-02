const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) =>{
                if( err) {
                    cb(err);
                }
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        },
        destination: (req,file,cb) => {
            
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
        }
    }),
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
    fileFilter: (req, file , cb ) => {
        const aMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if (aMimes.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error('Arquivo Inválido'));
        }
    }
};