class user{
// this class can handle all operations you can think to perform for a user in an investment site

    constructor(name, balance, age, deposits, withdrawal, investments){
        this.name = name,       
        this.balance = balance,
        this.age = age,
        this.deposits = deposits,
        this.withdrawals = withdrawal,
        this.investments = investments
    }

    initiate(name, age){
        return (this.name = name,       
        this.balance = 0,
        this.age = age,
        this.deposits = [],
        this.withdrawals = [],
        this.investments = [])
    }

    deposit(amount, data){
        return(
            this.deposits.push({...data, amount: amount}),
            this.balance += amount
        )
    }

    withdraw(amount, data){
        return(
            this.withdrawals.push({...data, amount: amount}),
            this.balance -= amount
        )
    }

    invest(amount, data){
        return(
            this.investments.push({...data, done: false, amount: amount}),
            this.balance -= amount
        )
    }

    // this can be ,odified to be a static class that loops through the investments and once their completion dates are due completes them and should run on reload od the data 
    compevent(amount, compamount){
        
           const resolved = this.investments.map(res=>{
            if (res.amount === amount) {
                    return (
                        {...res, done: true}
                    )
                } else {
                    return res
                }
            })
            return(
                this.investments = resolved,
                this.balance += compamount
            )
    }
}
module.exports = user