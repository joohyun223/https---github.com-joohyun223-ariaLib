(function(window,$)
{
    function form()
    {
       
        $('input:checkbox').each(function(){
            var input = $(this);
            var label = $('label[for='+input.attr('id')+']');
            label.attr({
                'role':'checkbox',
                'aria-labelledby':label.text(),
                'aria-checked':'false',
                'title':'선택안함'
            });
            input.on('change',function()
            {
                var t = $(this);
                var l = $('label[for='+t.attr('id')+']');
                
                if(t.is(':checked')){
                    l.attr({
                        'aria-checked':true,
                        'title':'선택됨'
                    });
                }else{
                    l.attr({
                        'aria-checked':false,
                        'title':'선택안함'
                    });
                    
                } 
            });
        });
        
        $('input:radio').each(function(){
            var input = $(this);
            var label = $('label[for='+input.attr('id')+']');
            
            //console.log( label.text() )
            
            label.attr({
                'role':'radio',
                'aria-labelledby':label.text(),
                'aria-checked':'false',
                'title':'선택안함'
            });
            input.on('change',function()
            {
                $('input:radio').each(function(){
                    var t = $(this);
                    var r = $('label[for='+t.attr('id')+']');
                    if(t.is(':checked')){
                        r.attr({
                            'aria-checked':true,
                            'title':'선택됨'
                        });
                    }else{
                        r.attr({
                            'aria-checked':false,
                            'title':'선택안함'
                        });
                    }
                });
            });
        });
        
        $('.accordion-js').each(function()
        {
            var accordion = $(this);
            accordion.attr('role','tablist');
            accordion.children().each(function(idx)
            {
                var list = $(this);
                list.attr({
                    'role':'presentation'
                });
                list.find('a').attr({
                    'role':'tab',
                    'title':'축소됨'
                });
                list.find('.detail-js').attr('role','tabpanel');
                list.on('click','a',function()
                {
                    var t = $(this).parent();
                    if($(this).attr('aria-expanded')=='true')
                    {
                        $(this).attr(
                        {
                            'aria-expanded':false,
                            'title':'축소됨'
                        });
                        t.removeClass('on');
                    }else{
                        $(this).attr(
                        {
                            'aria-expanded':true,
                            'title':'확장됨'
                        });
                        t.addClass('on');
                    }
                });
            });
        });
        
        $('.tab-js').each(function()
        {
            var tab = $(this);
            tab.attr('role','tablist');
            
            var conArr = [];
            tab.children().each(function()
            {
                var list = $(this);
                list.attr({
                    'role':'presentation'
                });
                
                var a   =   list.find('a');
                var id  =   a.attr('href').substr(1);
                
                a.attr({
                    'role':'tab',
                    'aria-controls':id,
                    'aria-selected':false,
                    'title':'선택안함'
                });
                
                //console.log( list.length )
                
                conArr.push(list.find('a').attr('href'));
                list.on('click','a',function()
                {
                    tab.find('a').attr(
                    {
                        'aria-selected':false,
                        'title':'선택안함'
                    });
                    $(this).attr(
                    {
                        'aria-selected':true,
                        'title':'선택됨'
                    });
                    $.each(conArr,function(idx,value)
                    {
                        var ch = $(value);
                        ch.attr('aria-hidden',true);
                        ch.css('display','none');
                    });
                    var ch = $($(this).attr('href'));
                    ch.attr('aria-hidden',false);
                    ch.css('display','block');
                });
            });
            tab.children().eq(0).children('a').attr(
            {
                'aria-selected':true,
                'title':'선택됨'
            });
            
            $.each(conArr,function(idx,value)
            {
                var con = $(value);
                con.css('display','none');
                con.attr({
                    'role':'tabpanel',
                    'aria-hidden':true,
                    'aria-labelledby':value.substr(1)
                });
            });
            var select = $(conArr[0]);
            select.css('display','block');
            select.attr('aria-hidden',false);
        });
        
        mvCommon.aria.popOpen = function(opt)
        {
            var box     =   $(opt.layerBox).show();
            var pop     =   $(opt.popup);
            var close   =   $(opt.close);
            var h       =   pop.height();
            var body    =   $('body');
            
            pop.css({
                top : '50%',
                'margin-top':-h/2                                     
            })
            
            close.on('click',function()
            {
                box.hide();
                mvCommon.aria.popClose();
            });
            
            body.children().each(function()
            {
                $(this).attr('aria-hidden',true);
            });
            box.attr({
                'aria-hidden':false
//                ,
//                'tabindex':0
            });
            
            pop.attr('tabindex',0);
            pop.find('.popTit>strong').attr('tabindex',0);
            pop.find('.popTit>strong').focus();
        }
        
        mvCommon.aria.popClose = function()
        {
            var body    =   $('body');
            body.children().each(function()
            {
                $(this).attr('aria-hidden','');
            });
        }
    }    
    
    if(!window.mvCommon)
    {
        window.mvCommon = {};
    }
    var mvCommon = window.mvCommon;
    if(!mvCommon.aria){
       mvCommon.aria = {};
    }
    

    $(window).ready(function(){
       form();
    });
})(window,jQuery);