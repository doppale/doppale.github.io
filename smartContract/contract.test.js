let Stubs = require("./contractStubs.js");

var Blockchain = Stubs.Blockchain;
var LocalContractStorage = Stubs.LocalContractStorage;

let ProfileContract = require("./profileContract.js");

let contract = new ProfileContract();
contract.init();

let profile = {
    name: "Вася Иванов",
    email: "vasya@mail.ru"
};

//Меняем объект транзакции после каждого обращения к свойству Blockchain.transaction.
//Будет генерироваться новый кошелек (from) и размер тразакции (value) 
Blockchain.changeTransactionAfterGet = true;

contract.addOrUpdate(JSON.stringify(profile));
let getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
getted = contract.getLastRegistered();
console.log(getted);

contract.addOrUpdate(JSON.stringify(profile));
getted = contract.getLastRegistered();
getted = contract.getLastRegistered();
getted = contract.getLastRegistered();

let mw = contract.getTenMostViewed();
console.log(mw);


