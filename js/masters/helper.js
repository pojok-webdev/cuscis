let i = require('../appInit')
getParents = obj => {
    sql = 'select id,parent_id from qiscus.messagecategories '
    sql+= 'where parent_id='+obj.parent_id
    i.con.doQuery(sql,result=>{
        return result
    })
}
module.exports = {
    getParents:getParents
}