jQuery(document).ready(function () {
    var page;
    // Province radio click
    jQuery('input[name="fdlt-province"]').change(function () {
        page = 1;
        fdlt_branch_fn();
    });

    // Branch type radio click
    jQuery('input[name="fdlt-branch-type"]').change(function () {
        page = 1;
        fdlt_branch_fn();
    });

    jQuery('.fdlt-content-area').on('click', '#gt_pagination a', function (e) {
        e.preventDefault();
        page = jQuery(this).html();
        if (page.indexOf('Previous') != -1) {
            page = jQuery('#gt_pagination span.current').html();
            page = parseInt(page) - 1;
        } else if (page.indexOf('Next') != -1) {
            page = jQuery('#gt_pagination span.current').html();
            page = parseInt(page) + 1;
        }
        fdlt_branch_fn();
    });

    // Common ajax function
    function fdlt_branch_fn() {
        // Get radio button clicked values
        var fdlt_province = jQuery('input[name="fdlt-province"]:checked').val();
        var fdlt_branch_type = jQuery('input[name="fdlt-branch-type"]:checked').val();
        // Fired ajax
        jQuery.ajax({
            url: branche_ajax.ajaxurl,
            type: "POST",
            async: true,
            data: {
                action: 'branche_filter',
                page_number: page,
                fdlt_province: fdlt_province,
                fdlt_branch_type: fdlt_branch_type
            },
            success: function (response) {
                if (response != '') {
                    jQuery('.fdlt-content-area').html('');
                    jQuery('.fdlt-content-area').html(response);
                }
            }
        });
    }

    // search page filter js
    jQuery('.search-filter-main .search-filter-btn ').on('click', function () {

        //remove filter active class
        jQuery('.search-filter-main .search-filter-btn ').removeClass('filter-active');

        //add filter active class
        jQuery(this).addClass('filter-active');

        //hide all article
        jQuery('.search-results-main article').hide();

        //get filter search value
        var click_btn_value = jQuery(this).find('a').attr("id").trim();

        if (click_btn_value == 'all-results') {
            //show all results
            jQuery('.search-results-main article').show();
        } else {
            // show article base on filter
            jQuery('.search-results-main article.' + click_btn_value).show();
        }

    });

    //SIGN UP form auto fill - js
jQuery('button.elementor-button.elementor-size-sm').click(function() {

    var getNameVal = jQuery(' #form-field-name').val();
    localStorage.setItem('fdlt_sign_up_name', getNameVal );
  
    var getSurNameVal = jQuery(' #form-field-surname').val();
    localStorage.setItem('fdlt_sign_up_surname', getSurNameVal );
  
    var getAddresVal = jQuery(' #form-field-email').val();
    localStorage.setItem('fdlt_sign_up_email', getAddresVal );
  
    var getContectNumbVal = jQuery('#form-field-contact').val();
    localStorage.setItem('fdlt_sign_up_contact', getContectNumbVal );
  
    jQuery(document).on( 'elementor/popup/show', (event, id, instance) => {
        var setNameVal = localStorage.getItem('fdlt_sign_up_name'); 
        if (setNameVal != '' && setNameVal != 'undefined') {
          jQuery('#form-field-firstName').attr("value",setNameVal);
        }
  
        var setSurNameVal = localStorage.getItem('fdlt_sign_up_surname');
        if (setSurNameVal != '' &&  setSurNameVal != 'undefined') {
          jQuery('#form-field-lastName').attr("value", setSurNameVal);
        }
  
        var setAddresVal = localStorage.getItem('fdlt_sign_up_email');
        if (setAddresVal != '' && setAddresVal != 'undefined') {
          jQuery('#form-field-emailAddress').attr("value", setAddresVal);
        }
  
        var setContectNumbVal = localStorage.getItem('fdlt_sign_up_contact');
        if (setContectNumbVal != '' && setContectNumbVal != 'undefined') {
          jQuery('#form-field-ContactNumber').attr("value", setContectNumbVal );
        }
    });
  
  });
  

});