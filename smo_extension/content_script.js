if(DBG)console.log("### running offerButton --> start");
var DEF_DOMAIN_GLASSDOOR = "www.glassdoor.com";
function actionTaker(event) {
	//if(DBG)console.log("I got data:" + event.data);
	if(document.domain === DEF_DOMAIN_GLASSDOOR) {
		if(event.data) {
			if(event.data === "action:10001"){
				$(window).scrollTop(230);
			}

			var locSerachForm = document.getElementById("SalaryFilterForm");
			var locSelect = document.getElementById("FilterLocation");
			if( locSelect && locSerachForm) {
				if(locSelect.value !== "N,240") {
					locSelect.value = "N,240";
					locSerachForm.submit();
				}
			}
		}
	}
}

function readyToCheckComponayInfo() {
	var resultOfCompanyInfo = getCompanyInfoOnPage();
	if( resultOfCompanyInfo == undefined) {
		if(self != top) {
			if(window.addEventListener) {
				window.addEventListener("message", actionTaker);
			} else {
				window.attachEvent("message", actionTaker);
			}

			if(document.domain === DEF_DOMAIN_GLASSDOOR) {
				setTimeout(function(){
					if(DBG)console.log("ready to scroll view");
					window.postMessage("action:10001", "*");
				}, 1000);
			}

		}
	} else {
		if(chrome && chrome.runtime) {
			chrome.runtime.sendMessage({companyInfo: resultOfCompanyInfo}, function(response) {
				if(DBG)console.log("get Message From background: ");
				if(DBG)console.log(response);
				switch(response.action) {
					case actionList.showOfferInfoButton:
						showOfferInfo(response.companyInfo.salaryLink);
					break;
				}
			});
		}
	}
}

function showOfferInfo(targetLink) {
	if(DBG)console.log("## showOfferInfo: " + targetLink);

	var styleDesc= "font-family: Arial, Tahoma; background-color: white; width:auto; position: fixed;" +
		"z-index: 2147483647;bottom: 70pt; right: 70pt;height:95pt;";
	var template = "<button style='" + styleDesc + "' id='offerButton' scrolling='no'>" +
		"<img src=" + DEF_SRC_BUTTON_IMAGE +"/>" +
		"</button>";
	styleDesc= "font-family: Arial, Tahoma; background-color: white; width:600pt; position: fixed;" +
			"z-index: 2147483647;bottom: 160pt; right: 70pt;height:320pt;display:none;";
	template += "<iframe src='" + targetLink +"' style='" + styleDesc + "' id='infoView' scrolling='yes'></iframe>";
	$('body').append(template);

	setTimeout(function(){
		$("#offerButton").on("click", function() {
			if($("#infoView").is(':visible') === true) {
				if(DBG)console.log("hide info.");
				$("#infoView").slideUp();
			} else {
				if(DBG)console.log("show info.");
				$("#infoView").show();
				$("#infoView").slideDown();
			}
		});
	}, 1000);
}

function showEditPanel() {
	if(DBG)console.log("## showEditPanel");
	var styleDesc= "font-family: Arial, Tahoma; background-color: white; width:auto; position: fixed;" +
		"z-index: 2147483647;bottom: 70pt; right: 70pt; height:95pt;";
	var template = "<button style='" + styleDesc + "' id='offerButton' scrolling='no'>" +
		"<img src=" + DEF_SRC_BUTTON_IMAGE +"/>" +
		"</button>";
	$('body').append(template);
	$('#offerButton').click(clickToWriteHandle);
}

function clickToWriteHandle(){
	$('body').append('<div style="z-index: 2147483647;" id="writer"></div>');
	$('#writer').load(DEF_SRC_WRITER_HTML, function(){
		$.getScript(DEF_SRC_WRITER_SCRIPT);
	});
}


var bypassCheckCompanyInfo = function(){
	showEditPanel();
}

if(self === top) {
	$("document").ready(bypassCheckCompanyInfo);
}
