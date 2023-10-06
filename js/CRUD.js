export class CRUD{
	#tableName = null;
    #data = null;
  
	constructor(tableName = underfined){
 		this.#setTableName(tableName);
         this.#setData();
  	}

	#setTableName(tableName){
		this.#tableNameValidate(tableName);
        this.#tableName = tableName;
	}

    #setData(){
        let dateRepository = this.#get(this.#tableName)
    	this.#data = dataRepository === null ? [] : dataRepository;
	}
    
    #tableNameValidate(tableName){
		if(tableName == undefined) throw new 
        Error("Table name required");
	}
    #save() {
        let dataToSave = JSON.stringify(this.#data);
        sessionStorage.setItem(this.#tableName, dataToSave);
    }

    #get(key){
        let data = sessionStorage.getItem(key);
        return JSON.parse(data);
    }

    #existElementWithId(id){
        return this.#data[id] === undefined ? false : true;
    }

    #checkThatElementExitWithId (id){
        if (!this.#existElementWithId(id))
           throw new Error("this element not exists")
    }

    create(data){
        this.#data.push(data);
        this.#save();
        return this.#data.length;
    }

	read(id){
        this.checkThatElementExitWithId(id);
        return this.#data[id];
    }

    readAll(){
        return this.#data;
    }

	update(id, data){
        this.checkThatElementExitWithId(id);
        this.#data[id] = data;
        this.#save();
        return true;
    }

	delete(id){
        this.checkThatElementExitWithId(id);
        this.#data.splice(id,1);
        this.#save();
        return true;
    }
}