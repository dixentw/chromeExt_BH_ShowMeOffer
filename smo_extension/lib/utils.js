function getDomainFromUrl(url) {

	var domainOfUrl = "";
	var arr = url.split("/");

	if(url.indexOf("http://") != -1 || url.indexOf("https://") != -1) {
		domainOfUrl = arr[2];
	} else {
		domainOfUrl = arr[0];
	}

	if(domainOfUrl.indexOf("www.") === 0) {
		domainOfUrl = domainOfUrl.substring(4);
	}

	//console.log("return getDomainFromUrl: " + url + " --> " + domainOfUrl);

	return domainOfUrl;
}

var getCompanyInfoOnPage = function() {

	if(DBG)console.log("+getCompanyInfoOnPage");

	var companyInfo = {
		domain: "",
		name: "",
		webSite: ""
	};

	if ("www.104.com.tw" === document.location.hostname) {
		companyInfo.source = "104";
		var element = $("#comp_header li.comp_name p a", document);
		if (element.length > 0) {
			companyInfo.name = element.eq(0).text();
			companyInfo.webSite = element.eq(0).attr('href');
			return companyInfo;
		}

		element = $("#comp_header li.comp_name h1", document);

			if (element.length > 0) {
				console.log("checkpoint 42");
				companyInfo.name = element.text();
				companyInfo.webSite = $("div.intro dl dd a")[3].innerHTML;
				return companyInfo;
		}
		// 104i
		if (document.location.pathname.match('\/104i\/')) {
			//for single page only Ex: http://www.104.com.tw/jb/104i/cust/view?c=5e3a43255e363e2048323c1d1d1d1d5f2443a363189j01
			if (document.location.pathname.match('/cust/view')) {
					var h1_dom = $('#mainHeader h1.h1');
					if (h1_dom.length === 1) {
						companyInfo.name = h1_dom.text();
						return companyInfo;
					}
			}

			// page of job description
			if (document.location.pathname.match('/job/view')) {
				var a_doms = $('#mainHeader a', document);
				var a_dom;
				for (var i = 0; i < a_doms.length; i ++) {
					a_dom = a_doms.eq(i);
					if (!a_dom.attr('href') || !a_dom.attr('href').match(/view\?c=/)) {
						continue;
					}
					if (companyInfo.webSite && (companyInfo.webSite != a_dom.attr('href'))) {
						// pass for two different companies
						return;
					}
					companyInfo.webSite = a_dom.attr('href');
					companyInfo.name = a_dom.text();
				}
			}

			return companyInfo;
		} else {
			return;
		}
	} else if ('www.ejob.gov.tw' == document.location.hostname) {
		var company_dom = $('#ctl00_ContentPlaceHolder1_lblCompName', document);
		if (company_dom.length != 0) {
		    companyInfo.source = 'ejob';
		    companyInfo.name = company_dom.text();
		    return companyInfo;
		}
    } else if ('www.104temp.com.tw' == document.location.hostname) {
		var a_doms = $('a', document);
		var a_dom;
		for (var i = 0; i < a_doms.length; i ++) {
		    a_dom = a_doms.eq(i);
		    if (!a_dom.attr('href') || !a_dom.attr('href').match(/^company_intro\.jsp/)) {
				continue;
		    }
		    if (companyInfo.webSite && companyInfo.webSite != a_dom.attr('href')) {
				return;
		    }
		    companyInfo.webSite = a_dom.attr('href');
		    companyInfo.name = a_dom.text();
		    companyInfo.source = '104temp';
		}

		return companyInfo;
    } else if ('www.yes123.com.tw' == document.location.hostname||'yes123.com.tw' == document.location.hostname) {
		if ($('.comp_name').length === 0) {
	            if ($('.dtitle').length == 1 && document.location.href.match('small_corp')) {
	                companyInfo.source = 'yes123';
	                companyInfo.name = $('.dtitle').text();
	                return companyInfo;
	            }
		    return;
		}
		var matches = document.location.search.match(/p_id=([^&]*)/);
		if (!matches) {
			return;
		}

		companyInfo.source = 'yes123';
		companyInfo.name = $('.comp_name').text();
		companyInfo.webSite = matches[1];
    } else if ('www.1111.com.tw' == document.location.hostname) {
		var found = false;
		$('#breadcrumb li a').each(function(){
			var self = $(this);

			if (self.attr('href').match(/找工作機會/)) {
				companyInfo.source = '1111';
				companyInfo.name = self.text();
				companyInfo.webSite = self.attr('href');
				found = true;
				return false;
			}
		});
		if (found) {
			return companyInfo;
		}

        var decoded_url = decodeURIComponent(document.location.href);
        if (decoded_url.match('http://www.1111.com.tw/.*-找工作(機會)?-[0-9]*\.htm')) {
            var h1_doms = $('h1');
            if (h1_doms.length == 1) {
                companyInfo.source = '1111';
                companyInfo.name = h1_doms.text();
                return companyInfo;
            }
        }

        return;
    } else if ('www.518.com.tw' == document.location.hostname) {
        if ($('#company-title').length > 0) {
            if ($('#company-title .sTrong').length === 1) {
                companyInfo.source = '518';
                companyInfo.name = $('#company-title .sTrong')[0].childNodes[0].nodeValue.replace(' ', '').trim();
                return companyInfo;
            }
            companyInfo.source = '518';
            companyInfo.name = $('#company-title').text().replace('所有工作機會»', '').replace(' ', '');
            companyInfo.webSite = document.location.href;
            return companyInfo;
        }

		if (!$('.company-info h2 a').length) {
		    return;
		}

		var dom = $('.company-info h2 a');
		companyInfo.source = '518';
		companyInfo.name = dom.text();
		companyInfo.webSite = dom.attr('href');
    } else {
		return;
    }
};
