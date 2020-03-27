// $('.zg_wrapper').height($(window).height());

function GetCookie(cookename){
    var arr=document.cookie.match(new RegExp("(^| )"+cookename+"=([^;]*)(;|$)"));
    if(arr!=null){
    	$('.lginsecc').show();
        $('.lginsecc span').html(arr[2]);
    }else{
        console.log(arr+"1")
    }
}
// window.LS.remove("data_pro_dslk")
//获取验证码
$("#getyzm").click(function(event) {
	var phone = $("#phone").val();
	if (!phone) {
		alert('请输入手机号');
		return false;
	}
	var phone_re = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0-9]{1}\d{8}$|^18[\d]{9}$|^19[\d]{9}$/;
	if (!phone_re.test(phone)) {
		alert('请输入正确的手机号');
		return false;
	}
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/sendmsg?actid=6043&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {phone: phone},
		success: function(data) {
			if (data.status=="1") {
				//alert('正在发送请稍后...');
				alert('正在发送请稍后...');
				var sec = 120;
				$("#getyzm").text(sec+'s后重试');
				var timer = setInterval(function (){
					sec--;
					$("#getyzm").text(sec+'s后重试');
					if (sec<1) {
						$("#getyzm").text('获取验证码');
						clearInterval(timer);
					}
				}, 1000);
			} else {
				//alert(data.msg);
				alert(data.msg);
			}
		}
	});
});

$("#zhuce").click(function() {
	// var formid = $("#zcformid").val();
	var username = $("#username").val();
	var province = $("#province").val();
	var Myphone = $("#phone").val();
	var yzm = $("#yzm").val();
	var geneal=$('#geneal').val();
    var fenxiao=$('#fenxiao').val();
    var data_source = window.location.href;
	if(username == '') { //验证用户名号是否为空
		alert('请填写用户名');
		return false;
	}
	if(Myphone == '') { //验证手机号是否为空
		alert('请填写手机号');
		return false;
	}
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		alert('请填写正确的手机号！');
		return false;
	}
	if(yzm == '') { //验证码是否为空
		alert('请填写验证码');
		return false;
	}
	$.ajax({
			url: 'http://zg99.offcn.com/index/chaxun/register?actid=6043&callback=?',
			type: 'GET',
			dataType: 'jsonp',
		data: { name: username, phone: Myphone, province: province, yzm: yzm,fenxiao:fenxiao,geneal:geneal,data_source:data_source},
			success: function(data) {
				if (data.status=="1") {
					alert("注册成功，自动登录登陆");
					$('.zg_cover').hide();
					
					$('.container').hide();
					submitswitch = true;
					$('.btn_wrap').hide();
					$(".lginsecc").show()
					$(".lginsecc span").html(Myphone)
					$("#dlformid").val(Myphone)
					window.LS.set("data_pro_dslk", province);
					init()
					return false;
				} else {
					alert(data.msg);
				}
			}

		})
})
//登录
$("#denglu").click(function() {
	// var formid = $("#dlformid").val();
	// var username = $("#loginName").val();
	var Myphone = $("#loginPhone").val();
	if(username == '') { //验证手机号是否为空
		alert('请填写用户名'); 
		return false;
	}
	if(Myphone == '') { //验证手机号是否为空
		alert('请填写手机号');
		return false;
	}
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		alert('请填写正确的手机号！');
		return false;
	}
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/longin?actid=6043&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			phone: Myphone
		},
		success: function(data) {
			if (data.status=="1") {
				alert("登录成功");
				$('.zg_cover').hide();
				
				$('.container').hide();
				submitswitch = true;
				$('.btn_wrap').hide();
				$(".lginsecc").show()
				$(".lginsecc span").html(data.phone)
				$("#dlformid").val(Myphone)
				console.log($("#dlformid").val())
			} else {
				alert("请先注册，再登录");
				$('.container').find('.agileits').hide().eq(1).show();
				$('.bd_nav').find('span').removeClass('active').eq(1).addClass('active');
			}
		}

	})
})
$('.direction_know').click(function () {
	$('.zg_cover').hide();
	$('.zg_direction').hide();
	// setTimeout(() => {
	// 	if (pro) {
	// 		init()
	// 		
	// 	}
	// 	else {
	// 		$('.zg_cover1').show();
	// 		$('.container').show();
	// 		$('.container').find('.agileits').hide().eq(1).show();
	// 		$('.bd_nav').find('span').removeClass('active').eq(1).addClass('active');
	// 	} 
	// }, 200);
})
$(".user-box").click(function () {
	if (!window.LS.get("data_pro_dslk")) {
		alert('未注册,请先注册！')
		$('.zg_cover').show();
		$('.container').show();
		$('.container').find('.agileits').hide().eq(1).show();
		$('.bd_nav').find('span').removeClass('active').eq(1).addClass('active');
	}
})
if (window.LS.get("data_pro_dslk")) {
	init()
}
function init() {
	// (二级联动)
	var seltext = window.LS.get("data_pro_dslk");
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/getlevel?actid=12125&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: { level: '2', grfiled: 'province', grtext: seltext },
		success: function (data) {
			if (data.status == "1") {
				var cjstr = '<option value="">请选择年份</option>';
				$.each(data.lists, function (i, item) {
					cjstr += '<option value="' + item.year + '">' + item.year + '</option>';
				});
				$('#year').html(cjstr);

			} else if (data.status == "2") {
				alert(data.msg);
			} else if (data.status == "3") {
				alert(data.msg);
			} else {
				alert('未知错误');
			}
		}
	});
}

/*调取地市（三级联动）*/
$(document).on("change", "select[name='info[year]']", function () {
	var seltext = $(this).val();
	var onetext = window.LS.get("data_pro_dslk");
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/getlevel?actid=12125&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: { level: '3', grfiled: 'year', grtext: seltext, onefiled: 'province', onetext: onetext},
		success: function (data) {
			if (data.status == "1") {
				var cjstr = '<option value="">请选择地市</option>';
				$.each(data.lists, function (i, item) {
					cjstr += '<option value="' + item.address + '">' + item.address + '</option>';
				});
				$('#address').html(cjstr);

			} else if (data.status == "2") {
				alert("请选择地市");
			} else if (data.status == "3") {
				alert(data.msg);
			} else {
				alert('未知错误');
			}
		}
	});

});
/*调取学历（四级联动）*/
$(document).on("change", "select[name='info[address]']", function () {

	var seltext = $(this).val();
	var onetext = window.LS.get("data_pro_dslk");
	var twotext = $("#year").val();

	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/getlevel?actid=12125&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: { level: '4', grfiled: 'address', grtext: seltext, onefiled: 'province', onetext: onetext, twofiled: 'year', twotext: twotext },
		success: function (data) {

			if (data.status == "1") {
				var cjstr = '<option value="">请选择学历</option>';
				$.each(data.lists, function (i, item) {
					cjstr += '<option value="' + item.xueli + '">' + item.xueli + '</option>';
				});
				$('#xueli').html(cjstr);

			} else if (data.status == "2") {
				alert("请选择学历");
			} else if (data.status == "3") {
				alert(data.msg);
			} else {
				alert('未知错误');
			}
		}
	});

});
//倒计时函数
function runcount(t) {
	if(t > 0) {
		document.getElementById('daojishi').innerHTML = t + 'S后重新获取';
		t--;
		setTimeout(function() {
			runcount(t)
		}, 1000)
	} else {
		$('#getyzm').show();
		$('#daojishi').hide();
	}
}
//验证是否登录
function Islogin() {

}

