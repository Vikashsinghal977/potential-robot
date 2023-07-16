class Entry{
    constructor(name,car,licensePlate,entryDate,exitDate){
        this.name = name;
        this.car = car;
        this.licensePlate = licensePlate;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
    }
}
class Main{
    static displayEntries(){
   
        const entries = Store.getEntries();
        entries.forEach((entry) => Main.addEntryToTable(entry));
    }
    static addEntryToTable(entry){
        const tableBody=document.querySelector('#datagohere');
        const row = document.createElement('tr');
        row.innerHTML = `   <td>${entry.name}</td>
                            <td>${entry.car}</td>
                            <td>${entry.licensePlate}</td>
                            <td>${entry.entryDate}</td>
                            <td>${entry.exitDate}</td>
                        `;
        tableBody.appendChild(row);
    }
    static showAlert(message){
        alert(message);
    }
    static validateInputs(){
        const name = document.querySelector('#input-name').value;
        const car = document.querySelector('#input-vname').value;
        const licensePlate = document.querySelector('#input-vnumber').value;
        const entryDate = document.querySelector('#input-entry').value;
        const exitDate = document.querySelector('#input-exit').value;
        var licensePlateRegex = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
        if(name === '' || car === '' || licensePlate === '' || entryDate === '' || exitDate === ''){
            Main.showAlert('All fields must me filled!');
            return false;
        }
        if(exitDate < entryDate){
            Main.showAlert('Exit Date cannot be lower than Entry Date');
            return false;
        }
        if(!licensePlateRegex.test(licensePlate)){
            Main.showAlert('License Plate must be like CC NN CC NNNN eg, HP 31 A 6452');
            return false;
        }
        return true;
    }
}

class Store{
    static getEntries(){
        let entries;
        if(localStorage.getItem('entries') === null){
            entries = [];
        }
        else{
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }
    static addEntries(entry){
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
    static removeEntries(licensePlate){
        const entries = Store.getEntries();
        entries.forEach((entry,index) => {
            if(entry.licensePlate === licensePlate){
                entries.splice(index, 1);
            }
        });
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}

    document.addEventListener('DOMContentLoaded',Main.displayEntries);
    
    document.querySelector('#cf').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        const name = document.querySelector('#input-name').value;
        const car = document.querySelector('#input-vname').value;
        const licensePlate = document.querySelector('#input-vnumber').value;
        const entryDate = document.querySelector('#input-entry').value;
        const exitDate = document.querySelector('#input-exit').value;
        if(!Main.validateInputs()){
            return;
        }
        
        const entry = new Entry(name, car, licensePlate, entryDate, exitDate);
    
        Main.addEntryToTable(entry);
        Store.addEntries(entry);
        Main.showAlert('Car successfully added to the parking lot');

    });

    document.querySelector('#searchInput').addEventListener('keyup', function searchTable(){
        const searchValue = document.querySelector('#searchInput').value.toUpperCase();
        const tableLine = (document.querySelector('#datagohere')).querySelectorAll('tr');
        for(let i = 0; i < tableLine.length; i++){
            var count = 0;
            const lineValues = tableLine[i].querySelectorAll('td');
            for(let j = 0; j < lineValues.length - 1; j++){
                if((lineValues[j].innerHTML.toUpperCase()).startsWith(searchValue)){
                    count++;
                }
            }
            if(count > 0){
                tableLine[i].style.display = '';
            }else{
                tableLine[i].style.display = 'none';
            }
        }
    });