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
  console.log("Bidy",req.params)
  i.ctrl.sendMessages(req.body)
})
i.app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Manual'
  })
})
i.app.listen(i.setting.port,_=>{
    console.log('QisCus API Server start at port ',i.setting.port)
})