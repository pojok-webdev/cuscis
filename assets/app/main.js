(function($){
    console.log("Hooh")
    $.ajax({
        url: '/cores/11',
        dataType: 'json',
      })
      .done(res=>{
          console.log("AJAZ",res)
      })
      .fail(err=>{
          console.log("FAIL",err)
      })
      doHide = callback => {
        $('.clienttype').hide()
        callback()
      }
    $('#siteTypeId').change(function(){
        console.log($(this).val())
        
        switch($(this).val()){
            case 'Core':
                console.log('hehe')
                doHide(_=>{
                    $('#dcores').show()
                })
            break;
        case 'Backbone':
            console.log('hohe')
            doHide(_=>{
                $('#dbackbones').show()
            })
            break;
        case 'BTS':
            console.log('hihe')
            doHide(_=>{
                $('#dbts').show()
            })
            break;
        case 'AP':
            console.log('hehe')
            doHide(_=>{
                $('#daps').show()
            })
            break;
        case 'Pelanggan':
            console.log('hahe')
            doHide(_=>{
                $('#dclients').show()
            })
            break;
        }
    })
    getParams = obj => {
        return {
            ajax: {
              url: function (params) {
                console.log("PARAMS",params)
                if(params.hasOwnProperty('term')){
                    return '/getmasters/'+obj.tableName+'/' + params.term;
                }else{
                    return '/getmasters/'+obj.tableName+'/ '
                }
              },
              dataType: 'json',
              delay: 250,
              processResults: function (response) {
                console.log("wwwwww")
                return {
                   results: response.results
                };
              },
            }
          }    
    }
    $("#showVal").click(function(){
        console.log("Awww")
        console.log($("#backbones").val())
    })
    $('.clienttype').hide()
    $("#backbones").select2(getParams({tableName:"backbones"}))
    $("#bts").select2(getParams({tableName:"btstowers"}))
    $("#aps").select2(getParams({tableName:"aps"}))
    $("#clients").select2(getParams({tableName:"clients"}))
    $('#cores').select2({
        ajax: {
          url: function (params) {
            if(params.hasOwnProperty('term')){
                return '/cores/' + params.term;
            }else{
                return '/cores/ '
            }
          },
          dataType: 'json',
          delay: 250,
          processResults: function (response) {
            console.log("wwwwww")
            return {
               results: response.results
            };
          },
        }
      })
      $('#hee').select2({
        ajax: {
          url:'/backbones',
          dataType: 'json',
          delay: 250,
          data: function (params) {
              console.log(params)
              return  {
                  search:params.term,
                  type:'public'
              }
          },
          processResults: function (response) {
              console.log("select2 results",response.results)
            return {
               results: response.results
            };
          },
        }
      })
  $("#sendWAs").click(function(){
    $.ajax({
      url:'/sendmessages',
      type:'post',
      dataType:'json',
      data:{
        email:'puji@padi.net.id',
        recipient:['+628813272107'],
        message:''
      }
    })
  })
}(jQuery))