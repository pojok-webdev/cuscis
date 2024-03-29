sendWa = obj => {
     $.ajax({
         url:'https://api.telegram.org/bot311276793:AAGpixXvuG9XdAWqUHE-inawZgdki3VsxjI/sendMessage',
         data:{
             //chat_id:"-1001089868759",text:obj.text
             //chat_id:"-698064980",text:obj.text
             chat_id:obj.picwa,text:obj.text
         },
         dataType:'json'
     })
     .done(res=>{
         console.log('success send telegram',res)
     })
     .fail(err=>{
         console.log('error send telegram',err)
     })
}
getClientsByCategory = (obj,callback) => {
    $.ajax({
        url:'/getclientsbycategory/'+obj.category_id,
        dataType:'json'
    })
    .done(res=>{
        callback(res)
    })
    .fail(err=>{
        callback(err)
    })
}
$('#sendWa').click(function(){
    category = $('#cmbCategory').select2('data')
    console.log("KateGori",category)
    if(category.length>0){
        getClientsByCategory({category_id:category[0].id},res=>{
            console.log('clients by category',res)
            if(1==2){res.forEach(client=>{
                switch($('#cmbTemplate').val()){
                    case '1':
                        sendWa({
                            picwa:client.picwa,
                            text:notifikasiMaintenance({
                            header:$('#maintenanceHeader').val(),
                            waktu:$('#maintenanceWaktu').val(),
                            durasidown:$('#maintenanceDurasiDown').val(),
                            aktifitas:$('#maintenanceAktifitas').val(),
                            client:client.name,
                            location:client.address,
                        })})
                    break;
                    case '2':
                        sendWa({
                            picwa:client.picwa,
                            text:notifikasiSelesaiMaintenance({
                            header:$('#maintenancefinishedHeader').val(),
                            waktu:$('#maintenancefinishedWaktu').val(),
                            durasidown:$('#maintenancefinishedDurasiDown').val(),
                            aktifitas:$('#maintenancefinishedAktifitas').val(),
                            client:client.name,
                            location:client.address,
                        })
                    })
                    break;
                    case '3':
                        sendWa({
                            picwa:client.picwa,
                            text:notifikasiGangguan({
                            header:$('#notifikasiGangguanHeader').val(),
                            startproblem:$('#notifikasiGangguanStartProblem').val(),
                            segmentasi:$('#notifikasiGangguanSegmentasi').val(),
                            impact:$('#notifikasiGangguanImpact').val(),
                            client:client.name,
                            location:client.address,
                        })})
                    break;
                    case '4':
                        sendWa({
                            picwa:client.picwa,
                            text:notifikasiUpdateGangguan({
                            gangguan:$('#notifikasiUpdateGangguanGangguan').val(),
                            client:client.name,
                            location:client.address,
                        })})
                    break;
                    case '5':
                        sendWa({
                            picwa:client.picwa,
                            text:notifikasiPenyelesaianGangguan({
                            header:$('#notifikasiUpdateGangguanGangguan').val(),
                            start:$('#notifikasiPenyelesaianGangguanStart').val(),
                            end:$('#notifikasiPenyelesaianGangguanEnd').val(),
                            durasidown:$('#notifikasiPenyelesaianGangguanDurasiDown').val(),
                            cause:$('#notifikasiPenyelesaianGangguanPenyebab').val(),
                            action:$('#notifikasiPenyelesaianGangguanAction').val(),
                            client:client.name,
                            location:client.address,
                        })})
                    break;            
                }
            })}
        })
    }else{
        alert("Kategori harus dipilih")
    }
})
$('#cmbCategory').select2({
    ajax:{
        url:function(params){
            if(params.hasOwnProperty('term')){
                return '/select2categoryprovider/'+params.term
            }else{
                return '/select2categoryproviders'
            }
        },
        processResults:function(obj){
            return obj
        }
    
    },
})
switchMessageType = callback => {
    $('.allmessagetype').hide()
    callback()
}
$('#cmbTemplate').val(1)
switchMessageType(_=>{
    $('.maintenance').show()
})
$('#cmbTemplate').change(function(){
    switch($(this).val()){
        case '1':
            switchMessageType(_=>{
                $('.maintenance').show()
            })
        break;
        case '2':
            switchMessageType(_=>{
                $('.maintenancefinished').show()
            })
        break;
        case '3':
            switchMessageType(_=>{
                $('.notifikasiGangguan').show()
            })
        break;
        case '4':
            switchMessageType(_=>{
                $('.notifikasiUpdateGangguan').show()
            })
        break;
        case '5':
            switchMessageType(_=>{
                $('.notifikasiPenyelesaianGangguan').show()
            })
        break;
    }
})
$('#previewWa').click(function(){
    category = $('#cmbCategory').select2('data')
    console.log("KateGori",category)
    if(category.length>0){
    console.log('Category',category[0].id)
    console.log('Template',$('#cmbTemplate').val())
    switch($('#cmbTemplate').val()){
        case '1':
            $('#messagecontent').html(notifikasiMaintenance({
                header:$('#maintenanceHeader').val(),
                waktu:$('#maintenanceWaktu').val(),
                durasidown:$('#maintenanceDurasiDown').val(),
                aktifitas:$('#maintenanceAktifitas').val(),
                client:'x',
                location:'y',
            }))
            sendWa({text:notifikasiMaintenance({
                header:$('#maintenanceHeader').val(),
                waktu:$('#maintenanceWaktu').val(),
                durasidown:$('#maintenanceDurasiDown').val(),
                aktifitas:$('#maintenanceAktifitas').val(),
                client:'x',
                location:'y',
            })})
        break;
        case '2':
            $('#messagecontent').html(notifikasiSelesaiMaintenance({
                header:$('#maintenancefinishedHeader').val(),
                waktu:$('#maintenancefinishedWaktu').val(),
                durasidown:$('#maintenancefinishedDurasiDown').val(),
                aktifitas:$('#maintenancefinishedAktifitas').val(),
                client:'w',
                location:'z',
            }))
            sendWa({text:notifikasiSelesaiMaintenance({
                header:$('#maintenancefinishedHeader').val(),
                waktu:$('#maintenancefinishedWaktu').val(),
                durasidown:$('#maintenancefinishedDurasiDown').val(),
                aktifitas:$('#maintenancefinishedAktifitas').val(),
                client:'w',
                location:'z',
            })})
        break;
        case '3':
            $('#messagecontent').html(notifikasiGangguan({
                header:$('#notifikasiGangguanHeader').val(),
                startproblem:$('#notifikasiGangguanStartProblem').val(),
                segmentasi:$('#notifikasiGangguanSegmentasi').val(),
                impact:$('#notifikasiGangguanImpact').val(),
                client:'w',
                location:'z',
            }))
            sendWa({text:notifikasiSelesaiMaintenance({
                header:$('#maintenancefinishedHeader').val(),
                waktu:$('#maintenancefinishedWaktu').val(),
                durasidown:$('#maintenancefinishedDurasiDown').val(),
                aktifitas:$('#maintenancefinishedAktifitas').val(),
                client:'w',
                location:'z',
            })})
        break;
        case '4':
            $('#messagecontent').html(notifikasiUpdateGangguan({
                gangguan:$('#notifikasiUpdateGangguanGangguan').val(),
                client:'w',
                location:'z',
            }))
            sendWa({text:notifikasiSelesaiMaintenance({
                header:$('#maintenancefinishedHeader').val(),
                waktu:$('#maintenancefinishedWaktu').val(),
                durasidown:$('#maintenancefinishedDurasiDown').val(),
                aktifitas:$('#maintenancefinishedAktifitas').val(),
                client:'w',
                location:'z',
            })})
        break;
        case '5':
            $('#messagecontent').html(notifikasiPenyelesaianGangguan({
                start:$('#notifikasiPenyelesaianGangguanStart').val(),
                end:$('#notifikasiPenyelesaianGangguanEnd').val(),
                durasidown:$('#notifikasiPenyelesaianGangguanDurasiDown').val(),
                cause:$('#notifikasiPenyelesaianGangguanPenyebab').val(),
                action:$('#notifikasiPenyelesaianGangguanAction').val(),
                client:'a',
                location:'b'
            }))
            sendWa({text:notifikasiSelesaiMaintenance({
                header:$('#maintenancefinishedHeader').val(),
                waktu:$('#maintenancefinishedWaktu').val(),
                durasidown:$('#maintenancefinishedDurasiDown').val(),
                aktifitas:$('#maintenancefinishedAktifitas').val(),
                client:'w',
                location:'z',
            })})
        break;
            
    }
    $('#dialogPreview').modal()}else{
        alert('Kategori harus dipilih')
    }
    //window.location.href = '/previewwa/'+category[0].id+'/'+$('#cmbTemplate').val()
})