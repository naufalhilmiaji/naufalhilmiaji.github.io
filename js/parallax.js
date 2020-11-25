var velocity = 0.5;

function update() {
    var pos = $(window).scrollTop();
    $('.ftco-about').each(function() {
        var $element = $(this);
        // subtract some from the height b/c of the padding
        var height = $element.height() - 15;
        $(this).css('backgroundPosition', '20% ' + Math.round((height - pos) * velocity) + 'px');
    });
};

$(window).bind('scroll', update);