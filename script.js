function runAjax() {
	$('table.vaccine-table').remove();
	var dose = $('input[name="dose"]').val();
	var available_capacity = 'available_capacity_' + dose;
	var vaccines_found = false;
	var date = new Date();
	var str_date = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
	$.ajax({
		url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=' + $('input[name="pincode"]').val() + '&date=' + str_date,
		contentType: 'application/json',
		dataType: 'json',
		success: function (result) {
			if (result) {
				if (result.centers.length > 0) {
					var count = 1;
					result.centers.forEach(function(center) {
						center.sessions.forEach(function(session) {
							if ((session.available_capacity > 0) && (session.min_age_limit <= $('input[name="age"]').val())) {
		            vaccines_found = true;
		            var table_class = 'table-primary';
		            if (count % 2 === 0) {
		            	table_class = 'table-secondary';
		            }
		            $('.vaccine-results h3.result').text('Vaccines found.');
		            if (count == 1) {
		            	$('.vaccine-results').append('<table class="table vaccine-table table-dark table-striped"><thead><tr><th scope="col">#</th><th scope="col">Pincode</th><th scope="col">Date</th><th scope="col">Age</th><th scope="col">Quantity</th><th scope="col">Vaccine</th><th scope="col">Free/Paid</th><th scope="col">Name</th><th scope="col">Address</th><th scope="col">Block</th><th scope="col">District</th><th scope="col">State</th></tr></thead><tbody></tbody></table>');
		            }
		            $('.vaccine-table tbody').append('<tr class="' + table_class + '">');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<th scope="row">' + count + '</th>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + $('input[name="pincode"]').val() + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + session.date + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + session.min_age_limit + '+' + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + session.available_capacity + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + session.vaccine + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + center.fee_type + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + center.name + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + center.address + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + center.block_name + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + center.district_name + '</td>');
		            $('.vaccine-table tbody tr:nth-child(' + count + ')').append('<td>' + center.state_name + '</td>');
								count++;
		          }
						});
					});
	    	}
	    	if (!vaccines_found) {
	    		$('.vaccine-results h3.result').text('No Vaccines found.');
	    	}
			}
		},
		error: function(error) {
			$('.vaccine-results h3.result').text('Error connecting the API. Please check the values and try again.');
		}
	});
}
	