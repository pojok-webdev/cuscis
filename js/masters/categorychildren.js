getParents = obj => {
    sql = 'select a.id level1,b.id level2,c.id level3,d.id level4,e.id level5,f.id level6 '
    sql+= 'from qiscus.messagecategories a  '
    sql+= 'left outer join qiscus.messagecategories b on b.id=a.parent_id '
    sql+= 'left outer join qiscus.messagecategories c on c.id=b.parent_id '
    sql+= 'left outer join qiscus.messagecategories d on d.id=c.parent_id  '
    sql+= 'left outer join qiscus.messagecategories e on e.id=d.parent_id  '
    sql+= 'left outer join qiscus.messagecategories f on f.id=e.parent_id  '
    if(obj.id>0){
        sql+= 'where a.id = ' + obj.id
    }
    return sql
}
getParentsRecursive = obj => {
    sql = 'select * from ( '
        sql+= 'WITH RECURSIVE ancestor AS ( '
            sql+= 'select 1 as n, 1 ancestorid,id,parent_id from messagecategories '
            sql+= 'union all '
            sql+= 'select n+1, ancestor.id,cur.id,cur.parent_id from ancestor '
            sql+= 'left outer join messagecategories cur on ancestor.id=cur.parent_id  '
            sql+= 'where n<4 '
            sql+= ') '
            sql+= 'select n,ancestorid,id,parent_id from ancestor  where parent_id is not null )x order by parent_id,id,n ';
    return sql
}
getChildren = obj => {
    sql = 'select a.id level1,b.id level2,c.id level3,d.id level4,e.id level5 from qiscus.messagecategories a '
    sql+= 'left outer join qiscus.messagecategories b on b.parent_id=a.id '
    sql+= 'left outer join qiscus.messagecategories c on c.parent_id=b.id '
    sql+= 'left outer join qiscus.messagecategories d on d.parent_id=c.id '
    sql+= 'left outer join qiscus.messagecategories e on e.parent_id=d.id '
    sql+= 'where a.id='+obj.id+' '
    console.log('SQL',sql)
    return sql
}
getcategorychildren = obj => {
    sql = 'select a.client_id,a.category_id,Y.id,Y.level,c.name,c.location_id,c.address,c.picname,c.picwa,c.email,c.description,c.kdfb,c.ou from qiscus.categories_clients a left outer join '
    sql+='(select id,level from ( '
        sql+='select a.id , "level1" level from qiscus.messagecategories a  '
        sql+='left outer join qiscus.messagecategories b on b.parent_id=a.id  '
        sql+='left outer join qiscus.messagecategories c on c.parent_id=b.id  '
        sql+='left outer join qiscus.messagecategories d on d.parent_id=c.id  '
        sql+='left outer join qiscus.messagecategories e on e.parent_id=d.id  '
        sql+='where a.id= '+obj.id+' '
        sql+='union '
        sql+='select b.id, "level2" level from qiscus.messagecategories a  '
        sql+='left outer join qiscus.messagecategories b on b.parent_id=a.id ' 
        sql+='left outer join qiscus.messagecategories c on c.parent_id=b.id  '
        sql+='left outer join qiscus.messagecategories d on d.parent_id=c.id  '
        sql+='left outer join qiscus.messagecategories e on e.parent_id=d.id  '
        sql+='where a.id= '+obj.id+' '
        sql+='union '
        sql+='select c.id, "level3" level from qiscus.messagecategories a  '
        sql+='left outer join qiscus.messagecategories b on b.parent_id=a.id ' 
        sql+='left outer join qiscus.messagecategories c on c.parent_id=b.id  '
        sql+='left outer join qiscus.messagecategories d on d.parent_id=c.id  '
        sql+='left outer join qiscus.messagecategories e on e.parent_id=d.id  '
        sql+='where a.id= '+obj.id+' '
        sql+='union '
        sql+='select d.id, "level4" level from qiscus.messagecategories a  '
        sql+='left outer join qiscus.messagecategories b on b.parent_id=a.id ' 
        sql+='left outer join qiscus.messagecategories c on c.parent_id=b.id  '
        sql+='left outer join qiscus.messagecategories d on d.parent_id=c.id  '
        sql+='left outer join qiscus.messagecategories e on e.parent_id=d.id  '
        sql+='where a.id= '+obj.id+' '
        sql+='union '
        sql+='select e.id, "level5" level from qiscus.messagecategories a  '
        sql+='left outer join qiscus.messagecategories b on b.parent_id=a.id ' 
        sql+='left outer join qiscus.messagecategories c on c.parent_id=b.id  '
        sql+='left outer join qiscus.messagecategories d on d.parent_id=c.id  '
        sql+='left outer join qiscus.messagecategories e on e.parent_id=d.id  '
        sql+='where a.id= '+obj.id+' '
    sql+=') X where id is not null)Y on Y.id=a.category_id '
    sql+= 'left outer join qiscus.clients c on c.id=a.client_id '
    sql+= 'where Y.id is not null '
    sql+=''
    console.log('SQL',sql)
    return sql
}
module.exports = {
    getParents:getParents,
    getParentsRecursive:getParentsRecursive,
    getChildren:getChildren,
    getcategorychildren:getcategorychildren
}