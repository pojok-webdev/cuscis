var i = require('./js/appInit')
i.app.get('/clients/:key/:val',(req,res)=>{
    i.ctrl.doRequest({req:req,res:res})
})
i.app.post('/send',(req,res)=>{
    i.ctrl.send()
})
i.app.get('/main',(req,res)=>{
    title = 'Manajemen Kontak'
    console.log('HEHE',i.master.cores)
    res.render('main',{
        title:title,
        cores:i.master.cores,
        backbones:i.master.backbones,
    })
})
i.app.get('/cores/:term',(req,res)=>{
  console.log('Params',req.params)
  console.log('Query',req.query)
    i.ctrl.executeRequest({
        tableName:'cores',
        cols:['id','name'],
        conditions:[{"key":"name","val":req.params.term}],
        req:req,
        res:res
    })
})
i.app.get('/backbones',(req,res)=>{
  console.log('Params',req.params)
  console.log('Query',req.query)
    i.ctrl.executeRequest({
        tableName:'backbones',
        cols:['id','name'],
        conditions:[{"key":"1","val":"1"}],
        req:req,
        res:res
    })
})
i.app.get('/getmasters/:tablename/:term',(req,res)=>{
  i.ctrl.executeRequest({
    tableName:req.params.tablename,//'backbones',
    cols:['id','name'],
    conditions:[{"key":"name","val":req.params.term}],
    req:req,
    res:res
  })
})
i.app.get('/template',(req,res)=>{
      res.send({
        "results": [
          {
            "id": 1,
            "text": "Option 1"
          },
          {
            "id": 2,
            "text": "Option 2"
          }
        ],
        "pagination": {
          "more": true
        }
      })
})
i.app.post('/sendmessages',(req,res)=>{
  //res.send({result:"ok"})
  i.ctrl.sendMessages(req.body)
})
i.app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Manual'
  })
})
i.app.post('/savephone',(req,res)=>{
  res.send(i.ctrl.save({
    tableName:'qiscus.contactphones',
    cols:[
      {key:'client_id',val:req.body.client_id},
      {key:'picname',val:req.body.picname},
      {key:'picphone',val:req.body.picphone},
      {key:'picrole',val:req.body.picrole}
    ]}))
})

i.app.get('/removephone/:id',(req,res)=>{
  res.send(i.con.doQuery(i.crud.remove({tableName:'qiscus.contactphones',conditions:[{key:'id',val:req.params.id}]}),res=>{
    console.log("Remove Phone Res",res)
  }))
})
i.app.get('/getphones/:client_id',(req,res)=>{
  client_id = req.params.client_id
  i.ctrl.gets({
    tableName:'qiscus.contactphones',cols:['id','picname','picphone','picrole'],
    conditions:[{key:'client_id',val:client_id}],
    req:req,res:res
  })
})
i.app.post('/getdatatabledata',(req,res)=>{
  i.con.doQuery(i.crud.gets({
    tableName:req.body.tablename,
    cols:req.body.cols,
    conditions:[{key:'1','val':'1'}]
  }),result=>{
    console.log('OBJS',result)
    res.send({'data':result.map(obj=>{
      return [obj.id,obj.name,obj.alias,obj.address,obj.city,obj.phone]
    })})
  })
})
i.app.post('/getapsdatatabledata',(req,res)=>{
  i.con.doQuery('select a.id,a.name,a.tipe,b.name bts,case b.branch_id when 1 then "Surabaya" when 2 then "Jakarta" when 3 then "Malang" when 4 then "Bali" end branch from aps a left outer join btstowers b on b.id=a.btstower_id ',result=>{
    console.log('OBJS',result)
    res.send({'data':result.map(obj=>{
      return [obj.id,obj.name,obj.bts,obj.branch]
    })})
  })
})
i.app.post('/getbtsdatatabledata',(req,res)=>{
  i.con.doQuery('select a.id,a.name,case a.branch_id when 1 then "Surabaya" when 2 then "Jakarta" when 3 then "Malang" when 4 then "Bali" end branch from btstowers a ',result=>{
    console.log('OBJS',result)
    res.send({'data':result.map(obj=>{
      return [obj.id,obj.name,obj.branch]
    })})
  })
})
i.app.post('/getcoresdatatabledata',(req,res)=>{
  i.con.doQuery('select id,name,case branch_id when 1 then "Surabaya" when 2 then "Jakarta" when 3 then "Malang" when 4 then "Bali" end branch from cores',result=>{
    console.log('OBJS',result)
    res.send({'data':result.map(obj=>{
      return [obj.name,obj.branch]
    })})
  })
})
i.app.get('/test',(req,res)=>{
  res.send({
    "data": [
      [
        "Tiger Nixon",
        "System Architect",
        "Edinburgh",
        "5421",
        "2011/04/25",
        "$320,800"
      ],
      [
        "Garrett Winters",
        "Accountant",
        "Tokyo",
        "8422",
        "2011/07/25",
        "$170,750"
      ]]})
})

i.app.get('/masterclients',(req,res)=>{
  res.render('masters/masterclients',{
    title:'Pelanggan',tablename:'clients',
    cols:['id','name','alias','address','city','phone'],
  })
})
i.app.get('/masteraps',(req,res)=>{
  res.render('masters/masteraps',{
    title:'APs',tablename:'aps'
  })
})
i.app.get('/masterbtses',(req,res)=>{
  res.render('masters/masterbts',{
    title:'btstowers',tablename:'btstowers'
  })
})
i.app.get('/mastercores',(req,res)=>{
  res.render('masters/mastercores',{
    title:'cores',tablename:'cores'
  })
})
i.app.get('/masterdatacenters',(req,res)=>{
  res.render('masters/masteraps',{
    title:'datacenters',tablename:'datacenters'
  })
})
i.app.get('/masterupstreams',(req,res)=>{})
i.app.get('/associatebtsap/:bts_id/:ap_id',(req,res)=>{
  i.con.doQuery(i.crud.update({tableName:'aps',
    cols:[{key:'btstower_id',val:req.params.bts_id}],conditions:[{key:'id',val:req.params.ap_id}]}),result=>{
      res.send(result)
    })
    
})
i.app.listen(i.setting.port,_=>{
    console.log('QisCus API Server start at port ',i.setting.port)
})