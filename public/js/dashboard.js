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

    //for deleting categories 
    $('.deleteCategoryBtn').click(function(){
        let id = $(this).data('id');
        $('.deleteCategoryId').val(id);
        $('#deleteCategory').modal();
    });
});