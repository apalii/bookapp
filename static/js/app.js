
$('document').ready(function(){

    //Передаем данные с файла JSON
    function main () {
        var searchField = $('#searching').val();//Значение поля
        var myExp = new RegExp(searchField,"i");//Регулярное выражение на проверку ввода данных
        $.getJSON('data.json', function (data) {
            var output = '<ul>';
            $.each(data, function (key, val) {
                if ((val.authorname.search(myExp) != -1) || (val.bookname.search(myExp) != -1)) { //Условие вывода если не равен -1
                    output += '<div class="clearfix booksTitle">';
                    output += '<img class = "previewImage" src="img/books/' + val.shortname + '_tn.jpg" alt="' + val.name + '" />';
                    output += '<p class="authorname">' + val.authorname + '</p>';
                    output += '<p class="bookname">' + val.bookname + '</p>';
                    output += '<fieldset class="rating">' +
                        '<input type="radio" id="star5" name="rating" value="5" />' + '<label class = "full" for="star5" title="Awesome - 5 stars">' + '</label>' +
                        '<input type="radio" id="star4half" name="rating" value="4 and a half" />' + '<label class = "half" for="star4half" title="Pretty good - 4.5 stars">' + '</label>' +
                        '<input type="radio" id="star4" name="rating" value="4" />' + '<label class = "full" for="star4" title="Pretty good - 4 stars">' + '</label>' +
                        '<input type="radio" id="star3half" name="rating" value="3 and a half" />' + '<label class = "half" for="star3half" title="Meh - 3.5 stars">' + '</label>' +
                        '<input type="radio" id="star3" name="rating" value="3" />' + '<label class = "full" for="star3" title="Meh - 3 stars">' + '</label>' +
                        '<input type="radio" id="star2half" name="rating" value="2 and a half" />' + '<label class = "half" for="star2half" title="Kinda bad - 2.5 stars">' + '</label>' +
                        '<input type="radio" id="star2" name="rating" value="2" />' + '<label class = "full" for="star2" title="Kinda bad - 2 stars">' + '</label>' +
                        '<input type="radio" id="star1half" name="rating" value="1 and a half" />' + '<label class = "half" for="star1half" title="Sucks a big time - 1.5 stars">' + '</label>' +
                        '<input type="radio" id="star1" name="rating" value="1" />' + '<label class = "full" for="star1" title="Sucks a big time - 1 stars">' + '</label>' +
                        '</fieldset>';
                    output += '<p class="pages">' + val.pages + '</p>';
                    output += '<p class="description">' + val.description + '</p>';
                    output += '</div>';
                }
            });
            output += '</ul>';
            $('#update').html(output);

        });
    }
    setTimeout(main, 2200);





    //Вывод данных при вводе в поле поиска
    $('#searching').keyup(function(){
        main();
    });

    function title() {
        $('#block,#loader').fadeOut('slow');
    }
    setTimeout(title,1500);


 //Скрываем описание до клика
    $('.description').hide();

    //Добавляем кнопку и событие на клик
    function buttonLoaded() {
        $('.booksTitle').append('<input type="button"  value="Читать далее" class="readmore">');
        $('.readmore').on('click',function(){
            $('.description').show();
            $(this).addClass('added-bg').val('Скачать >>');
        });
    } setTimeout(buttonLoaded, 2300);


    //Показ и скрытие формы поиска
    $('.svg-form').hide();

    $('.click-search').click(function() {
        $('.svg-form').show();
        $('.click-search').hide();
        $('.wrapper').click(function() {
            $('.svg-form').hide();
            $('.click-search').show();
        });
    });


    //Создание модального окна

    $('#go').click( function(event){
        event.preventDefault();
        $('#overlay').fadeIn(400,
            function(){
                $('#modal_form')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200);
            });
    });

    //Зaкрытие мoдaльнoгo oкнa

    $('#modal_close, #overlay').click( function(){
        $('#modal_form')
            .animate({opacity: 0, top: '45%'}, 200,
                function(){
                    $(this).css('display', 'none');
                    $('#overlay').fadeOut(400);
                }
            );
    });


    //Форма обратной связи
    $("#form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            $("#form").trigger("reset");
        });
        return false;
    });
    $.ajax ({
        url: "data.json",
        datatype:"html",
        success: function() {

        }
    });
});



