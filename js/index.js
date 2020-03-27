// xkml模糊搜索
(function() {
  $(function() {
    $('#zy').typeahead({
      source: zy_prolist
      // itemSelected: displayResult
    })
  });
})();
(function(){
       $('.bd_nav').find('span').click(function(){
           $('.bd_nav').find('span').removeClass('active').eq($(this).index()).addClass('active');
           $('.container').find('.agileits').hide().eq($(this).index()).show()
       })
})()
;(function(){
       $('.a1').click().click(function(){
           $('.zg_direction').show();
           $('.zg_cover').show();
       })
       $('.direction_close').click(function(){
           $('.zg_direction').hide();
           $('.zg_cover').hide();
       })
})()
$(function(){
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        $('.databack').addClass('scrollfixed');
        if(scrollTop == 0){
          $('.databack').removeClass('scrollfixed')
        }
      })
})




