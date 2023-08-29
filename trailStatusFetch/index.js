module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    const response = await fetch(process.env.trailstatus_server)
    const res = await response.json();
    context.log(res)
    const r = await fetch(process.env.trailstatus_webhook, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'trailStatusAuth': process.env.trailstatusauth
        },
        body: JSON.stringify(res)
      }).catch(error => {
        console.log(error);
      })
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};