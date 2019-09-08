$(document).ready(function(){
    //for deleting contacts
    $('.deleteContactBtn').click(function(){
        let id = $(this).data('id');
        $('.deleteContactId').val(id);
        $('#deleteContact').modal();
    });

    //for viewing contact messages
    $('.viewContactBtn').click(function(){
        let message = $(this).data('message');
        $('.viewContactMessage').val(message);
        $('#viewContact').modal();
    });

    //for attending to contact messages
    $('.attendContactBtn').click(function(){
        let id = $(this).data('id');
        $('.attendContactId').val(id);
        $('#attendContact').modal();
    });

    //for deleting categories 
    $('.deleteCategoryBtn').click(function(){
        let id = $(this).data('id');
        $('.deleteCategoryId').val(id);
        $('#deleteCategory').modal();
    });

    //adding more information 
    let superviseInfo = 0;
    $('.addOtherInformation').click(function(){
        superviseInfo += 1;
        $('.other_information').append(
            `
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="">Attribute and Value</span>
                </div>
                <input type="text" name="information[${superviseInfo}][attribute]" class="form-control">
                <input type="text" name="information[${superviseInfo}][value]" class="form-control">
            </div>
            `
        );
    });

    //adding more info in update
    let newSupervise = localStorage.getItem('superviseForUpdateInformation');
    $('.updateAddOtherInformation').click(function(){
        newSupervise = Number(newSupervise) + 1;
        $('.updateOther_information').append(
            `
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="">Attribute and Value</span>
                </div>
                <input type="text" name="information[${newSupervise}][attribute]" class="form-control">
                <input type="text" name="information[${newSupervise}][value]" class="form-control">
            </div>
            `
        );
    });
    
    //checking the price tag
    $('.priceTag').focusout(function(e){
        let price = $(this).val();
        if(!Number(price)){
            $('.showPriceError').removeAttr('hidden');
        }else{
            $('.showPriceError').attr('hidden',true);
        }
    });

    //onclick on submit
    $('.submitProduct').click(function(e){
        let category = $('.categoryTag').val();
        let rating = $('.ratingTag').val();
        if(!Number(category)){
            e.preventDefault();
            $('.showCategoryError').removeAttr('hidden');
        }else if(!Number(rating)){
            e.preventDefault();
            $('.showRatingError').removeAttr('hidden');
        }
    });

     //for viewing contact messages
     $('.viewProductBtn').click(function(){
        let product = $(this).data('product');
        $('.viewProductMessage').val(product.description);
        JSON.parse(product.information).map(inf => {
            $('.attributeAndValues').append(`
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="">Attribute and Value</span>
                </div>
                <input type="text" value="${inf.attribute}" disabled class="form-control">
                <input type="text" value="${inf.value}" disabled class="form-control">
            </div>
            `)
            
        });
        for(let i = 0; i < product.rating; i++){
            $('.rating').append(
                '<i class="fa fa-star text-warning"></i>'
            )
        }
        for(let i = 0; i < 5-product.rating; i++){
            $('.rating').append(
                '<i class="fa fa-star "></i>'
            )
        }
        $('#viewProduct').modal();
    });

    //for deleting products
    $('.deleteProductBtn').click(function(){
        let id = $(this).data('id');
        $('.deleteProductId').val(id);
        $('#deleteProduct').modal();
    });
});