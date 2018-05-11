const CONTRACT_ADDRESS = "n1kSEWfANznycZ2VvM2kAPeLe8o7wWgUN68";
			
class SmartContractApi {
    constructor(contractAdress) {
        let NebPay = require("nebpay"); 
        this.nebPay = new NebPay();
        this._contractAdress = contractAdress || CONTRACT_ADDRESS;
    }

    getContractAddress() {
        return this.contractAdress;
    }

    _simulateCall({ value = "0", callArgs = "[]", callFunction , callback }) {
        this.nebPay.simulateCall(this._contractAdress, value, callFunction, callArgs, {  
            callback: function(resp){
                if(callback){
                    callback(resp);
                }           
            }   
        });
    }
    
    _call({ value = "0", callArgs = "[]", callFunction , callback }) {
        this.nebPay.call(this._contractAdress, value, callFunction, callArgs, {  
            callback: function(resp){
                if(callback){
                    callback(resp);
                }           
            }   
        });
    } 
}

class ProfileContractApi extends SmartContractApi{
    addOrUpdateProfile(profile, cb) {
        this._call({
            callArgs : JSON.stringify([JSON.stringify(profile)]),
            callFunction : "addOrUpdate", 
            callback: cb
        });
    }
    
    getTotalCount(cb) {
        this._simulateCall({
            callFunction : "total", 
            callback: cb
        });
    }
    
    getById(id, cb) {
        this._simulateCall({
            callArgs : `[${id}]`,
            callFunction : "getById", 
            callback: cb
        });;
    }
    
    getByWallet(wallet, cb) {
        this._simulateCall({
            callArgs : `["${wallet}"]`,
            callFunction : "getByWallet", 
            callback: cb
        });;
    }

    getLastRegistered(cb, limit = 10) {
        this.getTotalCount((resp) => {
            if(resp) {
                let total = JSON.parse(resp.result);
                let offset = total - limit;
                    offset = offset > 0 ? offset : 0;
                    this._simulateCall({
                        callArgs : `[${limit}, ${offset}]`,
                        callFunction : "get", 
                        callback: cb
                    });
            }            
        });        
    } 
}
