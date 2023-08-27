import { db } from './config';
import { addDoc, collection } from 'firebase/firestore';

export const addDocument = async (name, data) => {
    await addDoc(collection(db, name), {
        ...data,
    });
};
