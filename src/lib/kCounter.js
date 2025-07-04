export const kCounter = (votes)=>{
    if(votes > 1000){
        return votes/1000
    }else{
        return votes
    }
}

