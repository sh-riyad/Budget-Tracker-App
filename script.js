const formButton = document.querySelector('.form-button');
const BalanceSheetContainer = document.querySelector('.balance-sheet-container');
const detailsContainer = document.querySelector('.details-container');
let details = [];


function updateBalanceSheet(balanceSheet) {
    BalanceSheetContainer.innerHTML = 
        `
        <h1 class="sub-container">Income: ${balanceSheet.income} </h1>
        <h1 class="sub-container">Expense: ${balanceSheet.expense} </h1>
        `
}

function updateDetailsSection(details) {
    detailsContainer.innerHTML = "";
    details.forEach((detail, index) => {
        // console.log(detail.amount);
        // console.log(detail.label);
        const detailsContain = document.createElement("div");
        detailsContain.classList = "details-section";
        detailsContain.innerHTML = 
        `
        <div class="details-info">
            <span class="amount">${detail.amount}</span>
            <span class="label">${detail.label}</span>
        </div>
        <div class="button-class">
            <button id="delete-button"></button>
            <button id="edit-button"></button>
        </div>
        `
        detailsContainer.append(detailsContain);

        const deleteButton = detailsContain.querySelector("#delete-button");
        const editButton = detailsContain.querySelector("#edit-button");

        deleteButton.innerText = "Delete";
        editButton.innerText = "Edit";


        
        deleteButton.addEventListener('click', () => {
            // console.log("Clicked");
            // console.log(index);
            const amount = detail.amount;
            const label = detail.label


            if (label == 'income') {
                balanceSheet.income -= amount;
            } else {
                balanceSheet.income += amount;
                balanceSheet.expense -= amount;
            }
            updateBalanceSheet(balanceSheet);
            localStorage.setItem("balanceSheet", JSON.stringify(balanceSheet));

            // console.log(typeof (index));
            // Deleting index from array
            details.splice(index, 1);
            updateDetailsSection(details);
            localStorage.setItem("details", JSON.stringify(details));
        })

        editButton.addEventListener("click", () => {
            const oldAmount = detail.amount;

            //console.log(oldAmount);
            // console.log("clicked");
            newAmount = prompt("New value");
            if (newAmount === null) {
                return;
            }
            if (newAmount == 0 ) {
                alert("Please Enter a Valid Input");
                return;
            }

            newAmount = parseFloat(newAmount);
            // console.log(newAmount);

            if (newAmount > 0) {
                detail.amount = newAmount;
                detail.label = 'income';
                balanceSheet.income += newAmount - oldAmount;
            } else {
                newAmount = Math.abs(newAmount);
                detail.amount = newAmount;
                detail.label = 'expense';
                balanceSheet.expense += newAmount - oldAmount;
                balanceSheet.income -= newAmount - oldAmount;
            }

            updateBalanceSheet(balanceSheet);
            localStorage.setItem("balanceSheet", JSON.stringify(balanceSheet));
            
            updateDetailsSection(details);
            localStorage.setItem("details", JSON.stringify(details));
        })

        
    });
}

// let balanceSheet = {
    // income: 0,
    // expense: 0
// };
// localStorage.setItem("balanceSheet", JSON.stringify(balanceSheet));
// console.log(balanceSheet);

let balanceSheet = JSON.parse(localStorage.getItem("balanceSheet")) || { income: 0, expense: 0 };
updateBalanceSheet(balanceSheet);

details = JSON.parse(localStorage.getItem("details")) || [];
updateDetailsSection(details);


formButton.addEventListener('click', () => {
    // e.preventDefault();
    // console.log("Button Clicked");
    // alert("Button clicked");

    const amountInput = document.querySelector('.amount-input');
    let amount = parseFloat(amountInput.value);

    // alert("Amount", amount);
    // console.log(ammount);
    // balanceSheet = JSON.parse(localStorage.getItem("balanceSheet"));
    // console.log(balanceSheet);

    if (isNaN(amount)) {
        return;
    }

    if (amount >= 0) {
        balanceSheet.income += amount;
        details.push({ amount: amount, label: 'income' });

    } else {
        amount = Math.abs(amount);
        if (amount > balanceSheet.income) {
            alert("Not Available Balance");
            return;
        }
        balanceSheet.income -= amount;
        balanceSheet.expense += amount;
        details.push({ amount: amount, label: 'expense' });
    }

    // console.log(balanceSheet);
    updateBalanceSheet(balanceSheet);
    updateDetailsSection(details);

    localStorage.setItem("balanceSheet", JSON.stringify(balanceSheet));
    localStorage.setItem("details", JSON.stringify(details));
    

    // console.log(balanceSheet);
});






