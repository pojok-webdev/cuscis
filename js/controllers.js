var i = require('./appInit'),
con = require('./connection'),
crud = require('./orm/crud'),
https = require('https')
doRequest = obj => {
    console.log('Get Clients invoked')
    params = obj.req.params
    con.doQuery(crud.gets({
        tableName:'clients',
        cols:['id','name','address'],
        conditions:[{key:params.key,val:params.val}]
    }),res=>{
        console.log(res)
    })
    obj.res.send({'request':'clients'})

}
executeRequest = obj => {
    console.log("CRUDQUERY",crud.getslike({
        tableName:obj.tableName,
        cols:obj.cols,
        conditions:obj.conditions
    }))
    con.doQuery(crud.getslike({
        tableName:obj.tableName,
        cols:obj.cols,
        conditions:obj.conditions
    }),res=>{
        console.log("ExecuteRequest",res)
        obj.res.send({"results":res.map(res=>{
            return {id:res.id,text:res.name}
        })})
    })
}

send = obj => {
    options = {
        hostname:'',port:'',path:'',method:'POST'
    }
    req = https.request(options,res=>{
        console.log('Res',)
    })
}
sendMessages = obj => {
    par = obj.req.body
    par.forEach(recipient => {
        crud.create({
            tableName:'sentmessages',
            cols:{
                ticket_id:par.ticket_id,
                email:par.email,
                recipient:recipient,
                message:par.message
            }
        })
    });
}
module.exports = {
    doRequest:doRequest,executeRequest:executeRequest,
    send:send,sendMessages:sendMessages
}