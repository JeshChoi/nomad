export function schedule(rating:string, repetitions=0, interval=0, now=new Date()) {
 const days = rating==='AGAIN'?1:rating==='HARD'?2:rating==='EASY'?Math.max(4,interval*3):[1,3,7][repetitions]||Math.max(14,interval*2);
 return {dueAt:new Date(now.getTime()+days*86400000),intervalDays:days,repetitions:rating==='AGAIN'?0:repetitions+1,lastRating:rating};
}
