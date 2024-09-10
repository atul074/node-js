const food={
    menu:[{
        name:'samosa',
        like:true
    },{
        name:'chiken',
        like:false
    },
    {
        name:'burger',
        like:true
    }],
    getlikefood()
    {
        return this.menu.filter((item)=>{
            return item.like===true
        })
    }
}
console.log(food.getlikefood());
