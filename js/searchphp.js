var onswitch = false;
var submitswitch = false;
// 年份筛选
// var year_include = function(item, target) {
// 		if(item == target) {
// 			return true
// 		} else {
// 			return false
// 		}
// }
var pro1_include = function (item, target) {
	if (item == '不限') {
		return true
	} else {
		if (item == target) {
			return true
		} else {
			return false
		}
	}
}
// 工作地点筛选
var address_include = function(item, target) {
	if(item == '不限') {
		return true
	} else {
		if(item == target) {
			return true
		} else {
			return false
		}
	}
}
// 学历筛选
var xueli_include = function(item, target) {
		if(item == '不限') {
		return true
	} else {
		if(target.indexOf(item) != -1) {
			return true
		} else {
			return false
		}
	}
}
//政治面貌筛选
var zzmm_include = function(item, target) {
	// if(item == '不限') {
	// 	return true
	// } else {
	// 	if(item == target) {
	// 		return true
	// 	} else {
	// 		return false
	// 	}
	// }
		if(item == target) {
			return true
		} else {
			return false
		}
}


// 专业筛选
var zy_include = function(item, target) {
	if(onswitch) {
		return true
	} else {
		if(target.indexOf(item) != -1) {
			return true
		} else {

			return false
		}
	}
}

// 渲染模板函数
function templateDo(jsonData ,num) {
	if(jsonData.length == 0) {
		var htmls = '<p class="result_tip">没有匹配的数据，请重新修改条件查询，查看更多职位！</p>';
	} else {
		var htmls = '<table class="my_table">\
                  <tr>\
                      <th class="th1">地市</th>\
                      <th class="th2">用人单位</th>\
                      <th class="th3">职位名称</th>\
                      <th class="th4">更多</th>\
                  </tr>';
		for(var j in jsonData) {
			var obj = jsonData[j];
			htmls += '<tr data_index=' + obj.data_index + '>'
			htmls += '<td>' + obj.item03 + '</td>';
			htmls += '<td>' + obj.item04 + '</td>';
			htmls += '<td>' + obj.item05 + '</td>';
			htmls += '<td><a href="javascript:;">查看更多</a></td>';
			htmls += '</tr>'
		}
		htmls += '</table>';
	}
	$('.data').html(num.length);
	$('.zg_wrapper').hide();
	$('.www').show();
	$('.table_wrap').html('').append(htmls);
}
$('.back').click(function(){
	$('.zg_wrapper').show();
	$('.www').hide();
})
var cs = true;
var clickfn = function() {
	var attr = [];
	var num = [];
	var pro1 = window.LS.get("data_pro_dslk")
	var year = $('#year').val()
	var address = $('#address').val()
	var xueli = $('#xueli').val()
	// var zzmm = $('#zzmm').val()
	var zy = $('#zy').val()
	if (year == "") {
		alert('请选择年份！')
		return;
	}
	if (address == "") {
		alert('请选择工作地区！')
		return;
	}
	if(xueli == "") {
		alert('请选择学历！')
		return;
	}
	
	if(zy == "专业不限") {
		alert('请填写自己的专业！')
		return;
	}
	$.each(datalist, function(idx, obj) {
		if(
		pro1_include(pro1, obj.item02) &&
			address_include(address, obj.item03) &&
			xueli_include(xueli, obj.item09) &&
			zy_include(zy, obj.item11)
			) {
			obj.data_index = idx;
			num.push(obj.data_index);
			// console.log(num.length);
			attr.push(obj);
			console.log(attr)
		}
	});
	templateDo(attr,num);
	if(cs == true) {
		var tc = function() {
			setTimeout(function() {
				// if($('.table_wrap').html() != null) {
				// 	$('.zg_cover').show();
				// 	$('.tc').show();
				// }
			}, 10000);
		}
		tc()
		cs = false;
	}
}


// 专业按钮
$('#zy').blur(function() {
	if(($(this).val() != '') && ($(".item_check_zy").hasClass('active') == true)) {
		$(".item_check_zy").removeClass('active')
	}
})

$(".item_check_zy").click(function() {
	$(this).toggleClass('active');
	onswitch = !onswitch;
	if($(this).hasClass('active')) {
		$('#zy').attr('disabled', true);
		$('#zy').val('');
		$('.timing').html('');
	} else {
		$('#zy').attr('disabled', false);
	}
})
$('#submit').click(function() {
	if(submitswitch){
			submitswitch = true;
			if(($('#zy').val() == '') && ($(".item_check_zy").hasClass('active')) == false) {
						alert('请填写自己的专业');
						return false;
					} else {
						clickfn()
					}
	}else {
			alert("请先注册或登录");
			$('.zg_cover').show();
			$('.container').show();
	}
})

$('.register_btn').click(function() {
	if(submitswitch) {
		alert('您已登陆！')
	} else {
		$('.zg_cover').show();
		$('.container').show();
		$('.bd_nav span:nth-child(2)').addClass('active');
		$('.bd_nav span:nth-child(1)').removeClass('active');
		$('.login').hide();
		$('.register').show();
	}
})
$('.login_btn').click(function() {
	console.log(submitswitch)
	if(submitswitch) {
		alert('您已登陆！')
	} else {
		$('.zg_cover').show();
		$('.container').show();
		$('.bd_nav span:nth-child(1)').addClass('active');
		$('.bd_nav span:nth-child(2)').removeClass('active');
		$('.login').show();
		$('.register').hide();
	}
})
$('.bd_close').click(function() {
	$('.zg_cover').hide();
	$('.zg_cover1').hide();
	$('.container').hide();
})


$('.table_wrap').on('click', 'tr', function() {
	var now_json = datalist[parseInt($(this).attr('data_index'))]
	$('.zg_cover').show();
	$('.detail_wrap').show();
	$('.detail_item1').html(now_json.item01)
	$('.detail_item2').html(now_json.item02)
	$('.detail_item3').html(now_json.item03)
	$('.detail_item4').html(now_json.item04)
	$('.detail_item5').html(now_json.item05)
	$('.detail_item6').html(now_json.item06)
	$('.detail_item7').html(now_json.item07)
	$('.detail_item8').html(now_json.item08)
	$('.detail_item9').html(now_json.item09)
	$('.detail_item10').html(now_json.item10)
})
$('.zwxqBack').click(function() {
	$('.zg_cover').hide();
	$('.detail_wrap').hide();
})
$('.detail_know').click(function() {
	$('.zg_cover').hide();
	$('.detail_wrap').hide();
})
$('.direction_close').click(function() {
	$('.zg_direction').hide();
	$('.zg_cover').hide();
})
$('.bd_nav').find('span').click(function() {
	$('.bd_nav').find('span').removeClass('active').eq($(this).index()).addClass('active');
	$('.container').find('.agileits').hide().eq($(this).index()).show()
})
$('.gjfz').click(function() {
	$('.zg_cover').hide();
	$('.fixr').hide();
})
$('.hl,.tc span').click(function() {
	$('.zg_cover').hide();
	$('.tc').hide();
})
$('.lginsecc a').click(function() {
	window.location.reload()
	// window.location='http://m.bj.offcn.com/zg/skzwjs/mobile/';
})