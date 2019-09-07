$(document).ready(function(){
    $('.newsletterBtn').click(function(e){
        e.preventDefault();
        let input = $('.newsletterInput').val();
        if(input.trim() === ""){
            $('.newsletterInput').css('border','1px solid red');
        }else{
            $('.newsletterInput').css('border','2px solid #333');
            $.ajax({
                method:'post',
                url:'/newsletter',
                dataType:'json',
                data:{
                    email:input
                },
                success:function(data){
                    if(data){
                        $.notify('Subscription successful', {
                            offset: {
                                x: 50,
                                y: 70
                            }
                        });
                    }
                },
                error:function(err){
                    console.log(err);
                }
            });
            $('.newsletterInput').val('')
        }
    });
});