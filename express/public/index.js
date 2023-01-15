const data = async() =>{
    const data1 = await fetch(`api/v1/tours`)
    return data1
}
data()
.then(res=>res.json())
.then(res=>console.log(res.data))
console.log('wetin dey sup')