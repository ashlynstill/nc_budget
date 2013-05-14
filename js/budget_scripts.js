//variables for budget objects
var r0 = ["Income Taxes",0,100,33,50];
var r1 = ['Sales Taxes',0,100,8,100];
var tax_array = [r0,r1];
var total_rev = 0;

var b0 = ["Education",0,20,6],
    b1 = ["Health",0,20,8],
    b2 = ["Government services",0,20,5],
    b3 = ["Transportation",0,20,3];
    b4 = ["Justice",0,20,3];
var b_array = [b0,b1,b2,b3,b4];
var total_spent = 0;
var total = 0;


//revenue

 $(document).ready(function() {
    $('#cf').append('<div id="revRow"><div class="container-fluid"><h2><i>Revenue</i></h2><div class="row-fluid" id="rev"></div></div></div>');
    for (var j=0;j<tax_array.length;j++){
      $('#rev').append('<div class="span6" id="revRow'+j+'"></div>');
      $('#revRow'+j).append('<div class="row-fluid" id="sectionRev'+j+'"><div class="span6"><h3>'+tax_array[j][0]+'</h3><h4>Base: $'+tax_array[j][4]+'</h4></div><div class="offset3 span3"><h2 class="funds" id="fundsRev'+j+'">'+tax_array[j][3]+'%</h2></div></div><div class="row-fluid"><div class="slide" id="slideRev'+j+'"></div></div>');
      total_rev += ((parseInt(tax_array[j][3])*.01)*tax_array[j][4]);
      
      $('#slideRev'+j).slider({
        min:tax_array[j][1],
        max:tax_array[j][2],
        step:1,
        value:tax_array[j][3], 
        slide: function(event, ui) { 
          var slideval = ui.value;
          var current_whole = $(this).attr('id');
          var currentid = current_whole.split('slideRev').pop();
          var allslide = [];
          $('#fundsRev'+currentid).empty().append(slideval+'%');
          $('.funds').each(function(j){
              var base = tax_array[j][4];
              var temp = parseInt($('#fundsRev'+j).text());
              var changedRev = (temp*0.01)*base;
              allslide.push(changedRev);
          });  
            total_rev=0;
            for (var i = 0; i < allslide.length; i++){
                total_rev += +allslide[i];
            }
            $('#totalrev').empty().append('Total revenue: $'+(Math.ceil(total_rev))+' + '); 
            total = Math.ceil(total_rev-total_spent);
          if(total>0){
            $('#total').empty().append(' Balance: $'+total).removeClass('neg').addClass('pos');
          } if(total<0){
            $('#total').empty().append(' Balance: $'+total).removeClass('pos').addClass('neg');
          } else{
            $('#total').empty().append(' Balance: $'+total).removeClass('pos').removeClass('neg');
          }
        }
      });
    }


//expenditures
	$('#cf').append('<div id="expRow"><div class="container-fluid"><h2><i>Expenditures</i></h2><div class="row-fluid" id="exp"></div></div></div>');
    for (var i=0;i<b_array.length;i++){
      $('#exp').append('<div class="row-fluid expRow" id="row'+i+'"></div>');
      $('#row'+i).append('<div class="row-fluid" id="section'+i+'"><div class="span6"><h3>'+b_array[i][0]+'</h3></div><div class="offset4 span2"><h2 class="spent" id="spent'+i+'">$'+b_array[i][3]+'</h2></div></div><div class="row-fluid"><div class="slide" id="slide'+i+'"></div></div>');
      var parsedTotals = parseInt(b_array[i][3]);
      total_spent += parsedTotals;
      $('#totalspent').empty().append('Total spent: $'+total_spent+' '); 
      $('#slide'+i).slider({
        min:b_array[i][1],
        max:b_array[i][2],
        step:1,
        value:b_array[i][3], 
        slide: function(event, ui) { 
          var slideval = ui.value;
          var current_whole = $(this).attr('id');
          var currentid = current_whole.split('slide').pop();
          var allslide = [];
          $('#spent'+currentid).empty().append('$'+slideval);
          $('.spent').each(function(j){
              var temp = parseInt($('#spent'+j).text().split("$").pop());
              allslide.push(temp);
              
          });  
            total_spent = 0;
            for (var i = 0; i < 4; i++){
                total_spent += +allslide[i];
            }
        $('#totalspent').empty().append(' Total spent: $'+total_spent+' = '); 
          total = Math.ceil(total_rev-total_spent);
          if(total>0){
            $('#total').empty().append(' Balance: $'+total).removeClass('neg').addClass('pos');
          } if(total<0){
            $('#total').empty().append(' Balance: $'+total).removeClass('pos').addClass('neg');
          } else{
            $('#total').empty().append(' Balance: $'+total).removeClass('pos').removeClass('neg');
          }
        }

      })
    }
//calculate blaance
      $('#totalrev').empty().append(' Total revenue: $'+Math.ceil(total_rev)+' + ');
      total = Math.ceil(total_rev-total_spent);
          if(total>0){
            $('#total').empty().append(' Balance: $'+total).removeClass('neg').addClass('pos');
          } if(total<0){
            $('#total').empty().append(' Balance: $'+total).removeClass('pos').addClass('neg');
          } else{
            $('#total').empty().append(' Balance: $'+total).removeClass('pos').removeClass('neg');
          }

      	$('#totalspent').empty().append(' Total spent: $'+total_spent+' = '); 
          total = Math.ceil(total_rev-total_spent);
          if(total>0){
            $('#total').empty().append(' Balance: $'+total).removeClass('neg').addClass('pos');
          } if(total<0){
            $('#total').empty().append(' Balance: $'+total).removeClass('pos').addClass('neg');
          } else{
            $('#total').empty().append(' Balance: $'+total).removeClass('pos').removeClass('neg');
          }
        

//scrollTo for formula bar

	$(window).scroll(function(){
		var form = $('#formula');
		var formPos = form.offset();
		var windowPos = $(window).scrollTop()
		if (windowPos >= formPos.top ){
			form.addClass('fixed');
			form.removeClass('rel_pos');
		} if (windowPos < formPos.top ){
			form.removeClass('fixed');
			form.addClass('rel_pos');
		}
	})


  });



