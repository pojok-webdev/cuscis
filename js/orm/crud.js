gets = obj => {
    return 'select ' + obj.cols.join() + ' from ' + obj.tableName + ' '
    + ' where ' + obj.conditions.map(cond=>{return cond.key+'='+cond.val}).join()
}
getslike = obj => {
    return 'select ' + obj.cols.join() + ' from ' + obj.tableName + ' '
    + ' where ' + obj.conditions.map(cond=>{return cond.key+' like "%'+cond.val+'%" '}).join()
}
create = obj => {
    return 'insert into '+obj.tableName+' '
    +'('+obj.cols.map(col=>{return col.key}).join()+') '
    +' values '
    +'('+obj.cols.map(col=>{return col.val}).join()+') '
}
module.exports = {
    gets:gets,
    getslike:getslike,
    create:create
}