import Multer from 'multer';

const multerOptions = {
    storage:Multer.memoryStorage()
};

export default multerOptions;