/*version2 (2022-10-24)*/
$(function () {
  updateJmlAnggota = obj => {
    $.ajax({
      url:'/countmembers/'+obj.category_id,
      dataType:'json'
    })
    .done(obj=>{
      console.log('cnt',obj[0])
      $('#tObj tr.selected').find('.jumlah').html(obj[0].cnt)
    })
  }
    init = _ => {
      console.log('inited')
      dt = $('#tObj').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        dom:"Bfrtip",
        ajax:{
          url:'/datacategories',
        },
        "columnDefs": [ 
          {
              "targets": 4,
              "data": null,
              "defaultContent":'<div class="btn-group">'
                +'<button type="button" class="btn btn-default">Aksi</button>'
                +'<button type="button" class="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">'
                  +'<span class="sr-only">Toggle Dropdown</span></button>'
                  +'<div class="dropdown-menu dropdown-menu-right" role="menu">'
                    +'<a class="dropdown-item btnEditClient" style="cursor:pointer">Edit</a>'
                    +'<a class="dropdown-item btnManageClient" style="cursor:pointer;background:gold">Pengaturan Anggota</a>'
                    +'<a class="dropdown-item btnManageChild" style="cursor:pointer;background:oldlace">Penambahan Child Kategori</a>'
                    +'<div class="dropdown-divider"></div>'
                    +'<a class="dropdown-item btnRemoveClient" style="cursor:pointer;color:red">Hapus</a>'
                  +'</div>'
                  +'</div>'
          },
          {
            targets:3,
            className:'dt-right jumlah'
          },
          {
            targets:2,
            className:"description dt-head-center"
          },
          {
            targets:1,
            className:"name"
          },
          {
            targets:0,
            className:'trid'
          }],
          buttons:[{
            text: 'Penambahan',
            className:'btn btn-success',
            action: function ( e, dt, node, config ) {
              $('#add-category').modal({
                backdrop:'static'
              })
              }
            },
            {
              text:'Refresh',
              className:'btn btn-warning',
              action:function(e,dt_,node,config){
                dt.ajax.reload()
              }
            }
          ]
      })
      category_id = 0
    }
    $('#tObj').on('click','.btnManageChild',function(){
      $('#tObj tr').removeClass('selected')
      tr = $(this).stairUp({level:4})
      tr.addClass('selected')
      trid = tr.find('.trid').text()
      category_id = trid
      categoryname = tr.find('.name').text()
      console.log('TRID',trid)
      $('#associate-category-category').modal({
        backdrop:'static'
      })
      makedatatable({category_id:category_id})
    })




    makedatatable = obj => {
      $('#tReserveCategory').DataTable({
        destroy:true,
        ajax:{
            url:'/getreservecategories/'+obj.category_id,
            type:'get',
        },
        "columnDefs": [ 
          {
            targets:0,
            className:'trid'
          },
          {
              "targets": 4,
              "data": null,
              "defaultContent":'<div class="btn-group">'
                +'<button type="button" class="btn btn-default">Aksi</button>'
                +'<button type="button" class="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown">'
                  +'<span class="sr-only">Toggle Dropdown</span></button>'
                  +'<div class="dropdown-menu dropdown-menu-right" role="menu">'
                    +'<a class="dropdown-item btnInsertChildCategory" style="cursor:pointer">Masukkan sebagai Kategori Anak</a>'
                  +'</div>'
                  +'</div>'
          }]
      })
      $('#tChildren').DataTable({
        destroy:true,
        ajax:{
          url:'/getcategorychildren/'+obj.category_id,
        },
        "columnDefs":[{
          "targets":4,
          "defaultContent":'<div class="btn-group">'
          +'<button type="button" class="btn btn-default">Aksi</button>'
          +'<button type="button" class="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown"><span class="sr-only">Toggle Dropdown</span></button>'
          +'<div class="dropdown-menu dropdown-menu-right" role="menu">'
          +'<a class="dropdown-item btnremoveChildCategory" style="cursor:pointer">Hapus Anak</a>'
          +'</div>'
          +'</div>'
        }]
      })

    }
    $('#tReserveCategory').on('click','.btnInsertChildCategory',function(){
      $('#tReserveCategory tr').removeClass('selected')
      tr = $(this).stairUp({level:4})
      tr.addClass('selected')
      trid = tr.find('.creservecategory').val()
      console.log('Reserve TRID',trid)
      category_id = $('#tObj tr.selected').find('.trid').text()
      $.ajax({
        url:'/associatecategorycategory',
        data:{
          id:trid,parent_id:category_id
        },
        type:'post',
        dataType:'json'
      })
      .done(res=>{
        console.log('Sukses asosiasi',res)
        makedatatable({category_id:category_id})
      })
      .fail(err=>{
        console.log('Fail asosiasi',err)
      })
    })
    $('#tChildren').on('click','.btnremoveChildCategory',function(){
      $('#tChildren tr').removeClass('selected')
      tr = $(this).stairUp({level:4})
      tr.addClass('selected')
      trid = tr.find('.childcategory').val()
      console.log('selected',trid)
      $.ajax({
        url:'/disassociateactegorycategory',
        type:'post',
        data:{
          id:trid,parent_id:$('#tObj tr.selected').find('.trid').text()
        },
        dataType:'json'
      })
      .done(res=>{
        console.log('Sukses disassociate',res)
        //tr.remove()
        makedatatable({category_id:category_id})
      })
      .fail(err=>{
        console.log('Fail disassociate',err)
      })
    })
    $('#tObj').on('click','.btnManageClient',function(){
      $('#tObj tr').removeClass('selected')
      tr = $(this).stairUp({level:4})
      tr.addClass('selected')
      trid = tr.find('.trid').text()
      category_id = trid
      categoryname = tr.find('.name').text()
      console.log('TRID',trid)
      dtReserve = $('#tReserve').DataTable({
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, 'All'],
      ],
      paging:true,
        "info": false,destroy:true,        
        "responsive": true,
        dom:"Blfrtip",
        columnDefs:[
          {targets:0,className:'selecter',defaultContent:'<div class="form-group"><div class="icheck-primary d-inline"><input type="checkbox" checked></div></div>'},
          {targets:1,className:'trid'},
          {targets:5,defaultContent:'<button class="btn btn-primary associate"> > </button>'}
        ],
        ajax:{
          url:'/getavailabelclients/'+trid,
          dataType:'json',
          processResults:res=>{
            return res
          }
        },
        buttons:[{
          text: 'Kirim pilihan ke table kanan',
          className:'btn btn-success',
          action: function ( e, dt, node, config ) {
            $('.creserve:checked').each(function(x){
              console.log("x",x)
              $.ajax({
                url:'/movereserved',
                data:{
                  category_id:trid,
                  client_id:$(this).val()
                },
                type:'post',
                dataType:'json'
              })
              .done(res=>{
                console.log("Sukses",res)
                $(this).remove()
                dtAssociated.ajax.reload()
                dtReserve.ajax.reload()
              })
              .fail(err=>{
                console.log("Err",err)
              })
  
            })
          }
          }
        ]
      })
      dtAssociated = $('#tClient').DataTable({
        destroy:true,info:false,
        "responsive": true,
        dom:"Blfrtip",
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, 'All'],
      ],
        ajax:{
          url:'/dataclientsbycategory/'+trid,
          dataType:'json',
          processResults:res=>{
            return res
          }
        },
        columnDefs:[
          {targets:0,className:'selecter',defaultContent:'<div class="form-group"><div class="icheck-primary d-inline"><input type="checkbox" checked></div></div>'},
          {
            targets:1,
            className:'trid'
          },
          {
            "targets": 5,
            "data": null,
            "defaultContent":'<button class="btn btn-danger btnRemoveClient"> < </button>'
          }
        ],
        buttons:[{
          text: 'Kirim pilihan ke table kiri',
          className:'btn btn-success',
          action: function ( e, dt, node, config ) {
            $('.creserve:checked').each(function(x){
              console.log("x",x)
              $.ajax({
                url:'/movetoreserved',
                data:{
                  category_id:trid,
                  client_id:$(this).val()
                },
                type:'post',
                dataType:'json'
              })
              .done(res=>{
                console.log("Sukses",res)
                $(this).remove()
                dtAssociated.ajax.reload()
                dtReserve.ajax.reload()
              })
              .fail(err=>{
                console.log("Err",err)
              })
  
            })
          }
          }
        ]

      })
      $('#modalEditCategoryClient').html(' <strong>'+categoryname+'</strong>')
      $('#edit-client').modal({
        backdrop:'static'
      })
    })
    $('#tClient').on('click','.btnRemoveClient',function(){
      //category_id = $('#tObj tr.selected').find('.trid').text()
      console.log("category_id",category_id)
      $.ajax({
        url:'/disassociatecategoryclient/'+category_id+'/'+$(this).stairUp({level:2}).find('.trid').text()
      })
      .done(res=>{
        dtAssociated.ajax.reload()
        dtReserve.ajax.reload()
        updateJmlAnggota({category_id:category_id})
       // dt.ajax.reload()
      })
      .fail(err=>{
        console.log('Err',err)
      })
    })
    $('#tReserve').on('click','.associate',function(){
      //category_id = $('#tObj tr.selected').find('.trid').text()
      $.ajax({
        url:'/associatecategoryclient/'+category_id+'/'+$(this).stairUp({level:2}).find('.trid').text()
      })
      .done(res=>{
        dtAssociated.ajax.reload()
        dtReserve.ajax.reload()
        updateJmlAnggota({category_id:category_id})
       // dt.ajax.reload()
      })
      .fail(err=>{
        console.log('Err',err)
      })
    })
    $('#btnCloseCategoryClient').click(function(){
        dt.ajax.reload()
    })
    init()
    $('#tObj').on('click','.btnEditClient',function(){
      $('#tObj tr').removeClass('selected')
      tr = $(this).stairUp({
        level:4
      })
      tr.addClass('selected')
      console.log('U click ',tr.find('.trid').text())
      category_id = tr.find('.trid').text()
      $.ajax({
        url:'/getcategory/'+tr.find('.trid').text(),
        dataType:'json',
        type:'get'
      })
      .done(res=>{
        console.log('getcategory res',res)
        $('#editCategoryName').val(res[0].name)
        $('#editCategoryDescription').val(res[0].description)
        $('#edit-category').modal({
          backdrop:'static'
        })
      })
      .fail(err=>{
        console.log('Err',err)
      })
    })


    $("#btnUpdateCategory").click(function(){
      $.ajax({
        url:'/updatecategory',
        type:'post',
        data:{
          id:$('#tObj tr.selected').find('.trid').text(),
          name:$('#editCategoryName').val(),
          description:$('#editCategoryDescription').val(),
          prevName:$('#tObj tbody tr.selected').find('.name').text(),
          prevDesc:$('#tObj tbody tr.selected').find('.description').text()
        },
        dataType:'json'
      })
      .done(res=>{
        console.log(res)
 /*       $('#tObj tbody tr.selected').find('.description').html($('#editCategoryDescription').val())
        $('#tObj tbody tr.selected').find('.name').html($('#editCategoryName').val())*/
        dt.ajax.reload()
      })
      .fail(err=>{
        console.log(err)
      })
    })

    $('#tObj').on('click','.btnRemoveClient',function(){
      $('#tObj tr').removeClass('selected')
      tr = $(this).stairUp({
        level:4
      })
      tr.addClass('selected')
      console.log('U click ',tr.find('.trid').text())
      $('#el-title').html("Penghapusan Kategori")
      $('#questio').html("Terdapat <b>"+tr.find('.jumlah').text()+"</b> pelanggan terasosiasi dengan kategori ini")
      $('#el-info').html("Ke-<b>"+tr.find('.jumlah').text()+"</b> asosiasi akan ikut <span style='color:red'>terhapus !!!</span>")
      $('#confirmRemoveCustomData').modal({
        backdrop:'static'
      })  
  })

    $('#btnYesRemoveCustomData').click(function(){
      $.ajax({
        url:'/disassociatecategory/'+$('#tObj tr.selected').find('.trid').text()
      })
      .done(res=>{
        console.log("Res disassociate",res)
        $.ajax({
          url:'/removecategory/'+$('#tObj tr.selected').find('.trid').text()
        })
        .done(res=>{
          console.log('Res',res)
          $('#tObj tr.selected').remove()
        })
        .fail(err=>{
          console.log('Err2',err)
        })  
      })
      .fail(err=>{
        console.log("Err1",err)
      })
    })
    $('#btnSaveCategory').click(function(){
      $.ajax({
        url:'/savecategory',
        type:'post',
        dataType:'json',
        data:{
          name:$('#addCategoryName').val(),
          description:$('#addCategoryDescription').val()
        }
      })
      .done(res=>{
        console.log('Res',res)
        dt.row.add([
            res.insertId,
            $('#addCategoryName').val(),
            $('#addCategoryDescription').val(),
            0])
        .draw()
      })
      .fail(err=>{
        console.log('Error',err)
      })
    })
    getChecked = _ => {
      $('.availableClient:checked').val()
    }
    $('#chkClient').click(function(){
      console.log("chk clicked")
      $('.cassociated').prop('checked',$('#chkClient').prop('checked'))
    })
    $('#chkReserve').click(function(){
      console.log("chk clicked")
      $('.creserve').prop('checked',$('#chkReserve').prop('checked'))
    })
  });
