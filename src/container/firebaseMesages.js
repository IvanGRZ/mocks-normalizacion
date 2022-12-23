import {db} from '../utils/firebase.js'

class firebaseMesages {

    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async addMessage(obj){
        try{
            
            const result = await this.collection.set(obj[0]);   
            
            return result;
        }
        catch(error){
            console.log(error)
        }
    }

    async getAll(obj){
        try{
            const userRef = this.collection.doc('knoEEPH9dZBcMVnqCGGU');
            const snapshot = await userRef.get()
            let conected = {}

            snapshot._fieldsProto.users.arrayValue.values.forEach(element => {
                if( element.mapValue.fields.author.mapValue.fields.id.stringValue == obj.mailIDValue){
                    conected =  {
                        connected: 'true',
                        info: snapshot._fieldsProto.users.arrayValue.values
                    }
                }
            });
            return conected

        }
        catch(error){
            console.log(error)
        }
    }

}

export default firebaseMesages;