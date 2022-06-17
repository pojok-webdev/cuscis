var crud = require('./../orm/crud'),
con = require('./../connection')
cores = callback => {
    con.doQuery(crud.gets({tableName:'cores',cols:['id','name'],conditions:[{key:'1',val:'1'}]}),res=>{
        callback(res)
    })
}
backbones = callback => {
    con.doQuery(crud.gets({tableName:'backbones',cols:['id','name'],conditions:[{key:'1',val:'1'}]}),res=>{
        callback(res)
    })
}
module.exports = {
    cores:cores,backbones:backbones
}