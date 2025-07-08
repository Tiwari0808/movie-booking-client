export const kCounter = (votes)=>{
    if(votes > 1000){
        return (votes/1000).toFixed(2);
    }else{
        return votes
    }
}

