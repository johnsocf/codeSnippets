// list page js
$('.quickview-button').click(function(event){
				
	event.preventDefault();
	var $item = $(this).parents('li').addClass('active');				
	var position = $item.position();
	var left = position.left;
	var $quickview = $($('#template-quickview').html());
	$item.append($quickview);
	if(left>=480){
		$quickview.css({'top':position.top,'left':left-480}).addClass("right");	
	}else{
		$quickview.css({'top':position.top,'left':left+240});
	}
	$quickview.fadeIn(500);
	return false;
		});

		$('.product-list-item').mouseleave(function () {
			$li = $(this);
			if ($li.hasClass('active')) {
				$quickview = $li.find('#quickview')
				$quickview.fadeOut(500, function () {
					$li.removeClass('active');
					$quickview.remove();
				});
			}
		});
// detail page js
(function () {
	var $mainImage = $('#primary');
	var $thumbnail = $('.thumbnail a');
	
	$mainImage.load(function(){
		$mainImage.fadeIn(500);
	});
	$thumbnail.click(function (event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
		}
		else {
			$thumbnail.removeClass('active');
			var href = $(this).attr('href');
			$(this).addClass('active');	
			$mainImage.fadeOut(500, function (){
			     $mainImage.attr('src', href);
			});
		}
	});
})(); 
			
 	