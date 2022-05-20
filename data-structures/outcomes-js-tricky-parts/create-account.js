function createAccount(pin, amount=0) {

    return {
        checkBalance(inputtedPin){
            if (inputtedPin !== pin) return "Invalid PIN."
            return `$${amount}`
        },

        deposit(inputtedPin, deposit){
            if (inputtedPin !== pin) return "Invalid PIN."
            amount += deposit
            return `Succesfully deposited $${deposit}. Current balance: $${amount}.`
        },

        withdraw(inputtedPin, withdrawal){
            if (inputtedPin !== pin) return "Invalid PIN."
            if (withdrawal > amount) {
                return "Withdrawal amount exceeds account balance. Transaction cancelled."
            }
            amount -= withdrawal
            return `Succesfully withdrew $${withdrawal}. Current balance: $${amount}.`
        },

        changePin(oldPin, newPin){
            if (oldPin !== pin) return "Invalid PIN."
            pin = newPin
            return 'PIN successfully changed!'
        }
    }
}

module.exports = { createAccount };
